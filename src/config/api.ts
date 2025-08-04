// API Configuration
export const API_CONFIG = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo'
  },
  aviationStack: {
    apiKey: import.meta.env.VITE_AVIATION_STACK_API_KEY,
    baseUrl: 'http://api.aviationstack.com/v1'
  },
  alphaVantage: {
    apiKey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
    baseUrl: 'https://www.alphavantage.co/query'
  }
};

// API endpoints
export const ENDPOINTS = {
  flights: '/flights',
  insights: '/chat/completions',
  marketData: '/query'
};