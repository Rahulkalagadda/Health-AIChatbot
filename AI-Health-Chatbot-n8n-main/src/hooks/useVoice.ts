import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export const useVoice = (language: string = 'en-IN') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Chrome loads Google voices asynchronously. This event ensures they are available
    const loadVoices = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
      }
    };
    
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const startListening = useCallback(() => {
    // Check for browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error("Your browser doesn't support voice recognition. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info("Listening... Speak now");
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      toast.success("Voice received!");
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
      toast.error(`Voice error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  }, [language]);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      toast.error("Your browser doesn't support speech synthesis.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1.0; 
    utterance.pitch = 1.0; 

    // FIND THE BEST NEURAL-LIKE VOICE
    const voices = window.speechSynthesis.getVoices();
    
    // Prioritize high-quality human-sounding voices
    const preferredKeywords = [
      "Google Hindi",
      "Google English (India)",
      "Neural",
      "Heera",
      "Kalpana",
      "Natural",
      "synthesis.voice.hi-IN"
    ];

    let selectedVoice = null;
    
    // Sort and search: prioritize keywords in preferred list
    for (const keyword of preferredKeywords) {
      selectedVoice = voices.find(v => v.name.includes(keyword) || v.name.toLowerCase().includes(keyword.toLowerCase()));
      if (selectedVoice) break;
    }

    // Fallback: search by language code if no keyword match
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('en-IN') || v.lang.startsWith('or'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [language]);

  return { isListening, transcript, setTranscript, startListening, speak };
};
