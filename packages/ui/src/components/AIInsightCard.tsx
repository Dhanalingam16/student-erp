import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export interface AIInsightCardProps {
  title: string;
  category?: string;
  description: string;
  recommendations: string[];
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  category = 'System Insight',
  description,
  recommendations,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`p-5 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1.5 rounded-md bg-indigo-100 text-indigo-700">
          <Sparkles className="w-4 h-4" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">AI INSIGHT • {category}</span>
      </div>
      <h4 className="text-sm font-semibold text-slate-900 mt-1">{title}</h4>
      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{description}</p>
      
      {recommendations.length > 0 && (
        <div className="mt-3 bg-white/80 p-3 rounded-lg border border-slate-100">
          <span className="text-xs font-medium text-slate-700 block mb-1">Recommended Action:</span>
          <ul className="space-y-1">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {actionLabel && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
