'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, LayoutGrid, Trash2, Pencil, X, Check } from 'lucide-react';
import axiosClient from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useCategories } from '@/hooks/use-categories';

export default function AddCategoryClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useCategories();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error('اسم التصنيف مطلوب');
      return;
    }
    setLoading(true);
    const loadingToast = toast.loading('جاري إنشاء التصنيف...');
    try {
      await axiosClient.post('/api/categories', form);
      toast.success('تم إنشاء التصنيف بنجاح', { id: loadingToast });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setForm({ name: '', description: '' });
    } catch {
      toast.error('حدث خطأ أثناء الإنشاء', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editForm.name) {
      toast.error('اسم التصنيف مطلوب');
      return;
    }
    const loadingToast = toast.loading('جاري التحديث...');
    try {
      await axiosClient.put(`/api/categories/${id}`, editForm);
      toast.success('تم التحديث بنجاح', { id: loadingToast });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setEditingId(null);
    } catch {
      toast.error('حدث خطأ أثناء التحديث', { id: loadingToast });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا التصنيف؟')) return;
    setDeletingId(id);
    try {
      await axiosClient.delete(`/api/categories/${id}`);
      toast.success('تم الحذف بنجاح');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (cat: { id: number; name: string; description?: string | null }) => {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, description: cat.description || '' });
  };

  return (
    <div className="p-4 md:p-6 text-right" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-card-bg transition-colors shrink-0">
          <ArrowRight className="w-5 h-5 text-t2" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-t1">إضافة تصنيف</h1>
          <p className="text-t3 text-xs md:text-sm mt-1">إنشاء وتعديل وحذف التصنيفات</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8 space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-bold text-t1">اسم التصنيف *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: تطوير ويب"
              required
              className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-t1">الوصف (اختياري)</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="وصف مختصر للتصنيف..."
              className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'إنشاء التصنيف'}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8"
        >
          <h2 className="text-base md:text-lg font-bold text-t1 mb-4">التصنيفات الحالية</h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-t4" />
            </div>
          ) : !categories || categories.length === 0 ? (
            <p className="text-t3 text-sm text-center py-8">لا توجد تصنيفات بعد</p>
          ) : (
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card-bg border border-card-border hover:border-amber-500/10 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <LayoutGrid size={14} />
                  </div>

                  {editingId === cat.id ? (
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-input-bg border border-card-border text-t1 text-sm outline-none focus:border-amber-500/40 transition-colors"
                        autoFocus
                      />
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="الوصف (اختياري)"
                        className="w-full px-3 py-2 rounded-lg bg-input-bg border border-card-border text-t1 text-xs placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleUpdate(cat.id)} className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                          <Check size={14} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-card-bg text-t3 hover:bg-card-bg transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-t1 truncate">{cat.name}</p>
                        {cat.description && (
                          <p className="text-xs text-t3 truncate">{cat.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => startEdit(cat)}
                          className="p-1.5 rounded-lg hover:bg-card-bg text-t3 hover:text-amber-400 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          disabled={deletingId === cat.id}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-t3 hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          {deletingId === cat.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
