'use client';

import Link from 'next/link';
import { ArrowRight, Gamepad2, UserCircle2, Flame, LineChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* --- ЕФЕКТИ ФОНУ --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-20 pb-32 px-6 flex flex-col items-center text-center">
        
        {/* Логотип */}
        <div className="mb-12 relative group">
          <div className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-2xl opacity-50" />
          <div className="relative w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-[#0b0f1a] shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <span className="text-3xl font-black tracking-tighter italic font-sans uppercase">HF</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-[3px] mb-8 italic">
          <span className="text-cyan-400">✦</span> Твій шлях починається тут
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 max-w-5xl uppercase italic font-sans">
          Залиш тут усе: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            зайві кілограми
          </span> <br className="hidden md:block" /> та <span className="text-orange-500 font-black">поганий настрій.</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed italic">
          HeroFit перетворює тренування на гру, де твої зусилля в залі створюють твою цифрову легенду.
        </p>

        {/* --- КНОПКИ ДЛЯ НОВИХ КОРИСТУВАЧІВ (ВЕДУТЬ НА РЕЄСТРАЦІЮ) --- */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          {/* Головна кнопка: Розпочати подорож */}
          <Link href="/register" className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[22px] blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <button className="relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[22px] font-black uppercase text-[12px] tracking-[4px] text-white flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/20">
              Розпочати подорож <ArrowRight size={20} />
            </button>
          </Link>

          {/* Кнопка: Реєстрація */}
          <Link href="/register">
            <button className="px-12 py-6 bg-white/5 border-2 border-white/10 text-slate-400 hover:text-white font-black uppercase text-[11px] tracking-[3px] rounded-[22px] hover:border-cyan-500/50 hover:bg-white/10 transition-all active:scale-95 italic">
              Реєстрація
            </button>
          </Link>
        </div>

        {/* Preview Image */}
        <div className="mt-24 w-full max-w-5xl rounded-[45px] overflow-hidden border-4 border-white/5 shadow-[0_0_80px_-20px_rgba(34,211,238,0.2)]">
          <img 
            src="https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260" 
            alt="HeroFit Training" 
            className="w-full object-cover h-[500px]"
          />
        </div>
      </section>

      {/* --- WHY HEROFIT --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic font-sans">Чому HeroFit?</h2>
          <p className="text-slate-500 text-[11px] font-black uppercase tracking-[5px] max-w-2xl mx-auto">
            Це не про ідеальні селфі. Це про піт, силу та результат.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard Icon={Gamepad2} title="Геймифікація" desc="Тренування як рівень у грі." color="text-green-400" />
          <FeatureCard Icon={UserCircle2} title="Твій Герой" desc="Аватар росте разом з тобою." color="text-cyan-400" />
          <FeatureCard Icon={Flame} title="Fire Points" desc="Валюта за твої старання." color="text-orange-500" />
          <FeatureCard Icon={LineChart} title="Статистика" desc="Твій прогрес у цифрах." color="text-blue-500" />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 text-center px-6 relative">
        <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase italic tracking-tighter leading-none font-sans">
          Стань <span className="text-cyan-400 font-black">Героєм</span> <br /> вже сьогодні
        </h2>
        <Link href="/register" className="inline-flex px-12 py-6 bg-gradient-to-r from-orange-500 to-green-400 text-black font-black rounded-[24px] text-xl uppercase italic tracking-tighter hover:scale-110 transition-all shadow-2xl">
          Створити акаунт <ArrowRight className="ml-3" size={24} />
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ Icon, title, desc, color }: any) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-10 rounded-[40px] hover:border-cyan-500/30 transition-all group">
      <div className={`w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${color}`}>
        <Icon className="size-7" />
      </div>
      <h3 className="text-xl font-black uppercase italic mb-4 font-sans">{title}</h3>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">{desc}</p>
    </div>
  );
}