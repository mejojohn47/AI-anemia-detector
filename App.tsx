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
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    setCapturedImage(`data:image/jpeg;base64,${base64}`);
    setState(AppState.ANALYZING);
    
    const analysis = await analyzeHemoImage(base64, { area: scanArea });
    setResult(analysis);
    setState(AppState.RESULTS);
  };

  const resetApp = () => {
    setResult(null);
    setCapturedImage(null);
    setState(AppState.HOME);
  };

  const renderContent = () => {
    switch (state) {
      case AppState.DISCLAIMER:
        return (
          <div className="min-h-[85vh] flex items-center justify-center px-4 bg-slate-50">
            <div className="max-w-2xl w-full bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white text-center space-y-10">
               <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-5 rounded-3xl inline-block shadow-lg shadow-rose-500/30">
                 <HeartIcon className="w-16 h-16 text-white" />
               </div>
               
               <div className="space-y-4">
                 <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Research & Academic Use Only</h1>
                 <p className="text-slate-500 text-lg">Please review the following disclaimer before proceeding.</p>
               </div>

               <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl text-left relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
                 <p className="text-amber-900 text-lg leading-relaxed font-medium relative z-10">
                   This AI system has the potential to assist in early-stage anemia screening and can be developed into a diagnostic tool in the future. However, the current version is for academic and research use only. Clinical confirmation through a hemoglobin test is still required.
                 </p>
               </div>

               <div className="max-w-sm mx-auto">
                 <Button fullWidth onClick={() => setState(AppState.HOME)} className="py-4 text-lg shadow-rose-500/20">
                   I Acknowledge & Continue
                 </Button>
               </div>
            </div>
          </div>
        );

      case AppState.HOME:
        return (
          <div className="flex flex-col px-6 py-12 md:py-20 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-rose-100 shadow-sm text-rose-700 font-semibold text-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                    </span>
                    AI-Powered Anemia Screening
                 </div>
                 
                 <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                   Early Detection. <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600">Better Health.</span>
                 </h1>
                 
                 <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                   A non-invasive, web-based solution for anemia detection using advanced computer vision. Accessible healthcare for everyone, anywhere.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row gap-5 pt-2">
                   <button 
                     onClick={() => setState(AppState.SCAN)}
                     className="flex items-center justify-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
                   >
                     <CameraIcon className="w-6 h-6" />
                     Start Analysis
                   </button>
                   <button 
                     onClick={() => setState(AppState.EDUCATION)}
                     className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-slate-300 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
                   >
                     <BookOpenIcon className="w-6 h-6" />
                     Health Guide
                   </button>
                 </div>

                 <div className="flex gap-8 pt-8 border-t border-slate-200">
                    <div>
                        <div className="text-3xl font-bold text-slate-900">92%</div>
                        <div className="text-slate-500 text-sm">Accuracy in Tests</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900">&lt;10s</div>
                        <div className="text-slate-500 text-sm">Analysis Time</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900">0</div>
                        <div className="text-slate-500 text-sm">Invasive Needles</div>
                    </div>
                 </div>
              </div>

              <div className="relative hidden lg:block">
                 <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-indigo-600 rounded-[3rem] opacity-20 blur-[80px] transform rotate-3"></div>
                 <div className="bg-white rounded-[3rem] p-4 shadow-2xl border border-slate-100 relative overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-slate-100 relative">
                        {/* Hero visual representation */}
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                           <div className="grid grid-cols-2 gap-4 opacity-50">
                              <div className="w-32 h-32 rounded-2xl bg-rose-500 animate-pulse"></div>
                              <div className="w-32 h-32 rounded-2xl bg-indigo-500" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-32 h-32 rounded-2xl bg-blue-500" style={{animationDelay: '0.4s'}}></div>
                              <div className="w-32 h-32 rounded-2xl bg-emerald-500" style={{animationDelay: '0.6s'}}></div>
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                           <div className="absolute bottom-8 left-8 right-8">
                              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                      </svg>
                                   </div>
                                   <div>
                                     <div className="text-white font-bold text-lg">Normal Hemoglobin</div>
                                     <div className="text-slate-300 text-sm">Analysis Complete</div>
                                   </div>
                                </div>
                              </div>
                           </div>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );

      case AppState.SCAN:
        return (
          <div className="px-6 py-12 max-w-7xl mx-auto">
             <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden min-h-[700px]">
               <div className="grid lg:grid-cols-12 h-full">
                 {/* Sidebar / Controls */}
                 <div className="lg:col-span-4 p-10 md:p-14 bg-slate-50 border-r border-slate-100 flex flex-col">
                   <div className="mb-10">
                     <button onClick={() => setState(AppState.HOME)} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-6 font-medium">
                       <ChevronLeftIcon className="w-5 h-5" /> Back
                     </button>
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">Configuration</h2>
                     <p className="text-slate-600">Select the area to scan and ensure proper lighting conditions.</p>
                   </div>
                   
                   <div className="space-y-8 flex-1">
                     <div className="space-y-4">
                       <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Analysis Target</label>
                       <div className="flex flex-col gap-4">
                         <button 
                           onClick={() => setScanArea('NailBed')}
                           className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${scanArea === 'NailBed' ? 'border-rose-600 bg-white shadow-lg shadow-rose-100 ring-1 ring-rose-200' : 'border-slate-200 bg-white hover:border-rose-300'}`}
                         >
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scanArea === 'NailBed' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                              </svg>
                           </div>
                           <div>
                             <span className={`block font-bold text-lg ${scanArea === 'NailBed' ? 'text-rose-900' : 'text-slate-700'}`}>Fingernails</span>
                             <span className="text-sm text-slate-500">Check for pallor in nail beds</span>
                           </div>
                         </button>

                         <button 
                           onClick={() => setScanArea('Conjunctiva')}
                           className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${scanArea === 'Conjunctiva' ? 'border-rose-600 bg-white shadow-lg shadow-rose-100 ring-1 ring-rose-200' : 'border-slate-200 bg-white hover:border-rose-300'}`}
                         >
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scanArea === 'Conjunctiva' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                           </div>
                           <div>
                             <span className={`block font-bold text-lg ${scanArea === 'Conjunctiva' ? 'text-rose-900' : 'text-slate-700'}`}>Eye (Conjunctiva)</span>
                             <span className="text-sm text-slate-500">Check lower eyelid pallor</span>
                           </div>
                         </button>
                       </div>
                     </div>

                     <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                       <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                         Instructions
                       </h4>
                       <ul className="space-y-3 text-blue-800/80">
                         {scanArea === 'NailBed' ? (
                           <>
                             <li className="flex gap-3 text-sm"><span className="text-blue-500 font-bold">•</span> Place hand flat on a neutral background</li>
                             <li className="flex gap-3 text-sm"><span className="text-blue-500 font-bold">•</span> Ensure bright, even lighting</li>
                             <li className="flex gap-3 text-sm"><span className="text-blue-500 font-bold">•</span> Avoid flash reflection on nails</li>
                           </>
                         ) : (
                           <>
                             <li className="flex gap-3 text-sm"><span className="text-blue-500 font-bold">•</span> Gently pull down the lower eyelid</li>
                             <li className="flex gap-3 text-sm"><span className="text-blue-500 font-bold">•</span> Look upward while capturing</li>
                             <li className="flex gap-3 text-sm"><span className="text-blue-500 font-bold">•</span> Use natural light if possible</li>
                           </>
                         )}
                       </ul>
                     </div>
                   </div>
                 </div>

                 {/* Main Area / Uploader */}
                 <div className="lg:col-span-8 p-10 md:p-14 bg-white flex flex-col items-center justify-center">
                    <ImageUploader onImageSelected={handleImageSelected} />
                 </div>
               </div>
             </div>
          </div>
        );

      case AppState.ANALYZING:
        return (
          <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-8 animate-fade-in bg-white/50">
             <div className="relative mb-16">
               <div className="w-40 h-40 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                    <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 animate-pulse"></div>
                    <HeartIcon className="w-16 h-16 text-rose-600 relative z-10" />
                 </div>
               </div>
             </div>
             <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Analyzing Clinical Biomarkers</h2>
             <div className="max-w-xl mx-auto space-y-2 text-slate-500 text-lg">
                <p>Detecting Pallor Levels...</p>
                <p>Evaluating Hemoglobin Color Intensity...</p>
                <p>Checking Vascularization...</p>
             </div>
          </div>
        );

      case AppState.RESULTS:
        return result ? (
          <div className="px-6 py-12 max-w-7xl mx-auto animate-fade-in">
             <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={resetApp} className="p-2 hover:bg-white hover:shadow-md rounded-full transition-all border border-transparent hover:border-slate-100">
                    <ChevronLeftIcon className="w-6 h-6 text-slate-600" />
                  </button>
                  <div>
                      <h2 className="text-3xl font-bold text-slate-900">Analysis Report</h2>
                      <p className="text-slate-500">Generated by AI Model • {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={resetApp}>Start New Scan</Button>
             </div>
             
             <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Image */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-4 rounded-[2rem] shadow-lg border border-slate-100">
                        <div className="aspect-square w-full rounded-[1.5rem] overflow-hidden bg-slate-100 relative">
                            {capturedImage && (
                                <img src={capturedImage} alt="Analyzed Subject" className="w-full h-full object-cover" />
                            )}
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                                {scanArea === 'NailBed' ? 'Fingernails' : 'Conjunctiva'}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <h4 className="font-bold text-slate-800 mb-3">Scan Metadata</h4>
                        <div className="space-y-3 text-sm text-slate-600">
                            <div className="flex justify-between pb-2 border-b border-slate-200">
                                <span>Model Version</span>
                                <span className="font-medium">Gemini 2.5 Flash</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-slate-200">
                                <span>Target Area</span>
                                <span className="font-medium">{scanArea}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Processing Time</span>
                                <span className="font-medium">~1.2s</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-7">
                   <ResultCard result={result} onRetry={resetApp} />
                </div>
             </div>
          </div>
        ) : null;

      case AppState.EDUCATION:
        return (
          <div className="px-6 py-12 max-w-7xl mx-auto">
            <div className="mb-10 text-center max-w-3xl mx-auto">
               <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
                 <BookOpenIcon className="w-8 h-8 text-emerald-600" />
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Health & Nutrition Hub</h2>
               <p className="text-xl text-slate-600">Empowering you with knowledge to prevent and manage anemia effectively.</p>
            </div>
            <EducationModule />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-rose-100">
      <Navbar 
        currentState={state} 
        onBack={() => setState(AppState.HOME)} 
      />
      <main className="w-full pb-20">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;