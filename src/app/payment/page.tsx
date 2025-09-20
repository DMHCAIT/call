'use client';

import { useState, useEffect } from 'react';
import { CreditCardIcon, BanknotesIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

interface OrderDetails {
  product: string;
  fabric: string;
  color: string;
  size: string;
  serviceType: 'DIRECT_BUY' | 'VIDEO_CONSULTATION' | 'HOME_VISIT';
  customizations: string[];
  totalPrice: number;
}

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Get order details from sessionStorage
    const storedDetails = sessionStorage.getItem('orderDetails');
    if (storedDetails) {
      setOrderDetails(JSON.parse(storedDetails));
    }
  }, []);

  const getServicePrice = (serviceType: string) => {
    switch (serviceType) {
      case 'VIDEO_CONSULTATION':
        return 500;
      case 'HOME_VISIT':
        return 1000;
      default:
        return 0;
    }
  };

  const getCustomizationTotal = (customizations: string[]) => {
    // Mock customization prices - in real app this would come from database
    const customizationPrices: { [key: string]: number } = {
      'Monogram Initials': 2000,
      'Contrasting Buttons': 1500,
      'Inside Pockets': 1000,
      'Ticket Pocket': 800,
      'Surgeon Cuffs': 2500
    };
    
    return customizations.reduce((total, customization) => {
      return total + (customizationPrices[customization] || 0);
    }, 0);
  };

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Payment submitted:', formData);
    alert('Payment processing... This is a demo implementation.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-500 text-white p-6">
            <h1 className="text-2xl font-bold">Secure Payment</h1>
            <p className="text-primary-100 mt-2">Complete your order with our secure checkout</p>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {orderDetails ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>{orderDetails.product}</span>
                      <span>₹{(orderDetails.totalPrice - getServicePrice(orderDetails.serviceType) - getCustomizationTotal(orderDetails.customizations)).toLocaleString()}</span>
                    </div>
                    
                    {orderDetails.serviceType !== 'DIRECT_BUY' && (
                      <div className="flex justify-between">
                        <span>
                          {orderDetails.serviceType === 'VIDEO_CONSULTATION' 
                            ? 'Video Consultation' 
                            : 'Home Visit Consultation'
                          }
                        </span>
                        <span>₹{getServicePrice(orderDetails.serviceType).toLocaleString()}</span>
                      </div>
                    )}
                    
                    {orderDetails.customizations.length > 0 && (
                      <div className="flex justify-between">
                        <span>Customizations ({orderDetails.customizations.length})</span>
                        <span>₹{getCustomizationTotal(orderDetails.customizations).toLocaleString()}</span>
                      </div>
                    )}
                    
                    <hr className="border-gray-300" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{orderDetails.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Custom Suit</span>
                      <span>₹25,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Home Visit Consultation</span>
                      <span>₹1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fabric Premium</span>
                      <span>₹5,000</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹31,000</span>
                    </div>
                  </div>
                )}

                {/* Order Details */}
                {orderDetails && (
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <h3 className="font-semibold mb-3">Order Details</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span>Fabric:</span>
                        <span className="font-medium">{orderDetails.fabric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Color:</span>
                        <span className="font-medium">{orderDetails.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="font-medium">{orderDetails.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-medium">
                          {orderDetails.serviceType === 'DIRECT_BUY' 
                            ? 'Direct Purchase' 
                            : orderDetails.serviceType === 'VIDEO_CONSULTATION'
                            ? 'Video Consultation'
                            : 'Home Visit'
                          }
                        </span>
                      </div>
                      {orderDetails.customizations.length > 0 && (
                        <div className="mt-3">
                          <span className="font-medium">Customizations:</span>
                          <ul className="mt-1 ml-2">
                            {orderDetails.customizations.map((customization, index) => (
                              <li key={index}>• {customization}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Service Details */}
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <h3 className="font-semibold mb-3">Service Details</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Free home measurement service</li>
                    <li>• 2-3 fittings included</li>
                    <li>• 15-day delivery guarantee</li>
                    <li>• Premium fabric selection</li>
                    <li>• Style consultation included</li>
                  </ul>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <CreditCardIcon className="h-6 w-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">Card</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          paymentMethod === 'upi'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <DevicePhoneMobileIcon className="h-6 w-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">UPI</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          paymentMethod === 'netbanking'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <BanknotesIcon className="h-6 w-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">Net Banking</div>
                      </button>
                    </div>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* UPI Payment Form */}
                  {paymentMethod === 'upi' && (
                    <div>
                      <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        id="upiId"
                        placeholder="yourname@paytm"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  {/* Net Banking Form */}
                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Bank
                      </label>
                      <select
                        id="bank"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold">Contact Information</h4>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold">Billing Address</h4>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New Delhi"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="110001"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-colors focus:ring-4 focus:ring-primary-200"
                  >
                    Pay ₹{orderDetails ? orderDetails.totalPrice.toLocaleString() : '31,000'}
                  </button>

                  {/* Security Notice */}
                  <div className="text-xs text-gray-500 text-center">
                    🔒 Your payment information is encrypted and secure
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}