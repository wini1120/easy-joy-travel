require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. 제미나이 설정 (발급받은 키 사용)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runGuideAI() {
  // 💡 님의 리스트에서 확인된 최신 모델 'gemini-2.5-flash' 사용
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // 아까 울란바토르에서 가져온 실제 데이터
  const weatherData = {
    location: "울란바토르",
    temp: -30.8,
    feelsLike: -36.9,
    wind: 5.4,
    condition: "맑음"
  };

  const prompt = `
    너는 몽골 여행사 'Easy Joy Travel'의 베테랑 가이드야. 
    오늘의 몽골 날씨 정보를 보고 여행자에게 옷차림과 생존 전략을 추천해줘.
    
    [실시간 날씨 정보]
    - 장소: ${weatherData.location}
    - 기온: ${weatherData.temp}°C (체감 온도: ${weatherData.feelsLike}°C)
    - 풍속: ${weatherData.wind} km/h
    - 상태: ${weatherData.condition}
    
    [가이드 지침]
    - 영하 30도의 추위를 재치 있게 경고해줘 (예: "냉동실보다 춥습니다!").
    - 몽골 전통 의복인 '델(Deel)'이나 현대적인 방한 용품을 섞어서 머리부터 발끝까지 옷차림을 3문장으로 추천해줘.
    - 한국어로 다정하게 작성해줘.
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text(); 
    
    console.log("\n=====================================");
    console.log(`✨ Easy Joy AI 가이드의 조언 (${weatherData.location})`);
    console.log("=====================================");
    console.log(responseText);
    console.log("=====================================\n");
  } catch (error) {
    console.error("❌ AI 호출 실패:", error.message);
    console.log("팁: API 키가 .env에 잘 저장되어 있는지, 파일이 저장되었는지 확인해보세요!");
  }
}

runGuideAI();