import React from 'react';
import { HeartIcon } from '../../icons';
import Button from '../Button';

interface DisclaimerViewProps {
  onAcknowledge: () => void;
}

const DisclaimerView: React.FC<DisclaimerViewProps> = ({ onAcknowledge }) => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-slate-50/50">
      <div className="max-w-2xl w-full bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white text-center space-y-10 animate-fade-in">
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-5 rounded-3xl inline-block shadow-lg shadow-rose-500/30 transform hover:scale-105 transition-transform">
          <HeartIcon className="w-16 h-16 text-white" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Research & Academic Use Only</h1>
          <p className="text-slate-500 text-lg">Please review the following disclaimer before proceeding.</p>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -mr-12 -mt-12 opacity-50 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex gap-4">
             <div className="w-1 h-auto bg-amber-300 rounded-full"></div>
             <p className="text-amber-900 text-lg leading-relaxed font-medium">
               This AI system has the potential to assist in early-stage anemia screening and can be developed into a diagnostic tool in the future. However, the current version is for academic and research use only. Clinical confirmation through a hemoglobin test is still required.
             </p>
          </div>
        </div>

        <div className="max-w-sm mx-auto pt-4">
          <Button fullWidth onClick={onAcknowledge} className="py-4 text-lg shadow-rose-500/20 hover:shadow-rose-500/40">
            I Acknowledge & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerView;