import { API_CONFIG } from '../config/api';

export class APIClient {
  private static async makeRequest(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // OpenAI API for generating insights
  static async generateInsights(flightData: any[]): Promise<any> {
    if (!API_CONFIG.openai.apiKey) {
      console.warn('OpenAI API key not configured, using mock insights');
      return this.getMockInsights();
    }

    const prompt = `Analyze this airline booking data and provide 4 key market insights:
    
Data Summary:
- Total flights: ${flightData.length}
- Average price: $${Math.round(flightData.reduce((sum, f) => sum + f.price, 0) / flightData.length)}
- Top routes: ${this.getTopRoutes(flightData).join(', ')}
- Price range: $${Math.min(...flightData.map(f => f.price))} - $${Math.max(...flightData.map(f => f.price))}

Please provide insights in this JSON format:
[
  {
    "category": "Peak Demand",
    "insight": "specific insight about demand patterns",
    "impact": "high|medium|low",
    "trend": "up|down|stable"
  }
]

Focus on: demand trends, pricing patterns, popular routes, and seasonal factors.`;

    try {
      const response = await this.makeRequest(`${API_CONFIG.openai.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.openai.apiKey}`,
        },
        body: JSON.stringify({
          model: API_CONFIG.openai.model,
          messages: [
            {
              role: 'system',
              content: 'You are an airline market analyst. Provide concise, actionable insights in the requested JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        try {
          return JSON.parse(content);
        } catch (parseError) {
          console.error('Failed to parse OpenAI response:', parseError);
          return this.getMockInsights();
        }
      }
      
      return this.getMockInsights();
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.getMockInsights();
    }
  }

  // Aviation Stack API for real flight data
  static async fetchFlightData(): Promise<any[]> {
    if (!API_CONFIG.aviationStack.apiKey) {
      console.warn('Aviation Stack API key not configured, using mock data');
      return this.getMockFlightData();
    }

    try {
      // Fetch flights for major Australian routes
      const routes = [
        { dep: 'SYD', arr: 'MEL' },
        { dep: 'MEL', arr: 'BNE' },
        { dep: 'SYD', arr: 'BNE' },
        { dep: 'PER', arr: 'SYD' },
        { dep: 'ADL', arr: 'MEL' }
      ];

      const flightPromises = routes.map(route => 
        this.makeRequest(
          `${API_CONFIG.aviationStack.baseUrl}/flights?access_key=${API_CONFIG.aviationStack.apiKey}&dep_iata=${route.dep}&arr_iata=${route.arr}&limit=20`
        )
      );

      const responses = await Promise.all(flightPromises);
      const allFlights = responses.flatMap(response => response.data || []);

      return this.transformFlightData(allFlights);
    } catch (error) {
      console.error('Aviation Stack API error:', error);
      return this.getMockFlightData();
    }
  }

  // Alpha Vantage for additional market data
  static async fetchMarketTrends(): Promise<any[]> {
    if (!API_CONFIG.alphaVantage.apiKey) {
      console.warn('Alpha Vantage API key not configured, using mock trends');
      return this.getMockTrends();
    }

    try {
      // Fetch travel industry stock data as market indicator
      const response = await this.makeRequest(
        `${API_CONFIG.alphaVantage.baseUrl}?function=TIME_SERIES_DAILY&symbol=UAL&apikey=${API_CONFIG.alphaVantage.apiKey}`
      );

      const timeSeries = response['Time Series (Daily)'];
      if (timeSeries) {
        return Object.entries(timeSeries)
          .slice(0, 30)
          .map(([date, data]: [string, any]) => ({
            date,
            price: parseFloat(data['4. close']),
            route: 'Market Index'
          }));
      }

      return this.getMockTrends();
    } catch (error) {
      console.error('Alpha Vantage API error:', error);
      return this.getMockTrends();
    }
  }

  // Helper methods
  private static getTopRoutes(flightData: any[]): string[] {
    const routeCounts = new Map();
    flightData.forEach(flight => {
      const route = `${flight.origin}-${flight.destination}`;
      routeCounts.set(route, (routeCounts.get(route) || 0) + 1);
    });
    
    return Array.from(routeCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([route]) => route);
  }

  private static transformFlightData(apiFlights: any[]): any[] {
    return apiFlights.map((flight, index) => ({
      id: `flight-${index}`,
      origin: this.getAirportCity(flight.departure?.iata || 'SYD'),
      destination: this.getAirportCity(flight.arrival?.iata || 'MEL'),
      price: Math.round(200 + Math.random() * 800), // Estimated pricing
      date: flight.flight_date || new Date().toISOString(),
      airline: flight.airline?.name || 'Unknown Airline',
      demand: Math.round(50 + Math.random() * 50),
      bookings: Math.round(Math.random() * 500 + 50)
    }));
  }

  private static getAirportCity(iata: string): string {
    const cityMap: { [key: string]: string } = {
      'SYD': 'Sydney',
      'MEL': 'Melbourne',
      'BNE': 'Brisbane',
      'PER': 'Perth',
      'ADL': 'Adelaide',
      'DRW': 'Darwin',
      'HBA': 'Hobart'
    };
    return cityMap[iata] || iata;
  }

  // Fallback mock data methods
  private static getMockInsights() {
    return [
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
  }

  private static getMockFlightData() {
    const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Darwin', 'Hobart'];
    const airlines = ['Qantas', 'Virgin Australia', 'Jetstar', 'Rex Airlines', 'Tigerair'];
    const data = [];

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

  private static getMockTrends() {
    const trends = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toISOString().split('T')[0],
        price: 300 + Math.random() * 400,
        route: 'Market Average'
      });
    }
    return trends.reverse();
  }
}