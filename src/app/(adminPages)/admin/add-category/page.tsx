"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { LayoutGrid, Plus, Image as ImageIcon, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';


const AddCategory = () => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // تصحيح نوع الحدث لرفع الملفات
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // تصحيح نوع الحدث للإرسال
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/categories', {
        name: categoryName,
        description: description
        // لاحظ تجاهلنا للصورة هنا كما طلبت
      });

      if (response.data.success) {
        alert("تم الحفظ بنجاح!");
        // تفريغ الحقول بعد النجاح
        setCategoryName('');
        setDescription('');
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("فشل في حفظ التصنيف");
    }
  };

  return (
    // h-full و w-full لضمان ملء مساحة الداشبورد المتاحة
    <div className="w-full min-h-screen bg-[#f8fafc] p-4 md:p-6 lg:p-8" dir="rtl">

      {/* رأس الصفحة بملء العرض */}
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <LayoutGrid className="text-blue-600" size={24} />
          </div>
          إضافة تصنيف جديد
        </h1>
        <p className="text-slate-500 mt-1 text-sm mr-12">قم بتنظيم مشروعك عبر إضافة أقسام وتصنيفات جديدة.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 lg:p-10">

          {/* استخدام Grid لتقسيم المساحة بشكل أفضل في الشاشات الكبيرة */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* القسم الأيمن: رفع الصورة (يأخذ 4 أعمدة) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-start pt-4">
              <label className="text-sm font-bold text-slate-700 mb-4 w-full text-right">أيقونة التصنيف</label>
              <div className="relative group w-full max-w-[240px] aspect-square">
                <div className="w-full h-full rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400 group-hover:bg-blue-50/50">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="text-slate-300 mx-auto mb-2" size={48} />
                      <span className="text-xs text-slate-400">اختر صورة أو أيقونة</span>
                    </div>
                  )}
                </div>
                <label className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-xl cursor-pointer hover:bg-blue-700 shadow-xl transition-all active:scale-90 z-10">
                  <Plus size={20} />
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <ul className="mt-6 text-xs text-slate-400 space-y-2 w-full">
                <li>• يفضل استخدام صيغة PNG أو SVG.</li>
                <li>• الحجم الأقصى المفضل 2 ميجابايت.</li>
              </ul>
            </div>

            {/* القسم الأيسر: الحقول النصية (يأخذ 8 أعمدة) */}
            <div className="lg:col-span-8 space-y-8">

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">اسم التصنيف</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="مثلاً: تطوير الويب، تطبيقات الجوال..."
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50/30 text-slate-800 text-lg"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">وصف القسم</label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اشرح باختصار ماذا يتضمن هذا التصنيف..."
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50/30 text-slate-800 resize-none text-base"
                ></textarea>
              </div>

              {/* ملاحظة تفاعلية */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
                <AlertCircle className="text-blue-600 shrink-0" size={24} />
                <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">لماذا التصنيفات مهمة؟</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    تساعد التصنيفات زوار موقعك على الوصول لأعمالك بسهولة. تأكد من اختيار اسم واضح ووصف دقيق.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* شريط الأزرار السفلي - ممتد بالكامل */}
        <div className="bg-slate-50/80 backdrop-blur-sm px-8 py-6 flex items-center justify-end gap-4 border-t border-slate-100">
          <button
            type="button"
            className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-all"
          >
            تجاهل
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Save size={20} />
            اعتماد وحفظ التصنيف
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;