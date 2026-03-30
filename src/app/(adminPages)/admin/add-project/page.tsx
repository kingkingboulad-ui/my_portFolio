"use client"

import React, { useState } from 'react'
import { 
  Plus, 
  Upload, 
  Link as LinkIcon, 
  Layout, 
  Type, 
  FileText,
  X 
} from 'lucide-react'

function AddProjectPage() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    // تم استخدام w-full لضمان ملء الشاشة بالكامل
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen text-right w-full" dir="rtl">
      
      {/* الرأس - Header */}
      <div className="w-full mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">إضافة مشروع جديد</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">أدخل تفاصيل مشروعك الجديد ليظهر في معرض أعمالك.</p>
      </div>

      {/* النموذج الرئيسي - Full Width Container */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <form className="p-6 md:p-10 space-y-8">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* العمود الأيمن: رفع الصور (يأخذ 5 أعمدة في الشاشات الكبيرة) */}
            <div className="xl:col-span-5 space-y-4">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                صورة المشروع الرئيسية
              </label>
              <div className="relative group h-full min-h-[300px]">
                {imagePreview ? (
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-blue-100 shadow-inner">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-4 left-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg hover:scale-110"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all group">
                    <div className="flex flex-col items-center justify-center p-10">
                      <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="mb-2 text-base text-gray-600 font-semibold">اسحب الصورة هنا أو اضغط للرفع</p>
                      <p className="text-xs text-gray-400">يدعم PNG, JPG, WEBP (الجودة العالية مطلوبة)</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            {/* العمود الأيسر: البيانات (يأخذ 7 أعمدة في الشاشات الكبيرة) */}
            <div className="xl:col-span-7 space-y-6">
              
              {/* اسم المشروع والتصنيف */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Type className="w-4 h-4 text-blue-600" />
                    اسم المشروع
                  </label>
                  <input 
                    type="text" 
                    placeholder="مثلاً: تطبيق متجر إلكتروني" 
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-blue-600" />
                    تصنيف المشروع
                  </label>
                  <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm bg-gray-50/50">
                    <option>تطوير ويب (Web Development)</option>
                    <option>تطبيقات موبايل (Mobile App)</option>
                    <option>تصميم واجهات (UI/UX)</option>
                    <option>أخرى</option>
                  </select>
                </div>
              </div>

              {/* روابط المشروع */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-blue-600" />
                    رابط المعاينة (Live Demo)
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://example.com" 
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-left dir-ltr bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-blue-600" />
                    رابط الكود (GitHub)
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://github.com/..." 
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-left dir-ltr bg-gray-50/50"
                  />
                </div>
              </div>

              {/* الوصف */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  وصف المشروع
                </label>
                <textarea 
                  rows="6" 
                  placeholder="اشرح باختصار فكرة المشروع والتقنيات المستخدمة..." 
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm resize-none bg-gray-50/50"
                ></textarea>
              </div>

            </div>
          </div>

          {/* أزرار التحكم السفلى */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 border-t border-gray-100">
            <button 
              type="button" 
              className="w-full sm:w-auto px-10 py-3 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 transition-all text-sm order-2 sm:order-1"
            >
              إلغاء التغييرات
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-12 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 text-sm order-1 sm:order-2"
            >
              <Plus className="w-5 h-5" />
              حفظ ونشر المشروع
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddProjectPage