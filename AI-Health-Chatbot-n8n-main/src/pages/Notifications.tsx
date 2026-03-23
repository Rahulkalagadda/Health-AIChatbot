import React from "react";
import { toast } from "sonner";
import { useNotifications } from "../contexts/NotificationContext";

const Notifications: React.FC = () => {
  const { notifications, markAllAsRead } = useNotifications();

  return (
    <div className="p-6 max-w-4xl mx-auto w-full space-y-12 pb-24">
      {/* Header Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-100 backdrop-blur-md">
          <span className="material-symbols-outlined text-xs">notifications_active</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Priority Alerts</span>
        </div>
        <div className="flex justify-between items-end">
          <h1 className="text-5xl font-black font-headline leading-[0.9] tracking-tighter">Stay <span className="text-primary italic underline decoration-primary/20 decoration-8">Informed</span>.</h1>
          <button 
            onClick={() => {
              markAllAsRead();
              toast.success("All notifications marked as read");
            }}
            className="text-xs font-black uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 hover:bg-white transition-all rounded-xl shadow-sm active:scale-95"
          >
            Mark all read
          </button>
        </div>
      </section>

      {/* Notification List */}
      <section className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className="group bg-white p-6 rounded-[32px] shadow-lg border border-outline-variant/10 flex items-center gap-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer active:scale-[0.98]"
          >
            <div className={`w-16 h-16 rounded-[24px] ${notification.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{notification.icon}</span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-black font-headline tracking-tight">{notification.title}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{notification.time}</span>
              </div>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{notification.message}</p>
            </div>
            <div className={`w-2 h-2 rounded-full bg-primary transition-opacity ${notification.read ? 'opacity-0' : 'opacity-100'}`}></div>
          </div>
        ))}
      </section>

      {/* System Integrity Bento */}
      <section className="bg-surface-container-low rounded-[40px] p-10 border border-outline-variant/20 shadow-inner flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-black font-headline tracking-tighter uppercase italic opacity-80">Notification Settings</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed font-medium">Control what you hear from us. Choose specific health categories and alert priority levels for your district.</p>
          <div className="flex gap-4 pt-4">
             <button className="px-6 py-3 bg-white text-on-surface rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-lg transition-all border border-outline-variant/10">Configure</button>
             <button className="px-6 py-3 bg-secondary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:opacity-95 transition-all">Enable SMS</button>
          </div>
        </div>
        <div className="w-full md:w-64 aspect-square bg-gradient-to-br from-primary/10 to-blue-500/20 rounded-[40px] border border-white p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
           <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-primary">Live Connection</p>
           <p className="text-xs font-bold leading-tight">Your district health feed is active and monitoring updates.</p>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
