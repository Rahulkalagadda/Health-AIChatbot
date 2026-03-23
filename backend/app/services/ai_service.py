from groq import Groq
import os
import base64
from ..config.settings import get_settings

settings = get_settings()

client = Groq(api_key=settings.GROQ_API_KEY)

class AIService:
    SYSTEM_PROMPT = """
    You are 'SevaSetu AI', a rural-friendly health assistant for people in India.
    
    ### CRITICAL RULES:
    1. BREVITY: Keep your responses short and on-point. Use bullet points.
    2. CONCISE SPACING: DO NOT put an empty line between every sentence or bullet point. Keep it compact.
    3. NO TRANSLATIONS: Provide the response ONLY in the user's requested language. Never include English translations inside the message if the user asks in Hindi/Odia.
    4. HINGLISH SCRIPT: If the user uses Hinglish (e.g. "Mujhe bukhar hai"), respond in Hinglish using ONLY ROMAN SCRIPT (English letters). DO NOT use Devanagari script for Hinglish.
       - Correct: "Aapko bukhar hai, samajh gaya."
       - Incorrect: "आपको बुखार है, समझ गया।"
    
    ### RESPONSE STRUCTURE (Follow strictly):
    ✅ 1. Acknowledge: 
       Show understanding (e.g., "I understand you have fever since yesterday.")
    
    ✅ 2. Clarify (Only if critical): 
       Ask 1-2 short follow-up questions (e.g., "What is your temperature?")
    
    ✅ 3. Possible Causes (Safe, non-diagnostic): 
       Short list (e.g., "Could be viral infection or dehydration.")
    
    ✅ 4. Action Steps: 
       Short list (e.g., "Rest, stay hydrated, use Paracetamol if safe.")
    
    ✅ 5. Emergency Check: 
       ⚠️ Short bold warning when to see a doctor (e.g. "⚠️ Seek help if fever > 103F or vomiting.")
    
    ✅ 6. Disclaimer (Light): 
       "Note: I'm an AI, not a doctor."
    """

    @staticmethod
    async def get_chat_response(message: str, history: list = None):
        messages = [{"role": "system", "content": AIService.SYSTEM_PROMPT}]
        if history:
            messages.extend(history)
        messages.append({"role": "user", "content": message})
        
        response = client.chat.completions.create(
            messages=messages,
            model=settings.AI_MODEL,
        )
        return response.choices[0].message.content

    @staticmethod
    async def analyze_medical_report(ocr_text: str):
        if not ocr_text:
            return AIService.get_generic_medical_response()

        prompt = f"""
        Role: You are SevaSetu AI, an expert medical report analyst. 
        Task: Analyze the following medical report text and provide a structured JSON response.
        
        Report Text:
        {ocr_text}
        
        Analysis Instructions:
        1. Summarize the patient's condition in simple, empathetic, non-jargon language for a person in rural India.
        2. Carefully identify every parameter that is outside its reference range.
        3. For each abnormality, determine if it is "HIGH", "LOW", or "ABNORMAL". 
        4. Explain what each abnormality means simply and what might cause it.
        5. Provide 3-5 clear, actionable health recommendations (diet, hydration, follow-up).
        6. If a reference range looks like "116-140" but the value is "12%", interpret it as "11.6-14.0%" (handle OCR errors intelligently).
        
        Format: You MUST return ONLY a valid JSON object. No conversational filler.
        JSON Structure:
        {{
            "summary": "Simple 1-2 sentence overview",
            "detailed_explanation": "A more detailed paragraph explaining the overall results",
            "abnormalities": [
                {{
                    "name": "Parameter Name", 
                    "value": "Observed Value", 
                    "status": "HIGH/LOW/NORMAL/INFO", 
                    "explanation": "Simple explanation why it is high/low and what it means."
                }}
            ],
            "recommendations": ["Recommendation 1", "Recommendation 2"]
        }}
        """
        try:
            response = client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=settings.AI_MODEL,
                response_format={"type": "json_object"}
            )
            return response.choices[0].message.content
        except Exception as e:
            # Fallback if JSON mode fails or isn't supported by the specific model
            response = client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=settings.AI_MODEL,
            )
            return response.choices[0].message.content

    @staticmethod
    async def analyze_medical_image(image_bytes: bytes, file_type: str = "image/jpeg"):
        # Encode image to base64 for Groq Vision
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        prompt = """
        Role: You are SevaSetu AI, an expert medical imaging assistant. 
        Task: Describe this medical image (X-ray, scan, or prescription) simply and empathetically.
        
        Instructions:
        1. Identify the type of image (e.g., Chest X-ray, Hand scan, etc.).
        2. Describe the key findings in non-jargon language for a patient in rural India.
        3. Be supportive and calm.
        4. If it's a prescription, list the visible medicines and their general purpose.
        
        Format: Return ONLY a valid JSON object.
        JSON Structure:
        {
            "summary": "Short 1-sentence identification",
            "detailed_explanation": "Detailed but simple description of what is seen",
            "findings": "Key medical observations",
            "recommendations": ["Consult a specialist for a formal diagnosis", "Keep this record safe"]
        }
        """
        
        try:
            response = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:{file_type};base64,{base64_image}",
                                },
                            },
                        ],
                    }
                ],
                model=settings.VISION_MODEL,
                response_format={"type": "json_object"}
            )
            return response.choices[0].message.content
        except Exception as e:
            return f'{{ "summary": "Error analyzing image", "detailed_explanation": "{str(e)}", "findings": "Vision model failed.", "recommendations": ["Try a clearer image", "Consult a doctor."] }}'

    @staticmethod
    async def chat_about_medical_report(question: str, report_context: str):
        prompt = f"""
        Based on the following medical report context, answer the user's question.
        Use simple language and be empathetic.
        The user might be asking in Hindi, Marathi, or English. Respond in the SAME language as the question.
        
        Report Context: {report_context}
        User Question: {question}
        """
        
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": AIService.SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            model=settings.AI_MODEL,
        )
        return response.choices[0].message.content

    @staticmethod
    def get_generic_medical_response():
        return '{ "summary": "This document seems to contain no readable text.", "abnormalities": [], "recommendations": ["Ensure document is clear and well-lit.", "Consut your doctor."] }'
