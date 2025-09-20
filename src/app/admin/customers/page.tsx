'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    joinDate: '2025-08-15',
    totalOrders: 3,
    totalSpent: 125000,
    lastOrderDate: '2025-09-15',
    status: 'Active',
    preferences: {
      fabrics: ['Italian Wool', 'Cashmere'],
      colors: ['Navy Blue', 'Charcoal Grey'],
      style: 'Classic Business'
    },
    measurements: {
      'chest': '40"',
      'waist': '34"',
      'shoulder': '17"',
      'sleeve': '24"',
      'length': '28"'
    } as { [key: string]: string },
    orderHistory: [
      { id: 'ORD-001', product: 'Classic Navy Suit', amount: 45000, date: '2025-09-15' },
      { id: 'ORD-015', product: 'Business Blazer', amount: 32000, date: '2025-08-20' },
      { id: 'ORD-008', product: 'Formal Shirt', amount: 48000, date: '2025-08-16' }
    ]
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    address: '456 Park Street, Mumbai, Maharashtra 400001',
    joinDate: '2025-07-22',
    totalOrders: 2,
    totalSpent: 155000,
    lastOrderDate: '2025-09-14',
    status: 'Active',
    preferences: {
      fabrics: ['Silk', 'Brocade'],
      colors: ['Red', 'Gold', 'Maroon'],
      style: 'Traditional Wedding'
    },
    measurements: {
      'bust': '34"',
      'waist': '28"',
      'hip': '36"',
      'length': '42"'
    } as { [key: string]: string },
    orderHistory: [
      { id: 'ORD-002', product: 'Wedding Lehenga', amount: 85000, date: '2025-09-14' },
      { id: 'ORD-012', product: 'Designer Saree', amount: 70000, date: '2025-07-25' }
    ]
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 76543 21098',
    address: '789 Connaught Place, New Delhi 110001',
    joinDate: '2025-06-10',
    totalOrders: 5,
    totalSpent: 225000,
    lastOrderDate: '2025-09-13',
    status: 'VIP',
    preferences: {
      fabrics: ['Cotton', 'Linen', 'Wool'],
      colors: ['Grey', 'Navy', 'Brown'],
      style: 'Business Casual'
    },
    measurements: {
      'chest': '42"',
      'waist': '36"',
      'shoulder': '18"',
      'sleeve': '25"',
      'length': '29"'
    } as { [key: string]: string },
    orderHistory: [
      { id: 'ORD-003', product: 'Business Blazer (x2)', amount: 64000, date: '2025-09-13' },
      { id: 'ORD-018', product: 'Casual Shirt Set', amount: 55000, date: '2025-08-28' },
      { id: 'ORD-014', product: 'Wedding Suit', amount: 85000, date: '2025-08-05' }
    ]
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    email: 'sneha.gupta@email.com',
    phone: '+91 65432 10987',
    address: '321 Residency Road, Pune, Maharashtra 411001',
    joinDate: '2025-09-01',
    totalOrders: 1,
    totalSpent: 55000,
    lastOrderDate: '2025-09-12',
    status: 'New',
    preferences: {
      fabrics: ['Cotton Silk', 'Chanderi'],
      colors: ['Pink', 'Cream', 'Light Blue'],
      style: 'Indo-Western'
    },
    measurements: {
      'bust': '36"',
      'waist': '30"',
      'shoulder': '15"',
      'sleeve': '23"'
    } as { [key: string]: string },
    orderHistory: [
      { id: 'ORD-004', product: 'Indo-Western Jacket', amount: 55000, date: '2025-09-12' }
    ]
  }
];

