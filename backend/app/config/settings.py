from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional
from urllib.parse import quote_plus
import os

class Settings(BaseSettings):
    # App Config
    APP_NAME: str = "SevaSetu AI Health Chatbot"
    DEBUG: bool = True
    
    # DB Config (Can be URL or components)
    DATABASE_URL: Optional[str] = None
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_NAME: str = "new_healthdb"
    DB_USER: str = "root"
    DB_PASSWORD: str = "rahul@1"
    
    def get_sqlalchemy_url(self):
        if self.DATABASE_URL:
            # Render/Heroku sometimes use 'postgres://', but SQLAlchemy requires 'postgresql://'
            if self.DATABASE_URL.startswith("postgres://"):
                return self.DATABASE_URL.replace("postgres://", "postgresql://", 1)
            return self.DATABASE_URL
        
        # URL encode user and password to handle special characters like '@'
        safe_user = quote_plus(self.DB_USER)
        safe_password = quote_plus(self.DB_PASSWORD)
        
        # Build MySQL URL as default
        return f"mysql+pymysql://{safe_user}:{safe_password}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    # Groq Config
    GROQ_API_KEY: str = ""
    AI_MODEL: str = "llama-3.1-8b-instant" 
    VISION_MODEL: str = "meta-llama/llama-4-scout-17b-16e-instruct"
    
    # Cloudinary Config
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    
    # JWT Config
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"
        extra = "allow" # Handle additional env variables

@lru_cache()
def get_settings():
    return Settings()
