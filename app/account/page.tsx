'use client';

import { useState, useEffect, Suspense } from 'react';
import { 
  UserCircle2, Mail, Trophy, Flame, 
  Dumbbell, Award, Target, Zap, Edit3, 
  CheckCircle2, Camera, ShieldCheck
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function AccountContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Профіль');
  const [isEditing, setIsEditing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Стан для відображення актуальної картинки героя
  const [heroImage, setHeroImage] = useState('/heroes/mascot_normal.png');

  const [stats, setStats] = useState({
    level: 1, xp: 0, firePoints: 5000, workouts: 0, streak: 0 
  });

  const [profile, setProfile] = useState({
    username: 'Настя',
    email: 'nastya12@gmail.com',
    gender: 'Жінка',
    goal: 'Стати легендою атлетики'
  });

  // Список твоїх скінів для інвентарю
  const allSkins = [
    { id: 1, name: "Маскот Рибка", image: "/heroes/skin_fish.png" },
    { id: 2, name: "Маскот Клоун", image: "/heroes/skin_clown.png" },
    { id: 3, name: "Маскот Прибулець", image: "/heroes/skin_alien.png" },
    { id: 4, name: "Любинка", image: "/heroes/skin_liubynka.png" },
    { id: 5, name: "Дженто", image: "/heroes/skin_dzhento.png" },
    { id: 6, name: "Незнайомець", image: "/heroes/skin_stranger.png" },
    { id: 7, name: "Навушники", image: "/heroes/skin_headphones.png" }
  ];

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      // 1. Завантажуємо стастику та профіль
      const savedStats = localStorage.getItem('hero_stats');
      const savedProfile = localStorage.getItem('hero_profile');
      if (savedStats) setStats(JSON.parse(savedStats));
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      // 2. ГОЛОВНА МАГІЯ: Визначаємо, яку картинку показати
      const equippedSkinId = localStorage.getItem('equipped_skin');
      const onboardingAvatar = localStorage.getItem('hero_avatar');

      if (equippedSkinId) {
        const skin = allSkins.find(s => s.id === parseInt(equippedSkinId));
        if (skin) setHeroImage(skin.image);
      } else if (onboardingAvatar) {
        // Якщо нічого не одягнено, беремо те, що вибрали при реєстрації
        setHeroImage(onboardingAvatar);
      }
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('hero_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tighter uppercase italic leading-none font-bold">
            Мій <span className="text-cyan-400">Профіль</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] opacity-70 italic font-bold">Керуй своїм маскотом</p>
        </header>

        {/* ПЕРЕМИКАЧ ВКЛАДОК */}
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

        <div className="glass-card p-10 rounded-[45px] border-2 border-white/5 mb-10 bg-slate-900/20 backdrop-blur-3xl min-h-[550px]">
          
          {/* ВКЛАДКА ПРОФІЛЬ */}
          {activeTab === 'Профіль' && (
            <div className="animate-in fade-in zoom-in duration-300 space-y-8 text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black uppercase italic text-white leading-none font-bold">Особиста інформація</h3>
                <button 
                  onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                  className="bg-cyan-500 text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all font-bold"
                >
                  {isEditing ? 'Зберегти зміни' : 'Редагувати дані'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EditableInput label="Нікнейм" val={profile.username} Icon={UserCircle2} isEditing={isEditing} onChange={(v: string) => setProfile({...profile, username: v})} />
                <EditableInput label="E-mail" val={profile.email} Icon={Mail} isEditing={isEditing} onChange={(v: string) => setProfile({...profile, email: v})} />
                <EditableInput label="Головна Ціль" val={profile.goal} Icon={Target} isEditing={isEditing} onChange={(v: string) => setProfile({...profile, goal: v})} />
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-600 tracking-[3px] italic font-bold">Стать</label>
                  <div className="w-full bg-[#0b0f1a] border border-white/5 rounded-[22px] py-5 px-6 text-sm font-black italic text-slate-300 font-bold">
                    {profile.gender === 'Жінка' ? '👩' : '👨'} {profile.gender}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ВКЛАДКА МІЙ АВАТАР - ТУТ НАЙГОЛОВНІШІ ЗМІНИ */}
          {activeTab === 'Мій Аватар' && (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-72 h-72 bg-slate-800/50 rounded-[60px] border-4 border-cyan-400 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105 duration-500 p-8 overflow-hidden">
                    {/* ТВОЯ КАРТИНКА ГЕРОЯ */}
                    <img 
                        src={heroImage} 
                        alt="Hero Avatar" 
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
                <p className="mt-8 text-cyan-400 font-black uppercase tracking-[3px] text-[10px] italic font-bold animate-bounce">Активний маскот</p>
              </div>

              <div className="flex-1 w-full space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-4 font-bold text-left italic">Твій гардероб:</h4>
                <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {allSkins.map((item) => (
                    <div key={item.id} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-3xl font-bold">
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-12 h-12 object-contain" alt="" />
                        <p className="text-sm font-black text-white italic">{item.name}</p>
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest px-4 py-2 bg-slate-800 text-slate-400 rounded-xl">Доступно</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ВКЛАДКА ДОСЯГНЕННЯ */}
          {activeTab === 'Досягнення' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-10 text-left">
              <AchievementCard title="Новачок" desc="Зроблено перше тренування" earned={stats.workouts > 0} icon={<Zap className="text-yellow-500" />} />
              <AchievementCard title="Залізна Воля" desc="Виконано 10 тренувань" earned={stats.workouts >= 10} icon={<ShieldCheck className="text-cyan-400" />} />
              <AchievementCard title="Колекціонер" desc="Набрано 5000 Fire Points" earned={stats.firePoints >= 5000} icon={<Flame className="text-orange-500" />} />
              <AchievementCard title="Легенда" desc="Досягнуто 10 рівня" earned={stats.level >= 10} icon={<Trophy className="text-purple-500" />} />
            </div>
          )}
        </div>

        {/* НИЖНІ КАРТКИ СТАТИСТИКИ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Рівень" val={stats.level} Icon={Trophy} color="text-yellow-500" />
          <StatCard label="Fire Points" val={stats.firePoints} Icon={Flame} color="text-orange-500" />
          <StatCard label="Тренування" val={stats.workouts} Icon={Dumbbell} color="text-green-400" />
          <StatCard label="Серія днів" val={stats.streak} Icon={Award} color="text-cyan-400" />
        </div>
      </div>
    </div>
  );
}

// РЕШТА ДОПОМІЖНИХ КОМПОНЕНТІВ
function AchievementCard({ title, desc, earned, icon }: any) {
  return (
    <div className={`p-8 rounded-[40px] border-2 transition-all group ${earned ? 'bg-green-500/10 border-green-500/20 shadow-lg' : 'bg-slate-900/40 border-white/5 opacity-40 grayscale'}`}>
      <div className="flex items-center gap-6">
        <div className="text-5xl group-hover:scale-110 transition-transform">{icon}</div>
        <div>
          <h4 className="font-black uppercase italic text-white text-lg leading-none mb-1 font-bold">{title}</h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">{earned ? '🏆 Отримано' : '🔒 Заблоковано'}</p>
        </div>
      </div>
    </div>
  );
}

function EditableInput({ label, val, Icon, isEditing, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-600 tracking-[3px] italic leading-none font-bold">{label}</label>
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

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center text-cyan-400 font-black italic uppercase tracking-widest">Завантаження профілю...</div>}>
      <AccountContent />
    </Suspense>
  );
}