"use client";

import { navLinks } from "@/navLinks";

import Link from "next/link";


const NavLinks = () => {
  return (
    <>
      {navLinks.map((link) => (
        <li key={link.name} className="w-full md:w-auto text-center">
          <Link
            href={link.href}
            className="block py-2 px-3 text-white rounded-lg transition-all duration-300 hover:text-blue-400 md:p-0"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLinks;