'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  const [user] = useState({
    name: 'Santhosh',
    email: 'santhosh@email.com',
    phone: '+91 98765 43210',
    joinDate: 'March 2024',
    membershipTier: 'Platinum',
    location: 'Delhi NCR',
    preferredStyle: 'Contemporary Classic'
  });

  const [recentOrders] = useState([
    { id: 'MT-001', date: '2025-09-15', status: 'In Progress', amount: 85000, items: 'Premium Wedding Suit Set', deliveryDate: '2025-10-05' },
    { id: 'MT-002', date: '2025-09-10', status: 'Delivered', amount: 45000, items: 'Business Blazer Collection', deliveryDate: '2025-09-25' },
    { id: 'MT-003', date: '2025-09-05', status: 'Completed', amount: 65000, items: 'Royal Sherwani with Accessories', deliveryDate: '2025-09-20' },
    { id: 'MT-004', date: '2025-08-28', status: 'Delivered', amount: 35000, items: 'Casual Suit Set', deliveryDate: '2025-09-12' }
  ]);

  const [upcomingAppointments] = useState([
    { id: 1, type: 'Final Fitting', date: '2025-09-22', time: '4:00 PM', location: 'Home Visit - Delhi NCR', status: 'Confirmed' },
    { id: 2, type: 'Style Consultation', date: '2025-09-25', time: '11:00 AM', location: 'Video Call', status: 'Confirmed' },
    { id: 3, type: 'Measurement Review', date: '2025-10-02', time: '2:30 PM', location: 'Home Visit - Delhi NCR', status: 'Scheduled' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in progress':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Account
            </h1>
            <p className="text-neutral-600">Manage your profile, orders, and preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h2 className="font-semibold text-lg text-foreground">{user.name}</h2>
                  <p className="text-sm text-neutral-600">{user.membershipTier} Member</p>
                </div>

                <nav className="space-y-2">
                  <Link href="/account" className="flex items-center px-4 py-3 bg-primary-50 text-primary-700 rounded-lg font-medium">
                    <span className="mr-3">📊</span>
                    Dashboard
                  </Link>
                  <Link href="/account/profile" className="flex items-center px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                    <span className="mr-3">👤</span>
                    Profile
                  </Link>
                  <Link href="/account/orders" className="flex items-center px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                    <span className="mr-3">📦</span>
                    Orders
                  </Link>
                  <Link href="/account/measurements" className="flex items-center px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                    <span className="mr-3">📏</span>
                    Measurements
                  </Link>
                  <Link href="/account/wishlist" className="flex items-center px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                    <span className="mr-3">❤️</span>
                    Wishlist
                  </Link>
                  <Link href="/account/appointments" className="flex items-center px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                    <span className="mr-3">📅</span>
                    Appointments
                  </Link>
                  <Link href="/account/settings" className="flex items-center px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                    <span className="mr-3">⚙️</span>
                    Settings
                  </Link>
                </nav>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Button variant="ghost" size="sm" className="w-full text-red-600 hover:text-red-700">
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-6 text-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                    <p className="text-primary-100 mb-1">{user.membershipTier} Member since {user.joinDate}</p>
                    <p className="text-primary-200 text-sm">📍 {user.location} • 🎨 {user.preferredStyle}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="text-lg font-bold">3</div>
                      <div className="text-xs">Active Orders</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-2xl font-bold text-primary-600 mb-1">15</div>
                  <div className="text-xs text-neutral-600">Total Orders</div>
                  <div className="text-xs text-green-600 mt-1">+3 this month</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-2xl font-bold text-accent-600 mb-1">₹4.2L</div>
                  <div className="text-xs text-neutral-600">Total Spent</div>
                  <div className="text-xs text-blue-600 mt-1">₹85K this month</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                  <div className="text-xs text-neutral-600">Wishlist Items</div>
                  <div className="text-xs text-purple-600 mt-1">2 on sale</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-2xl font-bold text-orange-600 mb-1">98%</div>
                  <div className="text-xs text-neutral-600">Satisfaction</div>
                  <div className="text-xs text-gold-600 mt-1">⭐ Premium</div>
                </div>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-xl font-bold text-foreground">Recent Orders</h3>
                  <Link href="/account/orders" className="text-primary-600 hover:text-primary-700 font-medium">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">Order #{order.id}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 mb-2">{order.items}</p>
                          <div className="flex items-center gap-4 text-xs text-neutral-500">
                            <span>📅 Ordered: {order.date}</span>
                            <span>🚚 Delivery: {order.deliveryDate}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg text-foreground">₹{order.amount.toLocaleString()}</span>
                          {order.status === 'In Progress' && (
                            <div className="mt-1">
                              <Button size="sm" variant="outline" className="text-xs">
                                Track Order
                              </Button>
                            </div>
                          )}
                          {order.status === 'Delivered' && (
                            <div className="mt-1">
                              <Button size="sm" variant="ghost" className="text-xs text-blue-600">
                                Reorder
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Appointments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-xl font-bold text-foreground">Upcoming Appointments</h3>
                  <Link href="/consultation" className="text-primary-600 hover:text-primary-700 font-medium">
                    Book New
                  </Link>
                </div>

                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{appointment.type}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 mb-1">📍 {appointment.location}</p>
                          <div className="flex items-center gap-2 text-xs text-neutral-500">
                            <span>📅 {appointment.date}</span>
                            <span>⏰ {appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            Reschedule
                          </Button>
                          {appointment.location.includes('Video') ? (
                            <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700">
                              Join Call
                            </Button>
                          ) : (
                            <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link href="/collections" className="group flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">👔</span>
                    <h4 className="font-medium text-foreground text-sm text-center">Browse Catalog</h4>
                    <p className="text-xs text-neutral-600 text-center mt-1">New arrivals</p>
                  </Link>
                  <Link href="/consultation" className="group flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📞</span>
                    <h4 className="font-medium text-foreground text-sm text-center">Book Consultation</h4>
                    <p className="text-xs text-neutral-600 text-center mt-1">₹300 video call</p>
                  </Link>
                  <Link href="/size-guide" className="group flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📏</span>
                    <h4 className="font-medium text-foreground text-sm text-center">Size Guide</h4>
                    <p className="text-xs text-neutral-600 text-center mt-1">Perfect fit</p>
                  </Link>
                  <Link href="/account/wishlist" className="group flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">❤️</span>
                    <h4 className="font-medium text-foreground text-sm text-center">My Wishlist</h4>
                    <p className="text-xs text-neutral-600 text-center mt-1">12 saved items</p>
                  </Link>
                </div>
                
                {/* Special Offers */}
                <div className="mt-6 p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border border-accent-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">🎉 Platinum Member Exclusive</h4>
                      <p className="text-sm text-neutral-600">Get 15% off on your next order + Free home visit consultation</p>
                    </div>
                    <Button size="sm" className="bg-accent hover:bg-accent/90">
                      Claim Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}