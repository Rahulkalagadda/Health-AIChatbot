import React from "react";
import { Link } from "react-router-dom";
import { PhoneCall, ShieldAlert, Heart, Siren, AlertTriangle, ArrowLeft, Phone, User, ExternalLink, Sparkles, Plus } from "lucide-react";

const Helplines: React.FC = () => {
    const helplines = [
        { name: "Emergency Medical Service", number: "108", type: "medical", desc: "For critical accidents and urgent medical transfers." },
        { name: "Maternal Health Support", number: "105", type: "maternal", desc: "Special assistance for expecting mothers and infants." },
        { name: "Women's Safety Help", number: "109", type: "safety", desc: "For women in distress or needing protection." },
        { name: "Child Help Line", number: "1098", type: "child", desc: "For child protection and emergency support." },
        { name: "Blood Bank Helpline", number: "1910", type: "blood", desc: "Immediate blood requirement and availability search." },
        { name: "Poison Control Center", number: "+91 22 2412 1212", type: "toxicology", desc: "Expert guidance for chemical intake or snake bites." }
    ];

    return (
        <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-16">
            <Link to="/health-hub" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>

            <section className="bg-gradient-to-br from-red-600 to-rose-800 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl group flex flex-col md:flex-row items-center gap-12">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 space-y-8 flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-pulse">
                        <Siren className="w-4 h-4 text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic leading-none">Emergency Contact Registry</span>
                    </div>
                    <h1 className="text-5xl md:text-[90px] font-black font-headline tracking-tighter uppercase italic leading-[0.85] text-white">
                        Every Second <br/>
                        <span className="text-red-200 underline decoration-white/20 decoration-[12px] underline-offset-8">Counts</span>.
                    </h1>
                    <p className="text-xl text-red-100/70 font-bold leading-relaxed max-w-2xl">A curated registry of emergency helplines for various medical and safety needs across India.</p>
                </div>
                
                <div className="w-full md:w-96 bg-white rounded-[40px] p-10 shadow-2xl space-y-8 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-red-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-red-200 group-hover:scale-110 transition-transform animate-bounce">
                        <PhoneCall className="w-12 h-12 stroke-[3]" />
                    </div>
                    <div className="space-y-4">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">108</span>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 leading-none mb-4">Primary Emergency</p>
                        <button className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Dial Now</button>
                    </div>
                </div>
            </section>

            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black font-headline tracking-tighter uppercase italic text-slate-800">Critical <span className="text-red-600">Numbers</span></h2>
                    <p className="text-slate-400 font-bold max-w-xl mx-auto italic">Keep these saved on your device for immediate access during a crisis.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {helplines.map((h, i) => (
                        <div key={i} className="group bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start gap-8">
                            <div className="w-16 h-16 bg-slate-50 text-red-600 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                <PhoneCall className="w-8 h-8 stroke-[2.5]" />
                            </div>

                            <div className="space-y-4 flex-1">
                                <h3 className="text-3xl font-black font-headline tracking-tight text-slate-800 uppercase italic leading-none">{h.number}</h3>
                                <div className="space-y-2">
                                    <p className="text-lg font-black text-slate-700 tracking-tight">{h.name}</p>
                                    <p className="text-xs text-slate-400 font-bold leading-relaxed">{h.desc}</p>
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-slate-50 w-full flex gap-4">
                                <button className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Copy</button>
                                <button className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-red-600 flex items-center justify-center gap-2">Dial <ExternalLink className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="bg-amber-50 rounded-[40px] p-12 border border-amber-100 flex flex-col md:flex-row items-center gap-10">
                <div className="w-20 h-20 bg-amber-100 rounded-[28px] flex items-center justify-center text-amber-600 flex-shrink-0 animate-pulse">
                    <AlertTriangle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-amber-800 tracking-tight uppercase italic leading-none">Emergency Checklist</h3>
                    <p className="text-sm text-amber-900/60 font-bold leading-relaxed">Before you call, ensure you have the correct location, patient age, and clear description of symptoms ready for the operator.</p>
                </div>
                <button className="md:ml-auto px-10 py-5 bg-amber-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">View Protocol</button>
            </div>
        </div>
    );
};

export default Helplines;
