import React from 'react';
import { HeartIcon } from '../icons';
import { AppState } from '../types';

interface NavbarProps {
  onBack?: () => void;
  currentState: AppState;
}

const Navbar: React.FC<NavbarProps> = ({ onBack, currentState }) => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="bg-rose-100 p-2.5 rounded-full">
            <HeartIcon className="w-6 h-6 text-rose-600" />
          </div>
          <span className="font-bold text-2xl text-slate-800 tracking-tight">AI - Anemia Detector</span>
        </div>
        
        {currentState !== AppState.HOME && (
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            Back to Home
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;