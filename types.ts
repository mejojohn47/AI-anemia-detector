export enum AppState {
  HOME = 'HOME',
  SCAN = 'SCAN',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  EDUCATION = 'EDUCATION',
  DISCLAIMER = 'DISCLAIMER'
}

export interface AnalysisResult {
  prediction: 'Anemic' | 'Normal' | 'Uncertain';
  confidence: number;
  reasoning: string;
  pallorLevel: 'None' | 'Mild' | 'Moderate' | 'Severe';
  recommendations: string[];
}

export interface EducationalContent {
  title: string;
  category: 'Nutrition' | 'Lifestyle' | 'Prevention';
  description: string;
  iconName: string;
}

export interface ScanConfig {
  area: 'NailBed' | 'Conjunctiva' | 'Palm';
}