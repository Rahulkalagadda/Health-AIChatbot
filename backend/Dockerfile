# ─────────────────────────────────────────────
# Stage 1 — builder
#   Installs all Python packages (including
#   heavy ML deps) plus build-time system libs.
#   Nothing from this stage leaks into the final
#   image except the compiled site-packages.
# ─────────────────────────────────────────────
FROM python:3.10-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /build

# Build-time system deps only (headers, compilers)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        g++ \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps into an isolated prefix so we can copy them cleanly.
# PyTorch CPU-only wheel is ~500 MB vs ~2 GB for the default CUDA wheel.
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir \
        --extra-index-url https://download.pytorch.org/whl/cpu \
        torch \
    && pip install --no-cache-dir -r requirements.txt \
    && find /usr/local/lib/python3.10/site-packages -name "*.pyc" -delete \
    && find /usr/local/lib/python3.10/site-packages -name "__pycache__" -type d \
       -exec rm -rf {} + 2>/dev/null || true

# ─────────────────────────────────────────────
# Stage 2 — runtime
#   Slim image with only what the app needs to
#   run: runtime system libs, installed packages,
#   and application source.
# ─────────────────────────────────────────────
FROM python:3.10-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Runtime-only system deps:
#   libpq5          — PostgreSQL client library (psycopg2 links against it)
#   tesseract-ocr   — OCR engine used by pytesseract
#   tesseract-ocr-hin / -mar / -tel — language packs for multilingual OCR
#   libgomp1        — OpenMP runtime required by faiss-cpu / numpy
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq5 \
        tesseract-ocr \
        tesseract-ocr-hin \
        tesseract-ocr-mar \
        tesseract-ocr-tel \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Pull compiled Python packages from the builder stage
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application source
COPY . /app/

# Railway injects $PORT at runtime
CMD gunicorn -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:$PORT
