"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  Plus,
  Upload,
  Link as LinkIcon,
  Layout,
  Type,
  FileText,
  X,
  Loader2
} from 'lucide-react'

interface Category {
  id: number;
  name: string;
}

function AddProjectPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // States للحقول
  const [title, setTitle] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // معالجة تغيير الصورة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // تخزين الملف الفعلي للإرسال
      setImagePreview(URL.createObjectURL(file)); // للمعاينة
    }
  };

  // جلب التصنيفات
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // وظيفة الإرسال
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !selectedCategory) {
      alert("الرجاء إدخال اسم المشروع والتصنيف على الأقل");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', selectedCategory);
    formData.append('live_demo_url', liveDemoUrl);
    formData.append('github_url', githubUrl);
    formData.append('description', description);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/project', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        alert("تم إضافة المشروع بنجاح!");
        // تفريغ الحقول
        setTitle("");
        setSelectedCategory("");
        setLiveDemoUrl("");
        setGithubUrl("");
        setDescription("");
        setSelectedFile(null);
        setImagePreview(null);
      }
    } catch (error: any) {
      console.error("Error saving project:", error);
      alert(error.response?.data?.message || "حدث خطأ أثناء حفظ المشروع");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen text-right w-full" dir="rtl">
      <div className="w-full mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">إضافة مشروع جديد</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">أدخل تفاصيل مشروعك الجديد ليظهر في معرض أعمالك.</p>
      </div>

      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* أضفنا onSubmit هنا */}
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* القسم الأيمن: الصورة */}
            <div className="xl:col-span-5 space-y-4">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" /> صورة المشروع الرئيسية
              </label>
              <div className="relative group h-full min-h-[300px]">
                {imagePreview ? (
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-blue-100 shadow-inner">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setSelectedFile(null); }}
                      className="absolute top-4 left-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-blue-50 transition-all group">
                    <div className="flex flex-col items-center justify-center p-10">
                      <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="mb-2 text-base text-gray-600 font-semibold">اضغط لرفع الصورة</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            {/* القسم الأيسر: البيانات */}
            <div className="xl:col-span-7 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Type className="w-4 h-4 text-blue-600" /> اسم المشروع
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثلاً: تطبيق متجر إلكتروني"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-blue-600" /> تصنيف المشروع
                  </label>
                  <select
                    required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    disabled={loadingCategories}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50"
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-blue-600" /> رابط المعاينة
                  </label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-left dir-ltr bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-blue-600" /> رابط GitHub
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-left dir-ltr bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" /> وصف المشروع
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اشرح باختصار فكرة المشروع..."
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none bg-gray-50/50"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-3 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 transition-all text-sm"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-12 py-3.5 rounded-xl font-bold transition-all shadow-lg disabled:bg-blue-400 active:scale-95 text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  حفظ ونشر المشروع
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProjectPage