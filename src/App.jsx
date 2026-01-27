import React, { useState, useEffect } from 'react';
import { Receipt, Map, Sun } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-110 animate-pulse"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 flex flex-col items-center">
          {/* public 폴더에 logo.png가 없으면 이 부분은 엑박이 뜰 수 있습니다 */}
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-6 drop-shadow-2xl animate-bounce" />
          <h1 className="text-4xl font-bold tracking-widest mb-2 text-blue-400">Easy Joy Travel</h1>
          <p className="text-lg font-light opacity-80">몽골의 별이 쏟아지는 순간으로...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-6 bg-white shadow-sm flex justify-between items-center">
        <h1 className="font-bold text-blue-600">Easy Joy</h1>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
          <Sun className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-medium text-blue-500">울란바토르 -15°C 맑음</span>
        </div>
      </header>

      <main className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">안녕하세요, 여행자님! 👋</h2>
        
        <button className="w-full mb-6 rounded-3xl bg-blue-600 p-8 text-left text-white shadow-xl transform transition hover:scale-105 active:scale-95">
          <Receipt className="w-10 h-10 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">이지조이와 여행가요!</h3>
          <p className="text-sm opacity-70">영수증을 등록하고 일정을 만드세요.</p>
        </button>

        <button className="w-full rounded-3xl bg-green-600 p-8 text-left text-white shadow-xl transform transition hover:scale-105 active:scale-95">
          <Map className="w-10 h-10 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">투어 일정 & 견적 확인</h3>
          <p className="text-sm opacity-70">몽골 인기 코스를 확인해보세요.</p>
        </button>
      </main>
    </div>
  );
}