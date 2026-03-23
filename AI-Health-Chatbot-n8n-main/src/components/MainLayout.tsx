import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { useNotifications } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { searchService } from "../services/api";
import {
  MessageSquare,
  FileText,
  Calendar,
  Search,
  Bell,
  User,
  Settings,
  HelpCircle,
  Languages,
  PhoneCall,
  Menu,
  X,
  Heart,
  Zap,
  Plus,
  HeartPulse,
  Home,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Globe,
  LogOut,
  DownloadCloud
} from "lucide-react";

import { usePWAInstall } from "../hooks/usePWAInstall";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { notifications, markAsRead, unreadCount } = useNotifications();
  const { user, logout } = useAuth();
  const { installPrompt, isInstalled, handleInstall } = usePWAInstall();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    
    // Clear previous results if query is too short
    if (q.trim().length < 2) {
      setSearchResults(null);
      return;
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const results = await searchService.globalSearch(searchQuery);
          setSearchResults(results);
        } catch (err) {
          setSearchResults(null);
        }
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const navItems = [
    { name: t("nav.home"), path: "/", icon: Home },
    { name: t("nav.chat"), path: "/chat", icon: MessageSquare },
    { name: t("nav.reports"), path: "/analysis", icon: FileText },
    { name: t("nav.schemes"), path: "/schemes", icon: ShieldCheck },
    { name: t("nav.appointments"), path: "/appointment", icon: Calendar },
    { name: t("nav.healthhub"), path: "/health-hub", icon: HeartPulse },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Premium Navigation Header */}
      <header className="fixed top-0 w-full z-[200] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-16 md:h-20 lg:h-16 shadow-sm">
        <div className="max-w-[1600px] mx-auto h-full px-4 md:px-8 flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
              <Heart className="w-6 h-6 md:w-7 md:h-7 fill-white/20" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-black tracking-tighter text-slate-800 leading-none">{t("app.name").split(" ")[0]}<span className="text-blue-600 italic">{t("app.name").split(" ")[1]}</span></span>
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{t("app.tagline")}</span>
            </div>
          </Link>

          {/* Functional Search Bar */}
          <div className="hidden lg:flex relative items-center bg-slate-100/80 px-4 py-2.5 rounded-2xl w-[450px] border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all duration-300 group">
            <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium ml-3 placeholder:text-slate-400 outline-none" 
              placeholder={t("ui.search.placeholder")} 
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            
            {/* Search Results Overlay */}
            {isSearchFocused && searchResults && (searchQuery.trim() !== "") && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-[24px] shadow-2xl p-4 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between mb-4 px-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search Results</span>
                  <button onClick={() => { setSearchQuery(""); setSearchResults(null); }} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                </div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                  {(searchResults.providers.length > 0) && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 group flex items-center gap-1.5"><Heart className="w-3 h-3" /> Doctors & Centers</p>
                      {searchResults.providers.map((p: any) => (
                        <Link key={p.id} to={`/facility/${p.id}`} className="block p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                          <p className="font-bold text-sm text-slate-800">{p.name}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{p.specialty || p.type} • {p.district}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {(searchResults.schemes.length > 0) && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest px-2 group flex items-center gap-1.5"><Zap className="w-3 h-3" /> Health Schemes</p>
                      {searchResults.schemes.map((s: any, idx: number) => (
                        <Link key={idx} to={`/scheme/${encodeURIComponent(s.name)}`} className="block p-3 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-orange-100">
                          <p className="font-bold text-sm text-slate-800">{s.name}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{s.desc || s.benefits}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {(searchResults.terms.length > 0) && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-2 group flex items-center gap-1.5"><FileText className="w-3 h-3" /> Medical Library</p>
                      {searchResults.terms.map((t: any, idx: number) => (
                        <div key={idx} className="p-3 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-emerald-100">
                          <p className="font-bold text-sm text-slate-800">{t.term}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{t.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Selection */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-[14px]">
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
            
            {installPrompt && !isInstalled && (
              <button 
                onClick={handleInstall}
                className="hidden md:flex items-center gap-2 p-2 px-3 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all rounded-xl border border-blue-100 active:scale-95 shadow-sm"
              >
                <DownloadCloud className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t("nav.install")}</span>
              </button>
            )}
            
            <Link to="/notifications" className="p-2.5 hover:bg-slate-50 text-slate-600 transition-all rounded-xl relative border border-transparent hover:border-slate-200 active:scale-90 shadow-sm md:shadow-none">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
            
            <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 hover:bg-slate-50 transition-all rounded-xl border border-transparent hover:border-slate-200 active:scale-95 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center border border-indigo-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                <User className="text-indigo-600 w-5 h-5 group-hover:text-white transition-colors" />
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none ml-1">
                <span className="text-[13px] font-bold text-slate-700">{user?.name || "Ramesh K."}</span>
                <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">{user?.role === 'admin' ? 'Admin Access' : t("ui.gold.member")}</span>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-slate-50 text-slate-600 transition-all rounded-xl border border-transparent hover:border-slate-200 active:scale-95"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[300] bg-white flex flex-col p-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white">
                <Heart className="w-6 h-6 fill-white/20" />
              </div>
              <span className="text-xl font-black">{t("app.name")}</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400">
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-2xl font-black text-slate-800 uppercase tracking-tighter italic hover:text-blue-600 transition-colors">
                <item.icon className="w-7 h-7" />
                {item.name}
              </Link>
            ))}
            
            {installPrompt && !isInstalled && (
              <button 
                onClick={() => { handleInstall(); setMobileMenuOpen(false); }}
                className="flex items-center gap-4 text-2xl font-black text-blue-600 uppercase tracking-tighter italic"
              >
                <DownloadCloud className="w-7 h-7" />
                {t("nav.install")}
              </button>
            )}
          </div>
          
          <div className="mt-auto flex flex-col gap-4 border-t border-slate-100 pt-8">
             <div className="flex items-center gap-6">
               {(['en', 'hi', 'or'] as const).map((lang) => (
                 <button key={lang} onClick={() => { setLanguage(lang); setMobileMenuOpen(false); }} className={`text-xl font-black uppercase ${language === lang ? 'text-blue-600 underline decoration-4' : 'text-slate-400'}`}>{lang}</button>
               ))}
             </div>
             <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left text-xl font-black text-red-600 uppercase tracking-tighter italic">Sign Out Hub</button>
          </div>
        </div>
      )}

      <div className="flex pt-20 md:pt-20 lg:pt-16 flex-1 overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col h-[calc(100vh-80px)] w-72 bg-white sticky top-20 py-6 px-4 space-y-8 border-r border-slate-200/60 overflow-y-auto">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">{t("ui.main.menu")}</p>
            {navItems.map((item) => (
              <Link 
                key={item.path}
                className={`flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-300 group ${
                  isActive(item.path) 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                }`} 
                to={item.path}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive(item.path) ? "scale-110" : "group-hover:scale-110"}`} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                <span className={`text-[14px] tracking-tight ${isActive(item.path) ? "font-bold" : "font-semibold"}`}>
                  {item.name}
                </span>
                {isActive(item.path) && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">{t("ui.support.care")}</p>
              <div className="space-y-1">
                {installPrompt && !isInstalled && (
                  <button 
                    onClick={handleInstall}
                    className="flex w-full items-center gap-4 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all font-semibold text-sm group"
                  >
                    <DownloadCloud className="w-5 h-5 stroke-2 group-hover:scale-110 transition-transform" />
                    {t("nav.install")}
                  </button>
                )}
                <Link to="/language" className="flex items-center gap-4 text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all font-semibold text-sm group">
                  <Languages className="w-5 h-5 stroke-2 group-hover:scale-110 transition-transform" />
                  {t("nav.language")}
                </Link>
                <Link to="/profile" className="flex items-center gap-4 text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all font-semibold text-sm group">
                  <Settings className="w-5 h-5 stroke-2 group-hover:scale-110 transition-transform" />
                  {t("nav.settings")}
                </Link>
                <Link to="/help" className="flex items-center gap-4 text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all font-semibold text-sm group">
                  <HelpCircle className="w-5 h-5 stroke-2 group-hover:scale-110 transition-transform" />
                  {t("nav.help")}
                </Link>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 bg-red-200/20 w-20 h-20 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-md animate-pulse">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-red-600 text-sm">{t("ui.emergency")}</span>
                </div>
                <p className="text-[11px] text-red-700/70 font-bold leading-tight uppercase tracking-wider">{t("ui.emergency.desc")}</p>
                <button 
                  onClick={() => toast.error("Dialing Emergency 108...")}
                  className="w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-black shadow-lg shadow-red-200 active:scale-95 transition-all hover:bg-red-700 uppercase tracking-widest"
                >
                  {t("ui.call.now")}
                </button>
              </div>
            </div>

            <button 
              onClick={logout}
              className="flex items-center gap-4 text-slate-400 hover:text-red-600 hover:bg-red-50 px-4 py-3.5 rounded-xl transition-all font-black text-xs uppercase tracking-widest group border border-transparent hover:border-red-100 mt-auto"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Sign Out Hub
            </button>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="min-h-[calc(100vh-64px)] w-full pb-44 md:pb-12">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Floating PWA Dock Navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-[200] pwa-tap-highlight-none">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] rounded-[32px] px-2 py-2 flex items-center justify-between pointer-events-auto">
          <Link to="/" className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-75 ${isActive('/') ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400'}`}>
            <Home className="w-6 h-6" strokeWidth={isActive('/') ? 2.5 : 2} />
          </Link>
          <Link to="/chat" className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-75 ${isActive('/chat') ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400'}`}>
            <MessageSquare className="w-6 h-6" strokeWidth={isActive('/chat') ? 2.5 : 2} />
          </Link>
          
          <button 
            onClick={() => toast.error("Dialing Emergency 108...")}
            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-200 -mt-8 border-[6px] border-[#F8FAFC] active:rotate-12 active:scale-90 transition-all"
          >
            <PhoneCall className="w-7 h-7 animate-pulse" strokeWidth={3} />
          </button>
          
          <Link to="/analysis" className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-75 ${isActive('/analysis') ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400'}`}>
            <FileText className="w-6 h-6" strokeWidth={isActive('/analysis') ? 2.5 : 2} />
          </Link>
          <Link to="/profile" className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-75 ${isActive('/profile') ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400'}`}>
            <User className="w-6 h-6" strokeWidth={isActive('/profile') ? 2.5 : 2} />
          </Link>
          
          {installPrompt && !isInstalled && (
            <button 
              onClick={handleInstall}
              className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-75 text-blue-600 border border-blue-100 bg-blue-50/50"
            >
              <DownloadCloud className="w-6 h-6 animate-bounce" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
