# SevaSetu AI Health Chatbot Backend

Production-ready FasAPI backend for rural health service in India.

## 🚀 Setup Instructions

### 1. Requirements
Ensure you have Python 3.9+ and the following installed:
- Tesseract OCR (`sudo apt install tesseract-ocr` or download installer for windows)
- MySQL (Dev) or PostgreSQL (Prod)

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Config
Rename `.env.sample` to `.env` and fill in your keys:
- GROQ_API_KEY (from console.groq.com)
- CLOUDINARY_* (from cloudinary.com)

### 4. Database Setup (Alembic)
Initialize database:
```bash
alembic upgrade head
```

### 5. Running the App
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🏗️ Technical Architecture

- **FastAPI**: Async core for high performance.
- **Mixtral (Groq)**: Ultra-fast LLM for medical report analysis and multilingual chat.
- **Tesseract**: On-premise OCR for document analysis.
- **Whisper & Coqui**: On-demand STT/TTS for voice interaction.
- **FAISS**: Vector search for local government scheme RAG (Retrieval Augmented Generation).

---

## 🔄 Switching MySQL (Dev) -> Aiven PostgreSQL (Prod)

This application uses **SQLAlchemy ORM** which provides database portability. To switch:

1. **Obtain Connection String** from Aiven Dashboard.
2. **Update `.env`**:
   Change:
   `DATABASE_URL="mysql+pymysql://root:password@localhost/health_db"`
   To:
   `DATABASE_URL="postgresql://avnadmin:password@host:port/defaultdb?sslmode=require"`
3. **Run Migrations**:
   The code automatically detects the protocol and uses either `pymysql` or `psycopg2`. No code changes required!

---

## 🔒 Security
- JWT authentication logic included.
- CORS configured for external frontend access.
- Environment-based secrets management.
