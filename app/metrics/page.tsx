'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Scale, Ruler, Zap, Dumbbell, Heart, 
  Calendar, Plus, ChevronRight, X, TrendingDown, TrendingUp 
} from 'lucide-react';

export default function MetricsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history, setHistory] = useState([
    { id: 1, date: '31 березня 2026', weight: 79.0, fat: 14, chest: 107, waist: 78, hips: 93, biceps: 42.5, legs: 62 },
    { id: 2, date: '15 березня 2026', weight: 79.5, fat: 14, chest: 107, waist: 78.5, hips: 93.5, biceps: 42.0, legs: 61.8 },
    { id: 3, date: '01 березня 2026', weight: 80.0, fat: 15, chest: 106, waist: 79, hips: 94, biceps: 41.8, legs: 61.5 },
    { id: 4, date: '15 лютого 2026', weight: 81.0, fat: 17, chest: 105, waist: 80, hips: 95, biceps: 41.5, legs: 61.0 },
    { id: 5, date: '01 лютого 2026', weight: 82.0, fat: 18, chest: 104, waist: 81, hips: 96, biceps: 41.0, legs: 60.5 },
  ]);

  const [formData, setFormData] = useState({
    weight: '', fat: '', chest: '', waist: '', hips: '', biceps: '', legs: ''
  });

  const latest = history[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }),
      weight: parseFloat(formData.weight) || latest.weight,
      fat: parseFloat(formData.fat) || latest.fat,
      chest: parseFloat(formData.chest) || latest.chest,
      waist: parseFloat(formData.waist) || latest.waist,
      hips: parseFloat(formData.hips) || latest.hips,
      biceps: parseFloat(formData.biceps) || latest.biceps,
      legs: parseFloat(formData.legs) || latest.legs,
    };
    setHistory([newEntry, ...history]);
    setIsModalOpen(false);
    setFormData({ weight: '', fat: '', chest: '', waist: '', hips: '', biceps: '', legs: '' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden">
      
      {/* Фонові градієнти */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter uppercase italic flex items-center gap-4">
              <Scale className="text-cyan-400" size={32} /> ТРЕКЕР ЗАМІРІВ
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] opacity-80">
              Відстежуй зміни свого тіла та досягай ідеальної форми!
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-95 flex items-center gap-2"
          >
            <Plus size={18} /> Додати заміри
          </button>
        </header>

        {/* МЕТРИКИ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard label="Вага" val={latest.weight} unit="кг" Icon={Scale} trend="6.0" color="text-cyan-400" active={true} />
          <MetricCard label="Груди" val={latest.chest} unit="см" Icon={Ruler} trend="1.0" color="text-slate-400" />
          <MetricCard label="Талія" val={latest.waist} unit="см" Icon={Ruler} trend="10.0" color="text-cyan-400" />
          <MetricCard label="Стегна" val={latest.hips} unit="см" Icon={Ruler} trend="5.0" color="text-slate-400" />
          <MetricCard label="Біцепс" val={latest.biceps} unit="см" Icon={Zap} trend="4.5" color="text-green-400" isUp={true} />
          <MetricCard label="Ноги" val={latest.legs} unit="см" Icon={Dumbbell} trend="4.0" color="text-green-400" isUp={true} />
          <MetricCard label="Жир" val={latest.fat} unit="%" Icon={Heart} trend="8.0" color="text-cyan-400" />
        </div>

        {/* ГРАФІК (Figma Style) */}
        <section className="glass-card p-10 rounded-[40px] border border-white/5 mb-12 relative overflow-hidden">
          <div className="glass-reflection" />
          <div className="flex justify-between items-center mb-12">
            <h3 className="font-black uppercase tracking-[2px] text-lg italic text-white">Вага - <span className="text-cyan-400">Прогрес</span></h3>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{history.length} записів</span>
          </div>
          
          <div className="h-72 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0 40 Q 250 30, 500 50 T 1000 60 V 200 H 0 Z" 
                fill="url(#chartGradient)" 
              />
              <path 
                d="M0 40 Q 250 30, 500 50 T 1000 60" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="4" 
                className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              />
            </svg>
            <div className="flex justify-between mt-8 text-[9px] font-black text-slate-600 uppercase tracking-[3px]">
              <span>01 січ</span><span>15 січ</span><span>01 лют</span><span>15 лют</span><span>01 бер</span><span>15 бер</span><span>31 бер</span>
            </div>
          </div>
        </section>

        {/* ІСТОРІЯ */}
        <section className="glass-card rounded-[40px] border border-white/5 overflow-hidden shadow-2xl relative">
          <div className="glass-reflection" />
          <div className="p-8 border-b border-white/5 bg-white/[0.01]">
            <h3 className="font-black uppercase tracking-[2px] text-lg italic">Останні заміри</h3>
          </div>
          
          <div className="divide-y divide-white/5">
            {history.map((h) => (
              <div key={h.id} className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 text-slate-500 group-hover:text-cyan-400 transition-colors">
                    <Calendar size={18} />
                  </div>
                  <span className="font-black text-sm uppercase tracking-tight text-slate-200">{h.date}</span>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-end gap-10">
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-white font-black text-lg">{h.weight} кг</span>
                    <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest mt-1">Вага</span>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-orange-500 font-black text-lg">{h.fat} %</span>
                    <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest mt-1">Жир</span>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-cyan-400 font-black text-lg">{h.chest} см</span>
                    <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest mt-1">Груди</span>
                  </div>
                  <button className="p-3 text-slate-700 hover:text-white transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* МОДАЛКА (Стиль Figma) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60">
          <div className="relative glass-card border-white/10 w-full max-w-xl rounded-[45px] p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">Нові заміри</h2>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-10 opacity-70">Введіть дані для оновлення прогресу</p>
            
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <Inp L="Вага (кг)" V={formData.weight} S={(v: any) => setFormData({...formData, weight: v})} />
                <Inp L="% Жиру" V={formData.fat} S={(v: any) => setFormData({...formData, fat: v})} />
                <Inp L="Груди (см)" V={formData.chest} S={(v: any) => setFormData({...formData, chest: v})}/>
                <Inp L="Талія (см)" V={formData.waist} S={(v: any) => setFormData({...formData, waist: v})} />
                <Inp L="Стегна (см)" V={formData.hips} S={(v: any) => setFormData({...formData, hips: v})} />
                <Inp L="Біцепс (см)" V={formData.biceps} S={(v: any) => setFormData({...formData, biceps: v})} />
              </div>
              <Inp L="Ноги (см)" V={formData.legs} S={(v: any) => setFormData({...formData, legs: v})} />
              <button type="submit" className="w-full bg-cyan-400 text-black font-black py-5 rounded-[24px] shadow-2xl hover:bg-cyan-300 transition-all uppercase tracking-[4px] text-[12px] mt-4 shadow-cyan-400/20 active:scale-95">
                Зберегти зміни
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, val, unit, Icon, trend, color, active, isUp }: any) {
  return (
    <div className={`glass-card p-8 rounded-[32px] border transition-all hover:scale-[1.02] relative group ${active ? 'border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.1)]' : 'border-white/5'}`}>
      <div className="glass-reflection" />
      <div className="flex justify-between items-start mb-8">
        <div className={`p-3 bg-white/5 rounded-xl border border-white/5 ${active ? 'text-cyan-400' : 'text-slate-600'}`}>
          <Icon size={22} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black tracking-widest uppercase ${color}`}>
          {isUp ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {trend}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black tracking-tighter text-white">{val}</span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{unit}</span>
      </div>
      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[2px] mt-2 group-hover:text-slate-400 transition-colors">
        {label}
      </p>
    </div>
  );
}

function Inp({ L, V, S }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">{L}</label>
      <input 
        type="number" 
        step="0.1" 
        value={V} 
        onChange={e => S(e.target.value)} 
        className="w-full bg-slate-900/60 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-cyan-400/40 transition-all font-black text-sm text-white placeholder:text-slate-800" 
        placeholder="0.0" 
      />
    </div>
  );
}