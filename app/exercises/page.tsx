'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, Heart, Zap, Timer, BrainCircuit, Target, Settings, X 
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'Всі', Icon: BrainCircuit },
  { id: 'Кардіо', name: 'Кардіо', Icon: Heart },
  { id: 'Йога', name: 'Йога', Icon: Target },
  { id: 'Сила', name: 'Сила', Icon: Dumbbell },
];

// Твій список вправ (я додав поле video_url до кожної, щоб воно відкривалось)
const exercises = [
  {
    id: 1,
    title: 'HIIT Кардіо Вибух',
    category: 'Кардіо',
    duration: '30 хв',
    xp: '150',
    difficulty: 'Важко',
    diffColor: 'bg-orange-500',
    video_url: 'https://www.youtube.com/embed/ml6cT4AZdqI', 
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
    video_url: 'https://www.youtube.com/embed/v7AYKMP6rOE',
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
    video_url: 'https://www.youtube.com/embed/1919eTCo-yU',
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
    video_url: 'https://www.youtube.com/embed/X0qCAtBQ3S4',
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
    video_url: 'https://www.youtube.com/embed/g_tea8ZNk5A',
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
    video_url: 'https://www.youtube.com/embed/L6q9vJAsu_U',
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
    video_url: 'https://www.youtube.com/embed/M6S_0C_YyHw',
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
    video_url: 'https://www.youtube.com/embed/Nnd5Slo02us',
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
    video_url: 'https://www.youtube.com/embed/2Y88uUuVvM8',
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
    video_url: 'https://www.youtube.com/embed/mK9K1m-rZ0U',
    img: 'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  // ДОДАНО: Стейт для модального вікна та завантаження
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ТВОЯ ОРИГІНАЛЬНА ЛОГІКА (ЗБЕРЕЖЕНО)
  const handleExerciseClick = (ex: any) => {
    const today = new Date().toISOString().split('T')[0];
    const history = JSON.parse(localStorage.getItem('video_history') || '{}');
    history[today] = (history[today] || 0) + 1;
    localStorage.setItem('video_history', JSON.stringify(history));

    const currentStats = JSON.parse(localStorage.getItem('hero_stats') || '{"level":1,"xp":0,"firePoints":0,"workouts":0,"streak":0}');
    const newStats = {
      ...currentStats,
      workouts: (currentStats.workouts || 0) + 1,
      firePoints: (currentStats.firePoints || 0) + 50,
      xp: (currentStats.xp || 0) + parseInt(ex.xp), 
    };

    if (newStats.xp >= newStats.level * 1000) {
      newStats.level += 1;
      alert(`🔥 LEVEL UP! Вітаємо, Анастасію! Тепер ти ${newStats.level} рівня!`);
    }

    localStorage.setItem('hero_stats', JSON.stringify(newStats));
    
    // ТЕПЕР ЗАМІСТЬ ПРОСТОГО ALERT — ВІДКРИВАЄМО МОДАЛКУ
    setSelectedExercise(ex);
  };

  // НОВА ФУНКЦІЯ: ЗАПИТ ДО БЕКЕНДУ ПРИ ЗАВЕРШЕННІ
  const handleCompleteOnBackend = async () => {
    if (!selectedExercise) return;
    setIsLoading(true);
    
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/exercises/${selectedExercise.id}/complete/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(`✅ ВИКОНАНО: ${selectedExercise.title}!\nТвій рівень в базі: ${data.current_level}\nСила героя: ${data.current_strength}`);
        setSelectedExercise(null); // Закриваємо модалку
      } else {
        alert("Помилка! Можливо, термін дії токена закінчився. Перезайдіть у профіль.");
      }
    } catch (error) {
      console.error("Помилка запиту:", error);
      alert("Не вдалося з'єднатися з сервером Django.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExercises = activeTab === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden">
      
      {/* Заголовок (Без змін) */}
      <header className="mb-10 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tighter uppercase italic leading-none">Бібліотека <span className="text-cyan-400">Вправ</span></h1>
        <p className="text-slate-500 text-lg font-bold uppercase tracking-widest opacity-70">Оберіть своє тренування та стань легендою</p>
      </header>

      {/* Перемикачі режимів (Без змін) */}
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

      {/* Фільтри категорій (Без змін) */}
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

      {/* Сітка карток (Логіка кліку оновлена) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredExercises.map((ex) => (
          <div 
            key={ex.id} 
            onClick={() => handleExerciseClick(ex)}
            className="group relative h-80 rounded-[35px] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer shadow-2xl"
          >
            <img src={ex.img} alt={ex.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <div className={`w-2 h-2 rounded-full ${ex.diffColor} shadow-[0_0_8px_currentColor]`}></div>
              <span className="text-[10px] font-black uppercase tracking-widest">{ex.difficulty}</span>
            </div>

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

      {/* --- ДОДАНО: МОДАЛЬНЕ ВІКНО З ВІДЕО --- */}
      {selectedExercise && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all">
          <div className="relative bg-[#0f172a] border border-white/10 w-full max-w-3xl rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.15)]">
            
            {/* Кнопка закрити */}
            <button 
              onClick={() => setSelectedExercise(null)}
              className="absolute top-6 right-6 z-10 bg-white/5 hover:bg-red-500/20 hover:text-red-500 p-3 rounded-2xl transition-all border border-white/5"
            >
              <X size={24} />
            </button>

            {/* Відео */}
            <div className="aspect-video w-full bg-black shadow-inner">
              <iframe
                width="100%"
                height="100%"
                src={selectedExercise.video_url}
                title="Training Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="opacity-90"
              ></iframe>
            </div>

            {/* Опис та Кнопка Завершити */}
            <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-b from-[#161b2a] to-[#0b0f1a]">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-black italic uppercase mb-1 tracking-tight">{selectedExercise.title}</h2>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                   <span className="text-cyan-400 font-black uppercase tracking-widest text-[10px]">Винагорода:</span>
                   <div className="flex items-center gap-1 text-orange-500">
                      <Zap size={14} />
                      <span className="font-black text-xs">+{selectedExercise.xp} XP</span>
                   </div>
                </div>
              </div>

              <button
                onClick={handleCompleteOnBackend}
                disabled={isLoading}
                className="w-full md:w-auto bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase tracking-[1px] text-xs px-12 py-5 rounded-[20px] transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Збереження...' : 'Завершити тренування ✅'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}