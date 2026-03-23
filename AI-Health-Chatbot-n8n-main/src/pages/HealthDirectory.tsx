import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, MapPin, Search, Phone, ArrowLeft, Stethoscope, Hospital, Ambulance, HeartPulse, Sparkles, Filter, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const HealthDirectory: React.FC = () => {
    const [filter, setFilter] = useState("all");
    const [district, setDistrict] = useState("");
    const [stateName, setStateName] = useState("");
    const [facilities, setFacilities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchFacilities = async () => {
        if (!district || !stateName) return;
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/directory?district=${district}&state=${stateName}`);
            if (response.ok) {
                const data = await response.json();
                setFacilities(data);
                if (data.length === 0) {
                    toast.error(`No facilities found in ${district}, ${stateName}. Try another district.`);
                } else {
                    toast.success(`Found ${data.length} facilities in ${district}.`);
                }
            } else {
                toast.error("Failed to fetch directory data.");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Connection error. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacilities();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchFacilities();
    };

    return (
        <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-16">
            <Link to="/health-hub" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>

            <section className="bg-gradient-to-br from-indigo-900 to-blue-950 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl group flex flex-col md:flex-row items-center gap-12">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 space-y-8 flex-1">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <Map className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Live Service Directory</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase italic leading-none">
                        All-India <br/>
                        <span className="text-blue-400 underline decoration-white/10 decoration-[12px] underline-offset-8">Directory</span>.
                    </h1>
                    <p className="text-xl text-blue-100/70 font-bold leading-relaxed">Search for healthcare facilities in every city and small town across India. From Badlapur to Bangalore.</p>
                </div>
                
                <div className="w-full md:w-96 relative group h-[300px] rounded-[40px] overflow-hidden border border-white/20 shadow-2xl">
                    <img 
                      src="/health-directory-map.png" 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[5s]" 
                      alt="Map View"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8 text-center">
                        <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Expand Map</button>
                    </div>
                </div>
            </section>

            <section className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-100 pb-12">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto flex-1">
                        <div className="relative w-full md:w-64 group flex-1">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            <input 
                                value={district} 
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 py-6 pl-16 pr-8 rounded-[28px] font-bold text-base outline-none focus:bg-white focus:border-blue-500 transition-all shadow-inner" 
                                placeholder="Any City / Town (e.g. Badlapur)" 
                            />
                        </div>
                        <div className="relative w-full md:w-56 group">
                            <input 
                                value={stateName} 
                                onChange={(e) => setStateName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 py-6 px-10 rounded-[28px] font-bold text-base outline-none focus:bg-white focus:border-blue-500 transition-all shadow-inner" 
                                placeholder="State (e.g. Maharashtra)" 
                            />
                        </div>
                        <button type="submit" className="w-full sm:w-auto px-10 py-6 bg-slate-900 text-white rounded-[28px] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2">
                             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Search
                        </button>
                    </form>
                    
                    <div className="flex gap-4 overflow-x-auto no-scrollbar w-full md:w-auto pb-4 md:pb-0">
                        {[
                            { id: "all", label: "All Services" },
                            { id: "Hospital", label: "Hospitals" },
                            { id: "Doctors", label: "Doctors" },
                            { id: "Pharmacy", label: "Pharmacy" }
                        ].map(f => (
                            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${filter === f.id ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:text-blue-600'}`}>
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {loading ? (
                        Array.from({length: 4}).map((_, i) => (
                          <div key={i} className="animate-pulse bg-slate-100 h-96 rounded-[56px]"></div>
                        ))
                    ) : facilities.length === 0 ? (
                        <div className="col-span-1 md:col-span-2 py-20 bg-white rounded-[56px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[28px] flex items-center justify-center">
                                <Search className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">Start Your Search</h3>
                                <p className="text-slate-400 font-bold max-w-xs mx-auto">Enter a city and state above to find verified hospitals and clinics in your area.</p>
                            </div>
                        </div>
                    ) : (
                      facilities.filter(f => filter === "all" || f.type === filter).map((f, i) => (
                        <div key={i} className="group bg-white p-10 rounded-[56px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start gap-8">
                            <div className="flex justify-between w-full items-start">
                                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[28px] flex items-center justify-center border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                    {f.type === 'Hospital' ? <Hospital className="w-10 h-10" /> : <Stethoscope className="w-10 h-10" />}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border italic ${f.contact === 'N/A' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                    {f.contact === 'N/A' ? 'UNKNOWN STATUS' : 'OPEN NOW'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-3xl font-black font-headline tracking-tighter text-slate-800 uppercase italic leading-none line-clamp-2">{f.name}</h3>
                                <div className="flex items-center gap-6 text-slate-400">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><MapPin className="w-4 h-4 text-blue-500" /> {f.district}</div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest underline decoration-blue-100"><Sparkles className="w-4 h-4 text-amber-500" /> Verified Facility</div>
                                </div>
                                <p className="text-slate-500 font-bold text-sm leading-relaxed"><MapPin className="inline w-3 h-3 mr-1" /> {f.type} • {f.specialty}</p>
                            </div>
                            
                            <div className="pt-6 border-t border-slate-50 w-full flex flex-col sm:flex-row gap-4 mt-auto">
                                <a href={`tel:${f.contact === 'N/A' ? '' : f.contact}`} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" /> {f.contact === 'N/A' ? 'Call Registry' : f.contact}
                                </a>
                                <Link to={`/facility/${encodeURIComponent(f.name)}`} className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-blue-600 flex items-center justify-center gap-2">
                                    View Details <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                      ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default HealthDirectory;
