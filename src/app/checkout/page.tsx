'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

interface CheckoutFormData {
  // Contact Information
  email: string;
  phone: string;
  
  // Billing Address
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingPincode: string;
  
  // Shipping Address
  sameAsBilling: boolean;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  
  // Payment
  paymentMethod: string;
  
  // Delivery Options
  deliveryOption: string;
  specialInstructions: string;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    phone: '',
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    sameAsBilling: true,
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    paymentMethod: 'card',
    deliveryOption: 'standard',
    specialInstructions: ''
  });

  const [orderSummary] = useState({
    items: [
      { name: 'Classic Navy Suit', price: 45000, quantity: 1 },
      { name: 'Wedding Sherwani', price: 35000, quantity: 1 }
    ],
    subtotal: 80000,
    discount: 8000,
    delivery: 0,
    total: 72000
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout submission
    console.log('Checkout data:', formData);
    alert('Order placed successfully! You will receive a confirmation email shortly.');
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
              Checkout
            </h1>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Link href="/cart" className="hover:text-primary-600">Cart</Link>
              <span>→</span>
              <span className="text-foreground">Checkout</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                >
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Billing Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                >
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    Billing Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="billingFirstName" className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="billingFirstName"
                        name="billingFirstName"
                        required
                        value={formData.billingFirstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingLastName" className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="billingLastName"
                        name="billingLastName"
                        required
                        value={formData.billingLastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="billingAddress" className="block text-sm font-medium text-foreground mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        required
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        placeholder="House number, street, landmark"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCity" className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        name="billingCity"
                        required
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingState" className="block text-sm font-medium text-foreground mb-2">
                        State *
                      </label>
                      <select
                        id="billingState"
                        name="billingState"
                        required
                        value={formData.billingState}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Punjab">Punjab</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="billingPincode" className="block text-sm font-medium text-foreground mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        id="billingPincode"
                        name="billingPincode"
                        required
                        pattern="[0-9]{6}"
                        value={formData.billingPincode}
                        onChange={handleInputChange}
                        placeholder="e.g., 110001"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                >
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    Shipping Address
                  </h2>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sameAsBilling"
                        checked={formData.sameAsBilling}
                        onChange={handleInputChange}
                        className="mr-3 text-primary-500"
                      />
                      <span className="text-sm font-medium text-foreground">
                        Same as billing address
                      </span>
                    </label>
                  </div>

                  {!formData.sameAsBilling && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="shippingFirstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="shippingFirstName"
                          name="shippingFirstName"
                          required={!formData.sameAsBilling}
                          value={formData.shippingFirstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      {/* Add other shipping fields similar to billing */}
                    </div>
                  )}
                </motion.div>

                {/* Delivery Options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                >
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    Delivery Options
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="standard"
                        checked={formData.deliveryOption === 'standard'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">Standard Delivery</span>
                          <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <p className="text-sm text-neutral-600">14-21 business days</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="express"
                        checked={formData.deliveryOption === 'express'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">Express Delivery</span>
                          <span className="font-medium">₹2,000</span>
                        </div>
                        <p className="text-sm text-neutral-600">10-14 business days</p>
                      </div>
                    </label>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-foreground mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      rows={3}
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      placeholder="Any special delivery instructions..."
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                >
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-500"
                      />
                      <div>
                        <span className="font-medium text-foreground">Credit/Debit Card</span>
                        <p className="text-sm text-neutral-600">Pay securely with your card</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-500"
                      />
                      <div>
                        <span className="font-medium text-foreground">UPI Payment</span>
                        <p className="text-sm text-neutral-600">Pay using UPI apps</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={formData.paymentMethod === 'netbanking'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-500"
                      />
                      <div>
                        <span className="font-medium text-foreground">Net Banking</span>
                        <p className="text-sm text-neutral-600">Pay via internet banking</p>
                      </div>
                    </label>
                  </div>
                </motion.div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 sticky top-8"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h3>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">₹{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="font-medium text-green-600">-₹{orderSummary.discount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Delivery</span>
                    <span className="font-medium">
                      {orderSummary.delivery === 0 ? 'Free' : `₹${orderSummary.delivery}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-xl text-foreground">₹{orderSummary.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button 
                  onClick={handleSubmit}
                  size="lg" 
                  className="w-full mb-4"
                >
                  Place Order - ₹{orderSummary.total.toLocaleString()}
                </Button>

                {/* Security Badge */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                    <span>🔒</span>
                    <span>Secure checkout powered by SSL encryption</span>
                  </div>
                </div>

                {/* Policy Links */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h4 className="font-medium text-sm text-foreground mb-2">Order Policies</h4>
                  <ul className="text-xs text-neutral-600 space-y-1">
                    <li>• 30-day return policy</li>
                    <li>• Free alterations within 6 months</li>
                    <li>• Quality guarantee</li>
                    <li>• Secure payment processing</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}