const customerStatuses = ['All', 'New', 'Active', 'VIP', 'Inactive'];

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: string;
  preferences: {
    fabrics: string[];
    colors: string[];
    style: string;
  };
  measurements: { [key: string]: string };
  orderHistory: Array<{
    id: string;
    product: string;
    amount: number;
    date: string;
  }>;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'All' || customer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Customer Management</h1>
          <p className="text-neutral-600">View and manage customer profiles and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-neutral-500">
            Total Customers: {filteredCustomers.length}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {customerStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Customers</p>
              <p className="text-2xl font-bold text-neutral-900">{customers.length}</p>
            </div>
            <UserIcon className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">VIP Customers</p>
              <p className="text-2xl font-bold text-neutral-900">
                {customers.filter(c => c.status === 'VIP').length}
              </p>
            </div>
            <UserIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">New This Month</p>
              <p className="text-2xl font-bold text-neutral-900">
                {customers.filter(c => c.status === 'New').length}
              </p>
            </div>
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Revenue</p>
              <p className="text-2xl font-bold text-neutral-900">
                ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
            </div>
            <ShoppingBagIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{customer.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-neutral-600">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-start text-sm text-neutral-600">
                <MapPinIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{customer.address}</span>
              </div>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-neutral-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-neutral-900">{customer.totalOrders}</div>
                <div className="text-xs text-neutral-500">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary-600">
                  ₹{(customer.totalSpent / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-neutral-500">Total Spent</div>
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-4">
              <div className="text-xs text-neutral-500 mb-2">Preferred Style:</div>
              <div className="text-sm font-medium text-neutral-700">{customer.preferences.style}</div>
            </div>

            {/* Last Activity */}
            <div className="mb-4">
              <div className="flex items-center text-xs text-neutral-500">
                <CalendarDaysIcon className="h-4 w-4 mr-1" />
                Last order: {customer.lastOrderDate}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setShowCustomerDetail(true);
                }}
                className="flex-1 flex items-center justify-center space-x-1"
              >
                <EyeIcon className="h-4 w-4" />
                <span>View Details</span>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No customers found</h3>
          <p className="text-neutral-600">
            {searchTerm || selectedStatus !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Customers will appear here once they place orders'
            }
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {showCustomerDetail && selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          isOpen={showCustomerDetail}
          onClose={() => {
            setShowCustomerDetail(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
}

// Customer Detail Modal Component
function CustomerDetailModal({ customer, isOpen, onClose }: {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-2xl">
                  {customer.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">{customer.name}</h2>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' : customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {customer.status} Customer
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="h-4 w-4 text-neutral-400" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 text-neutral-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPinIcon className="h-4 w-4 text-neutral-400 mt-0.5" />
                  <span>{customer.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon className="h-4 w-4 text-neutral-400" />
                  <span>Joined: {customer.joinDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Customer Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-neutral-900">{customer.totalOrders}</div>
                  <div className="text-sm text-neutral-600">Total Orders</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    ₹{customer.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-neutral-600">Total Spent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Style Preferences</h3>
            <div className="bg-neutral-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="font-medium text-neutral-700 mb-2">Preferred Style</div>
                <div className="text-sm text-neutral-600">{customer.preferences.style}</div>
              </div>
              <div>
                <div className="font-medium text-neutral-700 mb-2">Favorite Fabrics</div>
                <div className="flex flex-wrap gap-1">
                  {customer.preferences.fabrics.map((fabric, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {fabric}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium text-neutral-700 mb-2">Preferred Colors</div>
                <div className="flex flex-wrap gap-1">
                  {customer.preferences.colors.map((color, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Measurements</h3>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                {Object.entries(customer.measurements).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="font-medium text-neutral-700 capitalize">{key}</div>
                    <div className="text-lg font-semibold text-neutral-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order History */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Order History</h3>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Order ID</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Product</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Amount</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.orderHistory.map((order, index) => (
                    <tr key={index} className="border-t border-neutral-200">
                      <td className="px-4 py-3 text-sm font-medium text-primary-600">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.product}</td>
                      <td className="px-4 py-3 text-sm font-semibold">₹{order.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-neutral-600">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}