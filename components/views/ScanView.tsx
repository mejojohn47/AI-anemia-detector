import React from 'react';
import { ChevronLeftIcon } from '../../icons';
import ImageUploader from '../ImageUploader';
import { ScanConfig, AppState } from '../../types';

interface ScanViewProps {
  scanArea: ScanConfig['area'];
  setScanArea: (area: ScanConfig['area']) => void;
  onImageSelected: (base64: string) => void;
  onBack: () => void;
}

const ScanView: React.FC<ScanViewProps> = ({ scanArea, setScanArea, onImageSelected, onBack }) => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto animate-fade-in">
       <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden min-h-[700px]">
         <div className="grid lg:grid-cols-12 h-full">
           {/* Sidebar / Controls */}
           <div className="lg:col-span-4 p-10 md:p-14 bg-slate-50 border-r border-slate-100 flex flex-col">
             <div className="mb-10">
               <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-6 font-medium transition-colors">
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
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${scanArea === 'NailBed' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
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
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${scanArea === 'Conjunctiva' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
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
              <ImageUploader onImageSelected={onImageSelected} />
           </div>
         </div>
       </div>
    </div>
  );
};

export default ScanView;