import React, { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { appointmentService } from "../services/api";
import { 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  Phone, 
  User, 
  Stethoscope, 
  ArrowRight,
  ShieldAlert,
  Clock,
  Briefcase,
  AlertTriangle,
  Loader2,
  Sparkles,
  Search
} from "lucide-react";

const Appointment: React.FC = () => {
    const { user } = useAuth();
    const { addNotification } = useNotifications();
    const [date, setDate] = useState("");
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    React.useEffect(() => {
        document.title = "Schedule a Visit | SevaSetu AI";
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !user?.id) {
            toast.error("Authentication or date selection error.");
            return;
        }

        setIsLoading(true);
        try {
            await appointmentService.bookAppointment(user.id, {
                patientName: name,
                phone,
                specialty,
                date,
                symptoms
            });
            
            // Add dynamic notification
            addNotification({
              title: "Appointment Booked",
              message: `Your visit for ${name} ({specialty}) is confirmed for ${date}.`,
              type: "success",
              icon: "event_available",
              color: "bg-emerald-600 text-white"
            });

            setIsSuccess(true);
            toast.success("Appointment booked successfully!");
        } catch (error) {
            // Error handled in service toast
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="p-6 md:p-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center min-h-[70vh] space-y-12 animate-in fade-in duration-700">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500 relative z-10">
                      <CheckCircle2 className="w-16 h-16 stroke-[2.5]" />
                  </div>
                </div>
                
                <div className="text-center space-y-4 max-w-lg">
                    <h2 className="text-5xl md:text-6xl font-black font-headline tracking-tighter leading-none text-slate-800 italic uppercase">Confirmed!</h2>
                    <p className="text-slate-500 font-bold text-lg leading-relaxed">
                      Your visit has been secured in the hospital system. A confirmation SMS has been dispatched to your mobile.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                  <button
                      onClick={() => setIsSuccess(false)}
                      className="flex-1 px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all hover:bg-slate-800"
                  >
                      Book Another
                  </button>
                  <Link to="/notifications" className="flex-1 px-10 py-5 bg-white text-slate-900 border-4 border-slate-100 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all text-center">
                      View Updates
                  </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-14 max-w-7xl mx-auto w-full space-y-16 pb-32">
            {/* Premium Header */}
            <section className="space-y-8 animate-in slide-in-from-top-10 duration-1000">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/80 backdrop-blur-md text-blue-600 rounded-full border border-blue-50 shadow-sm">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">SevaSetu Booking v2.0</span>
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-[85px] font-black font-headline leading-[0.85] tracking-tighter text-slate-800 uppercase italic">
                    Schedule a <br/>
                    <span className="text-blue-600 underline decoration-blue-100 decoration-[12px] underline-offset-8">Visit</span>.
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-bold leading-relaxed">
                    Secure your time with India's leading medical specialists. High-priority scheduling for rural communities.
                  </p>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Main Form Area */}
              <div className="lg:col-span-8">
                <section className="bg-white rounded-[64px] p-10 md:p-16 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110"></div>
                    
                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                  <User className="w-3.5 h-3.5" /> Full Patient Name
                                </label>
                                <input 
                                    className="w-full px-8 py-5 bg-slate-50 rounded-[28px] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all text-base font-bold shadow-inner outline-none placeholder:text-slate-300" 
                                    placeholder="e.g. Ramesh Kumar" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5" /> Contact Number
                                </label>
                                <input 
                                    className="w-full px-8 py-5 bg-slate-50 rounded-[28px] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all text-base font-bold shadow-inner outline-none placeholder:text-slate-300" 
                                    type="tel" 
                                    placeholder="+91 00000 00000" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <Stethoscope className="w-3.5 h-3.5" /> Medical Department
                              </label>
                              <div className="relative group">
                                <select 
                                  className="w-full px-8 py-5 bg-slate-50 rounded-[28px] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all text-base font-bold shadow-inner outline-none cursor-pointer appearance-none" 
                                  required
                                  value={specialty}
                                  onChange={(e) => setSpecialty(e.target.value)}
                                >
                                    <option value="">Select Specialty</option>
                                    <option value="General Consultation">General Consultation</option>
                                    <option value="Pediatrics (Children)">Pediatrics (Children)</option>
                                    <option value="Cardiology (Heart)">Cardiology (Heart)</option>
                                    <option value="Orthopedics (Bones)">Orthopedics (Bones)</option>
                                    <option value="Gynecology">Gynecology</option>
                                </select>
                                <ChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 group-focus-within:rotate-[-90deg] transition-transform pointer-events-none" />
                              </div>
                          </div>

                          <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" /> Appointment Date
                              </label>
                              <div className="relative">
                                <input 
                                    type="date"
                                    className="w-full px-8 py-5 bg-slate-50 rounded-[28px] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all text-base font-bold shadow-inner outline-none cursor-pointer appearance-none" 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required 
                                    min={new Date().toISOString().split('T')[0]}
                                />
                              </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                              <ShieldAlert className="w-3.5 h-3.5" /> Primary Symptoms (Optional)
                            </label>
                                <textarea 
                                    className="w-full px-8 py-6 bg-slate-50 rounded-[32px] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all text-base font-bold shadow-inner outline-none resize-none h-40 placeholder:text-slate-300" 
                                    placeholder="Briefly describe what you're feeling..." 
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-7 bg-slate-900 text-white rounded-[32px] font-black text-xl uppercase tracking-[0.2em] shadow-[0_25px_50px_-12px_rgba(15,23,42,0.3)] hover:bg-blue-600 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                            ) : (
                                <>
                                    Confirm Visit
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </section>
              </div>

              {/* Sidebar Info Area */}
              <div className="lg:col-span-4 space-y-10 animate-in slide-in-from-right-10 duration-1000 delay-200">
                 <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                       <Clock className="w-6 h-6 text-blue-600" />
                       Timing Info
                    </h3>
                    <div className="space-y-6">
                       {[
                         { day: "Mon - Fri", time: "09:00 AM - 08:00 PM" },
                         { day: "Saturday", time: "10:00 AM - 04:00 PM" },
                         { day: "Sunday", time: "CLOSED / EMERGENCY ONLY" }
                       ].map((item, i) => (
                         <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.day}</span>
                            <span className="text-xs font-bold text-slate-800">{item.time}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[48px] text-white shadow-2xl space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 opacity-10 scale-150 rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-1000">
                       <Sparkles className="w-40 h-40" />
                    </div>
                    <div className="relative z-10 space-y-6">
                       <h3 className="text-2xl font-black tracking-tight leading-none italic uppercase">Priority Care</h3>
                       <p className="text-blue-100 font-bold text-sm leading-relaxed">
                         Registered Aadhaar users get automatic priority in the queue. No manual paperwork required.
                       </p>
                       <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                          <ShieldAlert className="w-4 h-4" />
                          Learn More
                       </button>
                    </div>
                 </div>

                 {/* Emergency Note */}
                 <div className="bg-rose-50 rounded-[40px] p-10 border border-rose-100 space-y-6">
                    <div className="flex items-center gap-4 text-rose-600">
                       <AlertTriangle className="w-8 h-8 animate-pulse" />
                       <span className="text-xl font-black uppercase tracking-tight italic">Emergency?</span>
                    </div>
                    <p className="text-xs text-rose-800 font-bold leading-relaxed opacity-80">
                      If you have chest pain, heavy bleeding, or difficulty breathing, call **108** immediately. Do not use this booking system for urgent life-threatening crises.
                    </p>
                    <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-rose-200 active:scale-95 transition-all">
                       Dial 108 Now
                    </button>
                 </div>
              </div>
            </div>
        </div>
    );
};

export default Appointment;
