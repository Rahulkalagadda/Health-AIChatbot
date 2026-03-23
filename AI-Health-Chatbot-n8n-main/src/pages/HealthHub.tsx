import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { 
  ShieldCheck, 
  Syringe, 
  Droplets, 
  Brain, 
  Apple, 
  Baby, 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  Map, 
  PhoneCall, 
  Download,
  Search,
  Sparkles,
  HeartPulse,
  Activity
} from "lucide-react";

const HealthHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    document.title = "Seva Health Knowledge Hub | Wellness Intelligence";
  }, []);

  const healthCategories = [
    {
      id: "preventive-care",
      title: "Preventive Care",
      description: "Essential healthcare measures to maintain good health and prevent diseases.",
      gradient: "from-emerald-500 to-teal-700",
      icon: ShieldCheck,
      link: "/health-content/preventive-care",
      tag: "Essentials"
    },
    {
      id: "vaccination-schedules",
      title: "Vaccination",
      description: "Complete immunization guides for children and adults recommended by authorities.",
      gradient: "from-blue-500 to-indigo-700",
      icon: Syringe,
      link: "/health-content/vaccination-schedules",
      tag: "Immunization"
    },
    {
      id: "hygiene-tips",
      title: "Hygiene Tips",
      description: "Daily hygiene practices to prevent infections and maintain personal health.",
      gradient: "from-purple-500 to-fuchsia-700",
      icon: Droplets,
      link: "/health-content/hygiene-tips",
      tag: "Sanitation"
    },
    {
      id: "mental-wellness",
      title: "Mental Wellness",
      description: "Manage stress, anxiety and mental health with simple local techniques.",
      gradient: "from-orange-400 to-rose-600",
      icon: Brain,
      link: "/health-content/mental-wellness",
      tag: "Mindfulness"
    },
    {
      id: "nutrition-diet",
      title: "Nutrition & Diet",
      description: "Localized nutrition guides for immunity and strength using local produce.",
      gradient: "from-amber-400 to-orange-600",
      icon: Apple,
      link: "/health-content/nutrition",
      tag: "Dietary"
    },
    {
      id: "maternal-care",
      title: "Maternal Care",
      description: "Comprehensive guidance for expecting mothers and newborn infant care.",
      gradient: "from-pink-500 to-rose-700",
      icon: Baby,
      link: "/health-content/maternal-care",
      tag: "Family Care"
    }
  ];

  const filteredCategories = healthCategories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-20 pb-32">
      {/* Premium Hero Section */}
      <section className="relative rounded-[64px] overflow-hidden bg-slate-900 min-h-[450px] flex items-center p-10 md:p-20 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110"></div>
        <img 
          src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-[3s]" 
          alt="Health Hub"
        />
        
        <div className="relative z-20 space-y-10 max-w-3xl animate-in slide-in-from-left-10 duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Knowledge Repository v2.0</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-[80px] font-black font-headline leading-[0.85] tracking-tighter uppercase italic text-white flex flex-col">
              Empower your 
              <span className="text-blue-400 underline decoration-white/10 decoration-[12px] underline-offset-8">Wellness</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 font-bold leading-relaxed max-w-2xl">
              Your comprehensive guide to better living. Explore localized medical guidance, preventive measures, and essential health resources curated for Bharat.
            </p>
          </div>

          <div className="relative max-w-xl group">
             <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-blue-300 group-focus-within:text-white transition-colors" />
             </div>
             <input 
                type="text"
                placeholder="Search health topics, guides, or resources..."
                className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-[32px] py-6 pl-16 pr-8 text-lg font-bold text-white placeholder:text-blue-200/50 outline-none focus:bg-white/20 focus:border-blue-400 transition-all shadow-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <h2 className="text-4xl font-black font-headline tracking-tighter uppercase italic text-slate-800">Explore <span className="text-blue-600">Categories</span></h2>
            <p className="text-slate-500 font-bold">Deep dive into specific health domains with expert-verified content.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
            View All Categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCategories.map((category, index) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="group flex flex-col bg-white rounded-[56px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-3 border border-slate-100"
            >
              <div className={`h-64 bg-gradient-to-br ${category.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[32px] flex items-center justify-center border border-white/30 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700 shadow-2xl">
                   <category.icon className="w-12 h-12 text-white stroke-[2.5]" />
                </div>
                <span className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-widest text-white/60 bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                   {category.tag}
                </span>
              </div>
              <div className="p-10 space-y-6 flex-1 flex flex-col">
                <h3 className="text-3xl font-black font-headline tracking-tighter group-hover:text-blue-600 transition-colors uppercase italic text-slate-900">
                  {category.title}
                </h3>
                <p className="text-slate-500 font-bold leading-relaxed flex-1">
                  {category.description}
                </p>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> 12+ Articles
                  </span>
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner group-hover:shadow-lg">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Additional Resources - Premium Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black font-headline tracking-tighter uppercase italic text-slate-800">Additional <span className="text-rose-600">Resources</span></h2>
          <p className="text-slate-400 font-bold max-w-xl mx-auto italic">Essential tools and directories to support your health journey across Bharat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Health Calendar", 
              desc: "Awareness days and local vaccination camps.", 
              icon: Calendar, 
              color: "blue",
              link: "/health-calendar"
            },
            { 
              title: "Health Directory", 
              desc: "Find hospitals and specialists near you.", 
              icon: Map, 
              color: "emerald",
              link: "/health-directory"
            },
            { 
              title: "Helpline List", 
              desc: "Quick access to 108, 102, and women help.", 
              icon: PhoneCall, 
              color: "rose",
              link: "/helplines"
            },
            { 
              title: "PDF Library", 
              desc: "Downloadable health guides in local languages.", 
              icon: Download, 
              color: "indigo",
              link: "/pdf-library"
            }
          ].map((resource, i) => (
            <Link key={i} to={resource.link} className="group bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className={`w-16 h-16 rounded-2xl bg-${resource.color}-50 text-${resource.color}-600 flex items-center justify-center mb-8 border border-${resource.color}-100 group-hover:scale-110 hover:rotate-3 transition-all relative z-10`}>
                <resource.icon className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-2xl font-black font-headline tracking-tight text-slate-800 group-hover:text-white uppercase italic">{resource.title}</h4>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 font-bold leading-relaxed">{resource.desc}</p>
                <div className={`pt-2 text-${resource.color}-600 group-hover:text-blue-400 font-black text-[11px] uppercase tracking-widest flex items-center gap-2`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vital Stats/Pulse Section */}
      <section className="bg-slate-50 rounded-[64px] p-12 md:p-20 border border-slate-100 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-[80px] -mr-40 -mt-40 opacity-50"></div>
        <div className="flex-1 space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white rounded-full border border-blue-50 shadow-sm text-blue-600">
             <HeartPulse className="w-5 h-5 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest">Live District Pulse</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-slate-800 uppercase italic leading-[0.9]">
            Stay Ahead of <br/>
            <span className="text-blue-600 underline decoration-blue-100 decoration-[12px] underline-offset-8">Local Trends</span>
          </h2>
          <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-xl">
             Every district has unique health challenges. We track local disease clusters and seasonal outbreaks to keep your family prepared.
          </p>
          <div className="flex gap-10">
             <div className="space-y-1">
                <p className="text-4xl font-black text-slate-800 tracking-tighter">1,240</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Villages Monitored</p>
             </div>
             <div className="space-y-1 border-l border-slate-200 pl-10">
                <p className="text-4xl font-black text-emerald-600 tracking-tighter">98%</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reach Accuracy</p>
             </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 aspect-square bg-white rounded-[56px] shadow-2xl p-12 border border-blue-50 flex flex-col items-center justify-center text-center space-y-8 group hover:rotate-2 transition-transform duration-500 relative overflow-hidden">
           <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="w-24 h-24 rounded-[32px] bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-200 group-hover:scale-110 transition-transform relative z-10">
              <Activity className="w-12 h-12 stroke-[3]" />
           </div>
           <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 relative z-10">Community Hub</p>
           <h3 className="text-2xl font-black text-slate-800 tracking-tighter leading-tight italic uppercase relative z-10">Join the <br/>Health Guard</h3>
           <p className="text-sm text-slate-400 font-bold relative z-10">Contribute anonymous data to protect your village from seasonal fever outbreaks.</p>
           <button onClick={() => toast.info("Your local alert will be processed anonymously.")} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all relative z-10 hover:bg-blue-600">Submit Local Alert</button>
        </div>
      </section>

      {/* Final Premium CTA */}
      <section className="max-w-5xl mx-auto">
         <div className="relative rounded-[64px] bg-gradient-to-br from-blue-600 to-indigo-800 p-16 md:p-24 text-center space-y-10 shadow-2xl shadow-blue-200 overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white font-headline leading-tight tracking-tighter uppercase italic">
              Still Have Health <br/>
              <span className="text-blue-200 underline decoration-white/20 decoration-[16px]">Questions</span>
            </h2>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-bold opacity-80 leading-relaxed">
              Our AI health assistant is trained on verified medical knowledge to provide personalized guidance for you and your family 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 relative z-10">
               <Link to="/chat" className="bg-white text-blue-700 px-12 py-6 rounded-[32px] font-black text-lg shadow-2xl active:scale-95 transition-all hover:bg-blue-50 flex items-center justify-center gap-3">
                  <Activity className="w-6 h-6" />
                  Ask Seva AI
               </Link>
               <button onClick={() => toast.success("Feature coming to your health locker.")} className="bg-blue-500/20 text-white border-2 border-white/20 px-12 py-6 rounded-[32px] font-black text-lg backdrop-blur-md active:scale-95 transition-all hover:bg-white/10 uppercase tracking-widest">
                  Save Guides
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default HealthHub;