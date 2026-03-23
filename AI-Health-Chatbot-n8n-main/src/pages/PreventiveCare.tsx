import React from "react";
import { Link } from "react-router-dom";

const PreventiveCare: React.FC = () => {
  const guidelines = [
    { text: "Regular health check-ups every 6 months", detail: "Consult your nearest health worker or clinic." },
    { text: "Balanced diet with local vegetables and fruits", detail: "Choose iron-rich foods like spinach and eggs." },
    { text: "Daily exercise - minimum 30 minutes", detail: "Even brisk walking count as good activity." },
    { text: "Adequate sleep - 7-8 hours daily", detail: "Rest is essential for your body's recovery." },
    { text: "Avoid tobacco and alcohol consumption", detail: "Significantly reduces risk of cancer." }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto w-full space-y-12 pb-24">
      {/* Breadcrumb and Back Button */}
      <Link to="/health-hub" className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Health Hub
      </Link>

      {/* Header Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 backdrop-blur-md">
          <span className="material-symbols-outlined text-xs">shield_with_heart</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Preventive Care Guide</span>
        </div>
        <h1 className="text-5xl font-black font-headline leading-[0.9] tracking-tighter">Your Health is Your <span className="text-emerald-600 italic underline decoration-emerald-200 decoration-8">Wealth</span>.</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl font-medium leading-relaxed">
          Simple daily habits can prevent 80% of diseases. Follow our comprehensive guide to maintain a vibrant, healthy life for you and your family.
        </p>
      </section>

      {/* Hero Image */}
      <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white group relative aspect-video">
        <img 
          src="/preventive-care.png" 
          alt="Healthcare professional giving preventive care advice" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Last updated: Dec 2024</p>
          <h3 className="text-2xl font-black font-headline tracking-tight">Essential Checkups Guide</h3>
        </div>
      </div>

      {/* Guidelines Content */}
      <section className="bg-white rounded-[40px] p-10 shadow-xl border border-outline-variant/10 space-y-8">
        <h2 className="text-2xl font-black font-headline tracking-tight text-emerald-700 flex items-center gap-2 uppercase tracking-tighter italic">
          <span className="material-symbols-outlined text-3xl">verified_user</span>
          Preventive Healthcare Guidelines
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {guidelines.map((guideline, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-emerald-50/30 rounded-3xl border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
              <span className="w-8 h-8 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-700 font-black text-sm shadow-sm ring-4 ring-emerald-50">
                {index + 1}
              </span>
              <div className="space-y-1 flex-1">
                <p className="text-lg font-bold text-on-surface tracking-tight leading-tight">{guideline.text}</p>
                <p className="text-sm text-on-surface-variant font-medium opacity-80">{guideline.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Card */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-[40px] p-12 text-center space-y-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-black font-headline tracking-tight leading-tight">Need more health guidance?</h2>
          <p className="text-emerald-50 font-medium leading-relaxed max-w-xl mx-auto opacity-90">
            Our AI health assistant is available 24/7 in Hindi, Marathi, and English to answer your specific health concerns.
          </p>
          <div className="pt-4">
            <Link to="/chat" className="inline-flex items-center gap-3 bg-white text-emerald-800 px-10 py-5 rounded-3xl font-black shadow-xl active:scale-95 transition-all">
              <span className="material-symbols-outlined">chat_bubble</span>
              Ask Seva AI
            </Link>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6">
        <h3 className="text-xl font-black font-headline tracking-tighter uppercase italic opacity-70">Related Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/health-content/vaccination-schedules" className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl border border-outline-variant/20 hover:bg-white hover:shadow-lg transition-all active:scale-[0.98] group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
              <span className="font-bold text-lg tracking-tight">Vaccination Schedules</span>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <Link to="/health-content/hygiene-tips" className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl border border-outline-variant/20 hover:bg-white hover:shadow-lg transition-all active:scale-[0.98] group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>clean_hands</span>
              <span className="font-bold text-lg tracking-tight">Hygiene Tips</span>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PreventiveCare;