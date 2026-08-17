'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { navLinks } from '@/navLinks';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'top-0 py-3'
          : 'top-4 py-2'
      }`}
    >
      <div
        className={`max-w-6xl mx-4 md:mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-black/60 backdrop-blur-2xl border border-gray-200/50 dark:border-amber-500/10 shadow-lg shadow-gray-200/20 dark:shadow-amber-500/5'
            : 'bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10'
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-gradient-gold">Portfolio</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? 'text-amber-400 bg-amber-500/10'
                   : 'text-t2 hover:text-t1 hover:bg-card-bg'
               }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-amber-400 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-sm hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <Download size={16} />
            تحميل CV
          </a>
          <ThemeToggle />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-t2 hover:text-t1 hover:bg-card-bg transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2 p-4 rounded-2xl bg-white/95 dark:bg-black/80 backdrop-blur-2xl border border-gray-200 dark:border-white/10"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-t2 hover:text-t1 hover:bg-card-bg'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#"
                className="flex items-center justify-center gap-2 mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-sm"
              >
                <Download size={16} />
                تحميل CV
              </a>
              <div className="flex justify-center mt-2">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
