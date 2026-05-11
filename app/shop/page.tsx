'use client';

import { useState, useEffect } from 'react';
import { Flame, AlertCircle, ShoppingCart, Check, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
  const [items, setItems] = useState<any[]>([
    { id: 1, name: "Маскот Рибка", price: 500, image: "/heroes/skin_fish.png", description: "Твій герой у стилі рибки" },
    { id: 2, name: "Маскот Клоун", price: 450, image: "/heroes/skin_clown.png", description: "Веселий зелений маскот" },
    { id: 3, name: "Інопланетянин", price: 600, image: "/heroes/skin_alien.png", description: "Космічний персонаж" },
    { id: 4, name: "Любинка", price: 700, image: "/heroes/skin_liubynka.png", description: "Найнайулюбленіший скін" },
    { id: 5, name: "Дженто", price: 550, image: "/heroes/skin_dzhento.png", description: "Стильний та впевнений" },
    { id: 6, name: "Слизь", price: 400, image: "/heroes/skin_slyz.png", description: "Незвичайний та гнучкий" },
    { id: 7, name: "Незнайомець", price: 800, image: "/heroes/skin_stranger.png", description: "Таємничий герой" },
    { id: 8, name: "Навушники", price: 300, image: "/heroes/skin_headphones.png", description: "Крутий аксесуар" }
  ]); 

  const [userBalance, setUserBalance] = useState(5000);
  const [ownedItems, setOwnedItems] = useState<number[]>([]);
  const [equippedSkinId, setEquippedSkinId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedInventory = localStorage.getItem('hero_inventory');
      if (savedInventory) setOwnedItems(JSON.parse(savedInventory));
      
      const savedEquipped = localStorage.getItem('equipped_skin');
      if (savedEquipped) setEquippedSkinId(parseInt(savedEquipped));
      
      const savedStats = localStorage.getItem('hero_stats');
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        if (stats.firePoints) setUserBalance(stats.firePoints);
      }
    }
  }, []);

  // КУПИТИ
  const handleBuy = (item: any) => {
    if (userBalance < item.price) {
        showNotify("Недостатньо балів! 🔥", 'error');
        return;
    }
    const newBalance = userBalance - item.price;
    const newInventory = [...ownedItems, item.id];
    updateData(newBalance, newInventory);
    showNotify(`Куплено: ${item.name}! 🎉`, 'success');
  };

  // ПРОДАТИ (НОВА ФУНКЦІЯ)
  const handleSell = (item: any) => {
    const newBalance = userBalance + item.price;
    const newInventory = ownedItems.filter(id => id !== item.id);
    
    // Якщо ми продаємо те, що зараз одягнене — знімаємо його
    if (equippedSkinId === item.id) {
        setEquippedSkinId(null);
        localStorage.removeItem('equipped_skin');
    }

    updateData(newBalance, newInventory);
    showNotify(`Продано: ${item.name}. +${item.price} балів повернено! 💰`, 'info');
  };

  const handleEquip = (itemId: number) => {
    setEquippedSkinId(itemId);
    localStorage.setItem('equipped_skin', itemId.toString());
    showNotify("Скін одягнено! 👕", 'success');
  };

  // Допоміжні функції, щоб не дублювати код
  const updateData = (balance: number, inventory: number[]) => {
    setUserBalance(balance);
    setOwnedItems(inventory);
    localStorage.setItem('hero_inventory', JSON.stringify(inventory));
    // Також оновимо загальну статистику
    const savedStats = JSON.parse(localStorage.getItem('hero_stats') || '{}');
    localStorage.setItem('hero_stats', JSON.stringify({...savedStats, firePoints: balance}));
  };

  const showNotify = (msg: string, type: any) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden font-bold">
      
      <header className="mb-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Магазин</h1>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 px-8 py-3 rounded-3xl flex items-center gap-3 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
            <Flame className="text-orange-500" size={24} />
            <span className="text-2xl font-black italic text-orange-500">{userBalance.toLocaleString()}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {items.map((item) => {
          const isOwned = ownedItems.includes(item.id);
          const isEquipped = item.id === equippedSkinId;

          return (
            <div key={item.id} className={`glass-card border-2 rounded-[40px] p-8 flex flex-col items-center transition-all duration-500 group relative ${
                isEquipped ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/5 bg-slate-900/40'
            }`}>
              
              <div className="w-44 h-44 mb-8 transition-transform duration-500 group-hover:scale-110">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
              
              <h3 className="text-xl font-black mb-1 italic uppercase">{item.name}</h3>
              <p className="text-slate-500 text-[9px] font-black mb-6 uppercase opacity-60 tracking-widest">{item.description}</p>

              <div className="w-full pt-6 border-t border-white/5 flex flex-col gap-3">
                {!isOwned ? (
                    <button 
                        onClick={() => handleBuy(item)} 
                        className="w-full py-4 rounded-2xl bg-orange-500 text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        Купити за {item.price} <Flame size={14} />
                    </button>
                ) : (
                    <div className="flex flex-col gap-2 w-full">
                        <button 
                            onClick={() => handleEquip(item.id)} 
                            disabled={isEquipped}
                            className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                                isEquipped ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-cyan-500 text-black hover:bg-cyan-400'
                            }`}
                        >
                            {isEquipped ? 'Одягнено' : 'Одягнути'}
                        </button>
                        
                        {/* КНОПКА ПРОДАЖУ */}
                        <button 
                            onClick={() => handleSell(item)} 
                            className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-black uppercase text-[9px] tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <Trash2 size={12} /> Продати (+{item.price})
                        </button>
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {notification && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-8 py-5 rounded-[24px] border backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-10 ${
          notification.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 
          notification.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-400' :
          'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
        }`}>
          <span className="font-black uppercase text-[10px] tracking-widest">{notification.msg}</span>
        </div>
      )}
    </div>
  );
}