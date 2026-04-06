'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Search, Phone, Video, MoreVertical, 
  Smile, Image as ImageIcon, Send, 
  CheckCheck, UserCircle2 
} from 'lucide-react';

const initialFriends = [
  { id: 1, name: 'Олена Коваль', status: 'В мережі', avatar: '👩‍💻', online: true, unread: 2 },
  { id: 2, name: 'Максим Петренко', status: 'В мережі', avatar: '👨‍💪', online: true },
  { id: 3, name: 'Анна Сидоренко', status: 'Не на місці', avatar: '👩‍🎨', online: false },
  { id: 4, name: 'Дмитро Іваненко', status: '2 години тому', avatar: '👨‍🎓', online: false },
  { id: 5, name: 'Марія Шевченко', status: 'В мережі', avatar: '🧘‍♀️', online: true },
  { id: 6, name: 'Владислав Бондар', status: 'Не на місці', avatar: '👨+💻', online: false },
];

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState(initialFriends[0]);
  const [searchTerm, setSearchTerm] = useState(''); // Стан для пошуку
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привіт! Як твоє тренування сьогодні?', time: '14:31', isMe: false },
    { id: 2, text: 'Чудово! Подолав новий рекорд! 💪', time: '14:55', isMe: true },
    { id: 3, text: 'Вау! Молодець! Я теж щойно завершив кардіо', time: '15:01', isMe: false },
    { id: 4, text: 'Може разом завтра побігаємо?', time: '15:21', isMe: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- ЛОГІКА ПОШУКУ ---
  const filteredFriends = initialFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 lg:p-12 relative overflow-hidden flex flex-col selection:bg-cyan-500/30">
      
      {/* Mesh Градієнти на фоні */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <header className="mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter uppercase italic flex items-center gap-4">
          Чат з <span className="text-cyan-400">Друзями</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] opacity-80 leading-relaxed">
          Спілкуйся, мотивуй один одного та досягайте цілей разом!
        </p>
      </header>

      {/* ГОРЯЧА ЧАСТИНА: ВІКНО ЧАТУ */}
      <div className="flex-1 glass-card overflow-hidden flex h-[75vh] shadow-2xl relative z-10 border-white/5 bg-slate-900/10 backdrop-blur-2xl rounded-[40px]">
        <div className="glass-reflection" />
        
        {/* SIDEBAR ДРУЗІВ */}
        <div className="w-80 border-r border-white/5 flex flex-col bg-slate-950/20">
          <div className="p-6 border-b border-white/5">
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 size-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Пошук друзів..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-cyan-400/30 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <div 
                  key={friend.id}
                  onClick={() => setSelectedFriend(friend)}
                  className={`p-5 flex items-center gap-4 cursor-pointer transition-all border-l-4 ${
                    selectedFriend.id === friend.id 
                      ? 'bg-cyan-400/5 border-cyan-400' 
                      : 'border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl border border-white/5">
                      {friend.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0b0f1a] ${friend.online ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                  </div>
                  <div className="flex-1 truncate">
                    <h4 className="font-black text-sm tracking-tight">{friend.name}</h4>
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">
                      {friend.online ? <span className="text-green-500">В мережі</span> : friend.status}
                    </p>
                  </div>
                  {friend.unread && (
                    <div className="bg-orange-600 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg">
                      {friend.unread}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest opacity-50">
                Нікого не знайдено 🔍
              </div>
            )}
          </div>
        </div>

        {/* ОСНОВНА ПАНЕЛЬ ЧАТУ */}
        <div className="flex-1 flex flex-col">
          {/* Header чату */}
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-950/40 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl border border-white/5">
                {selectedFriend.avatar}
              </div>
              <div>
                <h4 className="font-black text-sm tracking-tight">{selectedFriend.name}</h4>
                <p className="text-[9px] text-green-400 font-black uppercase tracking-[2px] mt-0.5 animate-pulse">
                  {selectedFriend.online ? 'Активний зараз' : 'Був нещодавно'}
                </p>
              </div>
            </div>
            <div className="flex gap-4 text-slate-500">
              <button className="p-2 hover:text-white transition-all"><Phone size={18} /></button>
              <button className="p-2 hover:text-white transition-all"><Video size={18} /></button>
              <button className="p-2 hover:text-white transition-all"><MoreVertical size={18} /></button>
            </div>
          </div>

          {/* Повідомлення */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-end gap-3 max-w-[75%]">
                  {!msg.isMe && (
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm border border-white/5 mb-1">
                      {selectedFriend.avatar}
                    </div>
                  )}
                  <div className={`px-6 py-4 rounded-[24px] text-sm font-bold leading-relaxed shadow-xl border ${
                    msg.isMe 
                      ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 rounded-tr-none border-cyan-400/20' 
                      : 'bg-slate-800/60 text-slate-200 rounded-tl-none border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
                <div className={`flex items-center gap-2 mt-2 px-1 ${msg.isMe ? 'flex-row' : 'flex-row-reverse ml-11'}`}>
                  <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">{msg.time}</span>
                  {msg.isMe && <CheckCheck size={12} className="text-cyan-400" />}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле вводу */}
          <form onSubmit={handleSendMessage} className="p-6 bg-slate-950/40 border-t border-white/5 flex gap-4 items-center">
            <div className="flex gap-2">
               <button type="button" className="p-3 text-slate-500 hover:text-white transition-all"><Smile size={22} /></button>
               <button type="button" className="p-3 text-slate-500 hover:text-white transition-all"><ImageIcon size={22} /></button>
            </div>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Напиши повідомлення..." 
              className="flex-1 bg-slate-900/60 border border-white/5 rounded-[20px] py-4 px-6 text-sm font-bold outline-none focus:border-cyan-400/30 transition-all placeholder:text-slate-600"
            />
            <button 
              type="submit" 
              className="bg-cyan-400 text-slate-950 p-4 rounded-2xl flex items-center justify-center hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}