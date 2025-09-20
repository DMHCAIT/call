'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

export default function HomeVisitPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    preferredDate: '',
    preferredTime: '',
    occasion: '',
    stylePreference: '',
    notes: ''
  });

  const ncrCities = [
    'Delhi',
    'Gurgaon',
    'Noida',
    'Ghaziabad',
    'Faridabad',
    'Greater Noida',
    'Dwarka'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Home visit booking:', formData);
    alert('Home visit booking submitted! Our team will contact you within 2 hours to confirm the appointment.');
  };

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <div className="bg-neutral-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-sm text-neutral-600"
          >
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/consultation" className="hover:text-primary">Consultation</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Home Visit</span>
          </motion.nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Book Home Visit
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our master tailors will visit your home in the NCR region. 
              Enjoy personalized service and precise measurements in your comfortable space.
            </p>
          </motion.div>

          {/* Service Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 mb-8"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              Service Coverage Area
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {ncrCities.map((city) => (
                <div key={city} className="p-4 bg-accent-50 rounded-lg">
                  <span className="font-medium text-foreground">{city}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">At Your Doorstep</h3>
                <p className="text-neutral-600">Complete service at your home</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Visit Fee</h3>
                <p className="text-neutral-600">₹500 (Adjustable against order)</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <p className="text-neutral-600">90-120 Minutes</p>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Schedule Your Home Visit
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>

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
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
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
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-4">Address Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat number, Street, Landmark..."
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <select
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      >
                        <option value="">Select city</option>
                        {ncrCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        required
                        pattern="[0-9]{6}"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="e.g., 110001"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-4">Appointment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-foreground mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="10:00">10:00 AM - 12:00 PM</option>
                      <option value="12:00">12:00 PM - 2:00 PM</option>
                      <option value="14:00">2:00 PM - 4:00 PM</option>
                      <option value="16:00">4:00 PM - 6:00 PM</option>
                      <option value="18:00">6:00 PM - 8:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="occasion" className="block text-sm font-medium text-foreground mb-2">
                      Occasion
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="">Select occasion</option>
                      <option value="wedding">Wedding</option>
                      <option value="business">Business/Formal</option>
                      <option value="party">Party/Event</option>
                      <option value="casual">Casual Wear</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="stylePreference" className="block text-sm font-medium text-foreground mb-2">
                      Style Preference
                    </label>
                    <select
                      id="stylePreference"
                      name="stylePreference"
                      value={formData.stylePreference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="">Select style</option>
                      <option value="classic">Classic/Traditional</option>
                      <option value="modern">Modern/Contemporary</option>
                      <option value="slim">Slim Fit</option>
                      <option value="regular">Regular Fit</option>
                      <option value="custom">Custom Design</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Special instructions, parking information, or any specific requirements..."
                  className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-accent-50 p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">What We Bring:</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Complete fabric samples and swatches</li>
                  <li>• Professional measuring equipment</li>
                  <li>• Style consultation and design books</li>
                  <li>• Fitting guidelines and recommendations</li>
                  <li>• Instant order processing capability</li>
                </ul>
              </div>

              {/* Payment Section */}
              <div className="bg-neutral-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-foreground mb-4">Payment Options</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-2xl mb-2">💳</div>
                    <div className="text-xs text-neutral-600">Credit/Debit Cards</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="text-xs text-neutral-600">UPI Payment</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-2xl mb-2">🏦</div>
                    <div className="text-xs text-neutral-600">Net Banking</div>
                  </div>
                </div>
                <div className="text-center text-sm text-neutral-600">
                  🔒 Secure payment gateway | 💰 Advance booking | 📧 Confirmation SMS
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Book & Pay Now - ₹500
              </Button>
            </form>
          </motion.div>

          {/* Other Consultation Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-neutral-200"
          >
            <h3 className="font-serif text-xl font-bold text-foreground mb-4 text-center">
              Other Consultation Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/consultation/video">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <h4 className="font-semibold text-blue-800">Video Consultation</h4>
                      <p className="text-blue-600 text-sm">₹300 • 60 minutes</p>
                    </div>
                  </div>
                  <p className="text-blue-700 text-sm">Personal styling session with our expert tailors via video call</p>
                </div>
              </Link>
              <Link href="/consultation">
                <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">📋</span>
                    <div>
                      <h4 className="font-semibold text-primary-800">View All Options</h4>
                      <p className="text-primary-600 text-sm">Compare services</p>
                    </div>
                  </div>
                  <p className="text-primary-700 text-sm">See all consultation options and choose what works best for you</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}