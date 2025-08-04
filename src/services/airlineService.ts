import { FlightData, MarketInsight, RoutePopularity, PriceTrend } from '../types/airline';

// Mock airline data service (in production, this would connect to real APIs)
export class AirlineService {
  private static generateMockData(): FlightData[] {
    const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Darwin', 'Hobart'];
    const airlines = ['Qantas', 'Virgin Australia', 'Jetstar', 'Rex Airlines', 'Tigerair'];
    const data: FlightData[] = [];

    for (let i = 0; i < 200; i++) {
      const origin = cities[Math.floor(Math.random() * cities.length)];
      let destination = cities[Math.floor(Math.random() * cities.length)];
      while (destination === origin) {
        destination = cities[Math.floor(Math.random() * cities.length)];
      }

      const basePrice = 200 + Math.random() * 800;
      const demandMultiplier = 0.5 + Math.random() * 1.5;
      
      data.push({
        id: `flight-${i}`,
        origin,
        destination,
        price: Math.round(basePrice * demandMultiplier),
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        demand: Math.round(demandMultiplier * 100),
        bookings: Math.round(Math.random() * 500 + 50)
      });
    }

    return data;
  }

  static async fetchFlightData(): Promise<FlightData[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.generateMockData();
  }

  static async generateInsights(data: FlightData[]): Promise<MarketInsight[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const insights: MarketInsight[] = [
      {
        category: 'Peak Demand',
        insight: 'Sydney-Melbourne route shows 35% higher demand during weekends',
        impact: 'high',
        trend: 'up'
      },
      {
        category: 'Pricing Trends',
        insight: 'Average ticket prices increased 12% compared to last month',
        impact: 'medium',
        trend: 'up'
      },
      {
        category: 'Popular Routes',
        insight: 'Interstate routes dominate 68% of all bookings',
        impact: 'high',
        trend: 'stable'
      },
      {
        category: 'Seasonal Patterns',
        insight: 'Tourism destinations see 40% booking spike approaching holidays',
        impact: 'medium',
        trend: 'up'
      }
    ];

    return insights;
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
    const trends = data
      .slice(0, 30)
      .map(flight => ({
        date: flight.date.split('T')[0],
        price: flight.price,
        route: `${flight.origin}-${flight.destination}`
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return trends;
  }
}