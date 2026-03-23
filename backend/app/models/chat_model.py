from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..config.db import Base
import datetime

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(255), ForeignKey("users.id"), index=True)
    message = Column(Text)
    response = Column(Text)
    language = Column(String(10))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
