'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  fabric: string;
  color: string;
  size: string;
  quantity: number;
  customizations: string[];
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Classic Navy Suit',
      category: 'Suits',
      price: 45000,
      image: '/api/placeholder/300/400',
      fabric: 'Premium Wool',
      color: 'Navy Blue',
      size: '42R',
      quantity: 1,
      customizations: ['Monogram initials', 'Inside pocket', 'Contrasting buttons']
    },
    {
      id: '2',
      name: 'Wedding Sherwani',
      category: 'Ethnic Wear',
      price: 35000,
      image: '/api/placeholder/300/400',
      fabric: 'Silk Brocade',
      color: 'Cream Gold',
      size: 'L',
      quantity: 1,
      customizations: ['Traditional collar', 'Embroidered sleeves']
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    // Simple promo code logic
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.1);
      alert('Promo code applied! 10% discount added.');
    } else if (promoCode.toUpperCase() === 'NEWUSER') {
      setDiscount(0.15);
      alert('Promo code applied! 15% discount added.');
    } else {
      setDiscount(0);
      alert('Invalid promo code. Please try again.');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const deliveryCharge = subtotal > 50000 ? 0 : 500;
  const total = subtotal - discountAmount + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-neutral-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-xl p-12 shadow-sm border border-neutral-200">
                <div className="text-6xl mb-6">🛒</div>
                <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Your Cart is Empty
                </h1>
                <p className="text-neutral-600 mb-8">
                  Discover our exquisite collection of bespoke clothing and add items to your cart.
                </p>
                <Link href="/collections">
                  <Button size="lg">
                    Explore Collections
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

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
              Shopping Cart
            </h1>
            <p className="text-neutral-600">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="font-medium text-foreground">Quick Actions</h3>
                    <p className="text-sm text-neutral-600">Manage your cart items</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        if (confirm('Remove all items from cart?')) {
                          setCartItems([]);
                        }
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        const orderSummary = cartItems.map(item => 
                          `${item.name} (${item.size}) - ₹${(item.price * item.quantity).toLocaleString()}`
                        ).join('\n');
                        
                        if (confirm(`Quick Buy All Items for ₹${total.toLocaleString()}?\n\n${orderSummary}\n\nTotal: ₹${total.toLocaleString()}`)) {
                          alert('Redirecting to secure payment gateway...');
                        }
                      }}
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      🚀 Quick Buy All
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="md:w-32 md:h-40 w-full h-48 bg-neutral-100 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <span className="text-primary-600 font-serif text-lg">
                            {item.name.split(' ')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-neutral-600 mb-2">{item.category}</p>
                            <div className="text-sm text-neutral-600 space-y-1">
                              <p><span className="font-medium">Fabric:</span> {item.fabric}</p>
                              <p><span className="font-medium">Color:</span> {item.color}</p>
                              <p><span className="font-medium">Size:</span> {item.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Customizations */}
                        {item.customizations.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-sm text-foreground mb-2">Customizations:</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.customizations.map((customization, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                                >
                                  {customization}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-foreground">Quantity:</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl text-foreground">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-neutral-600">
                                ₹{item.price.toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 sticky top-8"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h3>

                {/* Promo Code */}
                <div className="mb-6">
                  <label htmlFor="promoCode" className="block text-sm font-medium text-foreground mb-2">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="promoCode"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                    <Button onClick={applyPromoCode} variant="ghost" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span className="font-medium text-green-600">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Delivery</span>
                    <span className="font-medium">
                      {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-xl text-foreground">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Buy Now & Checkout Options */}
                <div className="space-y-3 mb-4">
                  {/* Buy Now Button */}
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold"
                    onClick={() => {
                      if (confirm(`Buy now for ₹${total.toLocaleString()}? You'll be redirected to secure payment.`)) {
                        alert('Redirecting to secure payment gateway...\n\nOrder Summary:\n' + 
                              cartItems.map(item => `• ${item.name} (${item.size}) - ₹${(item.price * item.quantity).toLocaleString()}`).join('\n') +
                              `\n\nTotal: ₹${total.toLocaleString()}`);
                      }
                    }}
                  >
                    🛒 Buy Now - ₹{total.toLocaleString()}
                  </Button>
                  
                  {/* Or Proceed to Checkout */}
                  <Link href="/checkout">
                    <Button variant="outline" size="lg" className="w-full">
                      Or Proceed to Checkout
                    </Button>
                  </Link>
                </div>

                {/* Payment Methods Preview */}
                <div className="mb-4 p-4 bg-neutral-50 rounded-lg border">
                  <h4 className="font-medium text-sm text-foreground mb-3">Quick Payment Options</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center p-2 bg-white rounded border">
                      <span className="mr-2">💳</span>
                      <span>Cards</span>
                    </div>
                    <div className="flex items-center p-2 bg-white rounded border">
                      <span className="mr-2">📱</span>
                      <span>UPI</span>
                    </div>
                    <div className="flex items-center p-2 bg-white rounded border">
                      <span className="mr-2">🏦</span>
                      <span>Net Banking</span>
                    </div>
                    <div className="flex items-center p-2 bg-white rounded border">
                      <span className="mr-2">💰</span>
                      <span>EMI</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 mt-2 text-center">
                    🔒 Secure payment powered by industry-standard encryption
                  </p>
                </div>

                {/* Continue Shopping */}
                <Link href="/collections">
                  <Button variant="ghost" size="sm" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Delivery Info */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h4 className="font-medium text-sm text-foreground mb-2">Delivery Information</h4>
                  <ul className="text-xs text-neutral-600 space-y-1">
                    <li>• Free delivery on orders above ₹50,000</li>
                    <li>• Standard delivery: 14-21 days</li>
                    <li>• Express delivery: 10-14 days (+₹2,000)</li>
                    <li>• Premium fittings included</li>
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