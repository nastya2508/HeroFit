'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, Heart, Zap, Timer, BrainCircuit, Target, Settings 
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'Всі', Icon: BrainCircuit },
  { id: 'Кардіо', name: 'Кардіо', Icon: Heart },
  { id: 'Йога', name: 'Йога', Icon: Target },
  { id: 'Сила', name: 'Сила', Icon: Dumbbell },
];

const exercises = [
  {
    id: 1,
    title: 'HIIT Кардіо Вибух',
    category: 'Кардіо',
    duration: '30 хв',
    xp: '150',
    difficulty: 'Важко',
    diffColor: 'bg-orange-500',
    img: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Ранковий Потік Енергії',
    category: 'Йога',
    duration: '20 хв',
    xp: '80',
    difficulty: 'Легко',
    diffColor: 'bg-green-500',
    img: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Сталевий Прес',
    category: 'Сила',
    duration: '15 хв',
    xp: '120',
    difficulty: 'Середнє',
    diffColor: 'bg-cyan-400',
    img: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'Потужний Присід',
    category: 'Сила',
    duration: '45 хв',
    xp: '200',
    difficulty: 'Важко',
    diffColor: 'bg-red-600',
    img: 'https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    title: 'Вечірня Розтяжка',
    category: 'Йога',
    duration: '15 хв',
    xp: '60',
    difficulty: 'Легко',
    diffColor: 'bg-green-400',
    img: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    title: 'Табата на витривалість',
    category: 'Кардіо',
    duration: '25 хв',
    xp: '180',
    difficulty: 'Важко',
    diffColor: 'bg-orange-600',
    img: 'https://images.pexels.com/photos/3763717/pexels-photo-3763717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 7,
    title: 'Вибухове Кроссфіт Тренування',
    category: 'Сила',
    duration: '40 хв',
    xp: '250',
    difficulty: 'Важко',
    diffColor: 'bg-red-600',
    img: 'https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 8,
    title: 'Йога: Баланс та Спокій',
    category: 'Йога',
    duration: '25 хв',
    xp: '100',
    difficulty: 'Легко',
    diffColor: 'bg-green-500',
    img: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 10,
    title: 'Функціональний Тренінг',
    category: 'Сила',
    duration: '35 хв',
    xp: '200',
    difficulty: 'Важко',
    diffColor: 'bg-orange-600',
    img: 'https://images.pexels.com/photos/2261146/pexels-photo-2261146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 12,
    title: 'Бокс: Інтенсивне Кардіо',
    category: 'Кардіо',
    duration: '45 хв',
    xp: '300',
    difficulty: 'Екстремально',
    diffColor: 'bg-purple-600',
    img: 'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState('all');

  // НОВА ЛОГІКА: Клік по вправі оновлює статистику та календар
  const handleExerciseClick = (ex: any) => {
    const today = new Date().toISOString().split('T')[0];

    // 1. Оновлюємо історію для теплової карти (календаря)
    const history = JSON.parse(localStorage.getItem('video_history') || '{}');
    history[today] = (history[today] || 0) + 1;
    localStorage.setItem('video_history', JSON.stringify(history));

    // 2. Оновлюємо загальну статистику героя
    const currentStats = JSON.parse(localStorage.getItem('hero_stats') || '{"level":1,"xp":0,"firePoints":0,"workouts":0,"streak":0}');
    
    const newStats = {
      ...currentStats,
      workouts: (currentStats.workouts || 0) + 1,
      firePoints: (currentStats.firePoints || 0) + 50,
      xp: (currentStats.xp || 0) + parseInt(ex.xp), 
    };

    // Логіка підвищення рівня
    if (newStats.xp >= newStats.level * 1000) {
      newStats.level += 1;
      alert(`🔥 LEVEL UP! Вітаємо, Анастасію! Тепер ти ${newStats.level} рівня!`);
    }

    localStorage.setItem('hero_stats', JSON.stringify(newStats));
    alert(`✅ Виконано: ${ex.title}! +${ex.xp} XP зараховано.`);
  };

  const filteredExercises = activeTab === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden">
      
      {/* Заголовок */}
      <header className="mb-10 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tighter uppercase italic leading-none">Бібліотека <span className="text-cyan-400">Вправ</span></h1>
        <p className="text-slate-500 text-lg font-bold uppercase tracking-widest opacity-70">Оберіть своє тренування та стань легендою</p>
      </header>

      {/* Перемикачі режимів */}
      <div className="flex gap-4 mb-8 relative z-10">
        <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[2px] text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          <Dumbbell size={16} /> Вправи
        </button>
        
        <Link 
          href="/preferences" 
          className="flex items-center gap-3 text-slate-500 px-6 py-3 text-[10px] font-black uppercase tracking-[2px] hover:text-white hover:bg-white/5 rounded-2xl transition-all cursor-pointer"
        >
          <Settings size={16} /> Мої Переваги
        </Link>
      </div>

      {/* Фільтри категорій */}
      <div className="flex gap-3 mb-12 overflow-x-auto no-scrollbar py-2 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap border ${
              activeTab === cat.id 
                ? 'bg-[#4ade80] text-black shadow-[0_0_20px_rgba(74,222,128,0.4)]' 
                : 'bg-slate-900/20 text-slate-400 border-white/5 backdrop-blur-md hover:border-slate-600'
            }`}
          >
            <cat.Icon size={18} className={activeTab === cat.id ? 'text-black' : 'text-slate-500'} />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Сітка карток */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredExercises.map((ex) => (
          <div 
            key={ex.id} 
            onClick={() => handleExerciseClick(ex)}
            className="group relative h-80 rounded-[35px] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer shadow-2xl"
          >
            
            {/* Картинка на весь фон */}
            <img src={ex.img} alt={ex.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100 transition-opacity" />
            
            {/* Темний градієнт */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            
            {/* Badge складності */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <div className={`w-2 h-2 rounded-full ${ex.diffColor} shadow-[0_0_8px_currentColor]`}></div>
              <span className="text-[10px] font-black uppercase tracking-widest">{ex.difficulty}</span>
            </div>

            {/* Контент внизу картки */}
            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-[3px] opacity-80 italic">{ex.category}</span>
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight italic uppercase">{ex.title}</h3>
              
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Timer size={16} className="opacity-60" />
                  <span className="text-sm font-bold tracking-tight">{ex.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-1.5 rounded-2xl border border-orange-500/30">
                  <Zap size={16} className="text-orange-500" />
                  <span className="text-orange-500 font-black text-sm tracking-tighter">+{ex.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}