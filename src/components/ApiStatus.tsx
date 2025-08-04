import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface ApiStatusProps {
  className?: string;
}

export const ApiStatus: React.FC<ApiStatusProps> = ({ className = '' }) => {
  const [apiStatus, setApiStatus] = React.useState({
    openai: 'checking',
    aviationStack: 'checking',
    alphaVantage: 'checking'
  });

  React.useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = () => {
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const aviationKey = import.meta.env.VITE_AVIATION_STACK_API_KEY;
    const alphaKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

    setApiStatus({
      openai: openaiKey ? 'connected' : 'mock',
      aviationStack: aviationKey ? 'connected' : 'mock',
      alphaVantage: alphaKey ? 'connected' : 'mock'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'mock':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Live API';
      case 'mock':
        return 'Mock Data';
      default:
        return 'Offline';
    }
  };

  const hasLiveConnection = Object.values(apiStatus).some(status => status === 'connected');

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {hasLiveConnection ? (
          <Wifi className="w-5 h-5 text-green-500" />
        ) : (
          <WifiOff className="w-5 h-5 text-yellow-500" />
        )}
        <h3 className="font-semibold text-gray-900">API Status</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">OpenAI (Insights)</span>
          <div className="flex items-center gap-1">
            {getStatusIcon(apiStatus.openai)}
            <span className={apiStatus.openai === 'connected' ? 'text-green-600' : 'text-yellow-600'}>
              {getStatusText(apiStatus.openai)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Aviation Stack</span>
          <div className="flex items-center gap-1">
            {getStatusIcon(apiStatus.aviationStack)}
            <span className={apiStatus.aviationStack === 'connected' ? 'text-green-600' : 'text-yellow-600'}>
              {getStatusText(apiStatus.aviationStack)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Alpha Vantage</span>
          <div className="flex items-center gap-1">
            {getStatusIcon(apiStatus.alphaVantage)}
            <span className={apiStatus.alphaVantage === 'connected' ? 'text-green-600' : 'text-yellow-600'}>
              {getStatusText(apiStatus.alphaVantage)}
            </span>
          </div>
        </div>
      </div>
      
      {!hasLiveConnection && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          <strong>Demo Mode:</strong> Add API keys to .env file for live data
        </div>
      )}
    </div>
  );
};