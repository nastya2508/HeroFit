'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const characters = [
  {
    id: 'chubby',
    title: 'Пухленький',
    desc: 'Є запас енергії, фокус на спалюванні жиру',
    color: 'border-orange-500',
    shadow: 'shadow-[0_0_40px_rgba(249,115,22,0.4)]',
    image: '/heroes/mascot_chubby.png' 
  },
  {
    id: 'normal',
    title: 'Звичайний',
    desc: 'Середня форма, є потенціал для росту',
    color: 'border-green-400',
    shadow: 'shadow-[0_0_40px_rgba(74,222,128,0.4)]',
    image: '/heroes/mascot_normal.png'
  },
  {
    id: 'fit',
    title: 'Накачаний',
    desc: 'Чудова форма, фокус на рельєфі та силі',
    color: 'border-cyan-400',
    shadow: 'shadow-[0_0_40px_rgba(34,211,238,0.4)]',
    image: '/heroes/mascot_fit.png'
  }
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(1); 
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % characters.length);
  const prev = () => setIndex((prev) => (prev - 1 + characters.length) % characters.length);

  const current = characters[index];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-8 transition-colors duration-700">
      {/* Лого */}
      <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-400 mb-8 shadow-[0_0_15px_rgba(34,211,238,0.4)]">HF</div>

      <h1 className="text-3xl md:text-4xl font-black text-center mb-4 uppercase tracking-tighter italic">
        Оберіть ваш <span className="text-green-400 underline decoration-cyan-400">Початковий Стан</span>
      </h1>
      <p className="text-slate-400 text-center max-w-md mb-12 italic uppercase text-[10px] tracking-[3px]">
        Твій аватар буде еволюціонувати разом з тобою! 💪
      </p>

      {/* СЛАЙДЕР З МАСКОТАМИ */}
      <div className="relative w-full max-w-lg flex items-center justify-center bg-slate-800/20 rounded-[40px] p-12 border border-slate-700/50 backdrop-blur-md shadow-2xl">
        
        <button 
          onClick={prev} 
          className="absolute left-6 w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center hover:border-green-400 hover:text-green-400 transition-all active:scale-90 z-10"
        >
          <span className="text-2xl">←</span>
        </button>
        
        <div className="flex flex-col items-center transition-all duration-500 transform scale-110">
          <div className={`w-56 h-56 rounded-full border-4 ${current.color} ${current.shadow} flex items-center justify-center bg-slate-900/80 mb-8 overflow-hidden transition-all duration-500 p-4`}>
            {/* ТВОЯ КАРТИНКА ТУТ */}
            <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          
          <h2 className="text-3xl font-black mb-2 tracking-tight uppercase italic">{current.title}</h2>
          <p className="text-slate-400 text-center text-[11px] font-black uppercase tracking-widest leading-relaxed">{current.desc}</p>
        </div>

        <button 
          onClick={next} 
          className="absolute right-6 w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center hover:border-green-400 hover:text-green-400 transition-all active:scale-90 z-10"
        >
          <span className="text-2xl">→</span>
        </button>
        
        <div className="absolute bottom-8 flex gap-3">
          {characters.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-10 bg-green-400' : 'w-2 bg-slate-600'}`} 
            />
          ))}
        </div>
      </div>

      {/* Блок пояснення */}
      <div className="mt-10 w-full max-w-lg bg-slate-800/40 border border-slate-700 rounded-[24px] p-6 backdrop-blur-sm">
        <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
          <span className="animate-pulse">⚡</span> Як працює еволюція?
        </h3>
        <ul className="text-[10px] text-slate-300 space-y-3 font-black uppercase tracking-wider">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">▹</span> Завершуйте тренування та збирайте Fire бали
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">▹</span> Досягайте нових рівнів для прокачки героя
          </li>
        </ul>
      </div>

      <button 
        onClick={() => {
          // Зберігаємо ПОВНИЙ ШЛЯХ до картинки, щоб потім легко її малювати
          localStorage.setItem('hero_avatar', current.image);
          router.push('/dashboard'); 
        }}
        className="mt-10 w-full max-w-lg bg-gradient-to-r from-orange-500 to-green-400 text-slate-950 font-black py-6 rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[4px] text-sm"
      >
        Підтвердити вибір
      </button>

      <p className="mt-8 text-[9px] text-slate-500 uppercase tracking-[4px] text-center italic opacity-60">
        Твоя дисципліна — твоя сила 🔥
      </p>
    </div>
  );
}