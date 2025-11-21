import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import EducationModule from './components/EducationModule';
import Button from './components/Button';
import { AppState, AnalysisResult, ScanConfig } from './types';
import { analyzeHemoImage } from './services/geminiService';
import { HeartIcon, BookOpenIcon, CameraIcon, ChevronLeftIcon } from './icons';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.DISCLAIMER);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [scanArea, setScanArea] = useState<ScanConfig['area']>('NailBed');

  const handleImageSelected = async (base64: string) => {
    setState(AppState.ANALYZING);
    
    const analysis = await analyzeHemoImage(base64, { area: scanArea });
    setResult(analysis);
    setState(AppState.RESULTS);
  };

  const resetApp = () => {
    setResult(null);
    setState(AppState.HOME);
  };

  const renderContent = () => {
    switch (state) {
      case AppState.DISCLAIMER:
        return (
          <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center space-y-8">
               <div className="bg-rose-50 p-4 rounded-full inline-block">
                 <HeartIcon className="w-12 h-12 text-rose-600" />
               </div>
               <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Research & Academic Use Only</h1>
               <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-left">
                 <p className="text-amber-900 text-base md:text-lg leading-relaxed font-medium">
                   This AI system has the potential to assist in early-stage anemia screening and can be developed into a diagnostic tool in the future. However, the current version is for <strong>academic and research use only</strong>. Clinical confirmation through a hemoglobin test is still required.
                 </p>
               </div>
               <div className="max-w-xs mx-auto">
                 <Button fullWidth onClick={() => setState(AppState.HOME)} className="text-lg">
                   I Understand, Continue
                 </Button>
               </div>
            </div>
          </div>
        );

      case AppState.HOME:
        return (
          <div className="flex flex-col px-4 py-8 md:py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-medium text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    AI-Powered Screening
                 </div>
                 <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                   Detect Anemia Early with <span className="text-rose-600">Precision AI.</span>
                 </h1>
                 <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                   Fast, non-invasive screening using advanced computer vision analysis of nail beds or conjunctiva. Designed for community health workers and remote areas.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
                   <button 
                     onClick={() => setState(AppState.SCAN)}
                     className="flex items-center justify-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
                   >
                     <CameraIcon className="w-6 h-6" />
                     Start Screening
                   </button>
                   <button 
                     onClick={() => setState(AppState.EDUCATION)}
                     className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-slate-300 rounded-2xl font-bold text-lg transition-all"
                   >
                     <BookOpenIcon className="w-6 h-6" />
                     Learn More
                   </button>
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-indigo-600 rounded-[2.5rem] opacity-10 blur-3xl transform rotate-6"></div>
                 <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl aspect-[4/3] flex flex-col justify-between">
                    <div className="relative z-10">
                       <div className="flex gap-2 mb-6">
                          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium">No Equipment Needed</span>
                          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium">Instant Results</span>
                       </div>
                       <h3 className="text-3xl font-bold mb-3">Accessible Healthcare</h3>
                       <p className="text-slate-300 text-lg max-w-md">
                         Bridging the diagnostic gap for rural populations using smartphone technology.
                       </p>
                    </div>
                    
                    {/* Abstract UI visualization */}
                    <div className="relative z-10 mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10 w-full max-w-sm self-end transform translate-x-4 translate-y-4">
                       <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center">
                             <HeartIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                             <div className="h-2 w-24 bg-white/50 rounded mb-1"></div>
                             <div className="h-2 w-16 bg-white/30 rounded"></div>
                          </div>
                       </div>
                       <div className="h-20 bg-black/20 rounded-lg"></div>
                    </div>

                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-600 rounded-full blur-[100px] opacity-40"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-40"></div>
                 </div>
              </div>
            </div>
          </div>
        );

      case AppState.SCAN:
        return (
          <div className="px-4 py-8">
             <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
               <div className="grid lg:grid-cols-2">
                 <div className="p-8 md:p-12 bg-slate-50 flex flex-col justify-center">
                   <div className="mb-8">
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">Patient Screening</h2>
                     <p className="text-slate-600 text-lg">Select the area to scan and ensure proper lighting conditions.</p>
                   </div>
                   
                   <div className="space-y-6">
                     <div className="space-y-3">
                       <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Select Scan Area</label>
                       <div className="grid grid-cols-2 gap-4">
                         <button 
                           onClick={() => setScanArea('NailBed')}
                           className={`p-4 rounded-2xl border-2 text-left transition-all ${scanArea === 'NailBed' ? 'border-rose-600 bg-rose-50' : 'border-slate-200 bg-white hover:border-rose-300'}`}
                         >
                           <span className={`block font-bold text-lg ${scanArea === 'NailBed' ? 'text-rose-700' : 'text-slate-700'}`}>Fingernails</span>
                           <span className="text-sm text-slate-500">Nail bed analysis</span>
                         </button>
                         <button 
                           onClick={() => setScanArea('Conjunctiva')}
                           className={`p-4 rounded-2xl border-2 text-left transition-all ${scanArea === 'Conjunctiva' ? 'border-rose-600 bg-rose-50' : 'border-slate-200 bg-white hover:border-rose-300'}`}
                         >
                           <span className={`block font-bold text-lg ${scanArea === 'Conjunctiva' ? 'text-rose-700' : 'text-slate-700'}`}>Eye (Lower Lid)</span>
                           <span className="text-sm text-slate-500">Conjunctival pallor</span>
                         </button>
                       </div>
                     </div>

                     <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                       <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                         <span className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs">i</span>
                         Instructions
                       </h4>
                       <ul className="space-y-2 text-blue-800">
                         {scanArea === 'NailBed' ? (
                           <>
                             <li className="flex gap-2 text-sm"><span className="text-blue-500">•</span> Place fingers flat on a white surface</li>
                             <li className="flex gap-2 text-sm"><span className="text-blue-500">•</span> Avoid shadows and glare</li>
                             <li className="flex gap-2 text-sm"><span className="text-blue-500">•</span> Remove nail polish if possible</li>
                           </>
                         ) : (
                           <>
                             <li className="flex gap-2 text-sm"><span className="text-blue-500">•</span> Gently pull down the lower eyelid</li>
                             <li className="flex gap-2 text-sm"><span className="text-blue-500">•</span> Look up while capturing the photo</li>
                             <li className="flex gap-2 text-sm"><span className="text-blue-500">•</span> Use soft, natural lighting</li>
                           </>
                         )}
                       </ul>
                     </div>
                   </div>
                 </div>

                 <div className="p-8 md:p-12 bg-white flex flex-col items-center justify-center border-l border-slate-100">
                    <ImageUploader onImageSelected={handleImageSelected} />
                 </div>
               </div>
             </div>
          </div>
        );

      case AppState.ANALYZING:
        return (
          <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-8 animate-fade-in">
             <div className="relative mb-12">
               <div className="w-32 h-32 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <HeartIcon className="w-12 h-12 text-rose-600 animate-pulse" />
               </div>
             </div>
             <h2 className="text-3xl font-bold text-slate-800 mb-3">Analyzing Biomarkers</h2>
             <p className="text-slate-500 text-lg max-w-md mx-auto">
               Our AI models are evaluating tissue pallor, vascularization visibility, and hemoglobin color intensity...
             </p>
          </div>
        );

      case AppState.RESULTS:
        return result ? (
          <div className="px-4 py-8">
             <div className="max-w-3xl mx-auto">
               <div className="mb-8 flex items-center gap-4">
                  <button onClick={resetApp} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ChevronLeftIcon className="w-6 h-6 text-slate-600" />
                  </button>
                  <h2 className="text-3xl font-bold text-slate-900">Analysis Report</h2>
               </div>
               <ResultCard result={result} onRetry={resetApp} />
             </div>
          </div>
        ) : null;

      case AppState.EDUCATION:
        return (
          <div className="px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Health & Nutrition Hub</h2>
                 <p className="text-lg text-slate-600">Essential information for preventing and managing anemia.</p>
              </div>
              <EducationModule />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-rose-100">
      <Navbar 
        currentState={state} 
        onBack={() => setState(AppState.HOME)} 
      />
      <main className="w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;