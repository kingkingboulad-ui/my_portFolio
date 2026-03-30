"use client"

import React, { useState } from 'react';

const Navbar = () => {
  // حالة لفتح وإغلاق القائمة في الموبايل
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'أعمالي', href: '/projects' },
    { name: 'المهارات', href: '/skills' },
    { name: 'عني', href: '/about' },
    { name: 'تواصل معي', href: '/contact' },
  ];

  return (
    // إضافة dir="rtl" لضمان اتجاه العناصر من اليمين لليسار
    <nav className="fixed w-full z-50 top-0 right-0" dir="rtl">
      {/* الحاوية الرئيسية مع تأثير الزجاج (Glassmorphism) */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-2 md:mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg mx-4 md:mx-auto">
        
        {/* الشعار (Logo) */}
        <a href="#" className="flex items-center space-x-reverse space-x-3">
          <span className="self-center text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            معرض أعمالي
          </span>
        </a>

        {/* زر القائمة للموبايل */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none"
        >
          <span className="sr-only">فتح القائمة</span>
          {/* أيقونة القائمة (تتغير عند الفتح/الإغلاق) */}
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M1 1l15 12M1 13L16 1" : "M1 1h15M1 7h15M1 13h15"}/>
          </svg>
        </button>

        {/* الروابط: تظهر بشكل عمودي في الموبايل وأفقي في الشاشات الكبيرة */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto transition-all duration-300`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-reverse md:space-x-8 md:mt-0 md:border-0 items-center">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full md:w-auto text-center">
                <a
                  href={link.href}
                  className="block py-2 px-3 text-white rounded-lg transition-all duration-300 hover:text-blue-400 md:p-0"
                >
                  {link.name}
                </a>
              </li>
            ))}
            
            {/* زر تحميل السيرة الذاتية */}
            <li className=" mx-1.5  mt-4 md:mt-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all shadow-md active:scale-95 font-bold">
                تحميل الـ CV
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;