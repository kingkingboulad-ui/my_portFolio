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
  Trash2
} from 'lucide-react'

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  // قائمة الأقسام الجانبية
  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'security', label: 'الأمان والحماية', icon: Lock },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'appearance', label: 'المظهر واللغة', icon: Palette },
  ];

  return (
    <div className="p-0 m-0 bg-[#f8fafc] min-h-screen text-right w-full flex flex-col" dir="rtl">
      
      {/* الرأس - Header */}
      <div className="w-full bg-white border-b border-gray-100 p-6 md:px-10">
        <h1 className="text-2xl font-bold text-gray-900">إعدادات الحساب</h1>
        <p className="text-gray-500 text-sm mt-1">إدارة بياناتك الشخصية وتفضيلات النظام.</p>
      </div>

      <div className="flex flex-col lg:flex-row w-full flex-grow">
        
        {/* القائمة الجانبية للإعدادات */}
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

        {/* محتوى الإعدادات */}
        <div className="flex-grow p-6 md:p-10 bg-[#f8fafc]">
          <div className="max-w-4xl space-y-8">
            
            {/* قسم الملف الشخصي - Profile Section */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" /> المعلومات العامة
                  </h2>
                  
                  {/* تغيير الصورة الشخصية */}
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                        <User className="w-12 h-12 text-blue-500" />
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">صورة الحساب</h4>
                      <p className="text-xs text-gray-400 mt-1">تنسيق PNG أو JPG، بحد أقصى 2 ميجابايت.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600">الاسم الكامل</label>
                      <input type="text" defaultValue="أحمد محمد" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600">المسمى الوظيفي</label>
                      <input type="text" defaultValue="Full Stack Developer" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-600">البريد الإلكتروني</label>
                      <div className="relative">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" defaultValue="ahmed@example.com" className="w-full pr-11 pl-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
                    <Save className="w-4 h-4" /> حفظ التغييرات
                  </button>
                </div>
              </div>
            )}

            {/* قسم الأمان - Security Section */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" /> حماية الحساب
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="font-bold text-gray-700">كلمة المرور</p>
                        <p className="text-xs text-gray-400">آخر تغيير منذ 3 أشهر</p>
                      </div>
                      <button className="text-blue-600 font-bold text-sm hover:underline">تغيير</button>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="font-bold text-gray-700">المصادقة الثنائية (2FA)</p>
                        <p className="text-xs text-gray-400">تعزيز أمان حسابك عبر الجوال</p>
                      </div>
                      <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 space-y-4">
                  <h3 className="text-red-600 font-bold flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> منطقة الخطر
                  </h3>
                  <p className="text-sm text-red-500/80">عند حذف الحساب، سيتم مسح كافة البيانات والمشاريع نهائياً. لا يمكن التراجع عن هذا الإجراء.</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all">
                    حذف الحساب نهائياً
                  </button>
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