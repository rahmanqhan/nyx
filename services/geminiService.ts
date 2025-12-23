import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash-preview';

export const generateBio = async (role: string, skills: string): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini.");
    return "Full Stack Developer passionate about building clean, efficient, and accessible web applications.";
  }

  try {
    const prompt = `Write a short, professional, and confident bio (maximum 140 characters) for a ${role} with skills in ${skills}. The tone should be calm and premium. Do not include hashtags.`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Creative developer focusing on digital experiences.";
  }
};

export const enhanceBio = async (currentBio: string): Promise<string> => {
  if (!apiKey) return currentBio;

  try {
    const prompt = `Enhance the following bio to make it sound more professional, minimalist, and confident, while keeping it under 140 characters: "${currentBio}"`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text?.trim() || currentBio;
  } catch (error) {
    console.error("Error enhancing bio:", error);
    return currentBio;
  }
};