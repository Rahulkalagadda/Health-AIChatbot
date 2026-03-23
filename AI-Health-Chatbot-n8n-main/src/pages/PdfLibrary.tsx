import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Download, FileText, Search, ArrowLeft, BookOpen, Clock, Heart, Filter, ChevronRight, Languages } from "lucide-react";

const PdfLibrary: React.FC = () => {
    const [filter, setFilter] = useState("all");

    const resources = [
        { title: "First Aid Basics", lang: "Hindi", size: "2.4 MB", type: "emergency", updated: "March 2025", desc: "Essential guide for immediate response to accidents and injuries." },
        { title: "Hygiene Hand Book", lang: "Marathi", size: "1.8 MB", type: "preventive", updated: "Jan 2025", desc: "Daily habits to prevent common seasonal infections and maintain health." },
        { title: "Maternal Health Guide", lang: "Hindi", size: "3.2 MB", type: "maternal", updated: "Feb 2025", desc: "Comprehensive pregnancy and newborn care manual for families." },
        { title: "Vaccination FAQ", lang: "Odia", size: "1.1 MB", type: "immunization", updated: "Mar 2025", desc: "Common questions and schedules for local immunization drives." },
        { title: "Healthy Eating 2025", lang: "English", size: "2.9 MB", type: "nutrition", updated: "Feb 2025", desc: "Nutrition guide using seasonal local produce for strength." },
        { title: "Stress Free Living", lang: "Marathi", size: "1.5 MB", type: "mental", updated: "Dec 2024", desc: "Mindfulness and mental health techniques in local context." }
    ];

    return (
        <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-16">
            <Link to="/health-hub" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>

            <section className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl group flex flex-col md:flex-row items-center gap-12">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 space-y-8 flex-1">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm animate-pulse">
                        <Download className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Digital Resource Library</span>
                    </div>
                    <h1 className="text-5xl md:text-[85px] font-black font-headline tracking-tighter uppercase italic leading-[0.85] text-white">
                        Digital Health <br/>
                        <span className="text-indigo-400 underline decoration-white/10 decoration-[12px] underline-offset-8">Library</span>.
                    </h1>
                    <p className="text-xl text-indigo-100/70 font-bold leading-relaxed max-w-2xl">Download expert-curated health guides in your local language. Works offline once saved.</p>
                </div>
                
                <div className="w-full md:w-96 bg-white rounded-[40px] p-10 shadow-2xl space-y-8 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 group-hover:scale-110 transition-transform">
                        <FileText className="w-12 h-12 stroke-[3]" />
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 leading-none mb-4">Storage Usage</p>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-indigo-600 rounded-full"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold">12 MB of 50 MB used</p>
                        <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Download All</button>
                    </div>
                </div>
            </section>

            <section className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-100 pb-12">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input className="w-full bg-slate-50 border border-slate-100 py-6 pl-16 pr-8 rounded-[28px] font-bold text-base outline-none focus:bg-white focus:border-blue-500 transition-all shadow-inner placeholder:text-slate-300" placeholder="Search guides..." />
                    </div>
                    
                    <div className="flex gap-4 overflow-x-auto no-scrollbar w-full md:w-auto pb-4 md:pb-0">
                        {["all", "maternal", "emergency", "preventive", "nutrition"].map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${filter === f ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:text-blue-600'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {resources.filter(r => filter === "all" || r.type === filter).map((r, i) => (
                        <div key={i} className="group bg-white p-10 rounded-[56px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start gap-8">
                            <div className="flex justify-between w-full items-start">
                                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[28px] flex items-center justify-center border border-indigo-100 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    <FileText className="w-10 h-10" />
                                </div>
                                <div className="flex flex-col items-end gap-2 text-slate-400">
                                   <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest leading-none">
                                      <Languages className="w-3 h-3" /> {r.lang}
                                   </div>
                                   <div className="text-[10px] font-bold opacity-60 leading-none">PDF • {r.size}</div>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1">
                                <h3 className="text-2xl font-black font-headline tracking-tighter text-slate-800 uppercase italic leading-tight">{r.title}</h3>
                                <p className="text-slate-500 font-bold text-sm leading-relaxed">{r.desc}</p>
                                <div className="flex items-center gap-6 text-slate-400 pt-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Clock className="w-3.5 h-3.5" /> Updated {r.updated}</div>
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-slate-50 w-full flex gap-4">
                                <button className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Preview</button>
                                <button className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-indigo-600 flex items-center justify-center gap-2">Download <Download className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PdfLibrary;
