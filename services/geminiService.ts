import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, ScanConfig } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to extract JSON from potential markdown code blocks
const cleanJson = (text: string): string => {
  let clean = text.trim();
  if (clean.startsWith('```json')) {
    clean = clean.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  } else if (clean.startsWith('```')) {
    clean = clean.replace(/^```\n?/, '').replace(/\n?```$/, '');
  }
  return clean;
};

export const analyzeHemoImage = async (base64Image: string, config: ScanConfig): Promise<AnalysisResult> => {
  const model = 'gemini-2.5-flash-image';
  
  // Prompt engineering to simulate the medical expert system
  const prompt = `
    Act as an expert hematologist and AI medical diagnostic system. 
    Analyze this image of a ${config.area === 'NailBed' ? 'fingernail bed' : config.area === 'Conjunctiva' ? 'eye conjunctiva' : 'palm'}.
    
    Focus on the following visual biomarkers for anemia detection:
    1. Pallor (paleness) of the tissue.
    2. Redness/Hemoglobin color intensity.
    3. Texture and vascularization visibility.
    
    Based on these visual cues, predict if the subject is likely 'Anemic' or 'Normal'.
    
    IMPORTANT: Return ONLY a valid JSON object with no additional text.
    Structure:
    {
      "prediction": "Anemic" | "Normal" | "Uncertain",
      "confidence": number (0-100),
      "pallorLevel": "None" | "Mild" | "Moderate" | "Severe",
      "reasoning": "A short, clear explanation suitable for a community health worker.",
      "recommendations": ["string", "string", "string"] (3 dietary or lifestyle tips relevant to the result)
    }
    
    If the image is blurry, dark, or not a body part, set prediction to "Uncertain" and explain why in reasoning.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', 
              data: base64Image
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    const responseText = response.text || "{}";
    const cleanedText = cleanJson(responseText);
    const result = JSON.parse(cleanedText) as AnalysisResult;
    
    return result;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      prediction: 'Uncertain',
      confidence: 0,
      pallorLevel: 'None',
      reasoning: "AI analysis failed due to network or image issues. Please try again.",
      recommendations: ["Ensure good lighting", "Hold camera steady"]
    };
  }
};