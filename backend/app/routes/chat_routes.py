from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.db import get_db
from ..models.user_model import User
from ..models.chat_model import ChatHistory
from ..services.ai_service import AIService
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str
    userId: Optional[str] = None # Support from PRD
    user_id: Optional[str] = None # Actual field from frontend
    language: str

    @property
    def effective_user_id(self) -> str:
        return self.user_id or self.userId or "guest"

class ChatResponse(BaseModel):
    response: str
    actions: List[str] = []

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    # Use the property that figures out which ID was sent
    user_id = request.effective_user_id
    
    # 1. Fetch/Register user if they don't exist
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        user = User(id=user_id, language=request.language)
        db.add(user)
        db.commit()
    
    # 2. Update user's language preference if changed
    if user.language != request.language:
        user.language = request.language
        db.commit()

    # 3. Retrieve chat history (last few messages)
    history = db.query(ChatHistory).filter(ChatHistory.user_id == user.id).order_by(ChatHistory.created_at.desc()).limit(5).all()
    history_formatted = []
    for h in reversed(history):
        history_formatted.append({"role": "user", "content": h.message})
        history_formatted.append({"role": "assistant", "content": h.response})

    # 4. Generate AI response
    # The prompt will handle multilingual if we provide instructions in AIService
    # Or translate if user asked explicitly
    ai_response = await AIService.get_chat_response(request.message, history_formatted)

    # 5. Store session
    chat_log = ChatHistory(user_id=user.id, message=request.message, response=ai_response, language=request.language)
    db.add(chat_log)
    db.commit()

    return ChatResponse(response=ai_response, actions=[])
