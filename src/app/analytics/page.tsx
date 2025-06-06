'use client';

import { useState } from 'react';
import { AnalyticsDashboard } from '@/components/ui/AnalyticsDashboard';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'1d' | '7d' | '30d'>('7d');

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mb-6">
              Track user engagement, A/B test performance, and conversion funnels.
            </p>
            
            {/* Timeframe Selector */}
            <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200 w-fit">
              {[
                { value: '1d', label: '24 Hours' },
                { value: '7d', label: '7 Days' },
                { value: '30d', label: '30 Days' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeframe(option.value as '1d' | '7d' | '30d')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    timeframe === option.value
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard */}
          <AnalyticsDashboard timeframe={timeframe} />
        </div>
      </div>

      <Footer />
    </main>
  );
} 