'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

// Client-side timestamp component to avoid hydration mismatch
function LiveTimestamp() {
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    setTimestamp(new Date().toLocaleString());
  }, []);

  if (!timestamp) {
    return (
      <div className="text-sm text-neutral-500">
        Last updated: Loading...
      </div>
    );
  }

  return (
    <div className="text-sm text-neutral-500">
      Last updated: {timestamp}
    </div>
  );
}

const stats = [
  {
    name: 'Total Orders',
    value: '147',
    change: '+12%',
    changeType: 'positive',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Active Customers',
    value: '89',
    change: '+8%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Monthly Revenue',
    value: '₹4,23,000',
    change: '+15%',
    changeType: 'positive',
    icon: CurrencyRupeeIcon,
  },
  {
    name: 'Pending Orders',
    value: '12',
    change: '-3%',
    changeType: 'negative',
    icon: ChartBarIcon,
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Rahul Sharma',
    product: 'Classic Navy Suit',
    amount: '₹45,000',
    status: 'In Production',
    date: '2025-09-15',
  },
  {
    id: 'ORD-002',
    customer: 'Priya Patel',
    product: 'Wedding Lehenga',
    amount: '₹85,000',
    status: 'Consultation',
    date: '2025-09-14',
  },
  {
    id: 'ORD-003',
    customer: 'Amit Kumar',
    product: 'Business Blazer',
    amount: '₹32,000',
    status: 'Delivered',
    date: '2025-09-13',
  },
  {
    id: 'ORD-004',
    customer: 'Sneha Gupta',
    product: 'Indo-Western Jacket',
    amount: '₹55,000',
    status: 'Measurement',
    date: '2025-09-12',
  },
];

const upcomingConsultations = [
  {
    id: 1,
    customer: 'Vikram Singh',
    type: 'Video Consultation',
    time: '2:00 PM Today',
    product: 'Wedding Sherwani',
  },
  {
    id: 2,
    customer: 'Meera Joshi',
    type: 'Home Visit',
    time: '4:00 PM Today',
    product: 'Saree Blouse',
  },
  {
    id: 3,
    customer: 'Arjun Mehta',
    type: 'Video Consultation',
    time: '10:00 AM Tomorrow',
    product: 'Casual Blazer',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'In Production':
      return 'bg-blue-100 text-blue-800';
    case 'Consultation':
      return 'bg-yellow-100 text-yellow-800';
    case 'Measurement':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminDashboard() {
  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
        </div>
        <LiveTimestamp />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">{stat.name}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-neutral-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Recent Orders</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-neutral-900">{order.customer}</p>
                        <p className="text-sm text-neutral-600">{order.product}</p>
                        <p className="text-xs text-neutral-500">{order.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="font-semibold text-neutral-900">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upcoming Consultations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Upcoming Consultations</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View calendar
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {consultation.customer.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{consultation.customer}</p>
                    <p className="text-sm text-neutral-600">{consultation.product}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-neutral-500">{consultation.type}</span>
                      <span className="text-xs text-primary-600 font-medium">{consultation.time}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
      >
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-primary-50 rounded-lg text-center hover:bg-primary-100 transition-colors">
            <div className="text-primary-600 font-medium">Add Product</div>
            <div className="text-sm text-neutral-600 mt-1">Create new product</div>
          </button>
          <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
            <div className="text-blue-600 font-medium">New Order</div>
            <div className="text-sm text-neutral-600 mt-1">Create manual order</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
            <div className="text-green-600 font-medium">Schedule Visit</div>
            <div className="text-sm text-neutral-600 mt-1">Book consultation</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
            <div className="text-purple-600 font-medium">Inventory</div>
            <div className="text-sm text-neutral-600 mt-1">Manage stock</div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
