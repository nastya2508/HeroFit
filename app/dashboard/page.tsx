'use client';

import { useEffect, useState } from 'react';
import { Trophy, Flame, Zap, TrendingUp, Sparkles, User } from 'lucide-react';

export default function Dashboard() {
  const [avatar, setAvatar] = useState('normal');
  
  // 1. ДОДАНО: Стейт для реальних даних (початковий стан - 1 рівень)
  const [heroStats, setHeroStats] = useState({
    level: 1, xp: 0, firePoints: 0, workouts: 0, streak: 0 
  });

  useEffect(() => {
    // 2. ДОДАНО: Зчитування аватара та статистики з пам'яті браузера
    const savedAvatar = localStorage.getItem('hero_avatar');
    if (savedAvatar) setAvatar(savedAvatar);

    const savedStats = localStorage.getItem('hero_stats');
    if (savedStats) {
      setHeroStats(JSON.parse(savedStats));
    }
  }, []);

  // 3. ДОДАНО: Розрахунок прогресу для смужки (1000 XP на рівень)
  const xpLimit = heroStats.level * 1000;
  const progressPercentage = Math.min((heroStats.xp / xpLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-10 relative overflow-hidden">
      {/* ТВОЇ ГРАДІЄНТИ */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[15s]" />

      <div className="relative z-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight italic uppercase">Панель <span className="text-cyan-400">героя</span></h1>
          
          {/* 4. ДОДАНО: КНОПКИ КЕРУВАННЯ ПРОГРЕСОМ (для презентації) */}
          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => {
                const luckyStats = { level: 42, xp: 850, firePoints: 8450, workouts: 156, streak: 12 };
                localStorage.setItem('hero_stats', JSON.stringify(luckyStats));
                window.location.reload(); 
              }}
              className="px-4 py-2 bg-cyan-500/10 border border-cyan-400/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)]"
            >
              🪄 Активувати 42 LVL
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('hero_stats');
                window.location.reload();
              }}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              🗑️ Скинути
            </button>
          </div>
        </header>

        {/* 5. ЗМІНЕНО: val тепер береться з heroStats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard Icon={Trophy} val={heroStats.level} label="Епічний Рівень" color="text-green-400" bgColor="bg-green-400/10" />
          <StatCard Icon={Flame} val={heroStats.firePoints.toLocaleString()} label="Fire Бали" color="text-orange-500" bgColor="bg-orange-500/10" />
          <StatCard Icon={Zap} val={heroStats.workouts} label="Вправи" color="text-cyan-400" bgColor="bg-cyan-400/10" />
          <StatCard Icon={TrendingUp} val={`${heroStats.streak} днів`} label="Серія Днів" color="text-emerald-500" bgColor="bg-emerald-500/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* БЛОК: ТВІЙ ГЕРОЙ */}
          <div className="bg-slate-900/20 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex flex-col items-center relative overflow-hidden shadow-2xl transition-all hover:border-white/20">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            
            <div className="flex justify-between w-full mb-8 items-center relative z-10">
              <h3 className="font-black text-xs uppercase tracking-[2px] text-white/80 italic">Твій Герой</h3>
              <div className="p-2 rounded-full border border-orange-500/50 text-orange-500">
                <Sparkles className="size-4 shadow-orange-500/50" />
              </div>
            </div>
            
            <div className="relative w-48 h-48 rounded-full border-2 border-cyan-400/30 flex items-center justify-center bg-slate-950/40 mb-6 backdrop-blur-3xl">
                <div className="absolute inset-0 rounded-full border-[10px] border-white/5 shadow-inner"></div>
                <span className="text-8xl grayscale-[0.2] transition-transform hover:scale-110 duration-500 cursor-pointer relative z-10">
                  {avatar === 'skinny' ? '🧍' : avatar === 'full' ? '🤰' : '💪'}
                </span>
            </div>

            <div className="w-full space-y-6 relative z-10">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">Ти досяг нового рівня! Неймовірно! 🔥</p>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500 italic">Рівень {heroStats.level}</span>
                        <span className="text-green-400 italic font-black">Наступний: {heroStats.level + 1}</span>
                    </div>
                    {/* 6. ЗМІНЕНО: width тепер динамічна */}
                    <div className="w-full h-2.5 bg-slate-800/50 rounded-full overflow-hidden p-[1px] border border-white/5 shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-1000"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-[9px] text-slate-600 text-center uppercase tracking-widest font-black italic">
                      {heroStats.xp} / {xpLimit} XP — {xpLimit - heroStats.xp} XP до наступного рівня
                    </p>
                </div>
            </div>
          </div>

          {/* БЛОК: ПРОГРЕС ТІЛА */}
          <div className="lg:col-span-2 bg-slate-900/20 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <h3 className="font-black text-xs uppercase tracking-[2px] text-white/80 mb-8 italic">Прогрес Тіла</h3>
            
            <div className="w-full h-64 relative">
               <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] text-slate-600 font-bold pr-4">
                  <span>90</span><span>85</span><span>80</span><span>75</span><span>70</span>
               </div>
               
               <div className="ml-8 h-full border-l border-b border-white/10 relative overflow-hidden">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,30 L20,35 L40,45 L60,50 L80,55 L100,65" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,30 L20,35 L40,45 L60,50 L80,55 L100,65 L100,100 L0,100 Z" fill="url(#chartGrad)" />
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-[-30px] w-full flex justify-between text-[10px] text-slate-600 font-black uppercase tracking-tighter px-2">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* СЕРІЯ АКТИВНОСТІ - ТЕПЕР ЖИВА ТЕПЛОВА КАРТА */}
        <div className="bg-slate-900/20 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="mb-6 flex justify-between items-center relative z-10">
            <div>
              <h3 className="font-black text-xs uppercase tracking-[2px] text-white/80 mb-2 italic">Активність</h3>
              <p className="text-[10px] text-slate-500 font-bold italic uppercase tracking-wider">Кожен зелений квадрат — це твій крок до легенди. 🔥</p>
            </div>
            <span className="text-5xl font-black italic text-cyan-400 leading-none">{heroStats.workouts}</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
            
            {/* НОВА ЛОГІКА: Квадратики відповідають реальним дням календаря */}
            {Array.from({ length: 140 }).map((_, i) => {
              const date = new Date();
              // Рахуємо дату для кожного квадратика назад від сьогодні (139-й — це сьогодні)
              date.setDate(date.getDate() - (139 - i));
              const dateString = date.toISOString().split('T')[0];
              
              // Зчитуємо історію переглядів
              const history = typeof window !== 'undefined' 
                ? JSON.parse(localStorage.getItem('video_history') || '{}') 
                : {};
              const views = history[dateString] || 0;

              // Визначаємо колір залежно від інтенсивності
              let bgColor = 'bg-white/5 border-white/5'; 
              if (views === 1) bgColor = 'bg-green-900/40 border-green-800/20'; 
              else if (views === 2) bgColor = 'bg-green-600/60 border-green-500/30'; 
              else if (views >= 3) {
                bgColor = 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] border-white/20'; 
              }

              return (
                <div 
                  key={i} 
                  title={`${dateString}: ${views} тренувань`}
                  className={`w-3.5 h-3.5 rounded-[3px] transition-all duration-500 hover:scale-150 cursor-help border ${bgColor}`}
                ></div>
              );
            })}
          </div>

          <div className="flex gap-6 items-center border-t border-white/5 pt-6 relative z-10">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-white/5 border border-white/5"></div>
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest italic">Нуль</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-green-900/40 border border-green-800/20"></div>
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest italic">Низька</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest italic">Висока (3+)</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ДОПОМІЖНИЙ КОМПОНЕНТ ДЛЯ КАРТОК
function StatCard({ Icon, val, label, color, bgColor }: any) {
  return (
    <div className="bg-slate-900/20 backdrop-blur-xl border border-white/10 p-7 rounded-[28px] relative overflow-hidden group hover:bg-white/5 transition-all duration-500 shadow-xl">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${color} relative z-10 border border-white/5`}>
        <Icon size={20} />
      </div>
      <div className={`text-4xl font-black italic ${color} tracking-tighter relative z-10 leading-none`}>{val}</div>
      <div className="text-[10px] text-slate-500 uppercase font-black tracking-[2px] mt-2 relative z-10 italic">{label}</div>
    </div>
  );
}