import React from 'react';
import { Plane, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <Plane className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Airline Market Analyzer</h1>
              <p className="text-blue-100 mt-1">Real-time booking demand insights for Australian routes</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <TrendingUp className="w-5 h-5 text-green-300" />
            <span className="font-semibold">Live Data</span>
          </div>
        </div>
      </div>
    </header>
  );
};