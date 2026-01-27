require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    // 사용 가능한 모델 리스트를 가져옵니다.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    
    console.log("--- ✅ 사용 가능한 모델 목록 ---");
    data.models.forEach(m => {
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`모델명: ${m.name.split('/')[1]}`);
      }
    });
    console.log("------------------------------");
  } catch (e) {
    console.error("모델 목록 확인 실패:", e.message);
  }
}

listModels();