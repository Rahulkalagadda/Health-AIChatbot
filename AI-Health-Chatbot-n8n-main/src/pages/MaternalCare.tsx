import React from "react";
import { Link } from "react-router-dom";
import { Baby, Heart, ShieldAlert, ArrowLeft, Sparkles, CheckCircle2, User, PhoneCall, Stethoscope } from "lucide-react";

const MaternalCare: React.FC = () => {
    return (
        <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-16">
            <Link to="/health-hub" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>

            <section className="bg-gradient-to-br from-rose-900 to-pink-950 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-transform duration-[3s] group-hover:scale-110"></div>
                
                <div className="relative z-10 space-y-8 max-w-2xl">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm animate-pulse">
                        <Baby className="w-4 h-4 text-rose-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Maternal Health Hub</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase italic leading-none text-rose-100">
                        Safe Motherhood <br/>
                        <span className="text-rose-400 underline decoration-white/10 decoration-[12px] underline-offset-8">Care</span>.
                    </h1>
                    <p className="text-xl text-rose-100/70 font-bold leading-relaxed">
                        Comprehensive guidance and support for expecting mothers and newborn care, tailored for local health systems.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                    { title: "Pregnancy Guide", desc: "Month-by-month changes and essential health checks in Marathi/Odia/Hindi.", icon: Stethoscope, color: "bg-rose-50 text-rose-600" },
                    { title: "Essential Nutrition", desc: "Dietary needs for both mother and child using accessible local foods.", icon: Heart, color: "bg-pink-50 text-pink-600" },
                    { title: "Newborn Care", desc: "First-week basics, breastfeeding guide and hygiene tips for a healthy start.", icon: Baby, color: "bg-amber-50 text-amber-600" },
                    { title: "Danger Signs", desc: "Critical warning signs you should never ignore. Call emergency 108.", icon: ShieldAlert, color: "bg-red-50 text-red-600" },
                    { title: "Aadhaar Benefits", desc: "Government schemes like Janani Suraksha and health vouchers guide.", icon: User, color: "bg-blue-50 text-blue-600" },
                    { title: "Local Health Center", desc: "Finding your nearest ASHA worker and primary health center location.", icon: PhoneCall, color: "bg-emerald-50 text-emerald-600" }
                ].map((item, i) => (
                    <div key={i} className="group bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 border border-white shadow-xl group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-8 h-8 stroke-[2.5]" />
                        </div>
                        <h3 className="text-2xl font-black font-headline tracking-tighter text-slate-800 uppercase italic mb-4">{item.title}</h3>
                        <p className="text-slate-500 font-bold leading-relaxed mb-8 text-sm">{item.desc}</p>
                        <div className="space-y-3">
                            {["Expert medical tips", "Local healthcare support", "Live AI assistance"].map((tip, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                    <CheckCircle2 className="w-4 h-4 text-rose-500 flex-shrink-0" /> {tip}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <section className="bg-rose-900 rounded-[56px] p-16 text-center space-y-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px]"></div>
                <h2 className="text-3xl md:text-5xl font-black text-white font-headline leading-tight italic uppercase tracking-tighter">Instant Support for Mothers</h2>
                <p className="text-xl text-rose-100/70 max-w-2xl mx-auto font-bold opacity-80 leading-relaxed">Our AI assistant is voice-enabled and works in local languages to support you through every stage of your journey.</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                   <Link to="/chat" className="bg-white text-rose-700 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all hover:bg-rose-50 flex items-center gap-2"><PhoneCall className="w-4 h-4" /> Start AI Chat</Link>
                   <button className="bg-black/20 text-white border-2 border-white/20 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest backdrop-blur-md active:scale-95 transition-all hover:bg-white/10 uppercase tracking-widest">Pregnancy Alert</button>
                </div>
            </section>
        </div>
    );
};

export default MaternalCare;
