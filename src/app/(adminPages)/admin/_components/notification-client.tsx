'use client';

import { motion } from 'framer-motion';
import { Bell, User, Mail } from 'lucide-react';
import { useSocket } from '@/hooks/use-socket';

export default function NotificationClient() {
  const { notifications, isConnected, clearNotifications } = useSocket();

  return (
    <div className="p-4 md:p-6 text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-t1">الإشعارات</h1>
          <p className="text-t3 text-xs md:text-sm mt-1">إشعارات الرسائل الجديدة من الزوار</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${
              isConnected ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            {isConnected ? 'متصل' : 'غير متصل'}
          </span>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-sm text-t3 hover:text-t1 transition-colors"
            >
              مسح الكل
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="p-4 rounded-2xl bg-card-bg mb-4">
            <Bell className="w-10 h-10 text-t4" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-t1 mb-1">لا توجد إشعارات جديدة</h3>
          <p className="text-t3 text-xs md:text-sm">ستظهر الإشعارات هنا عند وصول رسائل جديدة</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif, index) => (
            <motion.div
              key={`${notif.id}-${index}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card-bg p-4 md:p-5 rounded-2xl border border-card-border hover:border-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <User size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-t1 text-sm">{notif.title}</h3>
                  <p className="text-t2 text-sm mt-1 line-clamp-2">{notif.message}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-t3 truncate">
                      <Mail size={12} className="shrink-0" />
                      <span className="truncate">{notif.email}</span>
                    </span>
                    <span className="text-xs text-t4 shrink-0">
                      {notif.timestamp.toLocaleTimeString('ar-EG')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
