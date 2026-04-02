"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    Search,
    Filter,
    MoreVertical,
    ExternalLink,
    Edit,
    Trash2,
    Plus,
    Eye,
} from 'lucide-react'

interface Project {
    id: number;
    title: string;
    category: string;
    image_url: string;
    description: string;
    views?: string | number;
    created_at?: string;
}

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const SERVER_URL = "http://localhost:3001";

    // 1. جلب المشاريع
    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/project`);
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. دالة الحذف
    const handleDelete = async (id: number) => {
        if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا المشروع نهائياً؟")) return;

        try {
            const response = await axios.delete(`${SERVER_URL}/api/project/${id}`);
            
            if (response.status === 200) {
                // تحديث القائمة فوراً في الواجهة
                setProjects(prev => prev.filter(project => project.id !== id));
                alert("تم حذف المشروع بنجاح");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("حدث خطأ أثناء محاولة الحذف");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-0 m-0 bg-[#f8fafc] min-h-screen text-right w-full flex flex-col" dir="rtl">

            {/* Header */}
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-10 pl-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50 text-black"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        إضافة جديد
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                
                {loading ? (
                    <div className="col-span-full text-center py-20 text-gray-500 font-bold">جاري تحميل المشاريع...</div>
                ) : (
                    <>
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

                                {/* Project Image */}
                                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={project.image_url ? `${SERVER_URL}${project.image_url}` : "/placeholder.png"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.currentTarget.src = "/placeholder.png" }} // حل مشكلة إذا كانت الصورة مفقودة
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-white text-xs font-medium flex items-center gap-1">
                                            <Eye className="w-4 h-4" /> {project.views || 0}
                                        </span>
                                    </div>
                                    
                                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] bg-green-500 text-white font-bold uppercase tracking-wider">
                                        منشور
                                    </span>
                                </div>

                                {/* Project Details */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-blue-600 text-xs font-bold mb-1">{project.category}</p>
                                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <p className="text-gray-400 text-[10px] mb-4">
                                        التاريخ: {project.created_at ? new Date(project.created_at).toLocaleDateString('ar-EG') : "غير متوفر"}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex border-t border-gray-50 pt-4 gap-3">
                                        <button className="flex-grow flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-gray-600 text-sm font-bold transition-all">
                                            <Edit className="w-4 h-4" />
                                            تعديل
                                        </button>
                                        {/* زر الحذف */}
                                        <button 
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add New Placeholder */}
                        <button className="group border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-blue-300 hover:bg-blue-50/30 transition-all min-h-[350px]">
                            <div className="p-4 bg-gray-50 rounded-full group-hover:bg-blue-100 transition-colors mb-4">
                                <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600" />
                            </div>
                            <span className="text-gray-500 font-bold group-hover:text-blue-600">إضافة مشروع جديد</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProjectsPage