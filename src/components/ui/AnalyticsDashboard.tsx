'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Activity, Target } from 'lucide-react';

interface AnalyticsData {
  events?: any[];
  funnelData?: Array<{
    step: string;
    count: number;
    uniqueSessions: number;
  }>;
  abTestData?: Record<string, Record<string, number>>;
  engagementData?: {
    avgSessionDuration: number;
    avgEventsPerSession: number;
    totalSessions: number;
  };
}

interface AnalyticsDashboardProps {
  className?: string;
  timeframe?: '1d' | '7d' | '30d';
}

export function AnalyticsDashboard({ className = '', timeframe = '7d' }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'funnel' | 'ab_tests' | 'engagement'>('overview');
  const [data, setData] = useState<AnalyticsData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeframe]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Fetch different types of analytics data
      const [events, funnel, abTests, engagement] = await Promise.all([
        fetch(`/api/analytics?metric=events&timeframe=${timeframe}`).then(r => r.json()),
        fetch(`/api/analytics?metric=funnel&timeframe=${timeframe}`).then(r => r.json()),
        fetch(`/api/analytics?metric=ab_tests&timeframe=${timeframe}`).then(r => r.json()),
        fetch(`/api/analytics?metric=engagement&timeframe=${timeframe}`).then(r => r.json()),
      ]);

      setData({
        events: events.data,
        funnelData: funnel.data,
        abTestData: abTests.data,
        engagementData: engagement.data,
      });
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'funnel', label: 'Conversion Funnel', icon: Target },
    { id: 'ab_tests', label: 'A/B Tests', icon: BarChart },
    { id: 'engagement', label: 'User Engagement', icon: Users },
  ] as const;

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const calculateConversionRate = (step1Count: number, step2Count: number) => {
    if (!step1Count || step1Count === 0) return '0.0';
    if (!step2Count) return '0.0';
    return ((step2Count / step1Count) * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-12 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="text-sm text-gray-500">
          Last {timeframe === '1d' ? '24 hours' : timeframe === '7d' ? '7 days' : '30 days'}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Events</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {data.events?.length || 0}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {data.engagementData?.totalSessions || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Avg Session Duration</p>
                  <p className="text-2xl font-bold text-green-900">
                    {formatDuration(data.engagementData?.avgSessionDuration || 0)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Events Per Session</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {(data.engagementData?.avgEventsPerSession || 0).toFixed(1)}
                  </p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funnel' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel Analysis</h3>
            
            {data.funnelData && data.funnelData.length > 0 ? (
              <div className="space-y-4">
                {data.funnelData.map((step, index) => {
                  const nextStep = data.funnelData![index + 1];
                  const conversionRate = nextStep 
                    ? calculateConversionRate(step?.uniqueSessions || 0, nextStep?.uniqueSessions || 0)
                    : '100.0';
                  
                  return (
                    <div key={step.step} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {step.step.replace(/_/g, ' ')}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {step?.uniqueSessions || 0} unique sessions • {step?.count || 0} total events
                        </p>
                      </div>
                      
                      {nextStep && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{conversionRate}%</p>
                          <p className="text-xs text-gray-500">conversion rate</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No funnel data available for the selected timeframe.
              </div>
            )}
          </div>
        )}

        {activeTab === 'ab_tests' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">A/B Test Results</h3>
            
            {data.abTestData && Object.keys(data.abTestData).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(data.abTestData).map(([testName, variants]) => {
                  const totalUsers = Object.values(variants).reduce((sum: number, count: number) => sum + count, 0);
                  
                  return (
                    <div key={testName} className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 capitalize">
                        {testName.replace(/_/g, ' ')}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(variants).map(([variant, count]) => {
                          const percentage = ((count / totalUsers) * 100).toFixed(1);
                          
                          return (
                            <div key={variant} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 capitalize">
                                  {variant}
                                </span>
                                <span className="text-sm text-gray-600">{percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{count} users</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No A/B test data available for the selected timeframe.
              </div>
            )}
          </div>
        )}

        {activeTab === 'engagement' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">User Engagement Metrics</h3>
            
            {data.engagementData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Session Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Total Sessions:</span>
                      <span className="font-medium text-purple-900">{data.engagementData.totalSessions || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Avg Duration:</span>
                      <span className="font-medium text-purple-900">
                        {formatDuration(data.engagementData.avgSessionDuration || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Events per Session:</span>
                      <span className="font-medium text-purple-900">
                        {(data.engagementData.avgEventsPerSession || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Event Breakdown</h4>
                  <div className="space-y-2">
                    {data.events && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Button Clicks:</span>
                          <span className="font-medium text-blue-900">
                            {data.events.filter(e => e.event_name === 'button_click').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Link Clicks:</span>
                          <span className="font-medium text-blue-900">
                            {data.events.filter(e => e.event_name === 'link_click').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Form Interactions:</span>
                          <span className="font-medium text-blue-900">
                            {data.events.filter(e => e.event_name.includes('form')).length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No engagement data available for the selected timeframe.
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
} 