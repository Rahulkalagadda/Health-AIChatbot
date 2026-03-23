# SevaSetu Health Hub Assistant

An intelligent health assistance platform built with modern web technologies, featuring multi-language support and AI-powered chat capabilities, integrated with a robust FastAPI backend.

## 🌟 Features

- **AI-Powered Health Assistant**: Interactive chatbot providing health-related guidance via Groq LLMs.
- **Medical Report Analysis**: Upload medical documents for instant AI-driven explanation and summary.
- **Multi-language Support**: Available in English, Hindi, and Odia.
- **Real-time Chat Interface**: Modern, responsive clinical UI with message history and voice support.
- **Health Information Hub**: Comprehensive resources for:
  - Vaccination Schedules
  - Hygiene Tips
  - Preventive Care
  - Emergency Services
  - Government Health Schemes (BSKY, PM-JAY, etc.)

## 🛠️ Technologies Used

### Frontend
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Lucide Icons**: Beautiful, consistent icons

### Backend (SevaSetu API)
- **FastAPI**: High-performance Python backend.
- **Groq AI**: Ultra-fast Large Language Model (Mixtral 8x7b) integration.
- **Tesseract OCR**: Specialized on-premise text extraction for medical reports.
- **MySQL**: Relational database for user profiles, chat history, and appointments.
- **Cloudinary**: Secure medical image and report storage.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- FastAPI Backend (running on localhost:8000)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd AI-Health-Chatbot-n8n-main
```

2. Install dependencies
```bash
npm install
```

3. Configure Environment
Create a `.env` file in the root:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components & Layouts
├── contexts/       # Auth, Theme, Language, and Notification Providers
├── services/       # API Service layer (chat, analysis, schemes, etc.)
├── lib/           # Utility functions & Tailwind configurations
└── pages/         # Main application pages (Chat, Analysis, Directory)
```

## 📡 API Integration

The application communicates with the SevaSetu FastAPI backend for all operations:

- **Chat**: Sends messages and retrieves history from `/api/chat`.
- **Analysis**: Handles file uploads and OCR results from `/api/analysis`.
- **Auth**: Fully integrated login and signup via `/api/auth`.
- **Schemes**: RAG-based search for government health schemes via `/api/schemes`.

## 🎨 Design Philosophy
The UI follows the **SevaSetu Heritage** design system, emphasizing:
- **Digital Sanctuary**: Calming, medical-grade aesthetics.
- **Intentional Asymmetry**: Modern, sophisticated layouts.
- **High Contrast**: Accessibility for all age groups.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
