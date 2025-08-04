import React, { useState, useEffect } from 'react';
import { Plane, Users, DollarSign, BarChart3, Brain, Settings } from 'lucide-react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { InsightCard } from './components/InsightCard';
import { PopularRoutesChart, PriceTrendsChart } from './components/ChartContainer';
import { FilterPanel } from './components/FilterPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ApiStatus } from './components/ApiStatus';
import { AirlineService } from './services/airlineService';
import { FlightData, MarketInsight, RoutePopularity, PriceTrend } from './types/airline';

function App() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [popularRoutes, setPopularRoutes] = useState<RoutePopularity[]>([]);
  const [priceTrends, setPriceTrends] = useState<PriceTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showApiStatus, setShowApiStatus] = useState(false);

  const loadData = async (showRefreshing = false) => {
    if (showRefreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await AirlineService.fetchFlightData();
      const marketInsights = await AirlineService.generateInsights(data);
      const routes = AirlineService.getPopularRoutes(data);
      const trends = await AirlineService.getMarketTrends();

      setFlightData(data);
      setInsights(marketInsights);
      setPopularRoutes(routes);
      setPriceTrends(trends);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Market Data</h2>
          <p className="text-gray-500">Fetching latest airline booking trends...</p>
        </div>
      </div>
    );
  }

  const totalBookings = flightData.reduce((sum, flight) => sum + flight.bookings, 0);
  const avgPrice = Math.round(flightData.reduce((sum, flight) => sum + flight.price, 0) / flightData.length);
  const avgDemand = Math.round(flightData.reduce((sum, flight) => sum + flight.demand, 0) / flightData.length);
  const totalRoutes = new Set(flightData.map(f => `${f.origin}-${f.destination}`)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterPanel onRefresh={handleRefresh} isLoading={isRefreshing} />

        {/* API Status Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowApiStatus(!showApiStatus)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Settings className="w-4 h-4" />
            API Status
          </button>
        </div>

        {showApiStatus && (
          <div className="mb-8">
            <ApiStatus />
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Bookings"
            value={totalBookings.toLocaleString()}
            trend="up"
            trendValue="+12%"
            icon={<Users className="w-6 h-6" />}
          />
          <MetricCard
            title="Average Price"
            value={`$${avgPrice}`}
            trend="up"
            trendValue="+8%"
            icon={<DollarSign className="w-6 h-6" />}
          />
          <MetricCard
            title="Market Demand"
            value={`${avgDemand}%`}
            trend="stable"
            trendValue="±2%"
            icon={<BarChart3 className="w-6 h-6" />}
          />
          <MetricCard
            title="Active Routes"
            value={totalRoutes}
            trend="up"
            trendValue="+5"
            icon={<Plane className="w-6 h-6" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PopularRoutesChart routes={popularRoutes} />
          <PriceTrendsChart trends={priceTrends} />
        </div>

        {/* AI Insights */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Market Insights</h2>
            {isRefreshing && <LoadingSpinner size="sm" />}
            <span className="text-sm text-gray-500 ml-2">(Powered by OpenAI)</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>

        {/* Popular Routes Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Routes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {popularRoutes.slice(0, 6).map((route, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Plane className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{route.route}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.bookings.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${route.avgPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(route.demandScore, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{route.demandScore}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;