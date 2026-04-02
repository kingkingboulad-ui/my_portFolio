"use client";

import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, UserPlus, Loader2 } from 'lucide-react';
import { io } from "socket.io-client";

interface Notification {
  id: string | number;
  title: string;
  message: string;
  time: string;
  type: string;
  isRead: boolean;
}


export default function NotificationsPage() {
  // 1. مصفوفة فارغة تماماً في البداية
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.emit("join_admin");

    socket.on("admin_notification", (data) => {
   
      
      const newNotification = {
        id: data.id || Date.now(),
        title: data.title || "تنبيه جديد",
        message: data.message || (data.name ? `رسالة جديدة من ${data.name}` : "وصلت رسالة جديدة"),
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        type: data.type || "info",
        isRead: false,
        name: data.name,
        email: data.email
      };

      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.off("admin_notification");
      socket.disconnect();
    };
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteOne = (id: string | number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="text-red-500" size={20} />;
      case 'user': return <UserPlus className="text-blue-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 w-full flex justify-center" dir="rtl">
      <div className="w-full px-4 md:px-10 max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className={`${isConnected ? 'text-indigo-600' : 'text-slate-400'} w-10 h-10`} />
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white ring-2 ring-white">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">مركز الإشعارات</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-slate-500 font-medium">
                  {isConnected ? 'متصل ومستعد لاستقبال البيانات' : 'جاري الاتصال بالسيرفر...'}
                </span>
              </div>
            </div>
          </div>
          
          {notifications.length > 0 && (
            <button 
              onClick={markAllRead}
              className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-indigo-600 px-6 py-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              <CheckCheck size={18} />
              تحديد الكل كمقروء
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden min-h-[400px] flex flex-col">
          {notifications.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`group p-6 md:p-8 flex items-start gap-6 transition-all hover:bg-slate-50/80 ${!notification.isRead ? 'bg-indigo-50/30' : ''}`}
                >
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`text-lg font-bold ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-bold tracking-tighter uppercase">{notification.time}</span>
                    </div>
                    <p className="text-slate-500 text-base leading-relaxed">
                      {notification.message}
                    </p>
                  </div>

                  <button 
                    onClick={() => deleteOne(notification.id)}
                    className="md:opacity-0 md:group-hover:opacity-100 p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all self-center"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* حالة انتظار البيانات */
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              {isConnected ? (
                <>
                  <div className="bg-indigo-50 p-6 rounded-full mb-6">
                    <Bell className="text-indigo-200" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد إشعارات حتى الآن</h3>
                  <p className="text-slate-400 max-w-xs mx-auto">عندما يرسل النظام أو المستخدمون أي تنبيهات، ستظهر هنا فوراً.</p>
                </>
              ) : (
                <>
                  <Loader2 className="text-indigo-600 animate-spin mb-4" size={40} />
                  <p className="text-slate-500 font-medium tracking-wide">جاري مزامنة البيانات مع السيرفر...</p>
                </>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 text-sm mt-10">
          تعتمد هذه الصفحة على تحديثات حية من النظام.
        </p>
      </div>
    </main>
  );
}