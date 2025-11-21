import React from 'react';
import { CameraIcon, BookOpenIcon } from '../../icons';
import { AppState } from '../../types';

interface HomeViewProps {
  onNavigate: (state: AppState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col px-6 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10 animate-slide-up">
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
               onClick={() => onNavigate(AppState.SCAN)}
               className="flex items-center justify-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
             >
               <CameraIcon className="w-6 h-6" />
               Start Analysis
             </button>
             <button 
               onClick={() => onNavigate(AppState.EDUCATION)}
               className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-slate-300 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
             >
               <BookOpenIcon className="w-6 h-6" />
               Health Guide
             </button>
           </div>

           <div className="flex gap-8 pt-8 border-t border-slate-200">
              <div className="group cursor-default">
                  <div className="text-3xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">92%</div>
                  <div className="text-slate-500 text-sm">Accuracy in Tests</div>
              </div>
              <div className="group cursor-default">
                  <div className="text-3xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">&lt;10s</div>
                  <div className="text-slate-500 text-sm">Analysis Time</div>
              </div>
              <div className="group cursor-default">
                  <div className="text-3xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">0</div>
                  <div className="text-slate-500 text-sm">Invasive Needles</div>
              </div>
           </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in">
           <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-indigo-600 rounded-[3rem] opacity-20 blur-[80px] transform rotate-3"></div>
           <div className="bg-white rounded-[3rem] p-4 shadow-2xl border border-slate-100 relative overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-slate-100 relative">
                  {/* Hero visual representation */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 group-hover:scale-105 transition-transform duration-700">
                     <div className="grid grid-cols-2 gap-4 opacity-50">
                        <div className="w-32 h-32 rounded-2xl bg-rose-500 animate-pulse"></div>
                        <div className="w-32 h-32 rounded-2xl bg-indigo-500" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-32 h-32 rounded-2xl bg-blue-500" style={{animationDelay: '0.4s'}}></div>
                        <div className="w-32 h-32 rounded-2xl bg-emerald-500" style={{animationDelay: '0.6s'}}></div>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                     <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
};

export default HomeView;