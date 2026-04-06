'use client';

import { useState, useEffect } from 'react';
import { LayoutGrid, Shirt, Sparkles, Zap, Flame, Check, AlertCircle, ShoppingCart } from 'lucide-react';

const initialItems = [
  { id: 1, name: 'Неонова Бойова Броня', category: 'Одяг', rarity: 'Легендарна', rarityColor: 'text-orange-500', borderColor: 'border-orange-500/40', price: 2500, icon: '🦾', desc: 'Футуристична броня зі світними енергетичними лініями' },
  { id: 2, name: 'Блискавична Накидка', category: 'Одяг', rarity: 'Епічна', rarityColor: 'text-purple-400', borderColor: 'border-purple-500/40', price: 1800, icon: '⚡', desc: 'Електрична накидка, що іскриться з кожним рухом' },
  { id: 3, name: 'Вогняні Крила', category: 'Аксесуар', rarity: 'Легендарна', rarityColor: 'text-orange-500', borderColor: 'border-orange-600/40', price: 3000, icon: '🔥', desc: "Палаючі крила, що залишають слід полум'я за героєм" },
  { id: 4, name: 'Кібер Шолом', category: 'Аксесуар', rarity: 'Рідкісна', rarityColor: 'text-cyan-400', borderColor: 'border-cyan-500/40', price: 1500, icon: '🤖', desc: 'Високотехнологічний шолом з вбудованим HUD дисплеєм' },
  { id: 5, name: 'Енергетичний Меч', category: 'Підсилення', rarity: 'Епічна', rarityColor: 'text-purple-400', borderColor: 'border-purple-500/40', price: 2200, icon: '⚔️', desc: 'Плазмове лезо, що подвоює силу атаки вашого персонажа' },
  { id: 7, name: 'Силові Рукавиці', category: 'Підсилення', rarity: 'Рідкісна', rarityColor: 'text-cyan-400', borderColor: 'border-cyan-500/40', price: 1200, icon: '👊', desc: 'Посильте свою міць та витривалість цими рукавицями' },
  { id: 8, name: 'Корона Німбу', category: 'Аксесуар', rarity: 'Міфічна', rarityColor: 'text-yellow-400', borderColor: 'border-yellow-500/40', price: 3500, icon: '👑', desc: 'Божественна корона для справжніх чемпіонів всесвіту' },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('Все');
  
  // 1. ЗМІНЕНО: Початковий баланс беремо з пам'яті (localStorage)
  const [userBalance, setUserBalance] = useState(0);
  const [ownedItems, setOwnedItems] = useState<number[]>([]);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // 2. ДОДАНО: Завантаження реальних даних при старті сторінки
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('hero_stats');
      const savedInventory = localStorage.getItem('hero_inventory');
      
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        setUserBalance(stats.firePoints || 0);
      }
      
      if (savedInventory) {
        setOwnedItems(JSON.parse(savedInventory));
      }
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // 3. ЗМІНЕНО: Функція покупки тепер оновлює глобальний баланс
  const handleBuy = (item: any) => {
    if (ownedItems.includes(item.id)) return;

    if (userBalance >= item.price) {
      const newBalance = userBalance - item.price;
      const newInventory = [...ownedItems, item.id];
      
      // Оновлюємо стан сторінки
      setUserBalance(newBalance);
      setOwnedItems(newInventory);
      
      // Оновлюємо localStorage, щоб зміни бачили Dashboard та інші сторінки
      if (typeof window !== 'undefined') {
        const stats = JSON.parse(localStorage.getItem('hero_stats') || '{}');
        stats.firePoints = newBalance;
        localStorage.setItem('hero_stats', JSON.stringify(stats));
        localStorage.setItem('hero_inventory', JSON.stringify(newInventory));
      }

      setNotification({ msg: `Успішно куплено: ${item.name}! 🎉`, type: 'success' });
    } else {
      setNotification({ msg: `Недостатньо вогників! Тобі треба ще ${item.price - userBalance} 🔥`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden">
      
      {/* Mesh Градієнти */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ГАРНЕ ПОВІДОМЛЕННЯ (TOAST) */}
      {notification && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-8 py-5 rounded-[24px] border backdrop-blur-2xl shadow-2xl animate-in slide-in-from-bottom-10 duration-500 ${
          notification.type === 'success' 
            ? 'bg-green-500/10 border-green-500/50 text-green-400' 
            : 'bg-red-500/10 border-red-500/50 text-red-400'
        }`}>
          {notification.type === 'success' ? <ShoppingCart size={24} /> : <AlertCircle size={24} />}
          <span className="font-black uppercase text-[11px] tracking-widest">{notification.msg}</span>
        </div>
      )}

      <header className="mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter uppercase italic flex items-center gap-4">
          Магазин <span className="text-orange-500">Персонажів</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] opacity-80 leading-relaxed italic">
          Купуй спорядження за зароблені на тренуваннях бали! ⚡
        </p>
      </header>

      {/* ПАНЕЛЬ БАЛАНСУ */}
      <div className="glass-card bg-orange-950/10 border-orange-500/10 rounded-[32px] p-10 mb-14 flex flex-col sm:flex-row justify-between items-center shadow-2xl gap-8 relative z-10">
        <div className="glass-reflection" />
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-orange-500/10 rounded-[24px] flex items-center justify-center border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.15)] animate-pulse">
            <Flame className="text-orange-500" size={40} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[3px] mb-2 italic">Ваш Баланс</p>
            <p className="text-4xl md:text-5xl font-black text-orange-500 tracking-tighter italic uppercase">
              {userBalance.toLocaleString()} <span className="text-sm uppercase tracking-widest ml-1 text-white opacity-40">Fire Points</span>
            </p>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[3px] mb-2 italic">Предметів у власності</p>
          <p className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">{ownedItems.length}</p>
        </div>
      </div>

      {/* ФІЛЬТРИ */}
      <div className="flex flex-wrap gap-4 mb-14 relative z-10">
        <TabBtn active={activeTab === 'Все'} onClick={() => setActiveTab('Все')} Icon={LayoutGrid} label="Все" />
        <TabBtn active={activeTab === 'Одяг'} onClick={() => setActiveTab('Одяг')} Icon={Shirt} label="Одяг" />
        <TabBtn active={activeTab === 'Аксесуар'} onClick={() => setActiveTab('Аксесуар')} Icon={Sparkles} label="Аксесуари" />
        <TabBtn active={activeTab === 'Підсилення'} onClick={() => setActiveTab('Підсилення')} Icon={Zap} label="Підсилення" />
      </div>

      {/* СІТКА ПРЕДМЕТІВ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {initialItems.filter(i => activeTab === 'Все' || i.category === activeTab).map((item) => {
          const isOwned = ownedItems.includes(item.id);
          const canAfford = userBalance >= item.price;

          return (
            <div key={item.id} className={`glass-card border-2 ${item.borderColor} rounded-[40px] p-10 flex flex-col justify-between hover:bg-white/[0.03] transition-all group shadow-2xl relative overflow-hidden`}>
              <div className="glass-reflection" />
              
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-7xl group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0">{item.icon}</span>
                  <span className={`text-[9px] font-black uppercase tracking-[3px] ${item.rarityColor} bg-white/5 px-4 py-2 rounded-xl border border-white/5 italic`}>
                    {item.rarity}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tighter uppercase italic group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-10 opacity-70 italic">
                  {item.desc}
                </p>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <Flame className={isOwned ? "text-slate-600" : "text-orange-500"} size={24} />
                  <span className={`text-3xl font-black tracking-tighter italic ${isOwned ? "text-slate-600" : "text-orange-500"}`}>
                    {item.price}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleBuy(item)}
                  disabled={isOwned}
                  className={`w-full font-black py-5 rounded-[22px] uppercase text-[11px] tracking-[4px] transition-all flex items-center justify-center gap-2 italic
                    ${isOwned 
                      ? 'bg-transparent border-2 border-green-500/50 text-green-500 cursor-default' 
                      : canAfford
                        ? 'bg-gradient-to-r from-orange-500 to-[#00ff88] text-black hover:shadow-[0_15px_30px_rgba(249,115,22,0.3)] hover:scale-[1.03] active:scale-95 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                    }`}
                >
                  {isOwned ? (
                    <><Check size={16} /> У Власності</>
                  ) : canAfford ? (
                    'Купити предмет'
                  ) : (
                    `Треба ще ${item.price - userBalance} 🔥`
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border italic ${
        active 
          ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-[0_0_25px_rgba(34,197,94,0.4)]' 
          : 'bg-slate-900/40 text-slate-500 border-white/5 hover:border-white/10 backdrop-blur-md'
      }`}
    >
      <Icon size={14} /> {label}
    </button>
  );
}