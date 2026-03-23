from fastapi import APIRouter, UploadFile, File, Form, Depends, Response
from ..services.voice_service import VoiceInputService, VoiceOutputService
from pydantic import BaseModel
import io

router = APIRouter()

voice_input_service = VoiceInputService()
voice_output_service = VoiceOutputService()

class VoiceOutputRequest(BaseModel):
    text: str
    language: str

@router.post("/voice-input")
async def voice_input_endpoint(file: UploadFile = File(...)):
    # 1. Read audio
    content = await file.read()
    
    # 2. Transcribe
    text = await voice_input_service.transcribe(content)
    
    return {"text": text}

@router.post("/voice-output")
async def voice_output_endpoint(request: VoiceOutputRequest):
    # 1. Synthesize
    # 'hi' for Hindi, 'mr' for Marathi, 'en' for English
    audio_content = await voice_output_service.synthesize(request.text, request.language)
    
    return Response(content=audio_content, media_type="audio/wav")
