'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 98765 43210',
    },
    products: [
      { name: 'Classic Navy Suit', quantity: 1, price: 45000 }
    ],
    totalAmount: 45000,
    status: 'In Production',
    orderDate: '2025-09-15',
    deliveryDate: '2025-09-25',
    paymentStatus: 'Paid',
    measurements: {
      'chest': '40"',
      'waist': '34"',
      'shoulder': '17"',
      'sleeve': '24"',
      'length': '28"'
    },
    notes: 'Customer prefers slightly loose fit. Extra attention to shoulder alignment.',
    address: '123 MG Road, Bangalore, Karnataka 560001'
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+91 87654 32109',
    },
    products: [
      { name: 'Wedding Lehenga', quantity: 1, price: 85000 }
    ],
    totalAmount: 85000,
    status: 'Consultation',
    orderDate: '2025-09-14',
    deliveryDate: '2025-10-15',
    paymentStatus: 'Pending',
    measurements: {} as { [key: string]: string },
    notes: 'Consultation scheduled for fabric selection and design finalization.',
    address: '456 Park Street, Mumbai, Maharashtra 400001'
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Amit Kumar',
      email: 'amit.kumar@email.com',
      phone: '+91 76543 21098',
    },
    products: [
      { name: 'Business Blazer', quantity: 2, price: 32000 }
    ],
    totalAmount: 64000,
    status: 'Delivered',
    orderDate: '2025-09-13',
    deliveryDate: '2025-09-20',
    paymentStatus: 'Paid',
    measurements: {
      'chest': '42"',
      'waist': '36"',
      'shoulder': '18"',
      'sleeve': '25"',
      'length': '29"'
    },
    notes: 'Order completed successfully. Customer very satisfied.',
    address: '789 Connaught Place, New Delhi 110001'
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Sneha Gupta',
      email: 'sneha.gupta@email.com',
      phone: '+91 65432 10987',
    },
    products: [
      { name: 'Indo-Western Jacket', quantity: 1, price: 55000 }
    ],
    totalAmount: 55000,
    status: 'Measurement',
    orderDate: '2025-09-12',
    deliveryDate: '2025-09-28',
    paymentStatus: 'Advance Paid',
    measurements: {
      'chest': '36"',
      'waist': '30"',
      'shoulder': '15"',
      'sleeve': '23"'
    },
    notes: 'Measurements taken. Proceeding with production.',
    address: '321 Residency Road, Pune, Maharashtra 411001'
  },
];

const statusOptions = ['All', 'Consultation', 'Measurement', 'In Production', 'Quality Check', 'Delivered', 'Cancelled'];
const paymentStatusOptions = ['All', 'Pending', 'Advance Paid', 'Paid', 'Refunded'];

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  orderDate: string;
  deliveryDate: string;
  paymentStatus: string;
  measurements: { [key: string]: string };
  notes: string;
  address: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesPayment = selectedPaymentStatus === 'All' || order.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Consultation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Measurement':
        return 'bg-blue-100 text-blue-800';
      case 'In Production':
        return 'bg-purple-100 text-purple-800';
      case 'Quality Check':
        return 'bg-orange-100 text-orange-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Advance Paid':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'In Production':
        return <ClockIcon className="h-5 w-5 text-purple-500" />;
      case 'Measurement':
        return <PencilIcon className="h-5 w-5 text-blue-500" />;
      case 'Cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    // Show success message
    const toastEl = document.createElement('div');
    toastEl.className = 'fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg';
    toastEl.textContent = `Order ${orderId} status updated to ${newStatus}`;
    document.body.appendChild(toastEl);
    
    setTimeout(() => {
      document.body.removeChild(toastEl);
    }, 3000);
  };

  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Order Management</h1>
          <p className="text-neutral-600">Track and manage all customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-neutral-500">
            Total Orders: {filteredOrders.length}
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
                placeholder="Search orders, customers..."
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
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          {/* Payment Status Filter */}
          <div className="md:w-48">
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {paymentStatusOptions.map(status => (
                <option key={status} value={status}>Payment: {status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Order ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Products</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Payment</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Delivery</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="font-medium text-neutral-900">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-neutral-900">{order.customer.name}</div>
                      <div className="text-sm text-neutral-500">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="text-neutral-900">
                          {product.name} (x{product.quantity})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-neutral-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(order.status)}`}
                    >
                      {statusOptions.slice(1).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {order.deliveryDate}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderDetail(true);
                      }}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <TruckIcon className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No orders found</h3>
          <p className="text-neutral-600">
            {searchTerm || selectedStatus !== 'All' || selectedPaymentStatus !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Orders will appear here once customers place them'
            }
          </p>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={showOrderDetail}
          onClose={() => {
            setShowOrderDetail(false);
            setSelectedOrder(null);
          }}
          onStatusUpdate={(newStatus) => {
            handleStatusUpdate(selectedOrder.id, newStatus);
            setSelectedOrder({ ...selectedOrder, status: newStatus });
          }}
        />
      )}
    </div>
  );
}

// Order Detail Modal Component
function OrderDetailModal({ order, isOpen, onClose, onStatusUpdate }: {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (status: string) => void;
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
            <h2 className="text-xl font-semibold text-neutral-900">Order Details - {order.id}</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-neutral-50 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-3">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {order.customer.name}</div>
                <div><strong>Email:</strong> {order.customer.email}</div>
                <div><strong>Phone:</strong> {order.customer.phone}</div>
                <div><strong>Address:</strong> {order.address}</div>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-3">Order Information</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Order Date:</strong> {order.orderDate}</div>
                <div><strong>Delivery Date:</strong> {order.deliveryDate}</div>
                <div><strong>Payment Status:</strong> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div><strong>Total Amount:</strong> ₹{order.totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Products</h3>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Product</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Quantity</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Unit Price</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-neutral-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr key={index} className="border-t border-neutral-200">
                      <td className="px-4 py-3 text-sm">{product.name}</td>
                      <td className="px-4 py-3 text-sm">{product.quantity}</td>
                      <td className="px-4 py-3 text-sm">₹{product.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-semibold">
                        ₹{(product.price * product.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurements */}
          {Object.keys(order.measurements).length > 0 && (
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Measurements</h3>
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  {Object.entries(order.measurements).map(([key, value]) => (
                    <div key={key}>
                      <div className="font-medium text-neutral-700 capitalize">{key}:</div>
                      <div className="text-neutral-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Order Notes</h3>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-sm text-neutral-700">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Status Update */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Update Status</h3>
            <div className="flex items-center space-x-4">
              <select
                value={order.status}
                onChange={(e) => onStatusUpdate(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statusOptions.slice(1).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
