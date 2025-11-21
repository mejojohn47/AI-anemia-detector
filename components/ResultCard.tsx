import React from 'react';
import { AnalysisResult } from '../types';
import { CheckBadgeIcon, ExclamationTriangleIcon } from '../icons';
import Button from './Button';

interface ResultCardProps {
  result: AnalysisResult;
  onRetry: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onRetry }) => {
  const isAnemic = result.prediction === 'Anemic';
  const isUncertain = result.prediction === 'Uncertain';

  const getHeaderStyle = () => {
    if (isUncertain) return "bg-slate-100 text-slate-800 border-slate-200";
    return isAnemic 
      ? "bg-red-50 text-red-800 border-red-200" 
      : "bg-emerald-50 text-emerald-800 border-emerald-200";
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      {/* Main Status Card */}
      <div className={`p-6 rounded-3xl border-2 text-center ${getHeaderStyle()}`}>
        <div className="flex justify-center mb-4">
          {isUncertain ? (
             <ExclamationTriangleIcon className="w-16 h-16 text-slate-400" />
          ) : isAnemic ? (
             <div className="relative">
               <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-20"></div>
               <ExclamationTriangleIcon className="w-16 h-16 text-red-600 relative z-10" />
             </div>
          ) : (
             <CheckBadgeIcon className="w-16 h-16 text-emerald-600" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold mb-1">
            {isUncertain ? "Try Again" : result.prediction}
        </h2>
        <p className="font-medium opacity-80">
            {isUncertain ? "Could not analyze image" : `Likelihood: ${result.confidence}%`}
        </p>
      </div>

      {/* Pallor Gauge (Simple CSS implementation) */}
      {!isUncertain && (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                <span>Normal</span>
                <span>Severe</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full flex-1 bg-gradient-to-r from-green-400 to-yellow-400 opacity-30"></div>
                <div className="h-full flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30"></div>
                <div className="h-full flex-1 bg-gradient-to-r from-orange-500 to-red-600 opacity-30"></div>
            </div>
            {/* Marker */}
            <div className="relative -mt-5 mx-1 h-6">
                 <div 
                    className="absolute w-1 h-6 bg-slate-800 rounded transition-all duration-1000"
                    style={{
                        left: result.pallorLevel === 'None' ? '15%' :
                              result.pallorLevel === 'Mild' ? '40%' :
                              result.pallorLevel === 'Moderate' ? '65%' : '90%'
                    }}
                 ></div>
            </div>
            <p className="text-center text-sm font-medium text-slate-600 mt-2">
                Detected Pallor: <span className="text-slate-900">{result.pallorLevel}</span>
            </p>
        </div>
      )}

      {/* Reasoning & Recommendations */}
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">Analysis</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{result.reasoning}</p>
        </div>

        {result.recommendations.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3">Recommendations</h3>
                <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600">
                            <span className="text-rose-500 font-bold">•</span>
                            {rec}
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>

      <div className="pt-4">
        <Button variant="secondary" fullWidth onClick={onRetry}>
            Scan New Patient
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;