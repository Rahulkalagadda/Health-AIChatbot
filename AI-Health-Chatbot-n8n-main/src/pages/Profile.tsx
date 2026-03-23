import React from "react";
import { 
  User, 
  Settings, 
  ChevronRight, 
  LogOut, 
  ShieldCheck, 
  Users, 
  IdCard,
  Droplets,
  Weight,
  Ruler,
  Calendar,
  FileText,
  Syringe,
  Camera,
  Heart,
  TrendingUp,
  MapPin,
  Sparkles,
  Edit2,
  Globe
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { profileService, appointmentService, analysisService } from "../services/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = React.useState<any>(null);
  const [history, setHistory] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({});

  const loadProfileAndHistory = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      // Fetch profile
      const profileRes = await profileService.getProfile(user.id);
      if (profileRes?.status === "success") {
        setProfileData(profileRes.user.profile);
        setFormData({
          name: profileRes.user.name,
          ...profileRes.user.profile
        });
      }

      // Fetch appointments
      const appRes = await appointmentService.getAppointments(user.id);
      const appointments = (appRes?.appointments || []).map((a: any) => ({
        title: a.facility_name,
        desc: `${a.patient_name} • ${a.symptoms || 'Routine checkup'}`,
        time: new Date(a.appointment_date).toLocaleDateString(),
        icon: Syringe,
        color: "emerald",
        status: a.status,
        type: "appointment"
      }));

      // Fetch reports
      let reports: any[] = [];
      try {
        const reportRes = await analysisService.getReports(user.id);
        reports = (reportRes?.reports || []).map((r: any) => ({
          title: "Medical Report",
          desc: r.summary,
          time: new Date(r.created_at).toLocaleDateString(),
          icon: FileText,
          color: "blue",
          status: "Analyzed",
          type: "report"
        }));
      } catch (e) {
        console.warn("Could not fetch reports history", e);
      }

      // Combine and sort by date
      const combined = [...appointments, ...reports].sort((a, b) => 
        new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      
      setHistory(combined);
    } catch (err) {
      console.error("Profile load err", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    document.title = "Your Health Profile | SevaSetu AI";
    loadProfileAndHistory();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    try {
      await profileService.updateProfile(user.id, formData);
      toast.success("Profile updated successfully!");
      setIsEditOpen(false);
      loadProfileAndHistory();
    } catch (err) {
      console.error("Update error", err);
    }
  };

  const defaultStats = [
    { label: "Blood Group", val: profileData?.blood_group || "O+", icon: Droplets, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Weight", val: profileData?.weight || "68 kg", icon: Weight, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Height", val: profileData?.height || "172 cm", icon: Ruler, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Age", val: profileData?.age || "42 Yrs", icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-50" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-12 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-12 pb-32 bg-[#F8FAFC]">
      {/* Premium Profile Header */}
      <section className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-900 p-8 md:p-14 text-white shadow-2xl shadow-blue-200 group">
        <div className="absolute -right-20 -top-20 bg-white/10 w-80 h-80 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="absolute -left-10 bottom-0 bg-blue-400/20 w-64 h-64 rounded-full blur-[80px] group-hover:translate-x-10 transition-transform duration-1000"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-center md:text-left">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[48px] border-[6px] border-white/20 p-1.5 overflow-hidden shadow-2xl group-hover:rotate-3 transition-transform duration-500">
              <div className="w-full h-full rounded-[40px] overflow-hidden bg-white/10 backdrop-blur-md">
                <img src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white text-blue-700 p-3.5 rounded-2xl shadow-xl active:scale-90 transition-all hover:bg-blue-50">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified Citizen
                  </span>
                </div>
                <div className="bg-indigo-500/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 text-blue-100">
                    <MapPin className="w-3 h-3" />
                    {profileData?.district || user?.district || "Pune, MH"}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter leading-tight">{formData.name || user?.name || "Ramesh Kumar"}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100/70 font-bold uppercase tracking-widest text-[11px]">
                 <IdCard className="w-3.5 h-3.5" />
                 Rural Health ID: #{user?.id || "2931-4820-1923"}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <button className="bg-white text-indigo-700 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-900/20 active:scale-95 transition-all hover:bg-slate-50 flex items-center gap-2">
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Profile
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-[32px] border-none shadow-2xl bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline tracking-tight text-slate-900">Update Seva Profile</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpdateProfile} className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                        <Input 
                          id="name" 
                          value={formData.name || ""} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blood_group" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Blood Group</Label>
                        <Input 
                          id="blood_group" 
                          placeholder="e.g. O+"
                          value={formData.blood_group || ""} 
                          onChange={(e) => setFormData({...formData, blood_group: e.target.value})}
                          className="rounded-xl border-slate-100 bg-slate-50 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age</Label>
                        <Input 
                          id="age" 
                          placeholder="e.g. 42 Yrs"
                          value={formData.age || ""} 
                          onChange={(e) => setFormData({...formData, age: e.target.value})}
                          className="rounded-xl border-slate-100 bg-slate-50 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weight</Label>
                        <Input 
                          id="weight" 
                          placeholder="e.g. 70 kg"
                          value={formData.weight || ""} 
                          onChange={(e) => setFormData({...formData, weight: e.target.value})}
                          className="rounded-xl border-slate-100 bg-slate-50 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Height</Label>
                        <Input 
                          id="height" 
                          placeholder="e.g. 175 cm"
                          value={formData.height || ""} 
                          onChange={(e) => setFormData({...formData, height: e.target.value})}
                          className="rounded-xl border-slate-100 bg-slate-50 h-12"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-widest text-slate-400">About (Bio)</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Tell us a bit about yourself..."
                          value={formData.bio || ""} 
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          className="rounded-xl border-slate-100 bg-slate-50 min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-7 font-black uppercase tracking-widest shadow-xl shadow-indigo-200 transition-all active:scale-[0.98]">
                        Save Health Profile
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <button 
                onClick={() => {
                  const el = document.getElementById('timeline');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  toast.success("Navigated to your clinical history.");
                }}
                className="bg-indigo-500/40 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/20 active:scale-95 transition-all hover:bg-indigo-500/60 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                History
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Health Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {defaultStats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4 group hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all">
            <div className={`${stat.bg} ${stat.color} p-5 rounded-3xl shadow-inner group-hover:scale-110 transition-transform duration-500`}>
              <stat.icon className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
               <p className="text-2xl font-black font-headline tracking-tighter text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Content Areas */}
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-8">
            <div id="timeline" className="flex items-center justify-between px-2">
              <h2 className="text-3xl font-black font-headline tracking-tight text-slate-900 group flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-600 rounded-full"></div>
                Medical Timeline
              </h2>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All Records</button>
            </div>
            
            <div className="space-y-6">
              {history.length > 0 ? history.map((item, i) => (
                <div key={i} className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 cursor-pointer overflow-hidden relative">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-${item.color}-50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className={`w-16 h-16 rounded-3xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-xl tracking-tight text-slate-800">{item.title}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-${item.color}-50 text-${item.color}-600 border border-${item.color}-100`}>
                           {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-semibold">{item.desc}</p>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5 mt-2">
                         <Calendar className="w-3 h-3" />
                         {item.time}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold">No medical records found yet.</p>
                  <p className="text-xs text-slate-400">Sync your health data or upload a report to get started.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Settings Hub */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
               <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                  <Settings className="w-5 h-5" />
               </div>
               <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">Account Control</h3>
            </div>
            
            <div className="p-4 space-y-2">
              {[
                { label: "Manage Aadhaar", icon: IdCard, color: "text-slate-600" },
                { label: "Family Profiles", icon: Users, color: "text-slate-600" },
                { label: "Privacy & Data", icon: ShieldCheck, color: "text-slate-600" },
                { label: "Vitals History", icon: TrendingUp, color: "text-slate-600" },
                { label: "Health Wallet", icon: Heart, color: "text-indigo-600 font-black" },
                { label: "Logout", icon: LogOut, color: "text-rose-600", divider: true }
              ].map((item, i) => (
                <div key={i}>
                  {item.divider && <div className="h-px bg-slate-100 my-4 mx-4"></div>}
                  <button 
                    onClick={() => {
                      if (item.label === "Logout") {
                        logout();
                      } else {
                        toast.info(`${item.label} feature is coming soon to Seva Hub.`);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-5 rounded-3xl hover:bg-slate-50 transition-all group ${item.color}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-2xl bg-transparent group-hover:bg-white transition-all shadow-none group-hover:shadow-sm">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-black text-sm uppercase tracking-tight">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Support Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-[40px] border border-blue-100 relative overflow-hidden group">
             <div className="absolute right-0 bottom-0 opacity-10 grayscale group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Heart className="w-40 h-40 text-blue-800" />
             </div>
             <div className="relative z-10 space-y-4">
                <h4 className="font-black text-lg text-slate-800 tracking-tight">Need Help?</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">Our clinical support team is available 24/7 for regular checkups and health guidance.</p>
                <button className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/10 active:scale-[0.98] transition-all hover:bg-blue-600 hover:text-white">
                  Connect Now
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
