"use client";

import { useState } from "react";
import NavLinks from "./client/NavLinks";
import MenuButton from "./client/MenuButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 right-0" dir="rtl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-2 md:mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg mx-4 md:mx-auto">

        {/* Logo */}
        <a href="#" className="flex items-center space-x-reverse space-x-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            معرض أعمالي
          </span>
        </a>

        {/* Button */}
        <MenuButton
          isOpen={isOpen}
          toggle={() => setIsOpen(!isOpen)}
        />

        {/* Links */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 mt-4 md:flex-row md:space-x-reverse md:space-x-8 md:mt-0 items-center">
            
            <NavLinks />

            <li className="mx-1.5 mt-4 md:mt-0">
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