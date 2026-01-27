require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY;

async function getMongolWeather(locationName) {
  try {
    // WeatherAPI 전용 URL (한글 검색도 지원하지만, 영어 지명이 더 정확합니다)
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationName}&lang=ko`;
    
    const response = await axios.get(url);
    const data = response.data;

    console.log(`\n--- 🇲🇳 [${locationName}] 실시간 날씨 ---`);
    console.log(`🌡️ 현재 기온: ${data.current.temp_c}°C (체감: ${data.current.feelslike_c}°C)`);
    console.log(`💧 습도: ${data.current.humidity}%`);
    console.log(`💨 풍속: ${data.current.wind_kph} km/h`);
    console.log(`☁️ 상태: ${data.current.condition.text}`);
    console.log("-------------------------------------");

  } catch (error) {
    console.error(`❌ ${locationName} 날씨 호출 실패:`, error.response ? error.response.data.error.message : error.message);
  }
}

// 몽골 주요 여행지 3곳 테스트
// Elsen Tasarkhai가 우리가 부르는 '미니고비'입니다.
getMongolWeather("Ulaanbaatar");
getMongolWeather("47.99,107.43");
getMongolWeather("Elsen Tasarkhai");