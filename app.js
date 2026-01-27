require('dotenv').config();
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline'); // 터미널 입력을 받기 위한 도구

// 1. 초기 설정
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 2. 통합 실행 함수
async function runEasyJoyPipeline(locationInput) {
  try {
    console.log(`\n🔍 [${locationInput}]의 실시간 날씨를 조회 중입니다...`);

    // STEP 1: Weather API 실행 (날씨 정보 가져오기)
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${locationInput}&lang=ko`;
    const weatherRes = await axios.get(weatherUrl);
    const w = weatherRes.data;

    const weatherInfo = {
      name: w.location.name,
      temp: w.current.temp_c,
      feelsLike: w.current.feelslike_c,
      wind: w.current.wind_kph,
      condition: w.current.condition.text
    };

    // STEP 2: AI에게 전달하여 추천 가이드 생성 (Gemini 2.5 Flash)
    console.log(`🤖 AI 가이드가 조언을 생성하고 있습니다...`);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      너는 몽골 여행 전문 가이드야. 아래 실시간 날씨를 바탕으로 여행자에게 조언해줘.
      지역: ${weatherInfo.name}, 기온: ${weatherInfo.temp}°C (체감 ${weatherInfo.feelsLike}°C), 상태: ${weatherInfo.condition}
      
      [필수 포함 내용]
      1. 위트 있는 옷차림 추천 (1문장)
      2. 이 날씨에 딱 맞는 몽골어 한마디 (단어, 뜻, 발음)
      3. 가이드로서의 짧은 격려 (1문장)
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // STEP 3: 최종 결과 출력
    console.log("\n=====================================");
    console.log(`🇲🇳 Easy Joy 실시간 가이드: ${weatherInfo.name}`);
    console.log(`🌡️ 현재 날씨: ${weatherInfo.temp}°C / ${weatherInfo.condition}`);
    console.log("-------------------------------------");
    console.log(responseText);
    console.log("=====================================\n");

    rl.close(); // 프로그램 종료
  } catch (error) {
    console.error("\n❌ 에러 발생:", error.response ? "장소를 찾을 수 없습니다." : error.message);
    rl.close();
  }
}

// 3. 프로그램 시작 (유저에게 묻기)
rl.question('어디의 날씨와 여행 가이드가 궁금하신가요? (예: Ulaanbaatar, Terelj): ', (answer) => {
  runEasyJoyPipeline(answer);
});