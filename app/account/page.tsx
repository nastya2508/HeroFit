'use client';

import { useState, useEffect, Suspense } from 'react';
import { 
  UserCircle2, Mail, Trophy, Flame, 
  Dumbbell, Award, Target, Zap, Edit3, 
  CheckCircle2, Camera, ShieldCheck
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Обертка для безпечного використання useSearchParams в Next.js
function AccountContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Профіль');
  const [isEditing, setIsEditing] = useState(false);
  
  const [stats, setStats] = useState({
    level: 1, xp: 0, firePoints: 0, workouts: 0, streak: 0 
  });

  const [profile, setProfile] = useState({
    username: 'Nastya',
    email: 'nastya12@gmail.com',
    gender: 'Жінка',
    avatar: '🎯',
    goal: 'Стати легендою атлетики'
  });

  // 1. ЛОГІКА ПАРАМЕТРІВ URL (Tab та Edit)
  useEffect(() => {
    const tab = searchParams.get('tab');
    const edit = searchParams.get('edit');

    if (tab === 'achievements') {
      setActiveTab('Досягнення');
      setIsEditing(false);
    } else if (edit === 'true') {
      setActiveTab('Профіль');
      setIsEditing(true);
    }
  }, [searchParams]);

  // 2. ЗАВАНТАЖЕННЯ ДАНИХ
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('hero_stats');
      const savedProfile = localStorage.getItem('hero_profile');
      if (savedStats) setStats(JSON.parse(savedStats));
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('hero_profile', JSON.stringify(profile));
    setIsEditing(false);
    // Оновлюємо літеру в Navbar
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('profileUpdated'));
  };

  const achievements = [
    { id: '1', title: "Новачок", desc: "Зроблено перше тренування", earned: stats.workouts > 0, icon: <Zap className="text-yellow-500" />, condition: "Виконай 1 будь-яку вправу" },
    { id: '2', title: "Залізна Воля", desc: "Виконано 10 тренувань", earned: stats.workouts >= 10, icon: <ShieldCheck className="text-cyan-400" />, condition: `Тобі потрібно ще ${Math.max(10 - stats.workouts, 0)} тренувань` },
    { id: '3', title: "Колекціонер", desc: "Набрано 5000 Fire Points", earned: stats.firePoints >= 5000, icon: <Flame className="text-orange-500" />, condition: "Збери 5000 вогників у магазині" },
    { id: '4', title: "Легенда", desc: "Досягнуто 10 рівня", earned: stats.level >= 10, icon: <Trophy className="text-purple-500" />, condition: "Заробляй XP, щоб апнути 10 левел" }
  ];

  const inventory = [
    { id: 1, name: 'Неонова Броня', icon: '🦾', type: 'armor' },
    { id: 2, name: 'Енергетичний Меч', icon: '⚔️', type: 'weapon' },
    { id: 3, name: 'Вогняні Крила', icon: '🔥', type: 'back' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tighter uppercase italic leading-none">
            Мій <span className="text-cyan-400 font-black">Профіль</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] opacity-70 italic font-bold">Керуйте персонажем та даними</p>
        </header>

        <div className="flex bg-slate-900/40 p-1.5 rounded-[24px] mb-12 border border-white/5 backdrop-blur-md max-w-2xl">
          {['Профіль', 'Мій Аватар', 'Досягнення'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all font-bold ${
                activeTab === tab ? 'bg-slate-800 text-white shadow-xl border border-white/5' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="glass-card p-10 rounded-[45px] border-2 border-white/5 mb-10 relative overflow-hidden bg-slate-900/20 backdrop-blur-3xl min-h-[550px]">
          {activeTab === 'Профіль' && (
            <div className="animate-in fade-in zoom-in duration-300 space-y-8 text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black uppercase italic text-white leading-none font-bold">Особиста інформація</h3>
                <button 
                  onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                  className="bg-cyan-500 text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-cyan-500/20 font-bold"
                >
                  {isEditing ? 'Зберегти зміни' : 'Редагувати дані'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EditableInput label="Нікнейм" val={profile.username} Icon={UserCircle2} isEditing={isEditing} onChange={(v: string) => setProfile({...profile, username: v})} />
                <EditableInput label="E-mail" val={profile.email} Icon={Mail} isEditing={isEditing} onChange={(v: string) => setProfile({...profile, email: v})} />
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-600 tracking-[3px] ml-1 italic leading-none font-bold">Стать</label>
                  {isEditing ? (
                    <select value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})} className="w-full bg-[#0b0f1a] border border-cyan-500/30 rounded-[22px] py-5 px-6 text-sm font-black text-white outline-none">
                      <option value="Жінка">Жінка</option>
                      <option value="Чоловік">Чоловік</option>
                    </select>
                  ) : (
                    <div className="w-full bg-[#0b0f1a] border border-white/5 rounded-[22px] py-5 px-6 text-sm font-black italic text-slate-300 font-bold">
                      {profile.gender === 'Жінка' ? '👩' : '👨'} {profile.gender}
                    </div>
                  )}
                </div>

                <EditableInput label="Головна Ціль" val={profile.goal} Icon={Target} isEditing={isEditing} onChange={(v: string) => setProfile({...profile, goal: v})} />
              </div>
            </div>
          )}

          {activeTab === 'Мій Аватар' && (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 flex flex-col items-center">
                <div className="relative group cursor-pointer" onClick={() => {
                   const emojis = ['🎯', '🔥', '🦾', '⚡', '🐲', '👻'];
                   const next = emojis[(emojis.indexOf(profile.avatar) + 1) % emojis.length];
                   setProfile({...profile, avatar: next});
                }}>
                  <div className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-64 h-64 bg-slate-800 rounded-[60px] border-4 border-cyan-400 flex items-center justify-center text-8xl shadow-2xl transition-transform group-hover:scale-105 duration-500">
                    {profile.avatar}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-[60px] flex items-center justify-center transition-opacity">
                       <Camera className="text-white" size={40} />
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-cyan-400 font-black uppercase tracking-[3px] text-[10px] italic font-bold">Клікни на аватар, щоб змінити вигляд</p>
              </div>

              <div className="flex-1 w-full space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-4 font-bold text-left">Спорядження:</h4>
                {inventory.map((item) => (
                  <button key={item.id} className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group font-bold">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{item.icon}</span>
                      <p className="text-sm font-black text-white italic">{item.name}</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-cyan-400 text-black rounded-xl opacity-0 group-hover:opacity-100 transition-all font-bold">Одягнути</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Досягнення' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-10 text-left">
              {achievements.map((ach) => (
                <div key={ach.id} className={`p-8 rounded-[40px] border-2 transition-all group ${ach.earned ? 'bg-green-500/10 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-slate-900/40 border-white/5 opacity-40 grayscale'}`}>
                  <div className="flex items-center gap-6">
                    <div className="text-5xl transition-transform group-hover:scale-110">{ach.icon}</div>
                    <div>
                      <h4 className="font-black uppercase italic text-white text-lg leading-none mb-1 font-bold">{ach.title}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">{ach.earned ? '🏆 Отримано' : `🎯 Умова: ${ach.condition}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Рівень" val={stats.level} Icon={Trophy} color="text-yellow-500" />
          <StatCard label="Fire" val={stats.firePoints} Icon={Flame} color="text-orange-500" />
          <StatCard label="Вправи" val={stats.workouts} Icon={Dumbbell} color="text-green-400" />
          <StatCard label="Серія" val={stats.streak} Icon={Award} color="text-cyan-400" />
        </div>
      </div>
    </div>
  );
}

// Головний компонент
export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center text-cyan-400 font-black italic uppercase tracking-widest">Завантаження профілю...</div>}>
      <AccountContent />
    </Suspense>
  );
}

function EditableInput({ label, val, Icon, isEditing, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-600 tracking-[3px] ml-1 italic leading-none font-bold">{label}</label>
      <div className="relative">
        <Icon className={`absolute left-6 top-1/2 -translate-y-1/2 ${isEditing ? 'text-cyan-400' : 'text-slate-500'}`} size={20} />
        {isEditing ? (
          <input type="text" value={val} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#0b0f1a] border border-cyan-500/30 rounded-[22px] py-5 px-16 text-sm font-black text-white outline-none focus:border-cyan-400 transition-all shadow-inner font-bold" />
        ) : (
          <div className="w-full bg-[#0b0f1a] border border-white/5 rounded-[22px] py-5 px-16 text-sm font-black text-slate-300 italic font-bold">{val}</div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, val, Icon, color }: any) {
  return (
    <div className="glass-card p-8 rounded-[40px] border-2 border-white/5 flex items-center gap-6 bg-slate-900/20 shadow-xl hover:bg-white/[0.02] transition-all">
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner"><Icon className={color} size={28} /></div>
      <div>
        <p className="text-[9px] font-black uppercase text-slate-600 tracking-[2px] mb-1 italic leading-none font-bold">{label}</p>
        <p className="text-3xl font-black italic text-white leading-none uppercase font-bold">{val}</p>
      </div>
    </div>
  );
}