from sqlalchemy import Column, Integer, String, DateTime, Text
from ..config.db import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String(255), primary_key=True, index=True)
    name = Column(String(255))
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    
    # Profile fields (Inlining for simplicity in this MVP)
    bio = Column(Text, nullable=True)
    blood_group = Column(String(10), nullable=True)
    weight = Column(String(20), nullable=True)
    height = Column(String(20), nullable=True)
    age = Column(String(10), nullable=True)
    primary_condition = Column(String(255), nullable=True)
    
    language = Column(String(10), default="en")
    district = Column(String(100), index=True)
    role = Column(String(20), default="user") # 'user', 'admin'
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
