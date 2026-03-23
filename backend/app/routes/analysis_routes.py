from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.db import get_db
from ..services.storage_service import StorageService
from ..services.ocr_service import OCRService
from ..services.ai_service import AIService
from pydantic import BaseModel
import json

from ..models.report_model import Report
from typing import Optional, Any, List
router = APIRouter()

@router.get("/reports/{userId}")
async def get_reports_history(userId: str, db: Session = Depends(get_db)):
    reports = db.query(Report).filter(Report.user_id == userId).all()
    
    result = []
    for r in reports:
        result.append({
            "id": r.id,
            "file_url": r.file_url,
            "summary": r.summary,
            "created_at": r.created_at
        })
        
    return {
        "status": "success",
        "reports": result
    }

@router.post("/analysis")
async def report_analysis_endpoint(
    file: UploadFile = File(...),
    userId: str = Form("guest"),
    db: Session = Depends(get_db)
):
    # 1. Read file content
    content = await file.read()
    
    # 2. Upload to Cloudinary
    file_url = await StorageService.upload_file(content, file.filename)
    if not file_url:
        raise HTTPException(status_code=500, detail="Failed to upload file")
    
    # 3. Extract text via OCR
    ocr_text = await OCRService.extract_text(content)
    
    # 4. Analyze with AI (Use Vision for images if OCR text is sparse, or for X-rays)
    is_image = file.content_type.startswith("image/")
    
    if not ocr_text.strip() and is_image:
        # Fallback to Vision for images with no readable text (like X-rays)
        analysis_json = await AIService.analyze_medical_image(content, file.content_type)
    else:
        # Standard report analysis
        analysis_json = await AIService.analyze_medical_report(ocr_text)
    
    # Parse JSON
    try:
        # Check if the output contains triple backticks markdown block
        if "```json" in analysis_json:
            clean_json = analysis_json.split("```json")[1].split("```")[0].strip()
        elif "```" in analysis_json:
            clean_json = analysis_json.split("```")[1].split("```")[0].strip()
        else:
            clean_json = analysis_json.strip()
        
        analysis_data: dict[str, Any] = json.loads(clean_json)
    except Exception as e:
        print(f"JSON parsing error: {e}. Raw: {analysis_json[:200]}...")
        analysis_data: dict[str, Any] = {
            "summary": "Analysis received but formatting was unexpected.",
            "detailed_explanation": str(analysis_json),
            "abnormalities": [],
            "recommendations": ["Review report with a doctor."]
        }

    # Ensure consistent structure for frontend
    if "findings" in analysis_data and "abnormalities" not in analysis_data:
        analysis_data["abnormalities"] = [
            {
                "name": "Note", 
                "value": "Visual Observation", 
                "status": "INFO", 
                "explanation": analysis_data.get("findings", "See summary for details.")
            }
        ]
    
    # Merge detailed explanation into summary if available
    summary = analysis_data.get("summary", "")
    detailed = analysis_data.get("detailed_explanation", "")
    if detailed:
        analysis_data["summary_full"] = f"{summary}\n\n{detailed}"
    else:
        analysis_data["summary_full"] = summary
    
    return analysis_data

class AnalysisChatRequest(BaseModel):
    userId: str = "guest"
    question: str
    reportContext: Optional[str] = None

@router.post("/analysis/chat")
async def report_chat_endpoint(request: AnalysisChatRequest):
    response = await AIService.chat_about_medical_report(
        request.question, 
        request.reportContext or "No previous report text uploaded."
    )
    return {"response": response}
