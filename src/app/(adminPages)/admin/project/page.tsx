"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import {
    Search,
    Filter,
    MoreVertical,
    ExternalLink,
    Edit,
    Trash2,
    Plus,
    Eye,
    // Github
} from 'lucide-react'

function ProjectsPage() {
    // بيانات تجريبية للمشاريع
    const [projects] = useState([
        {
            id: 1,
            title: "منصة تجارة إلكترونية",
            category: "Full Stack",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000",
            status: "منشور",
            views: "1.2k",
            date: "2024-02-15"
        },
        {
            id: 2,
            title: "تطبيق إدارة المهام",
            category: "React Native",
            image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1000",
            status: "مسودة",
            views: "450",
            date: "2024-03-01"
        },
        {
            id: 3,
            title: "تصميم واجهة لوحة تحكم",
            category: "UI/UX Design",
            image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=1000",
            status: "منشور",
            views: "890",
            date: "2024-01-20"
        }
    ]);

    return (
        <div className="p-0 m-0 bg-[#f8fafc] min-h-screen text-right w-full flex flex-col" dir="rtl">

            {/* Header - الرأس مع شريط البحث */}
            <div className="w-full bg-white border-b border-gray-100 p-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">مشاريعي</h1>
                    <p className="text-gray-500 text-sm">إدارة وعرض جميع الأعمال التي قمت بإضافتها.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:w-80">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ابحث عن مشروع..."
                            className="w-full pr-10 pl-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50"
                        />
                    </div>
                    <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                        <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        إضافة جديد
                    </button>
                </div>
            </div>

            {/* Grid Content - عرض المشاريع */}
            <div className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

                        {/* Project Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                // fill تجعل الصورة تأخذ حجم العنصر الأب بالكامل
                                fill
                                // sizes تساعد المتصفح على اختيار حجم الصورة المناسب للأداء
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                // أولويّة التحميل للصور الظاهرة في البداية
                                priority={project.id <= 2}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                                <div className="flex gap-2">
                                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors">
                                        {/* <Github className="w-4 h-4" /> */}
                                    </button>
                                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="text-white text-xs font-medium flex items-center gap-1">
                                    <Eye className="w-4 h-4" /> {project.views}
                                </span>
                            </div>
                            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${project.status === 'منشور' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                                }`}>
                                {project.status}
                            </span>
                        </div>

                        {/* Project Details */}
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-blue-600 text-xs font-bold mb-1">{project.category}</p>
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-gray-400 text-xs mb-4">تم التحديث: {project.date}</p>

                            {/* Action Buttons */}
                            <div className="flex border-t border-gray-50 pt-4 gap-3">
                                <button className="flex-grow flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-gray-600 text-sm font-bold transition-all">
                                    <Edit className="w-4 h-4" />
                                    تعديل
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add New Placeholder */}
                <button className="group border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-blue-300 hover:bg-blue-50/30 transition-all min-h-[350px]">
                    <div className="p-4 bg-gray-50 rounded-full group-hover:bg-blue-100 transition-colors mb-4">
                        <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <span className="text-gray-500 font-bold group-hover:text-blue-600">إضافة مشروع جديد</span>
                </button>
            </div>

        </div>
    )
}

export default ProjectsPage