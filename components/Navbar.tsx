'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Dumbbell, Trophy, MessageSquare, 
  ShoppingBag, ShieldAlert, LogOut, UserCircle2, Settings, ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('N');
  
  // Реф для відстеження кліку ззовні
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. ЗАКРИТТЯ МЕНЮ ПРИ КЛІКУ ПОЗА НИМ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // 2. ОНОВЛЕННЯ БУКВИ ТА ІМЕНІ
  const loadProfile = () => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('hero_profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUsername(profile.username || profile.name || 'N');
      }
    }
  };

  useEffect(() => {
    loadProfile();
    window.addEventListener('storage', loadProfile);
    window.addEventListener('profileUpdated', loadProfile);
    return () => {
      window.removeEventListener('storage', loadProfile);
      window.removeEventListener('profileUpdated', loadProfile);
    };
  }, []);

  if (pathname === '/') return null;

  const navItems = [
    { name: 'Панель', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Вправи', href: '/exercises', icon: <Dumbbell size={18} /> },
    { name: 'Рейтинг', href: '/leaderboard', icon: <Trophy size={18} /> },
    { name: 'Чат', href: '/chat', icon: <MessageSquare size={18} /> },
    { name: 'Магазин', href: '/shop', icon: <ShoppingBag size={18} /> },
    { name: 'Виклики', href: '/challenges', icon: <ShieldAlert size={18} /> },
    { name: 'Акаунт', href: '/account', icon: <UserCircle2 size={18} /> },
  ];

  return (
    <nav className="w-full bg-[#0b0f1a] border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-opacity-90 font-sans">
      
      {/* Логотип */}
      <Link href="/dashboard" className="flex items-center gap-3 shrink-0 group">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center font-black text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover:scale-110 transition-all">
          HF
        </div>
        <span className="text-2xl font-black text-white tracking-tighter hidden lg:block uppercase italic">
          Hero<span className="text-cyan-400">Fit</span>
        </span>
      </Link>

      {/* ГНУЧКЕ МЕНЮ */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mx-4">
        <div className="flex items-center gap-1.5 min-w-max">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all border ${
                pathname === item.href 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
                  : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`shrink-0 ${pathname === item.href ? 'text-green-400' : 'text-slate-600'}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[2px] leading-none font-bold">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* --- ПРАВА ЧАСТИНА: АВАТАР ТА DROPDOWN --- */}
      <div className="flex items-center gap-6 shrink-0 relative" ref={dropdownRef}>
         <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative group focus:outline-none flex items-center justify-center"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-yellow-400 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500" />
              <div className="relative w-10 h-10 rounded-full bg-[#161b2a] border-2 border-white/10 flex items-center justify-center text-white font-black shadow-xl overflow-hidden group-hover:border-orange-500 transition-all">
                <span className="bg-gradient-to-tr from-orange-500 to-yellow-400 bg-clip-text text-transparent italic text-lg uppercase">
                  {username[0]}
                </span>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-4 w-64 bg-[#0b0f1a]/98 backdrop-blur-3xl border border-white/10 rounded-[30px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-5 duration-300 z-[100]">
                <div className="p-4 border-b border-white/5 mb-2 text-left">
                  <p className="text-[9px] font-black text-green-400 uppercase tracking-[3px] mb-1 italic font-bold">Статус: В мережі</p>
                  <p className="text-sm font-black italic text-white truncate uppercase font-bold">{username}</p>
                </div>
                
                <div className="space-y-1">
                  {/* КНОПКА НАЛАШТУВАННЯ З EDIT=TRUE */}
                  <Link 
                    href="/account?edit=true" 
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 font-bold">
                      <Settings size={18} /> Налаштування
                    </div>
                    <ChevronRight size={14} className="text-slate-600" />
                  </Link>

                  {/* КНОПКА ДОСЯГНЕННЯ З TAB=ACHIEVEMENTS */}
                  <Link 
                    href="/account?tab=achievements" 
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-yellow-500 font-bold">
                      <Trophy size={18} /> Досягнення
                    </div>
                    <ChevronRight size={14} className="text-slate-600" />
                  </Link>

                  <div className="h-[1px] bg-white/5 my-2" />

                  <button 
                    onClick={() => { window.location.href = '/'; setShowDropdown(false); }} 
                    className="w-full flex items-center gap-3 p-4 hover:bg-red-500/10 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest text-red-500 font-bold"
                  >
                    <LogOut size={18} /> Вийти
                  </button>
                </div>
              </div>
            )}
         </div>
      </div>
    </nav>
  );
}