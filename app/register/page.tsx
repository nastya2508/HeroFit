'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Залишаємо тільки цей імпорт

export default function RegisterPage() {
  const [gender, setGender] = useState('male');
  const router = useRouter(); // ОБОВ'ЯЗКОВО ДОДАЄМО ЦЕЙ РЯДОК ТУТ!

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-[32px] p-8 shadow-2xl mt-10">
        
        {/* Лого */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            HF
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider text-cyan-400">HeroFit</h2>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2">Створити акаунт</h1>
        <p className="text-slate-400 text-center mb-8 text-sm">Почніть свою подорож до героя</p>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 uppercase">Ім'я</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">👤</span>
              <input type="text" placeholder="Ваше ім'я" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 uppercase">Email</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">📧</span>
              <input type="email" placeholder="ваш@email.com" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 uppercase">Пароль</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔒</span>
                <input type="password" placeholder="Мін. 6" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-2 text-white focus:border-cyan-500 outline-none text-xs transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 uppercase text-nowrap">Підтвердити</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔒</span>
                <input type="password" placeholder="Повторіть" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-2 text-white focus:border-cyan-500 outline-none text-xs transition-all" />
              </div>
            </div>
          </div>

          {/* Вибір статі */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3 ml-1 uppercase">Стать</label>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setGender('male')} className={`py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${gender === 'male' ? 'border-green-400 bg-green-400/10' : 'border-slate-700 bg-slate-900/40 opacity-60'}`}>
                <span className="text-2xl">👦</span>
                <span className="text-white text-xs font-bold">Герой</span>
              </button>
              <button type="button" onClick={() => setGender('female')} className={`py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${gender === 'female' ? 'border-green-400 bg-green-400/10' : 'border-slate-700 bg-slate-900/40 opacity-60'}`}>
                <span className="text-2xl">👧</span>
                <span className="text-white text-xs font-bold">Героїня</span>
              </button>
            </div>
          </div>

         {/* Кнопка реєстрації */}
          <button 
            type="button" 
            onClick={() => router.push('/onboarding')} 
            className="w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-green-400 hover:brightness-110 text-slate-900 font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(74,222,128,0.3)] mt-6 uppercase text-sm active:scale-95"
          >
            Зареєструватися <span>→</span>
          </button>

          {/* Список переваг */}
          <div className="mt-8 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
               <span className="text-green-400 font-bold">✔</span> Відстежуйте свій прогрес
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
               <span className="text-green-400 font-bold">✔</span> Заробляйте Fire бали
            </div>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-[#1b253b] px-4 text-slate-500">або</span></div>
        </div>

        <p className="text-center text-slate-400 text-sm">
          Вже є акаунт? <Link href="/login" className="text-green-400 hover:underline font-bold">Увійти</Link>
        </p>
      </div>
    </div>
  );
}