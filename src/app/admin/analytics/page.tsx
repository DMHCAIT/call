'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Mock data for analytics
const salesData = {
  revenue: {
    current: 1250000,
    previous: 980000,
    growth: 27.5
  },
  orders: {
    current: 156,
    previous: 142,
    growth: 9.9
  },
  customers: {
    current: 89,
    previous: 76,
    growth: 17.1
  },
  avgOrderValue: {
    current: 8012,
    previous: 6901,
    growth: 16.1
  }
};

const monthlyRevenueData = [
  { month: 'Jan', revenue: 850000, orders: 98 },
  { month: 'Feb', revenue: 920000, orders: 108 },
  { month: 'Mar', revenue: 1100000, orders: 125 },
  { month: 'Apr', revenue: 980000, orders: 119 },
  { month: 'May', revenue: 1300000, orders: 142 },
  { month: 'Jun', revenue: 1250000, orders: 156 },
];

const productCategories = [
  { name: 'Suits', revenue: 680000, orders: 85, percentage: 54.4 },
  { name: 'Wedding Wear', revenue: 320000, orders: 32, percentage: 25.6 },
  { name: 'Casual Wear', revenue: 180000, orders: 28, percentage: 14.4 },
  { name: 'Ethnic Wear', revenue: 70000, orders: 11, percentage: 5.6 }
];

const topProducts = [
  { id: 1, name: 'Premium 3-Piece Business Suit', sales: 45, revenue: 337500 },
  { id: 2, name: 'Royal Wedding Sherwani', sales: 28, revenue: 420000 },
  { id: 3, name: 'Casual Blazer Collection', sales: 32, revenue: 128000 },
  { id: 4, name: 'Traditional Jodhpuri Suit', sales: 18, revenue: 108000 },
  { id: 5, name: 'Luxury Tuxedo Set', sales: 15, revenue: 225000 }
];

const customerInsights = {
  newCustomers: 23,
  returningCustomers: 66,
  totalCustomers: 89,
  averageLifetimeValue: 45600,
  retentionRate: 74.2
};

const geographicData = [
  { city: 'Delhi NCR', customers: 34, revenue: 425000, percentage: 38.1 },
  { city: 'Mumbai', customers: 18, revenue: 280000, percentage: 25.2 },
  { city: 'Bangalore', customers: 12, revenue: 195000, percentage: 17.6 },
  { city: 'Pune', customers: 8, revenue: 125000, percentage: 11.3 },
  { city: 'Others', customers: 17, revenue: 225000, percentage: 20.2 }
];

