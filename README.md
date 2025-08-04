# Airline Booking Market Demand Analyzer

A comprehensive web application for analyzing airline booking market demand trends with real-time data integration and AI-powered insights.

## 🚀 Features

- **Real-time Data Integration**: Connects to multiple APIs for live flight data
- **AI-Powered Insights**: Uses OpenAI GPT to generate market analysis
- **Interactive Visualizations**: Dynamic charts and graphs using Chart.js
- **Market Trend Analysis**: Price trends, demand patterns, and route popularity
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **API Status Monitoring**: Real-time status of all connected APIs

## 🔧 API Integrations

### 1. OpenAI API (ChatGPT)
- **Purpose**: Generates intelligent market insights and trend analysis
- **Features**: Analyzes flight data to provide actionable business insights
- **Get API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)

### 2. Aviation Stack API
- **Purpose**: Real-time flight data and airline information
- **Features**: Flight schedules, routes, and airline details
- **Get API Key**: [Aviation Stack](https://aviationstack.com/)

### 3. Alpha Vantage API
- **Purpose**: Market trend data and financial indicators
- **Features**: Travel industry stock data as market indicators
- **Get API Key**: [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

## 🛠️ Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd airline-market-analyzer
npm install
```

### 2. Configure API Keys
Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_AVIATION_STACK_API_KEY=your_aviation_stack_api_key_here
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
```

### 3. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📊 How It Works

1. **Data Collection**: Fetches real-time flight data from Aviation Stack API
2. **AI Analysis**: Sends data to OpenAI for intelligent insight generation
3. **Market Trends**: Retrieves financial market data from Alpha Vantage
4. **Visualization**: Processes and displays data in interactive charts
5. **Real-time Updates**: Refreshes data and insights on demand

## 🎯 Key Metrics Analyzed

- **Total Bookings**: Aggregated booking numbers across all routes
- **Average Pricing**: Real-time price analysis with trend indicators
- **Market Demand**: Demand scoring based on booking patterns
- **Route Popularity**: Most popular routes by booking volume
- **Price Trends**: Historical price movements and predictions

## 🔄 Fallback System

The application includes a robust fallback system:
- If API keys are not configured, it uses realistic mock data
- Graceful error handling for API failures
- Seamless switching between live and mock data
- No interruption to user experience

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
The application is configured for easy Netlify deployment with automatic builds.

## 📱 Mobile Responsive

- Fully responsive design
- Touch-friendly interface
- Optimized for all screen sizes
- Progressive Web App features

## 🔐 Security Features

- Environment variable protection
- API key security
- CORS handling
- Error boundary protection

## 🎨 Design Features

- Modern gradient design
- Aviation-themed color scheme
- Smooth animations and transitions
- Professional dashboard layout
- Intuitive user interface

## 📈 Business Value

Perfect for:
- **Hostel Chains**: Monitor travel demand for location planning
- **Travel Agencies**: Track market trends and pricing
- **Airlines**: Competitive analysis and route optimization
- **Investors**: Market intelligence for travel industry

## 🛡️ Error Handling

- Comprehensive error boundaries
- API failure recovery
- User-friendly error messages
- Automatic retry mechanisms

## 📞 Support

For questions or issues:
1. Check the API status panel in the application
2. Verify your API keys are correctly configured
3. Review the browser console for detailed error messages

---

**Built with React, TypeScript, Tailwind CSS, and Chart.js**
**Powered by OpenAI, Aviation Stack, and Alpha Vantage APIs**