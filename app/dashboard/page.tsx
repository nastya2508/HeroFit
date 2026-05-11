'use client';

import { useEffect, useState } from 'react';
import { Trophy, Flame, Zap, TrendingUp, Sparkles } from 'lucide-react';

const allSkins = [
  { id: 1, image: "/heroes/skin_fish.png" },
  { id: 2, image: "/heroes/skin_clown.png" },
  { id: 3, image: "/heroes/skin_alien.png" },
  { id: 4, image: "/heroes/skin_liubynka.png" },
  { id: 5, image: "/heroes/skin_dzhento.png" },
  { id: 6, image: "/heroes/skin_slyz.png" },
  { id: 7, image: "/heroes/skin_stranger.png" },
  { id: 8, image: "/heroes/skin_headphones.png" }
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  // Ставимо початкове значення з localStorage, щоб не було "стрибка" маскота
  const [heroImage, setHeroImage] = useState('/heroes/mascot_chubby.png'); 
  
  const [heroStats, setHeroStats] = useState({
    level: 1, 
    xp: 0, 
    firePoints: 0, 
    workouts: 0, 
    streak: 0,
    strength: 100 
  });

  useEffect(() => {
    setMounted(true); 
    
    // 1. Спочатку миттєво ставимо той аватар, який ти обрала при реєстрації
    const onboardingAvatar = localStorage.getItem('hero_avatar');
    if (onboardingAvatar) {
        setHeroImage(onboardingAvatar);
    }
    
    const fetchHeroData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const workoutsCount = data.completed_count || 0;

          setHeroStats({
            level: data.current_level || 1,
            xp: data.current_points || 0,
            firePoints: (data.current_points || 0) * 2,
            workouts: workoutsCount,
            streak: 5,
            strength: data.current_strength || 100
          });

          // --- ЛОГІКА СИНХРОНІЗАЦІЇ (ВИПРАВЛЕНО) ---
          const equippedSkinId = localStorage.getItem('equipped_skin');
          const localAvatar = localStorage.getItem('hero_avatar') || '/heroes/mascot_chubby.png';

          if (equippedSkinId) {
            // Пріоритет №1: Одягнений скін з магазину
            const skin = allSkins.find(s => s.id === parseInt(equippedSkinId));
            if (skin) setHeroImage(skin.image);
          } else {
            // Пріоритет №2: Еволюція на основі вправ
            let evolutionImg = '/heroes/mascot_chubby.png';
            if (workoutsCount >= 20) evolutionImg = '/heroes/mascot_fit.png';
            else if (workoutsCount >= 10) evolutionImg = '/heroes/mascot_normal.png';

            // Функція для визначення "рівня сили" картинки
            const getPowerLevel = (img: string) => {
                if (img.includes('fit')) return 2;
                if (img.includes('normal')) return 1;
                return 0;
            };

            // ПОРІВНЯННЯ: Показуємо або те, що обрала при реєстрації, або те, що накачала.
            // Ми беремо ТІЛЬКИ прогрес вперед. Твій качок не стане пухляшем!
            if (getPowerLevel(evolutionImg) >= getPowerLevel(localAvatar)) {
                setHeroImage(evolutionImg);
            } else {
                setHeroImage(localAvatar);
            }
          }
        }
      } catch (error) {
        console.error("🔥 Помилка мережі:", error);
      }
    };

    fetchHeroData();
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0b0f1a]" />;

  const xpLimit = heroStats.level * 1000;
  const progressPercentage = Math.min((heroStats.xp / xpLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-10 relative overflow-hidden font-bold">
      {/* ДЕКОРАТИВНІ ГРАДІЄНТИ */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[15s]" />

      <div className="relative z-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight italic uppercase">Панель <span className="text-cyan-400">героя</span></h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] opacity-70 italic">Твій прогрес синхронізовано з базою даних HeroFit</p>
        </header>

        {/* СТАТ-КАРТКИ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard Icon={Trophy} val={heroStats.level} label="Рівень в базі" color="text-green-400" bgColor="bg-green-400/10" />
          <StatCard Icon={Flame} val={heroStats.strength} label="Сила Героя" color="text-orange-500" bgColor="bg-orange-500/10" />
          <StatCard Icon={Zap} val={heroStats.workouts} label="Виконано вправ" color="text-cyan-400" bgColor="bg-cyan-400/10" />
          <StatCard Icon={TrendingUp} val={`${heroStats.streak} дн.`} label="Серія" color="text-emerald-500" bgColor="bg-emerald-500/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* БЛОК МАСКОТА */}
          <div className="bg-slate-900/20 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 flex flex-col items-center relative overflow-hidden shadow-2xl transition-all hover:border-white/20">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            
            <div className="flex justify-between w-full mb-8 items-center relative z-10">
              <h3 className="font-black text-[10px] uppercase tracking-[3px] text-white/80 italic">Статус прогресу</h3>
              <div className="p-2 rounded-full border border-orange-500/50 text-orange-500 animate-pulse">
                <Sparkles className="size-4" />
              </div>
            </div>
            
            <div className="relative w-56 h-56 rounded-full border-2 border-cyan-400/30 flex items-center justify-center bg-slate-950/40 mb-6 backdrop-blur-3xl shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                <img 
                  src={heroImage} 
                  alt="Mascot" 
                  className="w-full h-full object-contain animate-float drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
                />
            </div>

            <div className="w-full space-y-6 relative z-10">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-[4px] text-cyan-400 italic">Синхронізація: Активна ✅</p>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                        <span className="text-slate-500">LVL {heroStats.level}</span>
                        <span className="text-green-400 font-black">{heroStats.xp} XP</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800/50 rounded-full overflow-hidden p-[1px] border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full transition-all duration-1000"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-[9px] text-slate-600 text-center uppercase tracking-widest font-black italic">
                      {heroStats.xp} / {xpLimit} XP до наступного рівня
                    </p>
                </div>
            </div>
          </div>

          {/* КАЛЕНДАР / ТЕПЛОВА КАРТА */}
          <div className="lg:col-span-2 bg-slate-900/20 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="mb-6 flex justify-between items-center relative z-10">
              <h3 className="font-black text-[10px] uppercase tracking-[3px] text-white/80 italic">Твій Шлях Героя</h3>
              <span className="text-4xl font-black italic text-cyan-400 leading-none">{heroStats.workouts}</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
              {Array.from({ length: 140 }).map((_, i) => {
                if (typeof window === 'undefined') return <div key={i} className="w-3.5 h-3.5 rounded-[3px] bg-white/5" />;
                
                const date = new Date();
                date.setDate(date.getDate() - (139 - i));
                const dateString = date.toISOString().split('T')[0];
                
                const history = JSON.parse(localStorage.getItem('video_history') || '{}');
                const views = history[dateString] || 0;

                let bgColor = 'bg-white/5 border-white/5'; 
                if (views === 1) bgColor = 'bg-green-900/40 border-green-800/20'; 
                else if (views === 2) bgColor = 'bg-green-600/60 border-green-500/30'; 
                else if (views >= 3) bgColor = 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]';

                return (
                  <div 
                    key={i} 
                    title={`${dateString}: ${views} тренувань`}
                    className={`w-3.5 h-3.5 rounded-[3px] transition-all border ${bgColor} hover:scale-125 cursor-pointer`}
                  ></div>
                );
              })}
            </div>

            <div className="flex gap-6 items-center border-t border-white/5 pt-6 text-slate-600 font-black uppercase text-[9px] italic tracking-[2px]">
               <span>Менше</span>
               <div className="flex gap-1">
                 <div className="w-3 h-3 bg-white/5 rounded-[2px]" />
                 <div className="w-3 h-3 bg-green-900/40 rounded-[2px]" />
                 <div className="w-3 h-3 bg-green-500 rounded-[2px]" />
               </div>
               <span>Більше тренувань</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function StatCard({ Icon, val, label, color, bgColor }: any) {
  return (
    <div className="bg-slate-900/20 backdrop-blur-xl border border-white/10 p-7 rounded-[32px] relative group hover:bg-white/5 transition-all shadow-xl">
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-6 ${color} border border-white/5 transition-transform group-hover:scale-110`}>
        <Icon size={20} />
      </div>
      <div className={`text-4xl font-black italic ${color} tracking-tighter leading-none`}>{val}</div>
      <div className="text-[10px] text-slate-500 uppercase font-black tracking-[2px] mt-2 italic">{label}</div>
    </div>
  );
}