import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { RoutePopularity, PriceTrend } from '../types/airline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PopularRoutesChartProps {
  routes: RoutePopularity[];
}

export const PopularRoutesChart: React.FC<PopularRoutesChartProps> = ({ routes }) => {
  const data = {
    labels: routes.map(route => route.route),
    datasets: [
      {
        label: 'Total Bookings',
        data: routes.map(route => route.bookings),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Most Popular Routes by Bookings',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <Bar data={data} options={options} />
    </div>
  );
};

interface PriceTrendsChartProps {
  trends: PriceTrend[];
}

export const PriceTrendsChart: React.FC<PriceTrendsChartProps> = ({ trends }) => {
  const data = {
    labels: trends.slice(0, 15).map(trend => new Date(trend.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Price ($)',
        data: trends.slice(0, 15).map(trend => trend.price),
        borderColor: 'rgba(249, 115, 22, 1)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(249, 115, 22, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Price Trends Over Time',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <Line data={data} options={options} />
    </div>
  );
};