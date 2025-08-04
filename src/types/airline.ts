export interface FlightData {
  id: string;
  origin: string;
  destination: string;
  price: number;
  date: string;
  airline: string;
  demand: number;
  bookings: number;
}

export interface MarketInsight {
  category: string;
  insight: string;
  impact: 'high' | 'medium' | 'low';
  trend: 'up' | 'down' | 'stable';
}

export interface RoutePopularity {
  route: string;
  bookings: number;
  avgPrice: number;
  demandScore: number;
}

export interface PriceTrend {
  date: string;
  price: number;
  route: string;
}