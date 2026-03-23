import React from "react";
import { Link } from "react-router-dom";

const VaccinationSchedules: React.FC = () => {
  const scheduleData = [
    {
      category: "Children (0-18 years):",
      items: [
        { name: "BCG", time: "At birth", desc: "Protects against tuberculosis." },
        { name: "Polio Drops (OPV)", time: "6, 10, 14 weeks", desc: "Prevents lifelong paralysis." },
        { name: "Rotavirus", time: "6, 10, 14 weeks", desc: "Prevents severe diarrhea." },
        { name: "MR (Measles-Rubella)", time: "9-12 months", desc: "Essential for immune health." }
      ],
      color: "from-blue-500 to-indigo-700"
    },
    {
      category: "Adults:",
      items: [
        { name: "Tetanus booster", time: "Every 10 years", desc: "Prevents bacterial infections from cuts." },
        { name: "Flu vaccine", time: "Annually for 60+ years", desc: "Seasonal protection against viral fever." },
        { name: "COVID-19", time: "As per guidelines", desc: "Maintain immunity against new variants." }
      ],
      color: "from-purple-500 to-violet-700"
    }
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 backdrop-blur-md">
          <span className="material-symbols-outlined text-xs">vaccines</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Immunization Guide</span>
        </div>
        <h1 className="text-5xl font-black font-headline leading-[0.9] tracking-tighter">Stay <span className="text-blue-600 italic underline decoration-blue-200 decoration-8">Protected</span> for Life.</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl font-medium leading-relaxed">
          Vaccinations are safe, effective, and essential to prevent serious illness. Stay up-to-date with your family's immunization schedule.
        </p>
      </section>

      {/* Hero Image */}
      <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white group relative aspect-video">
        <img 
          src="/vaccination.png" 
          alt="Medical professional preparing vaccination" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Last updated: Jan 2025</p>
          <h3 className="text-2xl font-black font-headline tracking-tight">Official NIS Guidelines</h3>
        </div>
      </div>

      {/* Vaccination Content */}
      <section className="space-y-8">
        {scheduleData.map((section, index) => (
          <div key={index} className="bg-white rounded-[40px] p-10 shadow-xl border border-outline-variant/10 space-y-8 animate-in fly-in duration-500">
            <h2 className={`text-2xl font-black font-headline tracking-tight flex items-center gap-2 uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r ${section.color}`}>
              <span className="material-symbols-outlined text-3xl">event_upcoming</span>
              {section.category}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-4 p-6 bg-surface-container-low/50 rounded-3xl border border-outline-variant/10 hover:bg-white hover:shadow-lg transition-all active:scale-[0.99] group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-bold text-on-surface tracking-tight leading-tight">{item.name}</p>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full shadow-sm">{item.time}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA Card */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-950 rounded-[40px] p-12 text-center space-y-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-black font-headline tracking-tight leading-tight">Need a vaccination reminder?</h2>
          <p className="text-blue-50 font-medium leading-relaxed max-w-xl mx-auto opacity-90">
            Our AI health assistant can help you set up reminders for upcoming vaccinations for you and your family.
          </p>
          <div className="pt-4">
            <Link to="/chat" className="inline-flex items-center gap-3 bg-white text-blue-800 px-10 py-5 rounded-3xl font-black shadow-xl active:scale-95 transition-all">
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

export default VaccinationSchedules;