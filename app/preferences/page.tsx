'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Sunrise, Sun, Moon, Target, Save, 
  Dumbbell, Home, Trees, Sparkles, CheckCircle2,
  Calendar, Timer, Settings
} from 'lucide-react';

export default function PreferencesPage() {
  // --- 1. ДОДАЄМО СТАНИ ДЛЯ ВСІХ ВИБОРІВ ---
  const [location, setLocation] = useState('gym');
  const [timeOfDay, setTimeOfDay] = useState('morning'); // Для часу доби
  const [goal, setGoal] = useState('form');
  const [frequency, setFrequency] = useState(3);
  const [duration, setDuration] = useState(30);

  // Функція для імітації збереження
  const handleSave = () => {
    alert(`Налаштування збережено для ${location}, ціль: ${goal}, час: ${timeOfDay}`);
    // Тут у майбутньому буде запис у базу даних
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden">
      
      <header className="mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter uppercase italic">
          Налаштування
        </h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-80">
          Персоналізуй свій план тренувань
        </p>
      </header>

      {/* Перемикачі сторінок */}
      <div className="flex gap-4 mb-10 relative z-10">
        <Link 
          href="/exercises" 
          className="flex items-center gap-3 text-slate-500 px-6 py-3 text-[10px] font-black uppercase tracking-[2px] hover:text-white transition-all"
        >
          <Dumbbell size={16} /> Вправи
        </Link>
        <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[2px] text-cyan-400 shadow-xl">
          <Settings size={16} /> Мої Переваги
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10 pb-20">
        
        {/* 1. ЛОКАЦІЯ */}
        <section className="bg-slate-900/20 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 space-y-8">
          <div className="flex items-center gap-3 text-green-400">
            <MapPin size={22} />
            <h3 className="font-black uppercase tracking-[2px] text-lg">Де хочеш тренуватись?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OptionCard active={location === 'gym'} onClick={() => setLocation('gym')} Icon={Dumbbell} label="В залі" color="text-green-400" borderColor="border-green-500" />
            <OptionCard active={location === 'home'} onClick={() => setLocation('home')} Icon={Home} label="Вдома" color="text-green-400" borderColor="border-green-500" />
            <OptionCard active={location === 'street'} onClick={() => setLocation('street')} Icon={Trees} label="На вулиці" color="text-green-400" borderColor="border-green-500" />
          </div>
        </section>

        {/* 2. ЧАС ДОБИ (ТЕПЕР ПРАЦЮЄ!) */}
        <section className="bg-slate-900/20 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 space-y-8">
          <div className="flex items-center gap-3 text-cyan-400">
            <Sunrise size={22} />
            <h3 className="font-black uppercase tracking-[2px] text-lg">В який час дня?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OptionCard 
                active={timeOfDay === 'morning'} 
                onClick={() => setTimeOfDay('morning')} 
                Icon={Sunrise} label="Ранок" sub="6:00 - 12:00" color="text-cyan-400" borderColor="border-cyan-500" 
            />
            <OptionCard 
                active={timeOfDay === 'day'} 
                onClick={() => setTimeOfDay('day')} 
                Icon={Sun} label="День" sub="12:00 - 18:00" color="text-cyan-400" borderColor="border-cyan-500" 
            />
            <OptionCard 
                active={timeOfDay === 'evening'} 
                onClick={() => setTimeOfDay('evening')} 
                Icon={Moon} label="Вечір" sub="18:00 - 23:00" color="text-cyan-400" borderColor="border-cyan-500" 
            />
          </div>
        </section>

        {/* 3. ЦІЛЬ */}
        <section className="bg-slate-900/20 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 space-y-8">
          <div className="flex items-center gap-3 text-orange-500">
            <Target size={22} />
            <h3 className="font-black uppercase tracking-[2px] text-lg">Яка твоя ціль?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OptionCard active={goal === 'lose'} onClick={() => setGoal('lose')} emoji="🔥" label="Схуднути" color="text-orange-500" borderColor="border-orange-500" />
            <OptionCard active={goal === 'form'} onClick={() => setGoal('form')} emoji="💪" label="Підтримка" color="text-orange-500" borderColor="border-orange-500" />
            <OptionCard active={goal === 'gain'} onClick={() => setGoal('gain')} emoji="🏋️‍♀️" label="Маса" color="text-orange-500" borderColor="border-orange-500" />
          </div>
        </section>

        {/* 4. СЛАЙДЕРИ */}
        <div className="space-y-6">
          <section className="bg-slate-900/20 backdrop-blur-xl border border-white/5 rounded-[32px] p-10">
             <div className="flex justify-between items-center mb-10">
                <h3 className="font-black uppercase tracking-[2px] text-lg text-green-400">Скільки разів на тиждень?</h3>
                <div className="bg-green-500/10 px-6 py-2 rounded-xl text-green-400 font-black">{frequency} рази</div>
             </div>
             <input type="range" min="1" max="7" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500" />
          </section>

          <section className="bg-slate-900/20 backdrop-blur-xl border border-white/5 rounded-[32px] p-10">
             <div className="flex justify-between items-center mb-10">
                <h3 className="font-black uppercase tracking-[2px] text-lg text-cyan-400">Тривалість</h3>
                <div className="bg-cyan-500/10 px-6 py-2 rounded-xl text-cyan-400 font-black">{duration} хв</div>
             </div>
             <input type="range" min="15" max="120" step="15" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
          </section>
        </div>

        {/* КНОПКА ЗБЕРЕГТИ */}
        <div className="flex justify-center pt-6">
          <button 
            onClick={handleSave}
            className="bg-gradient-to-r from-cyan-400 to-green-400 px-16 py-5 rounded-[22px] text-black font-black uppercase tracking-[4px] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(34,211,238,0.4)]"
          >
             Зберегти налаштування
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionCard({ active, Icon, emoji, label, sub, color, borderColor, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`relative bg-slate-900/40 backdrop-blur-md p-8 flex flex-col items-center justify-center gap-4 rounded-[28px] cursor-pointer transition-all duration-300 border-2 ${
        active ? `${borderColor} bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]` : 'border-white/5 hover:border-white/10'
      }`}
    >
      {Icon && <Icon size={32} className={active ? color : 'text-slate-700'} />}
      {emoji && <span className="text-3xl">{emoji}</span>}
      <div className="text-center">
        <p className={`font-black uppercase tracking-[2px] text-xs ${active ? 'text-white' : 'text-slate-500'}`}>{label}</p>
        {sub && <p className="text-[10px] text-slate-600 font-bold mt-1">{sub}</p>}
      </div>
    </div>
  );
}