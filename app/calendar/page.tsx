'use client';

import { useEffect, useState } from 'react'; // ДОДАНО useEffect
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Flame, TrendingUp, Target, Zap, Activity
} from 'lucide-react';

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date());
  
  // 1. ДОДАНО: Стан для реальної історії та статистики
  const [history, setHistory] = useState<Record<string, number>>({});
  const [heroStats, setHeroStats] = useState({ firePoints: 0, workouts: 0 });

  useEffect(() => {
    // Зчитуємо дані з localStorage
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('video_history');
      const savedStats = localStorage.getItem('hero_stats');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedStats) setHeroStats(JSON.parse(savedStats));
    }
  }, []);

  const stats = [
    { label: 'Всього тренувань', value: heroStats.workouts.toString(), Icon: Zap, color: 'text-cyan-400' },
    { label: 'Fire балів зароблено', value: heroStats.firePoints.toLocaleString(), Icon: Flame, color: 'text-orange-500' },
    { label: 'Середньо на місяць', value: Math.round(heroStats.workouts / 12 || 0).toString(), Icon: TrendingUp, color: 'text-green-400' },
  ];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstDayIdx = new Date(year, month, 1).getDay();
  firstDayIdx = firstDayIdx === 0 ? 6 : firstDayIdx - 1; 

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 2. ДОДАНО: Логіка розрахунку статистики саме за ПОТОЧНИЙ МІСЯЦЬ
  const currentMonthHistory = Object.entries(history).filter(([date]) => {
    return date.startsWith(`${year}-${(month + 1).toString().padStart(2, '0')}`);
  });
  const monthWorkouts = currentMonthHistory.length;
  const monthFirePoints = monthWorkouts * 50; // Припустимо 50 за кожне тренування

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToToday = () => setViewDate(new Date());

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden selection:bg-green-500/30">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-green-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      <header className="mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter uppercase italic flex items-center gap-4 leading-none">
          <CalendarIcon className="text-green-400" size={32} /> Календар <span className="text-green-400">Прогресу</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] opacity-80 leading-relaxed italic">
          Відстежуй свої тренування та досягнення протягом року! 🗓️
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all shadow-2xl relative overflow-hidden group">
            <div className="glass-reflection" />
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[2px] text-slate-500 mb-5 italic">
              <s.Icon size={16} className={s.color} /> {s.label}
            </div>
            <div className="text-4xl font-black tracking-tighter group-hover:scale-105 transition-transform duration-500 uppercase italic">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
        
        <div className="lg:col-span-2 glass-card rounded-[40px] p-8 md:p-12 shadow-2xl relative border border-white/5 bg-slate-900/10 backdrop-blur-3xl">
          <div className="glass-reflection" />
          <div className="flex justify-between items-center mb-12 px-2">
            <h2 className="text-2xl font-black lowercase tracking-tighter text-white first-letter:uppercase italic">{monthName}</h2>
            <div className="flex items-center gap-5">
              <button onClick={prevMonth} className="text-slate-500 hover:text-white transition-all"><ChevronLeft size={24} /></button>
              <button 
                onClick={goToToday} 
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black px-6 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl italic"
              >
                Сьогодні
              </button>
              <button onClick={nextMonth} className="text-slate-500 hover:text-white transition-all"><ChevronRight size={24} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-8 text-center">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map(d => (
              <div key={d} className="text-[10px] font-black uppercase tracking-[3px] text-slate-600 italic">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3 md:gap-5">
            {Array.from({ length: firstDayIdx }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square opacity-0"></div>
            ))}
            
            {days.map(d => {
              // 3. ДОДАНО: Перевірка реального статусу з історії
              const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
              const views = history[dateKey] || 0;
              
              let status = views >= 3 ? 'high' : views === 2 ? 'medium' : views === 1 ? 'low' : 'none';
              
              const todayStr = new Date().toISOString().split('T')[0];
              const isToday = dateKey === todayStr;
              
              return (
                <div 
                  key={d} 
                  title={`${dateKey}: ${views} відео`}
                  className={`aspect-square rounded-[22px] flex flex-col items-center justify-center text-sm font-black transition-all relative border-2 cursor-help
                    ${status === 'high' ? 'bg-green-500 text-slate-900 border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.3)] scale-105' : 
                      status === 'medium' ? 'bg-green-500/40 text-green-100 border-green-500/20' : 
                      status === 'low' ? 'bg-green-500/10 text-green-400 border-green-500/10' : 
                      'bg-slate-900/40 text-slate-600 border-white/5 hover:border-white/10 hover:bg-slate-800'}
                    ${isToday ? 'border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] bg-slate-900/60' : ''}
                  `}
                >
                  {d}
                  {status === 'high' && (
                    <div className="absolute bottom-2.5 flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-slate-900/40"></div>
                      <div className="w-1 h-1 rounded-full bg-slate-900/40"></div>
                    </div>
                  )}
                  {isToday && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>}
                </div>
              );
            })}
          </div>

          <div className="mt-14 pt-10 border-t border-white/5 flex flex-wrap items-center gap-8">
            <span className="text-[10px] font-black uppercase text-slate-600 tracking-[3px] italic">Інтенсивність:</span>
            <LegendItem color="bg-slate-900/60 border-white/5" label="Немає" />
            <LegendItem color="bg-green-500/10 border-green-500/10" label="Низька (1)" />
            <LegendItem color="bg-green-500/40 border-green-500/20" label="Середня (2)" />
            <LegendItem color="bg-green-500 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]" label="Висока (3+)" />
          </div>
        </div>

        <div className="space-y-8 w-full">
          <div className="glass-card rounded-[40px] p-10 border border-white/5 shadow-2xl relative">
            <div className="glass-reflection" />
            <h3 className="text-lg font-black mb-10 uppercase tracking-tighter italic text-white/90 underline decoration-green-500/50 underline-offset-8">Статистика місяця</h3>
            <div className="space-y-6">
              {/* 4. ДОДАНО: Відображення реальної статистики місяця */}
              <StatRow label="Тренувань (відео)" value={monthWorkouts.toString()} />
              <StatRow label="Активних днів" value={monthWorkouts.toString()} />
              <StatRow label="Fire балів" value={monthFirePoints.toString()} color="text-orange-500" />
              <StatRow label="Загальний час" value={`${monthWorkouts * 20}хв`} color="text-cyan-400" />
            </div>
          </div>

          <div className="glass-card rounded-[40px] p-10 min-h-[320px] border border-white/5 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
            <div className="glass-reflection" />
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500">
               <Target size={32} className="text-green-400 opacity-80" />
            </div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[2px] mb-3 italic">Досягнення</h4>
            <p className="text-[10px] font-bold text-slate-500 leading-relaxed max-w-[180px] uppercase tracking-widest opacity-80 italic">
              {monthWorkouts >= 5 ? "Ти супер-активна цього місяця! 🏆" : "Продовжуй тренуватися, щоб отримати нагороди! 🚀"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// РЕШТА КОМПОНЕНТІВ (StatRow, LegendItem) ЗАЛИШАЮТЬСЯ БЕЗ ЗМІН
function StatRow({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/5 pb-5">
      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">{label}</span>
      <span className={`text-2xl font-black tracking-tighter leading-none italic uppercase ${color}`}>{value}</span>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-600 tracking-widest italic">
      <div className={`w-5 h-5 rounded-lg border ${color}`}></div> {label}
    </div>
  );
}