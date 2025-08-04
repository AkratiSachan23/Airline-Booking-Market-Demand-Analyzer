import React from 'react';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MarketInsight } from '../types/airline';

interface InsightCardProps {
  insight: MarketInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getImpactColor = () => {
    switch (insight.impact) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-green-50 border-green-200 text-green-800';
    }
  };

  const getTrendIcon = () => {
    switch (insight.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-900">{insight.category}</span>
        </div>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor()}`}>
            {insight.impact} impact
          </span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{insight.insight}</p>
    </div>
  );
};