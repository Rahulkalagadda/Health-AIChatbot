import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Pin, ArrowLeft, Clock, MapPin, Search } from "lucide-react";

const HealthCalendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState("March 2025");

    const events = [
        { date: "Mar 22", title: "Polio Vaccination Drive", type: "immunization", location: "District Hospital", time: "09:00 AM" },
        { date: "Mar 24", title: "World Tuberculosis Day", type: "awareness", location: "Community Center", time: "11:00 AM" },
        { date: "Mar 28", title: "Maternal Health Workshop", type: "maternal", location: "Local Health Center", time: "10:30 AM" },
        { date: "Apr 07", title: "World Health Day", type: "awareness", location: "District Town Hall", time: "09:30 AM" },
        { date: "Apr 12", title: "BCG Vaccination Camp", type: "immunization", location: "Rural Dispensary", time: "08:00 AM" }
    ];

    return (
        <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-16">
            <Link to="/health-hub" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>

            <section className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl group flex flex-col md:flex-row items-center gap-12">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 space-y-8 max-w-2xl flex-1">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <CalendarIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Live Awareness Tracking</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase italic leading-none">
                        District Health <br/>
                        <span className="text-blue-400 underline decoration-white/10 decoration-[12px] underline-offset-8">Calendar</span>.
                    </h1>
                    <p className="text-xl text-blue-100/70 font-bold leading-relaxed">Stay updated with upcoming vaccination drives, health camps, and awareness days in your district.</p>
                </div>
                
                <div className="w-full md:w-96 bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl space-y-6">
                    <div className="flex justify-between items-center text-white">
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-all"><ChevronLeft className="w-5 h-5" /></button>
                        <span className="font-black text-sm uppercase tracking-widest">{currentMonth}</span>
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-all"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-blue-200/50 uppercase tracking-widest">
                        {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({length: 31}).map((_, i) => (
                            <div key={i} className={`aspect-square flex items-center justify-center text-xs font-bold rounded-xl transition-all ${[22, 24, 28].includes(i+1) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-blue-100 hover:bg-white/10 pointer-events-auto cursor-pointer'}`}>
                                {i+1}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-100 pb-12">
                    <h2 className="text-4xl font-black font-headline tracking-tighter uppercase italic text-slate-800">Upcoming <span className="text-blue-600">Events</span></h2>
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-6 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="Search events..." />
                    </div>
                </div>

                <div className="space-y-6">
                    {events.map((event, i) => (
                        <div key={i} className="group bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex flex-col items-center justify-center w-24 h-24 bg-blue-50 text-blue-600 rounded-[32px] font-black border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <span className="text-xs uppercase tracking-widest opacity-60 leading-none mb-1">{event.date.split(" ")[0]}</span>
                                <span className="text-3xl tracking-tighter leading-none">{event.date.split(" ")[1]}</span>
                            </div>
                            
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                                    event.type === 'immunization' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    event.type === 'maternal' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                    'bg-amber-50 text-amber-600 border-amber-100'
                                }`}>
                                    {event.type}
                                </span>
                                <h3 className="text-2xl font-black font-headline tracking-tight text-slate-800 uppercase italic leading-none">{event.title}</h3>
                                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><MapPin className="w-4 h-4 text-blue-500" /> {event.location}</div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Clock className="w-4 h-4 text-blue-500" /> {event.time}</div>
                                </div>
                            </div>
                            
                            <button className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all hover:bg-blue-600">Remind Me</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HealthCalendar;
