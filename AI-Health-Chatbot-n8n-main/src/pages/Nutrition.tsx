import React from "react";
import { Link } from "react-router-dom";
import { Apple, Wheat, Coffee, ArrowLeft, Heart, Sparkles, CheckCircle2, Beef, IceCream } from "lucide-react";

const Nutrition: React.FC = () => {
    return (
        <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-16">
            <Link to="/health-hub" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>

            <section className="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-transform duration-[3s] group-hover:scale-110"></div>
                
                <div className="relative z-10 space-y-8 max-w-2xl">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm animate-pulse">
                        <Apple className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Nutrition Guard</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase italic leading-none">
                        Eat for a <br/>
                        <span className="text-emerald-400 underline decoration-white/10 decoration-[12px] underline-offset-8">Strength</span>.
                    </h1>
                    <p className="text-xl text-emerald-100/70 font-bold leading-relaxed">
                        Discover the power of local seasonal produce to boost your immunity and daily energy levels naturally.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                    { title: "Millet Power", desc: "Superfoods like Bajra and Ragi for energy and strength.", icon: Wheat, color: "bg-emerald-50 text-emerald-600" },
                    { title: "Immunity Boost", desc: "Natural antibiotics like honey, ginger and jaggery.", icon: Heart, color: "bg-rose-50 text-rose-600" },
                    { title: "Hydration Tips", desc: "Best local drinks like Kokum and buttermilk for health.", icon: Coffee, color: "bg-amber-50 text-amber-600" },
                    { title: "Iron Rich Foods", desc: "Essential leafy vegetables for strength and healthy blood.", icon: Sparkles, color: "bg-teal-50 text-teal-600" },
                    { title: "Protein Sources", desc: "Legumes and local dairy for muscle and bone health.", icon: Beef, color: "bg-blue-50 text-blue-600" },
                    { title: "Daily Superfoods", desc: "Amla, Neem and other medicinal local staples.", icon: Sparkles, color: "bg-purple-50 text-purple-600" }
                ].map((item, i) => (
                    <div key={i} className="group bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 border border-white shadow-xl group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-8 h-8 stroke-[2.5]" />
                        </div>
                        <h3 className="text-2xl font-black font-headline tracking-tighter text-slate-800 uppercase italic mb-4">{item.title}</h3>
                        <p className="text-slate-500 font-bold leading-relaxed mb-8 text-sm">{item.desc}</p>
                        <div className="space-y-3">
                            {["Seasonal availability", "Expert nutritional tips", "Local cooking methods"].map((tip, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {tip}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <section className="bg-slate-900 rounded-[56px] p-16 text-center space-y-8 relative overflow-hidden group shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                <h2 className="text-3xl md:text-5xl font-black text-white font-headline leading-tight italic uppercase tracking-tighter">Get Personalized Diet Plan</h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto font-bold opacity-80 leading-relaxed">AI analyzes your local crop availability and suggests the best diet for your specific needs.</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                   <button className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all hover:bg-emerald-700">Get My Plan</button>
                   <Link to="/chat" className="bg-white/10 text-white border-2 border-white/20 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest backdrop-blur-md active:scale-95 transition-all hover:bg-white/10">Ask Nutrition AI</Link>
                </div>
            </section>
        </div>
    );
};

export default Nutrition;
