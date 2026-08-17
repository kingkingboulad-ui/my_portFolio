'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, Loader2 } from 'lucide-react';
import axiosClient from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useCategories } from '@/hooks/use-categories';

export default function AddProjectClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    category: '',
    live_demo_url: '',
    github_url: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error('عنوان المشروع مطلوب');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('جاري إنشاء المشروع...');

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      if (form.category) formData.append('category', form.category);
      if (form.live_demo_url) formData.append('live_demo_url', form.live_demo_url);
      if (form.github_url) formData.append('github_url', form.github_url);
      if (form.description) formData.append('description', form.description);
      if (imageFile) formData.append('image', imageFile);

      await axiosClient.post('/api/project', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('تم إنشاء المشروع بنجاح', { id: loadingToast });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      router.push('/admin/project');
    } catch {
      toast.error('حدث خطأ أثناء الإنشاء', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 text-right" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-card-bg transition-colors shrink-0">
          <ArrowRight className="w-5 h-5 text-t2" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-t1">إضافة مشروع جديد</h1>
          <p className="text-t3 text-xs md:text-sm mt-1">أضف مشروعك الجديد إلى المعرض</p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full bg-card-bg rounded-2xl border border-card-border p-5 md:p-8 space-y-5"
      >
        <div className="space-y-2">
          <label className="text-sm font-bold text-t1">عنوان المشروع *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="اسم المشروع"
            required
            className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-t1">التصنيف</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 outline-none focus:border-amber-500/40 transition-colors"
            >
              <option value="" className="bg-surface">اختر التصنيف</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.name} className="bg-surface">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-t1">رابط المعاينة الحية</label>
            <input
              type="url"
              value={form.live_demo_url}
              onChange={(e) => setForm({ ...form, live_demo_url: e.target.value })}
              placeholder="https://example.com"
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-t1">رابط GitHub</label>
          <input
            type="url"
            value={form.github_url}
            onChange={(e) => setForm({ ...form, github_url: e.target.value })}
            placeholder="https://github.com/username/repo"
            dir="ltr"
            className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-t1">الوصف</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="وصف مختصر للمشروع..."
            className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-t1">صورة المشروع</label>
          <label className="flex flex-col items-center justify-center w-full h-40 md:h-56 border-2 border-dashed border-card-border rounded-2xl cursor-pointer hover:border-amber-500/30 transition-colors">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-t4 mx-auto mb-2" />
                <p className="text-sm text-t3">اضغط لاختيار صورة</p>
                <p className="text-xs text-t4 mt-1">PNG, JPG, WebP (حد أقصى 5MB)</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'إنشاء المشروع'
          )}
        </button>
      </motion.form>
    </div>
  );
}
