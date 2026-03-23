import pytesseract
from PIL import Image
import io

# Optional: Path if not in PATH (on windows)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

class OCRService:
    @staticmethod
    async def extract_text(file_content: bytes):
        try:
            image = Image.open(io.BytesIO(file_content))
            # Extract text (using multilang: English, Hindi, Marathi, Telugu)
            text = pytesseract.image_to_string(image, lang='eng+hin+mar+tel')
            return text
        except Exception as e:
            print(f"Error in OCR: {e}")
            return ""
