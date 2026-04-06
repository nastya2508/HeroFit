'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const characters = [
  {
    id: 'skinny',
    title: 'Худенький',
    desc: 'Початковий рівень, потребує набору маси',
    color: 'border-cyan-400',
    shadow: 'shadow-[0_0_40px_rgba(34,211,238,0.4)]',
    icon: '👤' 
  },
  {
    id: 'normal',
    title: 'Звичайний',
    desc: 'Середня форма, є потенціал для росту',
    color: 'border-green-400',
    shadow: 'shadow-[0_0_40px_rgba(74,222,128,0.4)]',
    icon: '🧍'
  },
  {
    id: 'full',
    title: 'Повненький',
    desc: 'Є запас енергії, фокус на спалюванні жиру',
    color: 'border-orange-500',
    shadow: 'shadow-[0_0_40px_rgba(249,115,22,0.4)]',
    icon: '🤰'
  }
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(1); 
  const router = useRouter(); // Додаємо штурвал для навігації

  const next = () => setIndex((prev) => (prev + 1) % characters.length);
  const prev = () => setIndex((prev) => (prev - 1 + characters.length) % characters.length);

  const current = characters[index];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-8 transition-colors duration-700">
      {/* Лого */}
      <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-400 mb-8 shadow-[0_0_15px_rgba(34,211,238,0.4)]">HF</div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase tracking-tighter">
        Оберіть ваш <span className="text-green-400 underline decoration-cyan-400">Початковий Стан</span>
      </h1>
      <p className="text-slate-400 text-center max-w-md mb-12 italic">
        Це ваша стартова точка. Ваш аватар буде еволюціонувати разом з вашим прогресом! 💪
      </p>

      {/* Слайдер */}
      <div className="relative w-full max-w-lg flex items-center justify-center bg-slate-800/20 rounded-[40px] p-12 border border-slate-700/50 backdrop-blur-md shadow-2xl">
        
        {/* Стрілка вліво */}
        <button 
          onClick={prev} 
          className="absolute left-6 w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center hover:border-green-400 hover:text-green-400 transition-all active:scale-90 z-10"
        >
          <span className="text-2xl">←</span>
        </button>
        
        <div className="flex flex-col items-center transition-all duration-500 transform scale-110">
          <div className={`w-48 h-48 rounded-full border-4 ${current.color} ${current.shadow} flex items-center justify-center bg-slate-900/80 mb-8 overflow-hidden transition-all duration-500`}>
            <span className="text-8xl filter drop-shadow-lg">{current.icon}</span>
          </div>
          
          <h2 className="text-3xl font-black mb-2 tracking-tight uppercase">{current.title}</h2>
          <p className="text-slate-400 text-center text-sm font-medium">{current.desc}</p>
        </div>

        {/* Стрілка вправо */}
        <button 
          onClick={next} 
          className="absolute right-6 w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center hover:border-green-400 hover:text-green-400 transition-all active:scale-90 z-10"
        >
          <span className="text-2xl">→</span>
        </button>
        
        {/* Крапки прогресу */}
        <div className="absolute bottom-8 flex gap-3">
          {characters.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-10 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'w-2 bg-slate-600'}`} 
            />
          ))}
        </div>
      </div>

      {/* Блок пояснення */}
      <div className="mt-10 w-full max-w-lg bg-slate-800/40 border border-slate-700 rounded-[24px] p-6 backdrop-blur-sm">
        <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
          <span className="animate-pulse">⚡</span> Як працює еволюція аватара?
        </h3>
        <ul className="text-sm text-slate-300 space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">▹</span> 
            Завершуйте тренування та збирайте Fire бали
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">▹</span> 
            Ваш аватар автоматично еволюціонує з вашим прогресом
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">▹</span> 
            Досягайте нових рівнів: Підтягнутий → Накачаний → Атлетичний
          </li>
        </ul>
      </div>

      {/* Велика кнопка Підтвердження */}
      <button 
        onClick={() => {
          // 1. Зберігаємо вибір аватара в пам'ять браузера
          localStorage.setItem('hero_avatar', current.id);
          // 2. Переходимо на сторінку ГОЛОВНОЇ ПАНЕЛІ (Dashboard)
          router.push('/dashboard'); 
        }}
        className="mt-10 w-full max-w-lg bg-gradient-to-r from-orange-500 to-green-400 text-slate-950 font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-lg"
      >
        ✓ Підтвердити та почати подорож
      </button>

      <p className="mt-8 text-[10px] text-slate-500 uppercase tracking-widest text-center">
        Це ваш єдиний шанс вибрати початковий стан. <br/>
        Далі все залежить від вашої дисципліни! 🔥
      </p>
    </div>
  );
}