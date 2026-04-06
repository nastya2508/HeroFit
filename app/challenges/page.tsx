'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Trophy, TrendingUp, Heart, 
  Zap, Plus, CheckCircle2, X, Flame, Clock, Calendar as CalendarIcon, ChevronRight, Trash2, AlertTriangle
} from 'lucide-react';

export default function ChallengesPage() {
  const [hp] = useState(85);
  const [joinedIds, setJoinedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [customChallenges, setCustomChallenges] = useState<any[]>([]);
  const [lastCompleted, setLastCompleted] = useState<Record<number, string>>({});
  
  // СТАН ДЛЯ ВЛАСНОГО ПІДТВЕРДЖЕННЯ ВИДАЛЕННЯ
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Поля форми створення
  const [newTitle, setNewTitle] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newDays, setNewDays] = useState('7');
  const [newDailyReward, setNewDailyReward] = useState('50');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedJoined = localStorage.getItem('joined_challenges');
      const savedCustom = localStorage.getItem('custom_challenges');
      const savedDates = localStorage.getItem('challenges_dates');
      if (savedJoined) setJoinedIds(JSON.parse(savedJoined));
      if (savedCustom) setCustomChallenges(JSON.parse(savedCustom));
      if (savedDates) setLastCompleted(JSON.parse(savedDates));
    }
  }, []);

  const handleJoin = (id: number) => {
    if (joinedIds.includes(id)) return;
    const newJoined = [...joinedIds, id];
    setJoinedIds(newJoined);
    localStorage.setItem('joined_challenges', JSON.stringify(newJoined));
    setSelectedChallenge(null);
  };

  // ФУНКЦІЯ ФІНАЛЬНОГО ВИДАЛЕННЯ
  const confirmDelete = () => {
    if (deleteConfirm) {
      const updated = customChallenges.filter(ch => ch.id !== deleteConfirm);
      setCustomChallenges(updated);
      localStorage.setItem('custom_challenges', JSON.stringify(updated));
      const updatedJoined = joinedIds.filter(jid => jid !== deleteConfirm);
      setJoinedIds(updatedJoined);
      localStorage.setItem('joined_challenges', JSON.stringify(updatedJoined));
      setDeleteConfirm(null);
    }
  };

  const canCompleteToday = (id: number) => {
    const today = new Date().toLocaleDateString();
    return lastCompleted[id] !== today;
  };

  const handleDailyProgress = (challengeId: number, reward: number) => {
    if (!canCompleteToday(challengeId)) return;
    const today = new Date().toLocaleDateString();
    const stats = JSON.parse(localStorage.getItem('hero_stats') || '{"firePoints":0}');
    stats.firePoints += reward;
    localStorage.setItem('hero_stats', JSON.stringify(stats));
    const newDates = { ...lastCompleted, [challengeId]: today };
    setLastCompleted(newDates);
    localStorage.setItem('challenges_dates', JSON.stringify(newDates));
    // Тут теж можна було б зробити кастомний Toast, але поки залишимо логіку
  };

  const defaultChallenges = [
    { id: 1, title: "ЗАГІН ВОЇНІВ", desc: "Інтенсивний курс присідань для зміцнення ніг", progress: 670, total: 1000, days: "3д", reward: "150 FIRE/день", dailyReward: 150, icon: '🦾', dailyPlan: ["День 1: 300 присідань", "День 2: 350 присідань", "День 3: 350 присідань"] },
    { id: 2, title: "КАРДІО РЕЙД", desc: "Марафон на витривалість для справжніх бігунів", progress: 43, total: 100, days: "5д", reward: "100 FIRE/день", dailyReward: 100, icon: '⚡', dailyPlan: ["День 1: 15 миль", "День 2: 20 миль", "День 3: 20 миль", "День 4: 20 миль", "День 5: 25 миль"] },
    { id: 3, title: "НІЧНІ ТИТАНИ", desc: "Завершіть тренування після 20:00 всією групою", progress: 12, total: 20, days: "3д", reward: "200 FIRE/день", dailyReward: 200, icon: '🌙', dailyPlan: ["День 1: 6 тренувань", "День 2: 7 тренувань", "День 3: 7 тренувань"] },
    { id: 4, title: "МАЙСТРИ ПЛАНКИ", desc: "Сумарно протримайте планку 300 хвилин за тиждень", progress: 156, total: 300, days: "4д", reward: "120 FIRE/день", dailyReward: 120, icon: '🧱', dailyPlan: ["День 1: 60 хв", "День 2: 80 хв", "День 3: 80 хв", "День 4: 80 хв"] },
    { id: 5, title: "РАНКОВІ ГЕРОЇ", desc: "Зробіть 50 ранкових розминок до 08:00 ранку", progress: 22, total: 50, days: "5д", reward: "80 FIRE/день", dailyReward: 80, icon: '☀️', dailyPlan: ["День 1: 10 разів", "День 2: 10 разів", "День 3: 10 разів", "День 4: 10 разів", "День 5: 10 разів"] },
    { id: 6, title: "ВОДНИЙ БАЛАНС", desc: "Відмітьте 200 випитих склянок води всією командою", progress: 89, total: 200, days: "4д", reward: "50 FIRE/день", dailyReward: 50, icon: '💧', dailyPlan: ["День 1: 50 склянок", "День 2: 50 склянок", "День 3: 50 склянок", "День 4: 50 склянок"] }
  ];

  const allChallenges = [...customChallenges, ...defaultChallenges];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-12 pb-20 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">КОМАНДНІ <span className="text-green-400">ВИКЛИКИ</span></h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-black p-5 rounded-2xl hover:bg-white transition-all shadow-xl active:scale-90"><Plus size={24} /></button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allChallenges.map((c) => {
            const isJoined = joinedIds.includes(c.id);
            const canClick = canCompleteToday(c.id);

            return (
              <div key={c.id} className={`glass-card rounded-[40px] p-8 border-2 transition-all duration-500 relative group/card ${isJoined ? 'border-green-500/40 bg-green-500/5 shadow-2xl' : 'border-white/5 bg-slate-900/20 hover:border-white/10'}`}>
                
                {/* КНОПКА ВИДАЛЕННЯ (тільки для твоїх) */}
                {c.isCustom && (
                  <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(c.id); }} className="absolute top-8 right-8 text-slate-600 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/50"><Trash2 size={18} /></button>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div className="text-6xl">{c.icon}</div>
                  <div className="bg-white/5 text-[10px] font-black px-4 py-2 rounded-xl border border-white/10 text-slate-400 uppercase italic tracking-widest">{c.days}</div>
                </div>
                
                <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tight">{c.title}</h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[2px] mb-8 leading-relaxed opacity-80 h-10">{c.desc}</p>

                <div className="space-y-4 mb-8 bg-black/20 p-5 rounded-2xl border border-white/5 shadow-inner">
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-500 uppercase italic">Місія прогресу</span>
                        <span className="text-green-400 font-black text-xl italic">{c.progress} / {c.total}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-1000" style={{ width: `${(c.progress/c.total)*100}%` }}></div>
                    </div>
                </div>

                {isJoined ? (
                    <button onClick={() => handleDailyProgress(c.id, c.dailyReward)} disabled={!canClick} className={`w-full font-black py-5 rounded-3xl uppercase text-[11px] tracking-[4px] transition-all flex items-center justify-center gap-3 ${canClick ? 'bg-white text-black hover:bg-green-400 shadow-xl active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}>
                      {canClick ? <><Flame size={18} className="text-orange-500" /> Зарахувати +{c.dailyReward}</> : <><Clock size={16} /> Повернутись завтра</>}
                    </button>
                ) : (
                    <button onClick={() => setSelectedChallenge(c)} className="w-full bg-transparent border-2 border-green-500/50 text-green-400 font-black py-5 rounded-3xl uppercase text-[11px] tracking-[4px] hover:bg-green-500 hover:text-black transition-all">ДЕТАЛІ ТА ПЛАН</button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ВІКНО ПІДТВЕРДЖЕННЯ ВИДАЛЕННЯ (ЗАМІСТЬ LOCALHOST) */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm bg-slate-900 border-2 border-red-500/30 rounded-[40px] p-10 text-center shadow-[0_0_50px_rgba(239,68,68,0.1)] animate-in zoom-in-95">
             <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 text-red-500"><AlertTriangle size={40} /></div>
             <h2 className="text-2xl font-black italic uppercase mb-4 leading-none">Видалити <span className="text-red-500">Виклик?</span></h2>
             <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-10 italic">Ти не зможеш відновити цей прогрес пізніше.</p>
             <div className="flex gap-4">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Скасувати</button>
                <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 shadow-xl transition-all">Так, Видалити</button>
             </div>
          </div>
        </div>
      )}

      {/* РЕШТА ВІКОН (ДЕТАЛІ ТА СТВОРЕННЯ) - ЗАЛИШАЄМО */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl">
          <div className="absolute inset-0 bg-slate-950/90" onClick={() => setSelectedChallenge(null)} />
          <div className="relative w-full max-w-lg bg-[#0b0f1a] border border-white/10 rounded-[50px] p-10 md:p-14 animate-in zoom-in-95 shadow-2xl">
            <button onClick={() => setSelectedChallenge(null)} className="absolute top-10 right-10 text-slate-500 hover:text-white"><X size={28} /></button>
            <div className="text-center mb-10">
                <div className="text-8xl mb-6">{selectedChallenge.icon}</div>
                <h2 className="text-3xl font-black italic uppercase mb-2">{selectedChallenge.title}</h2>
                <div className="inline-flex gap-4 mt-4">
                   <div className="bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-xl text-orange-500 text-[10px] font-black uppercase">+{selectedChallenge.dailyReward} / День</div>
                   <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-green-400 text-[10px] font-black uppercase">Ціль: {selectedChallenge.total}</div>
                </div>
            </div>
            <div className="bg-slate-950/50 rounded-[35px] p-8 border border-white/5 mb-10 overflow-y-auto max-h-[250px] no-scrollbar">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 italic underline underline-offset-4 decoration-green-500/30">📌 План виконання</h4>
                <div className="space-y-4">
                    {(selectedChallenge.dailyPlan || Array.from({length: parseInt(selectedChallenge.days)}, (_, i) => `День ${i+1}: Крок до цілі`)).map((step: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-green-400 transition-all">{i+1}</div>
                            <p className="text-sm font-bold text-slate-400 group-hover:text-white">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => handleJoin(selectedChallenge.id)} className="w-full bg-green-500 text-black font-black py-6 rounded-3xl uppercase text-xs tracking-[5px] hover:bg-white shadow-2xl flex items-center justify-center gap-4">ПРИЙНЯТИ ШЛЯХ <ChevronRight size={20} /></button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="absolute inset-0 bg-slate-950/95" onClick={() => setIsModalOpen(false)} />
          <form onSubmit={(e) => {
              e.preventDefault();
              const d = parseInt(newDays); const t = parseInt(newGoal); const dr = parseInt(newDailyReward);
              const newCh = { id: Date.now(), title: newTitle.toUpperCase(), desc: `План на ${d} днів. Заробляй по ${dr} FIRE щодня!`, progress: 0, total: t, days: `${d}д`, dailyReward: dr, reward: `${dr} FIRE/день`, icon: '🔥', isCustom: true, dailyPlan: Array.from({length: d}, (_, i) => `День ${i+1}: Рухайся до цілі ${t}`) };
              setCustomChallenges([newCh, ...customChallenges]);
              localStorage.setItem('custom_challenges', JSON.stringify([newCh, ...customChallenges]));
              handleJoin(newCh.id); setIsModalOpen(false);
          }} className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-[50px] p-10 shadow-2xl">
            <h2 className="text-2xl font-black italic uppercase mb-8 text-center">СТВОРИТИ <span className="text-green-400">МІСІЮ</span></h2>
            <div className="space-y-5">
                <input required placeholder="НАЗВА МІСІЇ" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-green-500 font-bold uppercase placeholder:opacity-20" />
                <div className="grid grid-cols-2 gap-4">
                    <input required type="number" placeholder="ДНІВ" value={newDays} onChange={e => setNewDays(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-green-500 font-bold" />
                    <input required type="number" placeholder="ЦІЛЬ" value={newGoal} onChange={e => setNewGoal(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-green-500 font-bold" />
                </div>
                <input required type="number" placeholder="FIRE ЗА ДЕНЬ" value={newDailyReward} onChange={e => setNewDailyReward(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-green-400 outline-none focus:border-green-500 font-bold" />
                <button type="submit" className="w-full bg-green-500 text-black font-black py-5 rounded-2xl uppercase tracking-[4px] mt-4 hover:bg-white transition-all shadow-xl active:scale-95 text-xs">ЗАПУСТИТИ ВИКЛИК 🚀</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}