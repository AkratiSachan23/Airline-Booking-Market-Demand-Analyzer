import { FlightData, MarketInsight, RoutePopularity, PriceTrend } from '../types/airline';
import { APIClient } from './apiClient';

// Enhanced airline data service with real API integration
export class AirlineService {
  static async fetchFlightData(): Promise<FlightData[]> {
    console.log('Fetching flight data from APIs...');
    return await APIClient.fetchFlightData();
  }

  static async generateInsights(data: FlightData[]): Promise<MarketInsight[]> {
    console.log('Generating AI-powered insights...');
    return await APIClient.generateInsights(data);
  }

  static getPopularRoutes(data: FlightData[]): RoutePopularity[] {
    const routeMap = new Map<string, { bookings: number; totalPrice: number; count: number; demand: number }>();

    data.forEach(flight => {
      const route = `${flight.origin} → ${flight.destination}`;
      const existing = routeMap.get(route) || { bookings: 0, totalPrice: 0, count: 0, demand: 0 };
      
      routeMap.set(route, {
        bookings: existing.bookings + flight.bookings,
        totalPrice: existing.totalPrice + flight.price,
        count: existing.count + 1,
        demand: existing.demand + flight.demand
      });
    });

    return Array.from(routeMap.entries())
      .map(([route, stats]) => ({
        route,
        bookings: stats.bookings,
        avgPrice: Math.round(stats.totalPrice / stats.count),
        demandScore: Math.round(stats.demand / stats.count)
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 8);
  }

  static getPriceTrends(data: FlightData[]): PriceTrend[] {
    // Combine real flight data with market trends
    const flightTrends = data
      .slice(0, 15)
      .map(flight => ({
        date: flight.date.split('T')[0],
        price: flight.price,
        route: `${flight.origin}-${flight.destination}`
      }));

    return flightTrends.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  static async getMarketTrends(): Promise<PriceTrend[]> {
    console.log('Fetching market trend data...');
    return await APIClient.fetchMarketTrends();
  }
}