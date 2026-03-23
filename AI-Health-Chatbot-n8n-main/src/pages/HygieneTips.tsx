import React from "react";
import { Link } from "react-router-dom";

const HygieneTips: React.FC = () => {
  const hygienePractices = [
    { text: "Wash hands frequently with soap", detail: "Scrub for at least 20 seconds before meals." },
    { text: "Cover mouth when coughing", detail: "Use a tissue or your elbow to prevent germ spread." },
    { text: "Keep your surroundings clean", detail: "Regularly clean frequently touched surfaces." },
    { text: "Drink clean, boiled water", detail: "Protect your family from water-borne diseases." },
    { text: "Proper food preparation", detail: "Wash vegetables and cook meat thoroughly." }
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-100 backdrop-blur-md">
          <span className="material-symbols-outlined text-xs">clean_hands</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Hygiene & Safety Guide</span>
        </div>
        <h1 className="text-5xl font-black font-headline leading-[0.9] tracking-tighter">Cleanliness is <span className="text-purple-600 italic underline decoration-purple-200 decoration-8">Health</span>.</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl font-medium leading-relaxed">
          Simple hygiene practices are your first line of defense against infections. Protect your community by following these essential tips.
        </p>
      </section>

      {/* Hero Image */}
      <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white group relative aspect-video">
        <img 
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Handwashing technique demonstration" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Last updated: Dec 2024</p>
          <h3 className="text-2xl font-black font-headline tracking-tight">Daily Wellness Habits</h3>
        </div>
      </div>

      {/* Hygiene Content */}
      <section className="bg-white rounded-[40px] p-10 shadow-xl border border-outline-variant/10 space-y-8">
        <h2 className="text-2xl font-black font-headline tracking-tight text-purple-700 flex items-center gap-2 uppercase tracking-tighter italic">
          <span className="material-symbols-outlined text-3xl">sanitizer</span>
          Daily Hygiene Practices
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {hygienePractices.map((practice, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-purple-50/30 rounded-3xl border border-purple-100/50 hover:bg-purple-50 transition-colors group">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">done_all</span>
              </span>
              <div className="space-y-1 flex-1">
                <p className="text-lg font-bold text-on-surface tracking-tight leading-tight">{practice.text}</p>
                <p className="text-sm text-on-surface-variant font-medium opacity-80">{practice.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Card */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-950 rounded-[40px] p-12 text-center space-y-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-black font-headline tracking-tight leading-tight">Questions about local hygiene?</h2>
          <p className="text-purple-50 font-medium leading-relaxed max-w-xl mx-auto opacity-90">
            Our AI can give you specific advice based on seasonal disease outbreaks in your district.
          </p>
          <div className="pt-4">
            <Link to="/chat" className="inline-flex items-center gap-3 bg-white text-purple-800 px-10 py-5 rounded-3xl font-black shadow-xl active:scale-95 transition-all">
              <span className="material-symbols-outlined">chat_bubble</span>
              Ask Seva AI
            </Link>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6">
        <h3 className="text-xl font-black font-headline tracking-tighter uppercase italic opacity-70">Related Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/health-content/preventive-care" className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl border border-outline-variant/20 hover:bg-white hover:shadow-lg transition-all active:scale-[0.98] group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
              <span className="font-bold text-lg tracking-tight">Preventive Care</span>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <Link to="/health-content/vaccination-schedules" className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl border border-outline-variant/20 hover:bg-white hover:shadow-lg transition-all active:scale-[0.98] group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
              <span className="font-bold text-lg tracking-tight">Vaccination Schedules</span>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HygieneTips;