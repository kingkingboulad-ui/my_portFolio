import React from 'react'
import { 
  Briefcase, 
  Eye, 
  MessageSquare, 
  Award, 
  Plus,
  ExternalLink,
  Edit3,
  Trash2
} from 'lucide-react'

function PortfolioDashboard() {
  // إحصائيات معرض الأعمال
  const stats = [
    { title: "إجمالي المشاريع", value: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "مشاهدات الملف", value: "1,420", icon: Eye, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "رسائل جديدة", value: "5", icon: MessageSquare, color: "text-green-600", bg: "bg-green-100" },
    { title: "المهارات المضافة", value: "24", icon: Award, color: "text-orange-600", bg: "bg-orange-100" },
  ]

  // بيانات المشاريع الأخيرة
  const projects = [
    { id: 1, name: "تطبيق متجر إلكتروني", category: "React / Next.js", status: "منشور", date: "2024-03-20" },
    { id: 2, name: "منصة تعليمية", category: "UI/UX Design", status: "مسودة", date: "2024-03-15" },
    { id: 3, name: "موقع شركة مقاولات", category: "Full Stack", status: "منشور", date: "2024-03-10" },
  ]

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-right" dir="rtl">
      
      {/* Header - الرأس */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم معرض أعمالي</h1>
          <p className="text-gray-500 text-sm mt-1">إليك نظرة سريعة على أداء موقعك الشخصي</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-md active:scale-95">
          <Plus className="w-5 h-5" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      {/* Stats Cards - كروت الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid - الشبكة الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Projects Table - جدول المشاريع */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">آخر المشاريع</h2>
            <button className="text-blue-600 text-sm font-medium hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">اسم المشروع</th>
                  <th className="px-6 py-4 font-semibold">التصنيف</th>
                  <th className="px-6 py-4 font-semibold">الحالة</th>
                  <th className="px-6 py-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                    <td className="px-6 py-4 text-gray-600">{project.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'منشور' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-900 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Section - القسم الجانبي */}
        <div className="space-y-6">
          {/* Quick Tasks/Status */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">نصيحة اليوم</h2>
            <div className="p-4 bg-amber-50 border-r-4 border-amber-400 rounded-lg">
              <p className="text-sm text-amber-800 leading-relaxed">
                مشاريع الـ Full Stack تحصل على مشاهدات أكثر بنسبة 40%. حاول إضافة مشروع جديد يستخدم Next.js 14.
              </p>
            </div>
          </div>

          {/* Social Presence */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4">حالة التوظيف</h2>
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-300">متاح للعمل الحر؟</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative shadow-inner">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all text-sm">
              تحديث الملف الشخصي
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PortfolioDashboard