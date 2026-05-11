'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Flame, Zap, Globe, Users, Copy, Check, Dumbbell } from 'lucide-react';

// --- СПИСОК СКІНІВ ДЛЯ СИНХРОНІЗАЦІЇ ---
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

export default function LeaderboardPage() {
  const [tab, setTab] = useState('global'); 
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [heroImage, setHeroImage] = useState('/heroes/mascot_normal.png');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const equippedSkinId = localStorage.getItem('equipped_skin');
      const onboardingAvatar = localStorage.getItem('hero_avatar');

      if (equippedSkinId) {
        const skin = allSkins.find(s => s.id === parseInt(equippedSkinId));
        if (skin) setHeroImage(skin.image);
      } else if (onboardingAvatar) {
        setHeroImage(onboardingAvatar);
      }
    }
  }, []);

  const inviteLink = "https://herofit.app/invite/nastya-2026";

  // ДАНІ ЗІ ВСТАВКОЮ ТВОГО МАСКОТА
  const globalLeaders = [
    { id: 1, name: 'Олекс Грім', level: 67, fire: '24 500', quests: 342, icon: '🔥', medal: '🥇' },
    { id: 2, name: 'Майя Шторм', level: 64, fire: '23 100', quests: 318, icon: '⚡', medal: '🥈' },
    { id: 3, name: 'Йордан Сталь', level: 62, fire: '22 400', quests: 305, icon: '💎', medal: '🥉' },
    { id: 4, name: 'Сем Фенікс', level: 58, fire: '20 800', quests: 289, icon: '🦅' },
    { id: 5, name: 'Кейсі Блейз', level: 56, fire: '19 900', quests: 276, icon: '🌟' },
    { id: 8, name: 'Ви', level: 42, fire: '8 450', quests: 156, icon: heroImage, isMe: true }, // ТУТ ТВІЙ МАСКОТ
    { id: 9, name: 'Тейлор Свіфт', level: 40, fire: '7 900', quests: 142, icon: '🎨' },
    { id: 10, name: 'Дрю Хантер', level: 38, fire: '7 200', quests: 135, icon: '🎪' },
  ];

  const friendsLeaders = [
    { id: 1, name: 'Сем Фенікс', level: 58, fire: '20 800', quests: 289, icon: '🦅', medal: '🥇' },
    { id: 2, name: 'Кейсі Блейз', level: 56, fire: '19 900', quests: 276, icon: '🌟', medal: '🥈' },
    { id: 8, name: 'Ви', level: 42, fire: '8 450', quests: 156, icon: heroImage, isMe: true, medal: '🥉' }, // ТУТ ТЕЖ ТВІЙ МАСКОТ
    { id: 9, name: 'Тейлор Свіфт', level: 40, fire: '7 900', quests: 142, icon: '🎨' },
    { id: 10, name: 'Дрю Хантер', level: 38, fire: '7 200', quests: 135, icon: '🎪' },
  ];

  if (!mounted) return null;

  const currentLeaders = tab === 'global' ? globalLeaders : friendsLeaders;
  
  const currentTopThree = currentLeaders.slice(0, 3).map((hero, index) => ({
    ...hero,
    rank: index + 1,
    color: index === 0 ? 'border-yellow-500' : index === 1 ? 'border-slate-500/50' : 'border-orange-700/50',
    shadow: index === 0 ? 'shadow-yellow-500/20' : index === 1 ? 'shadow-slate-500/10' : 'shadow-orange-900/10'
  }));

  const pedestalOrder = [currentTopThree[1], currentTopThree[0], currentTopThree[2]];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white selection:bg-cyan-500/30 font-bold">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto p-6 lg:p-12 relative z-10">
        <header className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tighter uppercase italic leading-none">
            Таблиця <span className="text-yellow-500">Лідерів</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[5px] opacity-70">
            {tab === 'global' ? 'Змагайся з героями всього світу' : 'Твої друзі та їхні досягнення'}
          </p>
        </header>

        <div className="flex gap-3 mb-16">
          {['global', 'friends'].map((t) => (
            <button 
              key={t}
              onClick={() => setTab(t)} 
              className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border ${
                tab === t ? 'bg-[#22c55e] text-black border-[#22c55e]' : 'bg-white/5 text-slate-500 border-white/5'
              }`}
            >
              {t === 'global' ? <Globe size={14} /> : <Users size={14} />}
              {t === 'global' ? 'Глобальний' : 'Друзі'}
            </button>
          ))}
        </div>

        {/* П'єдестал */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end">
          {pedestalOrder.map((hero) => (
            <div key={hero.name} className={`glass-card p-10 flex flex-col items-center border-2 shadow-2xl rounded-[40px] ${hero.color} ${hero.rank === 1 ? 'md:h-80 scale-105 bg-yellow-500/5' : 'md:h-64 bg-slate-900/40'}`}>
              <div className="w-24 h-24 mb-4">
                {hero.isMe ? (
                   <img src={hero.icon} alt="" className="w-full h-full object-contain drop-shadow-lg" />
                ) : (
                   <span className="text-6xl">{hero.icon}</span>
                )}
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest mb-1 italic">{hero.name}</h3>
              <p className="text-[10px] font-bold text-slate-500 mb-5 uppercase tracking-widest">Level {hero.level}</p>
              <div className="flex items-center gap-2 bg-black/40 px-5 py-2 rounded-full border border-white/10 font-black text-[10px]">
                 🏆 #{hero.rank}
              </div>
            </div>
          ))}
        </div>

        {/* ТАБЛИЦЯ ЛІДЕРІВ */}
        <div className="glass-card overflow-hidden shadow-2xl mb-20 rounded-[40px] border border-white/5 bg-slate-900/20 backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[3px] text-slate-500 bg-white/[0.02]">
                <th className="p-8">Місце</th>
                <th className="p-8">Герой</th>
                <th className="p-8 text-center">Рівень</th>
                <th className="p-8 text-center text-orange-500">Fire</th>
                <th className="p-8 text-right">Вправи</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentLeaders.map((hero, index) => (
                <tr key={hero.id} className={`transition-colors border-b border-white/5 last:border-0 ${hero.isMe ? 'bg-green-500/10' : 'hover:bg-white/[0.02]'}`}>
                  <td className="p-8">
                    {hero.medal ? <span className="text-2xl">{hero.medal}</span> : <span className="text-slate-600 text-[12px] font-black ml-2">#{index + 1}</span>}
                  </td>
                  <td className="p-8 flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        {hero.isMe ? (
                            <img src={hero.icon} className="w-full h-full object-contain" alt="" />
                        ) : (
                            <span className="text-2xl">{hero.icon}</span>
                        )}
                    </div>
                    <span className={`uppercase italic tracking-tight ${hero.isMe ? 'text-green-400 font-black' : 'text-white'}`}>
                      {hero.name} {hero.isMe && <span className="ml-3 text-[8px] bg-green-500 text-black px-2 py-0.5 rounded uppercase">Ви</span>}
                    </span>
                  </td>
                  <td className="p-8 text-center text-cyan-400 font-black text-xl italic">{hero.level}</td>
                  <td className="p-8 text-center text-orange-500 font-black text-xl italic">{hero.fire}</td>
                  <td className="p-8 text-right text-slate-400 text-xl italic">{hero.quests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ЗАПРОШЕННЯ */}
        <div className="glass-card p-12 text-center rounded-[45px] border-2 border-white/5 bg-slate-900/40 relative overflow-hidden">
           <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Запроси друзів та <span className="text-green-400">отримай XP</span></h2>
           <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-10">
             <div className="bg-slate-950/50 border border-white/10 px-8 py-5 rounded-2xl text-slate-300 text-xs w-full max-w-lg overflow-hidden text-ellipsis italic">
               {inviteLink}
             </div>
             <button onClick={copyToClipboard} className={`w-full sm:w-56 font-black py-5 rounded-2xl uppercase tracking-[2px] text-[10px] transition-all flex items-center justify-center gap-3 ${copied ? 'bg-green-500 text-black' : 'bg-cyan-400 text-black'}`}>
               {copied ? <Check size={16} /> : <Copy size={16} />}
               {copied ? 'ГОТОВО' : 'КОПІЮВАТИ'}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}