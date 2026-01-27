import React, { useState, useEffect } from 'react';
import { Receipt, Map, Sun, ChevronLeft, Calendar, Snowflake, SunMedium } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('loading'); // 'loading', 'main', 'tourList'
  const [selectedSeason, setSelectedSeason] = useState('여름');
  const [selectedNights, setSelectedNights] = useState('전체');

  // 가상의 투어 데이터 (보내주신 파일 목록 기반)
  const tours = [
    { id: 1, season: '겨울', nights: '3박', title: '미니고비 & 테를지', path: '미니고비_테를지_2026' },
    { id: 2, season: '겨울', nights: '4박', title: '미니고비 & 쳉헤르 & 오기 & 테를지', path: '미니고비_쳉헤르_오기_테를지_2026' },
    { id: 3, season: '여름', nights: '3박', title: '차강소브라가 & 테를지 & 미니고비', path: '차강소브라가_테를지_미니고비_2026' },
    { id: 4, season: '여름', nights: '7박', title: '고비 & 테를지 & 쳉헤르', path: '고비_테를지_쳉헤르_2026' },
    { id: 5, season: '여름', nights: '5박', title: '미니고비 & 쳉헤르 & 오기 & 테를지', path: '미니고비_쳉헤르_오기_테를지2_2026' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setStep('main'), 3500);
    return () => clearTimeout(timer);
  }, []);

  // 필터링 로직
  const filteredTours = tours.filter(tour => 
    tour.season === selectedSeason && (selectedNights === '전체' || tour.nights === selectedNights)
  );

  // 로딩 화면
  if (step === 'loading') {
    return (
      <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white font-sans">
        {/* 배경 이미지 애니메이션 */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-110 animate-[pulse_3s_infinite]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop')" }}
        />
        
        {/* 중앙 로고와 텍스트 */}
        <div className="relative z-10 flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-24 h-24 mb-6 drop-shadow-2xl animate-bounce" 
            onError={(e) => e.target.style.display = 'none'} // 로고 없으면 숨김 처리
          />
          <h1 className="text-5xl font-bold tracking-[0.2em] mb-3 text-blue-400 drop-shadow-lg">
            Easy Joy
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-light tracking-widest opacity-90">몽골의 별을 담다</p>
            <div className="flex gap-1 mt-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* 메인 화면 */}
      {step === 'main' && (
        <div className="max-w-md mx-auto h-screen flex flex-col">
          <header className="p-6 flex justify-between items-center">
            <h1 className="font-bold text-2xl text-blue-600 italic">Easy Joy</h1>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-blue-500 text-xs">
              <Sun className="w-4 h-4" /> 울란바토르 -15°C
            </div>
          </header>

          <main className="p-6 flex-1">
            <h2 className="text-2xl font-bold mb-8">어떤 여행을<br/>꿈꾸고 계신가요?</h2>
            
            <button className="w-full mb-4 rounded-3xl bg-blue-600 p-8 text-left text-white shadow-lg transition-transform active:scale-95">
              <Receipt className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="text-lg font-bold">이지조이와 여행가요!</h3>
              <p className="text-xs opacity-70">영수증 등록하고 맞춤 일정 받기</p>
            </button>

            <button 
              onClick={() => setStep('tourList')}
              className="w-full rounded-3xl bg-white border border-gray-100 p-8 text-left shadow-lg transition-transform active:scale-95"
            >
              <Map className="w-8 h-8 mb-4 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">투어 일정 & 견적 확인</h3>
              <p className="text-xs text-gray-500">정해진 코스 둘러보기</p>
            </button>
          </main>
        </div>
      )}

      {/* 투어 일정 확인 화면 */}
      {step === 'tourList' && (
        <div className="max-w-md mx-auto bg-white min-h-screen">
          <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-4 flex items-center gap-4">
            <button onClick={() => setStep('main')} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-lg">투어 일정 확인</h1>
          </header>

          <div className="p-4">
            {/* 계절 토글 */}
            <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
              <button 
                onClick={() => setSelectedSeason('여름')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${selectedSeason === '여름' ? 'bg-white shadow-sm font-bold text-orange-500' : 'text-gray-500'}`}
              >
                <SunMedium className="w-5 h-5" /> 여름
              </button>
              <button 
                onClick={() => setSelectedSeason('겨울')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${selectedSeason === '겨울' ? 'bg-white shadow-sm font-bold text-blue-500' : 'text-gray-500'}`}
              >
                <Snowflake className="w-5 h-5" /> 겨울
              </button>
            </div>

            {/* 박수 필터 (가로 스크롤) */}
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {['전체', '2박', '3박', '4박', '5박', '7박', '8박'].map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNights(n)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap border ${selectedNights === n ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}
                >
                  {n === '전체' ? n : `${n}`}
                </button>
              ))}
            </div>

            {/* 투어 리스트 */}
            <div className="space-y-4 mt-4">
              {filteredTours.length > 0 ? filteredTours.map((tour) => (
                <div key={tour.id} className="p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md uppercase">{tour.nights}</span>
                    <Calendar className="w-4 h-4 text-gray-300" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{tour.title}</h4>
                  <p className="text-xs text-gray-400 truncate">EJ({tour.season}{tour.nights})_{tour.path}.docx</p>
                </div>
              )) : (
                <div className="text-center py-20 text-gray-400">
                  <p>해당 조건의 일정이 없습니다. 😢</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}