import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { chatService, translationService } from "../services/api";
import { 
  Send, 
  Mic, 
  Bot, 
  User, 
  Loader2, 
  Languages, 
  Trash2, 
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useVoice } from "../hooks/useVoice";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  translatedText?: string;
  isUser: boolean;
  timestamp: Date;
  type?: "text" | "medical";
  symptoms?: string[];
}

const Chat: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  
  // Initialize voice hook with current language
  const { isListening, transcript, startListening, speak, setTranscript } = useVoice(
    language === 'hi' ? 'hi-IN' : language === 'or' ? 'or-IN' : 'en-IN'
  );
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: t("chat.welcome") || "Namaste! I am Seva Assistant. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync transcript and AUTO-SEND if voice recognition ends
  useEffect(() => {
    if (transcript && !isListening) {
      setMessage(transcript);
      setIsVoiceMode(true);
      handleSendMessage(transcript);
    }
  }, [transcript, isListening]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Chat with Seva AI | Digital Health Assistant";
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || message;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setTranscript(""); 
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(
        textToSend, 
        user?.id || "user_123", 
        language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Odia'
      );
      
      const aiText = response.response || response.answer || response.text || "I understand. How else can I help?";
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // AUTO-SPEAK if user sent via voice
      if (isVoiceMode) {
        speak(aiText);
      }
    } catch (err) {
      toast.error("AI is unavailable right now");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslateMessage = async (msgId: string, text: string) => {
    try {
      const { translated_text } = await translationService.translate(text, "English");
      setMessages(prev => prev.map(m => 
        m.id === msgId ? { ...m, translatedText: translated_text } : m
      ));
      toast.success("Translated to English");
    } catch (err) {
      toast.error("Translation failed");
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F8FAFC]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 CustomScrollbar" id="chat-messages">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 group ${msg.isUser ? "flex-row-reverse" : "items-start"}`}>
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all shadow-sm ${
                msg.isUser 
                  ? "bg-white border border-slate-200 text-slate-400" 
                  : "bg-blue-600 text-white shadow-blue-100"
              }`}>
                {msg.isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col ${msg.isUser ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[70%]`}>
                <div className={`p-4 md:p-5 rounded-[24px] shadow-sm relative overflow-hidden ${
                  msg.isUser 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-blue-100" 
                    : "bg-white text-slate-700 rounded-tl-none border border-slate-200/60"
                }`}>
                  {!msg.isUser && (
                    <div className="absolute -right-4 -top-4 opacity-[0.03] pointer-events-none">
                      <Sparkles className="w-16 h-16 text-blue-600 rotate-12" />
                    </div>
                  )}
                  
                  <div className={`text-sm md:text-[15px] font-semibold leading-normal prose prose-sm max-w-none prose-p:m-0 prose-ul:m-0 prose-li:m-0 prose-headings:m-0 prose-p:leading-normal ${
                    msg.isUser ? "prose-invert" : "prose-slate"
                  }`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                    
                    {msg.translatedText && (
                      <div className="mt-4 pt-4 border-t border-slate-100 opacity-90 animate-in fade-in slide-in-from-top-1 prose prose-sm max-w-none prose-p:m-0 prose-ul:m-0 prose-li:m-0 prose-headings:m-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">English Translation</p>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.translatedText}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   {!msg.isUser && (
                    <>
                      <button 
                        onClick={() => speak(msg.translatedText || msg.text)}
                        className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-2 py-1 rounded-lg transition-all"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Listen
                      </button>
                      <button 
                        onClick={() => handleTranslateMessage(msg.id, msg.text)}
                        className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 px-2 py-1 rounded-lg transition-all"
                      >
                        <Languages className="w-3.5 h-3.5" />
                        Translate
                      </button>
                    </>
                  )}
                  {msg.isUser && (
                    <button 
                      onClick={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
                      className="text-slate-300 hover:text-red-400 p-1 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-100">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200/60 p-4 rounded-[24px] rounded-tl-none flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                </div>
                <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">{t("ui.thinking")}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Modern Input Bar */}
      <div className="p-4 md:p-8 bg-gradient-to-t from-white via-white to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar flex-1 mr-4">
              {[
                { id: "fever", key: "chat.suggest.fever" },
                { id: "schemes", key: "chat.suggest.schemes" },
                { id: "doctor", key: "chat.suggest.doctor" }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleSendMessage(t(item.key))}
                  className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3" />
                  {t(item.key)}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsVoiceMode(!isVoiceMode)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                isVoiceMode 
                  ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm" 
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
              title="Toggle Auto-Speak"
            >
              {isVoiceMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Voice Mode</span>
            </button>
          </div>

          <div className="flex items-end gap-3 bg-white p-2 rounded-[28px] shadow-2xl shadow-slate-200 border border-slate-200 focus-within:border-blue-500/50 transition-all group overflow-hidden">
            <button 
              onClick={startListening}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-inner ${
                isListening 
                  ? "bg-red-50 text-red-500 animate-pulse ring-4 ring-red-50" 
                  : "bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
            </button>
            
            <textarea 
              className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] font-semibold py-3 resize-none h-12 max-h-32 text-slate-700 placeholder:text-slate-400 outline-none" 
              placeholder={isListening ? t("ui.listening") : t("ui.type.question")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={1}
            />
            
            <button 
              onClick={() => handleSendMessage()}
              disabled={!message.trim() || isLoading}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${
                message.trim() && !isLoading 
                  ? "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700" 
                  : "bg-slate-100 text-slate-300 pointer-events-none"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-4">
            Powered by Seva AI • Professional Guidance Required
          </p>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .CustomScrollbar::-webkit-scrollbar { width: 4px; }
        .CustomScrollbar::-webkit-scrollbar-track { background: transparent; }
        .CustomScrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 20px; }
        .CustomScrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
};

export default Chat;