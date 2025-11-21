import React from 'react';
import { AnalysisResult } from '../types';
import { CheckBadgeIcon, ExclamationTriangleIcon, BookOpenIcon, HeartIcon } from '../icons';
import Button from './Button';

interface ResultCardProps {
  result: AnalysisResult;
  onRetry: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onRetry }) => {
  const isAnemic = result.prediction === 'Anemic';
  const isUncertain = result.prediction === 'Uncertain';
  const isNormal = result.prediction === 'Normal';

  const statusColor = isUncertain 
    ? 'slate' 
    : isAnemic 
      ? 'rose' 
      : 'emerald';

  // Confidence Gauge Calculation
  const confidenceRotation = (result.confidence / 100) * 180;

  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden flex flex-col h-full animate-fade-in">
      {/* Header Section */}
      <div className={`px-8 py-6 border-b border-slate-100 bg-${statusColor}-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div>
          <h2 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-1">Assessment Result</h2>
          <div className="flex items-center gap-3">
            {isUncertain ? (
              <ExclamationTriangleIcon className="w-8 h-8 text-slate-400" />
            ) : isAnemic ? (
              <div className="relative">
                <span className="flex h-3 w-3 absolute -top-1 -right-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <ExclamationTriangleIcon className="w-8 h-8 text-rose-600" />
              </div>
            ) : (
              <CheckBadgeIcon className="w-8 h-8 text-emerald-600" />
            )}
            <span className={`text-3xl md:text-4xl font-extrabold text-${statusColor}-700`}>
              {result.prediction}
            </span>
          </div>
        </div>
        
        {!isUncertain && (
           <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase">Confidence Score</span>
              <div className="text-xl font-bold text-slate-700">{result.confidence}%</div>
           </div>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="p-8 grid md:grid-cols-2 gap-8 flex-1 overflow-y-auto">
        
        {/* Left Col: Metrics & Visuals */}
        <div className="space-y-8">
           {!isUncertain && (
             <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-slate-700">Pallor Severity Index</h3>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${statusColor}-100 text-${statusColor}-700`}>
                     {result.pallorLevel}
                   </span>
                </div>
                
                {/* Medical Gauge Visual */}
                <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-yellow-400 to-rose-500 opacity-50"></div>
                   {/* Marker */}
                   <div 
                      className="absolute top-0 bottom-0 w-1.5 bg-slate-800 border-[0.5px] border-white shadow-md transition-all duration-1000 ease-out"
                      style={{
                        left: result.pallorLevel === 'None' ? '15%' :
                              result.pallorLevel === 'Mild' ? '40%' :
                              result.pallorLevel === 'Moderate' ? '65%' : '90%'
                      }}
                   ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                   <span>Healthy</span>
                   <span>Critical</span>
                </div>
             </div>
           )}

           <div className="space-y-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-slate-400" />
                Clinical Reasoning
              </h3>
              <p className="text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                {result.reasoning}
              </p>
           </div>
        </div>

        {/* Right Col: Recommendations */}
        <div className="space-y-6">
           <h3 className="font-bold text-slate-900 flex items-center gap-2">
             <BookOpenIcon className="w-5 h-5 text-slate-400" />
             Actionable Insights
           </h3>
           
           {result.recommendations.length > 0 ? (
             <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50 hover:bg-indigo-50 transition-colors">
                     <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                     </div>
                     <p className="text-indigo-900/80 text-sm font-medium leading-snug">
                       {rec}
                     </p>
                  </div>
                ))}
             </div>
           ) : (
             <div className="p-6 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 text-sm">
               No specific recommendations available.
             </div>
           )}

           {!isUncertain && (
             <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  <strong>Note:</strong> This screening is not a clinical diagnosis. Please consult a healthcare professional for a Complete Blood Count (CBC) test if symptoms persist.
                </p>
             </div>
           )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-100 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="secondary" onClick={onRetry} className="w-full">
          Perform New Scan
        </Button>
        <Button variant="outline" onClick={() => window.print()} className="w-full hidden md:flex">
          Print Report
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;