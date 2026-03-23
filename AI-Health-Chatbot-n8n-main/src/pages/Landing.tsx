import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { 
  Heart, 
  Bot, 
  ShieldCheck, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  HelpingHand,
  Menu,
  X,
  Plus,
  Sparkles,
  ChevronDown,
  Mic,
  Camera,
  Users,
  TrendingUp,
  Search
} from "lucide-react";

import { usePWAInstall } from "../hooks/usePWAInstall";
import { DownloadCloud } from "lucide-react";

const Landing: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const { installPrompt, isInstalled, handleInstall } = usePWAInstall();

  React.useEffect(() => {
    document.title = "SevaSetu AI | Healthcare Simplified for Bharat";
  }, []);

  const faqItems = [
    { q: "Is my medical data safe and private?", a: "SevaSetu AI follows top-tier encryption and adheres to the National Digital Health Mission (NDHM) guidelines. Your voice and reports are analyzed anonymously and not shared with third parties." },
    { q: "Do I need to pay for using Seva AI?", a: "No. SevaSetu AI is a social impact platform. Every feature, from AI symptom analysis to government scheme checks, is completely free for all Indian citizens." },
    { q: "How accurately does the AI translate reports?", a: "Our AI is trained on vast medical datasets to accurately interpret diagnostic language into simple, regional terms (Hindi, Marathi, etc.). However, it is not a clinical diagnosis and should be verified by a doctor." },
    { q: "Does it work in remote areas with low internet?", a: "Yes. Our platform is optimized to work on low-bandwidth 2G/3G networks. You can also send voice messages which are lighter on data than large text forms." }
  ];

  return (
    <div className="bg-[#F8FAFC] font-sans text-slate-900 min-h-screen overflow-x-hidden selection:bg-blue-100 selection:text-blue-700">
      {/* Premium Navbar */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/20 rounded-[32px] px-8 py-4 flex items-center justify-between shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-all hover:bg-white/80">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
                <Heart className="w-7 h-7 fill-white/20" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-800">SevaSetu<span className="text-blue-600 italic">AI</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10 font-black text-[11px] uppercase tracking-widest text-slate-400">
              <a href="#about" className="hover:text-blue-600 transition-colors">How it Works</a>
              
              {installPrompt && !isInstalled && (
                <button 
                  onClick={handleInstall}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                >
                  <DownloadCloud className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Install App
                </button>
              )}

              <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
              <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
              
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-[14px]">
                {(['en', 'hi', 'or'] as const).map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-widest transition-all ${
                      language === lang 
                        ? "bg-white text-blue-600 shadow-md" 
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to={user ? "/chat" : "/login"} className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 active:scale-95 transition-all hover:bg-blue-700">
                {user ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button 
                className="lg:hidden p-3 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl active:scale-90 transition-transform"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center space-y-12 p-8 animate-in fade-in duration-300">
          <button 
            className="absolute top-8 right-8 p-4 text-slate-400 active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="flex flex-col items-center gap-8">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black tracking-tight hover:text-blue-600 transition-colors">How it Works</a>
            
            {installPrompt && !isInstalled && (
              <button 
                onClick={() => { handleInstall(); setMobileMenuOpen(false); }}
                className="flex items-center gap-4 text-blue-600 text-4xl font-black tracking-tight group"
              >
                <DownloadCloud className="w-10 h-10" />
                Install App
              </button>
            )}

            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black tracking-tight hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black tracking-tight hover:text-blue-600 transition-colors">FAQ</a>
            <Link to="/chat" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black tracking-tight hover:text-blue-600 transition-colors">Consult AI</Link>
          </div>
          
          <Link 
            to="/chat" 
            onClick={() => setMobileMenuOpen(false)}
            className="w-full max-w-xs bg-blue-600 text-white px-10 py-6 rounded-[32px] font-black text-center text-xl shadow-2xl shadow-blue-200 active:scale-95 transition-all"
          >
            Start Now
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-52 pb-32 px-6 relative">
        <div className="absolute top-40 left-10 opacity-10 animate-pulse hidden lg:block">
           <Plus className="w-20 h-20 text-blue-600 rotate-12" strokeWidth={1} />
        </div>
        <div className="absolute bottom-40 right-20 opacity-5 animate-bounce-slow hidden lg:block">
           <Plus className="w-32 h-32 text-indigo-600 -rotate-12" strokeWidth={1} />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/80 backdrop-blur-md rounded-full border border-blue-100 shadow-sm">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse shadow-lg shadow-blue-400"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Bharat's Health OS v2.0</span>
            </div>
            
            <h1 className="text-6xl md:text-[85px] font-black leading-[0.9] tracking-tighter text-slate-800">
              Healthcare, <br/>
              <span className="text-blue-600 italic underline decoration-blue-100 decoration-8 underline-offset-8">Simplified</span> <br/>
              for Bharat.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-xl leading-relaxed">
              Empowering 800M+ people in rural India with AI-driven symptom analysis, government schemes, and language-first medical guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link to="/chat" className="flex items-center justify-center gap-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-12 py-6 rounded-[32px] font-black text-lg shadow-2xl shadow-blue-200 active:scale-95 transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <MessageSquare className="w-6 h-6" />
                {user ? "Go to Consultation" : "Talk to Seva AI"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/schemes" className="flex items-center justify-center gap-4 bg-white border-4 border-slate-100 text-slate-800 px-12 py-6 rounded-[32px] font-black text-lg active:scale-95 transition-all hover:border-blue-500 shadow-lg shadow-slate-100">
                Check Schemes
              </Link>
            </div>
            
            <div className="flex items-center gap-8 pt-10 border-t border-slate-100">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-200 overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform cursor-pointer">
                    <img src={`/avatar-${i}.png`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose">
                Trusted by <br/>
                <span className="text-slate-800 text-lg">15,000+ Families</span>
              </p>
            </div>
          </div>

          <div className="relative group perspective-1000">
             <div className="absolute -top-20 -left-20 w-[150%] h-[150%] bg-blue-400/10 rounded-full blur-[120px] -z-10 group-hover:opacity-100 transition-opacity"></div>
             
             <div className="w-full aspect-[4/5] rounded-[64px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white relative">
                <img 
                  src="/hero-bg.png" 
                  alt="Rural Healthcare" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
             </div>
             
             {/* Floating Info Cards */}
             <div className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-blue-50 max-w-[240px] hidden md:block">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-100">
                  <Bot className="w-6 h-6" />
                </div>
                <p className="text-slate-800 font-extrabold text-lg leading-tight tracking-tight">"Analyzed your blood report. Hemoglobin levels are stable."</p>
                <div className="mt-4 flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Medical Analysis Active</span>
                </div>
             </div>

             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl border border-emerald-50 max-w-[240px] hidden md:block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Schemes Found</span>
                </div>
                <p className="text-3xl font-black text-slate-800 tracking-tighter">PMJAY</p>
                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase">₹5 Lakh Covarage Active</p>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Section */}
      <section id="about" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          <div className="text-left space-y-6 max-w-2xl">
            <h2 className="text-4xl md:text-[70px] font-black tracking-tighter leading-none text-slate-800 uppercase italic">
              Simple. <span className="text-blue-600 underline decoration-blue-100 decoration-8 underline-offset-8">Human.</span> <br/>
              Intelligent.
            </h2>
            <p className="text-xl text-slate-400 font-bold max-w-lg">Healthcare support designed for simplicity. Your journey begins with a single conversation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "Talk to Seva AI", 
                desc: "Send a voice message or type your symptoms in Hindi, Marathi, or English. It’s like talking to a friend.", 
                icon: Mic, 
                color: "blue",
                step: "ST-01"
              },
              { 
                title: "Scan Documents", 
                desc: "Snap a photo of prescriptions or reports. Our AI translates 'medical-speak' into plain words instantly.", 
                icon: Camera, 
                color: "indigo",
                step: "ST-02"
              },
              { 
                title: "Get Care Instantly", 
                desc: "Know which govt schemes will pay for your treatment, or find the nearest health camp block.", 
                icon: HelpingHand, 
                color: "emerald",
                step: "ST-03"
              }
            ].map((s, i) => (
              <div key={i} className="group bg-slate-50 p-12 rounded-[56px] space-y-10 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-transparent hover:border-slate-100">
                <div className="flex justify-between items-start">
                  <div className={`w-20 h-20 bg-white text-${s.color}-600 rounded-[32px] flex items-center justify-center shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                    <s.icon className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] font-sans">{s.step}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tighter text-slate-800 group-hover:text-blue-600 transition-colors uppercase italic">{s.title}</h3>
                  <p className="text-slate-500 font-bold leading-relaxed">{s.desc}</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-800 group-hover:text-blue-600 transition-colors">
                  Learn More <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* District Health Monitoring Section */}
      <section className="py-40 px-6 bg-[#F1F5F9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
          <div className="lg:col-span-12 text-center mb-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full mb-8">
                <div className="w-2 h-2 bg-rose-600 rounded-full animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Local Guardian API</span>
             </div>
             <h2 className="text-5xl md:text-[100px] font-black tracking-tighter leading-[0.8] uppercase italic text-slate-800">
               Protecting Your <span className="text-rose-600 italic underline decoration-rose-100 decoration-[12px]">District</span>.
             </h2>
          </div>
          
          <div className="lg:col-span-5 space-y-12">
            <p className="text-2xl text-slate-500 font-bold leading-relaxed">
              Every message or report analysis contributes to an anonymous, real-time map that alerts health authorities to potential disease outbreaks.
            </p>
            
            <div className="space-y-6">
              {[
                { label: "Predictive Analytics", desc: "AI forecasts seasonal trends like Malaria or Viral Fever weeks in advance.", icon: Sparkles },
                { label: "Emergency Broadcasting", desc: "Instant SMS alerts to at-risk villages during heatwaves or pandemics.", icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 p-8 bg-white/60 backdrop-blur-md rounded-[40px] border border-white shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                  <div className="w-16 h-16 bg-white text-rose-600 rounded-3xl flex items-center justify-center shadow-lg shadow-rose-900/5 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-xl tracking-tight text-slate-800">{item.label}</h4>
                    <p className="text-sm text-slate-500 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7">
             <div className="bg-white p-10 rounded-[64px] shadow-2xl shadow-slate-200 border-[16px] border-slate-50 relative group">
                <div className="aspect-video bg-slate-100 rounded-[40px] overflow-hidden relative shadow-inner">
                   <img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Map View" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-32 h-32 bg-rose-600/20 rounded-full border-4 border-rose-600 animate-pulse flex items-center justify-center relative">
                         <div className="absolute inset-0 bg-rose-600/40 rounded-full blur-2xl"></div>
                         <span className="bg-rose-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl relative z-10 whitespace-nowrap">VIRAL CLUSTER DETECTED</span>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-10">
                   <div className="bg-emerald-50 p-6 rounded-[32px] border border-emerald-100">
                      <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-2">Hospital Capacity</p>
                      <p className="text-4xl font-black text-slate-800 font-headline tracking-tighter italic">98% <TrendingUp className="inline w-6 h-6 ml-2" /></p>
                   </div>
                   <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100">
                      <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] mb-2">Villages Monitored</p>
                      <p className="text-4xl font-black text-slate-800 font-headline tracking-tighter italic">1,240</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Emotive & Premium */}
      <section id="testimonials" className="py-40 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
           <div className="text-center space-y-8">
             <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600">
                <Sparkles className="w-4 h-4 fill-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest">Community Impact</span>
             </div>
             <h2 className="text-5xl md:text-[80px] font-black tracking-tighter leading-none text-slate-800 italic uppercase">Voices of <span className="text-blue-600 underline decoration-blue-50 decoration-[12px]">Bharat</span>.</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                name: "Suresh P.", 
                role: "Farmer, Pune", 
                text: "I didn’t know I qualified for PMJAY. Seva AI guided me without any middleman fees, and now my heart surgery is covered.", 
                img: "12", 
                icon: Users 
              },
              { 
                name: "Anita D.", 
                role: "ASHA Worker", 
                text: "Explaining reports to villagers in Marathi was hard. Now, I use Seva AI to show them exactly what's in their documents.", 
                img: "34", 
                icon: HelpingHand 
              },
              { 
                name: "Dr. Vinay K.", 
                role: "PHC Officer", 
                text: "The real-time disease maps give me earlier awareness of monsoon fever outbreaks in remote blocks before the first report arrives.", 
                img: "56", 
                icon: ShieldCheck 
              }
            ].map((t, i) => (
              <div key={i} className="group bg-slate-50 p-12 rounded-[64px] space-y-10 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-1000">
                   <t.icon className="w-40 h-40 text-slate-900" />
                </div>
                <div className="w-16 h-16 bg-white text-blue-600 rounded-[20px] shadow-xl flex items-center justify-center relative z-10">
                   <MessageSquare className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <p className="text-2xl font-bold text-slate-800 leading-relaxed italic relative z-10 opacity-90">"{t.text}"</p>
                <div className="flex items-center gap-6 relative z-10 pt-4 border-t border-slate-200/50">
                  <div className="w-16 h-16 rounded-3xl border-4 border-white bg-slate-200 overflow-hidden shadow-2xl rotate-2 group-hover:rotate-0 transition-transform">
                    <img src={`https://i.pravatar.cc/150?img=${t.img}`} className="w-full h-full object-cover" alt={t.name} />
                  </div>
                  <div>
                    <p className="font-black text-xl tracking-tight text-slate-800">{t.name}</p>
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest leading-loose mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="text-center space-y-10">
             <Plus className="w-16 h-16 text-blue-600 mx-auto opacity-20" />
             <h2 className="text-5xl md:text-[70px] font-black tracking-tighter uppercase italic text-slate-800">Your <span className="text-blue-600">Questions</span>.</h2>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-8 md:p-12 rounded-[48px] shadow-sm border border-slate-100 group cursor-pointer hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 relative overflow-hidden"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex justify-between items-center gap-10">
                  <h4 className="font-black text-2xl md:text-3xl tracking-tight text-slate-800 leading-tight italic uppercase">{item.q}</h4>
                  <div className={`w-14 h-14 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white ${openFaq === i ? 'rotate-180 bg-blue-600 text-white shadow-xl' : ''}`}>
                    <ChevronDown className="w-8 h-8" strokeWidth={3} />
                  </div>
                </div>
                <div className={`text-xl text-slate-500 font-bold leading-relaxed transition-all duration-500 overflow-hidden ${openFaq === i ? 'max-h-[300px] opacity-100 mt-10' : 'max-h-0 opacity-0'}`}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors py-4 border-b-2 border-transparent hover:border-blue-600">Privacy & Protocols</button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-52 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[80px] p-20 md:p-32 text-center space-y-12 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,41,59,0.5)]">
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]"></div>
              
              <h2 className="text-5xl md:text-[110px] font-black text-white font-headline leading-[0.85] tracking-tighter uppercase italic">
                Ready to be <br/>
                <span className="text-blue-500 underline decoration-white/10 decoration-[16px]">Healthy</span>?
              </h2>
              
              <p className="text-2xl text-slate-400 max-w-2xl mx-auto font-bold opacity-80">
                Start your first AI consultation now. Experience the future of healthcare.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
                 <Link to="/chat" className="bg-white text-slate-900 px-16 py-7 rounded-[40px] font-black text-2xl shadow-2xl active:scale-95 transition-all hover:bg-blue-50">
                    Talk to Seva AI
                 </Link>
                 <Link to="/schemes" className="bg-white/10 text-white border border-white/20 px-16 py-7 rounded-[40px] font-black text-2xl backdrop-blur-md active:scale-95 transition-all hover:bg-white/20">
                    Our Apps
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2 space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 fill-white/20" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-800">SevaSetu AI</span>
            </div>
            <p className="max-w-md text-xl font-bold text-slate-400 leading-relaxed italic opacity-80">
              Democratizing high-quality medical guidance for everyone in India. Social impact at the speed of AI.
            </p>
          </div>
          
          <div className="space-y-8">
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Platform</h4>
            <ul className="space-y-4 text-slate-400 font-black text-sm uppercase tracking-widest">
              <li><a href="#" className="hover:text-blue-600 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Impact areas</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
            </ul>
          </div>
          
          <div className="space-y-8">
             <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Contact</h4>
             <div className="space-y-1">
               <p className="text-xl font-black tracking-tighter text-slate-800">+91 1800-419-SEVA</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available 24/7</p>
             </div>
             <p className="text-[10px] font-bold text-slate-300 italic">© 2026 SevaSetu Health Systems. No clinical diagnosis provided.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
