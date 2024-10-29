/* eslint-disable no-undef */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: [
      {
        codeExecution: {},
      },
    ],
  });
  
  const chatHistory = [];
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const getHistory = () => {
    return chatHistory
   };

   const updateHistory = (obj) =>{
      chatHistory.push(obj);
   }
  async function run(prompt) {

    const chatSession = model.startChat({
      generationConfig,
      history: getHistory(),
    });
    
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    
    let userObj= {
      role: "user",
      parts: [{ text: prompt}],
    };

    let aiObj={
      role: "model",
      parts: [{ text: result.response.text()}],
    };

    updateHistory(userObj);
    updateHistory(aiObj);

    return result.response.text()
  }
  
  export default run;