const consultationMetrics = {
  videoConsultations: 42,
  homeVisits: 28,
  totalConsultations: 70,
  conversionRate: 68.5,
  averageDuration: 45 // minutes
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Business Analytics</h1>
          <p className="text-neutral-600">Sales insights, customer metrics, and performance data</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <ArrowPathIcon className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <BanknotesIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className={`flex items-center text-sm ${salesData.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.revenue.growth >= 0 ? <ArrowTrendingUpIcon className="h-4 w-4 mr-1" /> : <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />}
              {formatPercentage(salesData.revenue.growth)}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{formatCurrency(salesData.revenue.current)}</h3>
            <p className="text-sm text-neutral-600">Total Revenue</p>
            <p className="text-xs text-neutral-500 mt-1">
              Previous: {formatCurrency(salesData.revenue.previous)}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`flex items-center text-sm ${salesData.orders.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.orders.growth >= 0 ? <ArrowTrendingUpIcon className="h-4 w-4 mr-1" /> : <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />}
              {formatPercentage(salesData.orders.growth)}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{salesData.orders.current}</h3>
            <p className="text-sm text-neutral-600">Total Orders</p>
            <p className="text-xs text-neutral-500 mt-1">
              Previous: {salesData.orders.previous}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className={`flex items-center text-sm ${salesData.customers.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.customers.growth >= 0 ? <ArrowTrendingUpIcon className="h-4 w-4 mr-1" /> : <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />}
              {formatPercentage(salesData.customers.growth)}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{salesData.customers.current}</h3>
            <p className="text-sm text-neutral-600">Active Customers</p>
            <p className="text-xs text-neutral-500 mt-1">
              Previous: {salesData.customers.previous}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className={`flex items-center text-sm ${salesData.avgOrderValue.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.avgOrderValue.growth >= 0 ? <ArrowTrendingUpIcon className="h-4 w-4 mr-1" /> : <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />}
              {formatPercentage(salesData.avgOrderValue.growth)}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{formatCurrency(salesData.avgOrderValue.current)}</h3>
            <p className="text-sm text-neutral-600">Avg Order Value</p>
            <p className="text-xs text-neutral-500 mt-1">
              Previous: {formatCurrency(salesData.avgOrderValue.previous)}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Revenue Trend</h3>
          <div className="space-y-4">
            {monthlyRevenueData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-neutral-600 w-8">{data.month}</span>
                  <div className="flex-1 bg-neutral-200 rounded-full h-2 w-32">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(data.revenue / 1300000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-neutral-900">
                    {formatCurrency(data.revenue)}
                  </div>
                  <div className="text-xs text-neutral-500">{data.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Revenue by Category</h3>
          <div className="space-y-4">
            {productCategories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 90 + 220}, 70%, 50%)` }}
                  />
                  <span className="text-sm font-medium text-neutral-700">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-neutral-900">
                    {formatCurrency(category.revenue)}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {category.orders} orders ({category.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Top Products</h3>
            <EyeIcon className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-semibold">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 text-sm">{product.name}</div>
                    <div className="text-xs text-neutral-500">{product.sales} sales</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-neutral-900">
                    {formatCurrency(product.revenue)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Customer Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Customer Insights</h3>
            <UserGroupIcon className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">New Customers</span>
              <span className="font-semibold text-neutral-900">{customerInsights.newCustomers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Returning Customers</span>
              <span className="font-semibold text-neutral-900">{customerInsights.returningCustomers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Avg Lifetime Value</span>
              <span className="font-semibold text-neutral-900">{formatCurrency(customerInsights.averageLifetimeValue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Retention Rate</span>
              <span className="font-semibold text-green-600">{customerInsights.retentionRate}%</span>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Customer Satisfaction</span>
                <span className="font-semibold text-blue-700">4.8/5</span>
              </div>
              <div className="mt-1 bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Geographic Distribution</h3>
            <CalendarDaysIcon className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="space-y-4">
            {geographicData.map((location, index) => (
              <div key={location.city} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 72 + 200}, 70%, 50%)` }}
                  />
                  <div>
                    <div className="font-medium text-neutral-900 text-sm">{location.city}</div>
                    <div className="text-xs text-neutral-500">{location.customers} customers</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-neutral-900">
                    {formatCurrency(location.revenue)}
                  </div>
                  <div className="text-xs text-neutral-500">{location.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Consultation Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Consultation Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{consultationMetrics.videoConsultations}</div>
            <div className="text-sm text-neutral-600">Video Consultations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{consultationMetrics.homeVisits}</div>
            <div className="text-sm text-neutral-600">Home Visits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">{consultationMetrics.totalConsultations}</div>
            <div className="text-sm text-neutral-600">Total Consultations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">{consultationMetrics.conversionRate}%</div>
            <div className="text-sm text-neutral-600">Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">{consultationMetrics.averageDuration}m</div>
            <div className="text-sm text-neutral-600">Avg Duration</div>
          </div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white"
      >
        <h3 className="text-xl font-semibold mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Revenue Growth</h4>
            <p className="text-primary-100 text-sm">
              Your business has grown by {formatPercentage(salesData.revenue.growth)} this month, 
              driven by increased order volume and higher average order values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Top Performing Category</h4>
            <p className="text-primary-100 text-sm">
              Suits continue to be your top revenue generator, accounting for 54.4% of total sales 
              with consistent demand across all customer segments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Customer Satisfaction</h4>
            <p className="text-primary-100 text-sm">
              With a 74.2% retention rate and 4.8/5 satisfaction score, your customers are highly 
              satisfied with the quality and service provided.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}