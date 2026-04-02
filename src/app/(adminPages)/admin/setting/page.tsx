"use client"

import React, { useState } from 'react'
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Globe, 
  ShieldCheck, 
  Mail, 
  Camera,
  Save,
  Trash2,
  Layout
} from 'lucide-react'

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  // 1. إضافة State للبيانات الديناميكية
  const [webSettings, setWebSettings] = useState({
    siteTitle: "معرض أعمالي الشخصي",
    siteDescription: "مرحباً بك في موقعي، هنا أعرض آخر مشاريعي ومهاراتي في تطوير الويب.",
    aboutMe: "أنا مطور واجهات أمامية بخبرة 3 سنوات، أعشق تحويل التصاميم إلى أكواد برمجية تنبض بالحياة."
  });

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'website', label: 'إعدادات الموقع', icon: Layout }, // قسم جديد
    { id: 'security', label: 'الأمان والحماية', icon: Lock },
    { id: 'appearance', label: 'المظهر واللغة', icon: Palette },
  ];

  // دالة تحديث الحقول
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWebSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-0 m-0 bg-[#f8fafc] min-h-screen text-right w-full flex flex-col" dir="rtl">
      
      <div className="w-full bg-white border-b border-gray-100 p-6 md:px-10">
        <h1 className="text-2xl font-bold text-gray-900">إعدادات الحساب والنظام</h1>
        <p className="text-gray-500 text-sm mt-1">تحكم في هوية موقعك وبياناتك الشخصية من مكان واحد.</p>
      </div>

      <div className="flex flex-col lg:flex-row w-full flex-grow">
        
        {/* Sidebar */}
        <div className="w-full lg:w-72 bg-white border-l border-gray-100 p-4 lg:p-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-grow p-6 md:p-10 bg-[#f8fafc]">
          <div className="max-w-4xl space-y-8">
            
            {/* قسم الملف الشخصي */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" /> المعلومات الشخصية
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600">الاسم الكامل</label>
                      <input type="text" defaultValue="أحمد محمد" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600">المسمى الوظيفي</label>
                      <input type="text" defaultValue="Full Stack Developer" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم إعدادات الموقع - الجديد */}
            {activeTab === 'website' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" /> هوية الموقع المحرك (SEO)
                  </h2>
                  
                  <div className="space-y-6">
                    {/* العنوان */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600">عنوان الموقع (Site Title)</label>
                      <input 
                        name="siteTitle"
                        type="text" 
                        value={webSettings.siteTitle}
                        onChange={handleInputChange}
                        placeholder="مثلاً: معرض أعمال المصمم فلان"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 transition-all" 
                      />
                    </div>

                    {/* الوصف المختصر */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600">الوصف التعريفي (Meta Description)</label>
                      <textarea 
                        name="siteDescription"
                        rows="2"
                        value={webSettings.siteDescription}
                        onChange={handleInputChange}
                        placeholder="اكتب وصفاً يظهر في محركات البحث..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 transition-all resize-none" 
                      />
                    </div>

                    {/* قسم حول - About Me */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-bold text-gray-600">نبذة "حول" في الصفحة الرئيسية</label>
                        <span className="text-xs text-blue-500 font-medium">يدعم نصوص Markdown</span>
                      </div>
                      <textarea 
                        name="aboutMe"
                        rows="5"
                        value={webSettings.aboutMe}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95">
                    <Save className="w-4 h-4" /> تحديث بيانات الموقع
                  </button>
                </div>
              </div>
            )}

            {/* قسم الأمان */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" /> حماية الحساب
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div>
                        <p className="font-bold text-gray-700">كلمة المرور</p>
                        <p className="text-xs text-gray-400">آخر تغيير منذ 3 أشهر</p>
                      </div>
                      <button className="bg-white px-4 py-1.5 rounded-lg border border-gray-200 text-blue-600 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">تغيير</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage