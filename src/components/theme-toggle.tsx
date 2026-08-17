'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className={`relative p-2 rounded-xl bg-card-bg border border-card-border text-t2 transition-all duration-200 ${className}`}
        disabled
      >
        <Sun size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`relative p-2 rounded-xl bg-card-bg border border-card-border text-t2 hover:text-t1 hover:bg-surface transition-all duration-200 ${className}`}
      title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
    >
      <Sun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
