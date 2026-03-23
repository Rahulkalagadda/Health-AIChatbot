import React, { createContext, useContext, useState } from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "alert" | "info" | "announcement" | "success";
  time: string;
  icon: string;
  color: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Heatwave Warning",
      message: "Temperature in Pune expected to cross 45°C. Stay hydrated and indoors 11 AM - 4 PM.",
      type: "alert",
      time: "2h ago",
      icon: "warning",
      color: "bg-red-500 text-white",
      read: false
    },
    {
      id: 2,
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Mehta for General Medicine is confirmed for Tomorrow at 10:00 AM.",
      type: "info",
      time: "5h ago",
      icon: "event_available",
      color: "bg-blue-600 text-white",
      read: false
    },
    {
      id: 3,
      title: "Polio Drive Tomorrow",
      message: "Free polio vaccination drive in your village tomorrow at the local primary school.",
      type: "announcement",
      time: "1d ago",
      icon: "vaccines",
      color: "bg-emerald-600 text-white",
      read: true
    }
  ]);

  const addNotification = (notif: Omit<Notification, "id" | "time" | "read">) => {
    const newNotif: Notification = {
      ...notif,
      id: Date.now(),
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
