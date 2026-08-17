'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MailOpen, Trash2, Search, Loader2, User, Clock,
  MessageSquare, Eye, EyeOff, Bell,
} from 'lucide-react';
import axiosClient from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useContacts } from '@/hooks/use-contacts';
import { useSocket } from '@/hooks/use-socket';
import type { Contact } from '@/types';

export default function ContactsClient() {
  const queryClient = useQueryClient();
  const { data: contacts, isLoading, error } = useContacts();
  const { notifications, isConnected } = useSocket();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (notifications.length > 0) {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  }, [notifications, queryClient]);

  const filtered = contacts?.filter((c) => {
    const matchesSearch =
      c.name.includes(searchQuery) ||
      c.email.includes(searchQuery) ||
      c.subject?.includes(searchQuery) ||
      c.message.includes(searchQuery);
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = contacts?.filter((c) => c.status === 'unread').length || 0;

  const handleStatusChange = async (id: number, status: 'read' | 'unread') => {
    try {
      await axiosClient.patch(`/api/contacts/${id}/status`, { status });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch {
      toast.error('حدث خطأ');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    setDeletingId(id);
    try {
      await axiosClient.delete(`/api/contacts/${id}`);
      toast.success('تم الحذف');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      if (selectedContact?.id === id) setSelectedContact(null);
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    } finally {
      setDeletingId(null);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await axiosClient.patch(`/api/contacts/${id}/status`, { status: 'archived' });
      toast.success('تم الأرشفة');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      if (selectedContact?.id === id) setSelectedContact(null);
    } catch {
      toast.error('حدث خطأ');
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    return d.toLocaleDateString('ar-EG');
  };

  return (
    <div className="p-4 md:p-6 text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-t1">الرسائل</h1>
          <p className="text-t3 text-xs md:text-sm mt-1">إدارة رسائل الزوار والتواصل معهم</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            {isConnected ? 'متصل' : 'غير متصل'}
          </span>
          {unreadCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400">
              <Bell size={12} />
              {unreadCount} جديد
            </span>
          )}
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t4" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو البريد أو الموضوع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'الكل' },
            { key: 'unread', label: 'غير مقروءة' },
            { key: 'read', label: 'مقروءة' },
            { key: 'archived', label: 'مؤرشفة' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors shrink-0 ${
                filter === f.key
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-input-bg text-t3 border border-card-border hover:bg-card-bg'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400 text-sm mb-2">حدث خطأ أثناء تحميل الرسائل</p>
          <p className="text-t4 text-xs">{error.message}</p>
        </div>
      ) : !filtered || filtered.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare className="w-12 h-12 text-t4 mx-auto mb-3" />
          <p className="text-t3">لا توجد رسائل</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Contacts List */}
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {filtered.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => {
                  setSelectedContact(contact);
                  if (contact.status === 'unread') handleStatusChange(contact.id, 'read');
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedContact?.id === contact.id
                    ? 'bg-amber-500/10 border-amber-500/20'
                    : contact.status === 'unread'
                    ? 'bg-card-bg border-amber-500/10 hover:border-amber-500/20'
                    : 'bg-card-bg border-card-border hover:border-card-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${contact.status === 'unread' ? 'bg-amber-500/10 text-amber-400' : 'bg-card-bg text-t4'}`}>
                    <User size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-bold truncate ${contact.status === 'unread' ? 'text-t1' : 'text-t1'}`}>{contact.name}</p>
                      {contact.status === 'unread' && <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />}
                    </div>
                    <p className="text-xs text-t3 truncate">{contact.subject || contact.message.substring(0, 50)}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock size={10} className="text-t4 shrink-0" />
                      <span className="text-[10px] text-t4">{formatDate(contact.created_at)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selectedContact ? (
                <motion.div
                  key={selectedContact.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8 sticky top-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${selectedContact.status === 'unread' ? 'bg-amber-500/10 text-amber-400' : 'bg-card-bg text-t4'}`}>
                        <User size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-t1">{selectedContact.name}</h2>
                        <p className="text-xs text-t3" dir="ltr">{selectedContact.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleStatusChange(selectedContact.id, selectedContact.status === 'unread' ? 'read' : 'unread')}
                        className="p-2 rounded-lg hover:bg-card-bg text-t3 hover:text-amber-400 transition-colors"
                        title={selectedContact.status === 'unread' ? 'تعليم كمقروء' : 'تعليم كغير مقروء'}
                      >
                        {selectedContact.status === 'unread' ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button
                        onClick={() => handleArchive(selectedContact.id)}
                        className="p-2 rounded-lg hover:bg-card-bg text-t3 hover:text-yellow-400 transition-colors"
                        title="أرشفة"
                      >
                        <MailOpen size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(selectedContact.id)}
                        disabled={deletingId === selectedContact.id}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-t3 hover:text-red-400 transition-colors disabled:opacity-50"
                        title="حذف"
                      >
                        {deletingId === selectedContact.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-t3 mb-4 pb-4 border-b border-card-border">
                    <span className="flex items-center gap-1">
                      <Mail size={12} />
                      {selectedContact.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(selectedContact.created_at).toLocaleString('ar-EG')}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      selectedContact.status === 'unread' ? 'bg-amber-500/10 text-amber-400' :
                      selectedContact.status === 'read' ? 'bg-green-500/10 text-green-400' :
                      'bg-gray-500/10 text-t3'
                    }`}>
                      {selectedContact.status === 'unread' ? 'غير مقروء' : selectedContact.status === 'read' ? 'مقروء' : 'مؤرشف'}
                    </span>
                  </div>

                  {selectedContact.subject && (
                    <h3 className="text-sm font-bold text-t1 mb-3">{selectedContact.subject}</h3>
                  )}

                  <div className="bg-card-bg rounded-xl p-4 border border-card-border">
                    <p className="text-sm text-t1 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={`mailto:${selectedContact.email}?subject=رد على: ${selectedContact.subject || 'رسالتك'}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-sm transition-all active:scale-[0.98]"
                    >
                      <Mail size={14} />
                      رد عبر البريد
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card-bg rounded-2xl border border-card-border p-12 flex flex-col items-center justify-center min-h-[300px]"
                >
                  <Mail className="w-12 h-12 text-t4 mb-3" />
                  <p className="text-t3 text-sm">اختر رسالة لعرض تفاصيلها</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
