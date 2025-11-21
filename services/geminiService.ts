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
  // Use gemini-2.5-flash for superior multimodal reasoning and analysis capabilities
  const model = 'gemini-2.5-flash';
  
  // Advanced Prompt Engineering with Chain-of-Thought for Medical Analysis
  const prompt = `
    Role: Act as a board-certified Hematologist and expert Computer Vision Medical Diagnostic System.
    Task: Screen the provided image for signs of Anemia (Iron Deficiency) by rigorously analyzing the ${config.area === 'NailBed' ? 'Fingernails (Nail Beds)' : config.area === 'Conjunctiva' ? 'Eye (Lower Palpebral Conjunctiva)' : 'Palm of Hand'}.
    
    Step 1: Image Quality & Validity Check
    - Is the image in focus and well-lit?
    - Is the target area (${config.area}) clearly visible?
    - If the image is too dark, blurry, black & white, or does not contain the correct body part, YOU MUST return "prediction": "Uncertain" and explain why.

    Step 2: Biomarker Analysis (Chain of Thought)
    ${config.area === 'NailBed' ? `
    - Analyze Nail Bed Color: Healthy nail beds are distinctively pink due to hemoglobin. Anemic nail beds appear pale, white, or bluish.
    - Check for Koilonychia: Look for spoon-shaped indentations (if visible).
    - Assess Lunula Contrast: If the distinction between the white lunula and the rest of the nail is lost due to overall pallor, this indicates anemia.
    ` : config.area === 'Conjunctiva' ? `
    - Analyze the Palpebral Conjunctiva: Focus on the inner lining of the pulled-down lower eyelid.
    - Color Assessment: A healthy conjunctiva is bright pink or red with visible capillaries.
    - Anemia Signs: Look for a pale, porcelain-white, or very faint pink color. 
    ` : `
    - Analyze Palmar Creases: Look at the major lines on the palm.
    - Healthy: Creases are darker/redder than the surrounding skin.
    - Anemic: Creases are as pale as the skin ("washed out"), indicating severe anemia.
    - General Perfusion: Compare overall skin tone to expected healthy vascularization.
    `}

    Step 3: Diagnosis Formulation
    - Combine observations to determine a Pallor Level (None, Mild, Moderate, Severe).
    - Assign a Prediction: "Normal" (Healthy perfusion) vs "Anemic" (Significant pallor) vs "Uncertain".
    - Assign Confidence (0-100%) based on the clarity of the visual evidence.

    Step 4: Output Generation
    Return ONLY a valid JSON object with this structure:
    {
      "prediction": "Anemic" | "Normal" | "Uncertain",
      "confidence": number,
      "pallorLevel": "None" | "Mild" | "Moderate" | "Severe",
      "reasoning": "Concise, professional medical explanation referencing specific visual cues found (e.g. 'The nail beds exhibit healthy capillary refill color...').",
      "recommendations": ["Dietary tip 1", "Lifestyle tip 2", "Next step (e.g. See a doctor)"]
    }
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
      },
      config: {
        temperature: 0.1, // Low temperature for more deterministic, analytical results
      }
    });

    const responseText = response.text || "{}";
    const cleanedText = cleanJson(responseText);
    
    try {
      const result = JSON.parse(cleanedText) as AnalysisResult;
      
      // Safety fallbacks
      if (!result.prediction) result.prediction = 'Uncertain';
      if (!result.reasoning) result.reasoning = 'Analysis completed, but no detailed reasoning was returned.';
      
      return result;
    } catch (parseError) {
      console.error("JSON Parse failed on:", cleanedText);
      throw new Error("Invalid JSON format from model");
    }

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      prediction: 'Uncertain',
      confidence: 0,
      pallorLevel: 'None',
      reasoning: "The AI could not process the image with high confidence. This may be due to poor lighting, blurriness, or network issues.",
      recommendations: ["Ensure the image is well-lit (natural light is best)", "Hold the camera steady to avoid blur", "Focus specifically on the nail bed or inner eyelid"]
    };
  }
};