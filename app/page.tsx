"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, BarChart3, Zap, Clock } from "lucide-react";

interface Signal {
  id: string;
  asset: string;
  category: string;
  timeframe: number;
  direction: "BUY" | "SELL";
  strength: number;
  price: number;
  target: number;
  stopLoss: number;
  confidence: number;
  aiReasoning: string;
  timestamp: number;
}

interface EngineStats {
  totalAssets: number;
  activeSignals: number;
  timeframes: number[];
  uptime: number;
  accuracy: number;
}

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [stats, setStats] = useState<EngineStats>({
    totalAssets: 0,
    activeSignals: 0,
    timeframes: [5, 10, 15, 30, 60, 120, 180, 300],
    uptime: 0,
    accuracy: 0,
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(60);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    // Simulate real-time signal generation
    const generateSignal = (): Signal => {
      const assets = [
        { name: "EUR/USD", category: "Currencies" },
        { name: "GBP/USD", category: "Currencies" },
        { name: "USD/JPY", category: "Currencies" },
        { name: "BTC/USD", category: "Crypto" },
        { name: "ETH/USD", category: "Crypto" },
        { name: "AAPL", category: "Stocks" },
        { name: "GOOGL", category: "Stocks" },
        { name: "TSLA", category: "Stocks" },
        { name: "AMZN", category: "Stocks" },
        { name: "GOLD", category: "Commodities" },
        { name: "SILVER", category: "Commodities" },
        { name: "OIL", category: "Commodities" },
        { name: "SP500", category: "Indices" },
        { name: "NASDAQ", category: "Indices" },
        { name: "DOW", category: "Indices" },
      ];

      const timeframes = [5, 10, 15, 30, 60, 120, 180, 300];
      const asset = assets[Math.floor(Math.random() * assets.length)];
      const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
      const direction: "BUY" | "SELL" = Math.random() > 0.5 ? "BUY" : "SELL";
      const price = 100 + Math.random() * 100;
      const strength = 60 + Math.random() * 40;
      const confidence = 70 + Math.random() * 30;

      const reasons = [
        "Strong momentum detected with RSI divergence",
        "Breakout from consolidation pattern confirmed",
        "Volume surge indicates institutional accumulation",
        "MA crossover with support level confluence",
        "Fibonacci retracement to key level",
        "MACD bullish crossover with volume confirmation",
        "Price action showing reversal pattern",
        "Market structure shift detected",
      ];

      return {
        id: `${Date.now()}-${Math.random()}`,
        asset: asset.name,
        category: asset.category,
        timeframe,
        direction,
        strength,
        price,
        target: direction === "BUY" ? price * 1.02 : price * 0.98,
        stopLoss: direction === "BUY" ? price * 0.99 : price * 1.01,
        confidence,
        aiReasoning: reasons[Math.floor(Math.random() * reasons.length)],
        timestamp: Date.now(),
      };
    };

    // Initial signals
    const initialSignals = Array.from({ length: 12 }, () => generateSignal());
    setSignals(initialSignals);

    // Update stats
    setStats(prev => ({
      ...prev,
      totalAssets: 100,
      activeSignals: initialSignals.length,
      uptime: 0,
      accuracy: 78 + Math.random() * 10,
    }));

    // Generate new signals every 3-8 seconds
    const signalInterval = setInterval(() => {
      const newSignal = generateSignal();
      setSignals(prev => [newSignal, ...prev.slice(0, 19)]);
      setStats(prev => ({
        ...prev,
        activeSignals: prev.activeSignals + 1,
        accuracy: 78 + Math.random() * 10,
      }));
    }, 3000 + Math.random() * 5000);

    // Update uptime every second
    const uptimeInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        uptime: prev.uptime + 1,
      }));
    }, 1000);

    return () => {
      clearInterval(signalInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const filteredSignals = signals.filter(signal => {
    if (selectedCategory !== "All" && signal.category !== selectedCategory) return false;
    if (signal.timeframe !== selectedTimeframe) return false;
    return true;
  });

  const categories = ["All", "Currencies", "Crypto", "Stocks", "Commodities", "Indices"];

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  QX-Server-Engine
                </h1>
                <p className="text-sm text-gray-400">AI Trading Signal Generator</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Total Assets</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalAssets}+</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Active Signals</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.activeSignals}</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400 text-sm">Accuracy</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.accuracy.toFixed(1)}%</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-gray-400 text-sm">Uptime</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatUptime(stats.uptime)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Timeframe</label>
              <div className="flex flex-wrap gap-2">
                {stats.timeframes.map(tf => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTimeframe === tf
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {tf}s
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-purple-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignals.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No signals available for selected filters
            </div>
          ) : (
            filteredSignals.map(signal => (
              <div
                key={signal.id}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{signal.asset}</h3>
                    <span className="text-xs text-gray-500">{signal.category}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      signal.direction === "BUY"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {signal.direction === "BUY" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {signal.direction}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white font-medium">${signal.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-green-400 font-medium">${signal.target.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Stop Loss:</span>
                    <span className="text-red-400 font-medium">${signal.stopLoss.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Timeframe:</span>
                    <span className="text-white font-medium">{signal.timeframe}s</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Strength:</span>
                    <span className="text-white font-medium">{signal.strength.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${signal.strength}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">AI Confidence:</span>
                    <span className="text-white font-medium">{signal.confidence.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${signal.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-400 mb-1">AI Analysis:</p>
                  <p className="text-sm text-white">{signal.aiReasoning}</p>
                </div>

                <div className="text-xs text-gray-500">
                  {new Date(signal.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>QX-Server-Engine v1.0 | AI-Powered Trading Signals</p>
            <p className="mt-1">Monitoring {stats.totalAssets}+ assets across {stats.timeframes.length} timeframes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
