from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from ..config.db import Base
import datetime

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(255), ForeignKey("users.id"), index=True)
    file_url = Column(String(500))
    summary = Column(Text)
    ocr_text = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
