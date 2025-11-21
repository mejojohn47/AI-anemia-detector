import React from 'react';
import { HeartIcon } from '../icons';
import { AppState } from '../types';

interface NavbarProps {
  onBack?: () => void;
  currentState: AppState;
}

const Navbar: React.FC<NavbarProps> = ({ onBack, currentState }) => {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={onBack}>
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-2.5 rounded-xl shadow-lg shadow-rose-500/20">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-slate-800 tracking-tight">AI - Anemia Detector</span>
        </div>
        
        <div className="flex items-center gap-4">
          {currentState !== AppState.HOME && currentState !== AppState.DISCLAIMER && (
            <button 
              onClick={onBack}
              className="hidden md:block px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              Back to Dashboard
            </button>
          )}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            System Operational
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;