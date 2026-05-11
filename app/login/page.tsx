'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [gender, setGender] = useState('male');
  const [mascotType, setMascotType] = useState('chubby'); // chubby, normal, fit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не збігаються!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          gender: gender
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        
        // --- ЛОГІКА ЗБЕРЕЖЕННЯ ОБРАНОЇ ФОРМИ ---
        // Створюємо шлях на основі форми та статі
        const genderSuffix = gender === 'female' ? '_female' : '';
        const avatarPath = `/heroes/mascot_${mascotType}${genderSuffix}.png`;
        
        localStorage.setItem('hero_avatar', avatarPath);

        router.push('/onboarding');
      } else {
        setError(data.detail || 'Помилка при реєстрації');
      }
    } catch (err) {
      setError('Не вдалося підключитися до сервера');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-[32px] p-8 shadow-2xl mt-10">
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] text-lg">
            HF
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider text-cyan-400">HeroFit</h2>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2">Створити акаунт</h1>
        
        {error && <p className="text-red-400 text-center text-xs font-bold mb-4 uppercase">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Ім'я та Email */}
          <div className="space-y-4">
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ваше ім'я" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none transition-all" 
              />
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none transition-all" 
              />
          </div>

          {/* Паролі */}
          <div className="grid grid-cols-2 gap-4">
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Пароль" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none text-xs transition-all" 
              />
              <input 
                required
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Повтор" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none text-xs transition-all" 
              />
          </div>

          {/* ВИБІР СТАТІ */}
          <div className="grid grid-cols-2 gap-4 pt-2">
              <button 
                type="button" 
                onClick={() => setGender('male')} 
                className={`py-3 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${
                  gender === 'male' ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400' : 'border-slate-700 text-slate-500'
                }`}
              >
                👦 Герой
              </button>
              <button 
                type="button" 
                onClick={() => setGender('female')} 
                className={`py-3 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${
                  gender === 'female' ? 'border-green-400 bg-green-400/10 text-green-400' : 'border-slate-700 text-slate-500'
                }`}
              >
                👧 Героїня
              </button>
          </div>

          {/* НОВИЙ БЛОК: ВИБІР ФОРМИ МАСКОТА */}
          <div className="pt-2">
            <label className="block text-[10px] font-bold text-slate-500 mb-3 ml-1 uppercase tracking-widest">Твоя початкова форма</label>
            <div className="grid grid-cols-3 gap-2">
                {[
                    { id: 'chubby', label: 'Пухляш', icon: '☁️' },
                    { id: 'normal', label: 'Стрункий', icon: '✨' },
                    { id: 'fit', label: 'Качок', icon: '🦾' }
                ].map((type) => (
                    <button 
                        key={type.id}
                        type="button"
                        onClick={() => setMascotType(type.id)}
                        className={`flex flex-col items-center py-3 rounded-xl border-2 transition-all ${
                            mascotType === type.id 
                            ? 'border-orange-500 bg-orange-500/10 text-orange-500' 
                            : 'border-slate-700 text-slate-500'
                        }`}
                    >
                        <span className="text-xl mb-1">{type.icon}</span>
                        <span className="text-[8px] font-black uppercase tracking-tighter">{type.label}</span>
                    </button>
                ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-green-400 text-slate-950 font-black py-4 rounded-xl shadow-xl mt-4 uppercase text-sm active:scale-95 transition-all"
          >
            Зареєструватися <span>→</span>
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-8">
          Вже є акаунт? <Link href="/login" className="text-green-400 hover:underline font-bold">Увійти</Link>
        </p>
      </div>
    </div>
  );
}