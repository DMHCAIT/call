'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  BuildingStorefrontIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  BellIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  PhotoIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface SettingsData {
  business: {
    name: string;
    email: string;
    phone: string;
    address: string;
    gst: string;
    website: string;
  };
  pricing: {
    consultationFee: number;
    homeVisitFee: number;
    rushOrderSurcharge: number;
    alterationFee: number;
    currency: string;
  };
  delivery: {
    standardDays: number;
    rushDays: number;
    freeDeliveryThreshold: number;
    deliveryFee: number;
    serviceAreas: string[];
  };
  notifications: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    lowStock: boolean;
    customerMessages: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({
    business: {
      name: 'My Tailor - Bespoke Clothing',
      email: 'info@mytailor.com',
      phone: '+91 98765 43210',
      address: '123 Fashion Street, Mumbai, Maharashtra 400001',
      gst: '27AAAAA0000A1Z5',
      website: 'https://mytailor.com'
    },
    pricing: {
      consultationFee: 2000,
      homeVisitFee: 5000,
      rushOrderSurcharge: 25,
      alterationFee: 1500,
      currency: 'INR'
    },
    delivery: {
      standardDays: 14,
      rushDays: 7,
      freeDeliveryThreshold: 50000,
      deliveryFee: 1000,
      serviceAreas: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Chennai']
    },
    notifications: {
      orderUpdates: true,
      paymentAlerts: true,
      lowStock: true,
      customerMessages: true,
      emailNotifications: true,
      smsNotifications: false
    }
  });

  const [activeTab, setActiveTab] = useState('business');
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'business', name: 'Business Info', icon: BuildingStorefrontIcon },
    { id: 'pricing', name: 'Pricing', icon: CurrencyRupeeIcon },
    { id: 'delivery', name: 'Delivery', icon: TruckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon }
  ];

  const updateSettings = (section: keyof SettingsData, field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
    
    // Show success message
    const toastEl = document.createElement('div');
    toastEl.className = 'fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg';
    toastEl.textContent = 'Settings saved successfully!';
    document.body.appendChild(toastEl);
    
    setTimeout(() => {
      document.body.removeChild(toastEl);
    }, 3000);
    
    setHasChanges(false);
  };

  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600">Manage your business settings and preferences</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600 border border-primary-200'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            {/* Business Information */}
            {activeTab === 'business' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <BuildingStorefrontIcon className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">Business Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={settings.business.name}
                      onChange={(e) => updateSettings('business', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.business.email}
                      onChange={(e) => updateSettings('business', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settings.business.phone}
                      onChange={(e) => updateSettings('business', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      GST Number
                    </label>
                    <input
                      type="text"
                      value={settings.business.gst}
                      onChange={(e) => updateSettings('business', 'gst', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Business Address
                    </label>
                    <textarea
                      rows={3}
                      value={settings.business.address}
                      onChange={(e) => updateSettings('business', 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={settings.business.website}
                      onChange={(e) => updateSettings('business', 'website', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pricing Settings */}
            {activeTab === 'pricing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <CurrencyRupeeIcon className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">Pricing Configuration</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Video Consultation Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.pricing.consultationFee}
                      onChange={(e) => updateSettings('pricing', 'consultationFee', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Home Visit Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.pricing.homeVisitFee}
                      onChange={(e) => updateSettings('pricing', 'homeVisitFee', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Rush Order Surcharge (%)
                    </label>
                    <input
                      type="number"
                      value={settings.pricing.rushOrderSurcharge}
                      onChange={(e) => updateSettings('pricing', 'rushOrderSurcharge', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Alteration Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.pricing.alterationFee}
                      onChange={(e) => updateSettings('pricing', 'alterationFee', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Delivery Settings */}
            {activeTab === 'delivery' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <TruckIcon className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">Delivery Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Standard Delivery (Days)
                    </label>
                    <input
                      type="number"
                      value={settings.delivery.standardDays}
                      onChange={(e) => updateSettings('delivery', 'standardDays', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Rush Delivery (Days)
                    </label>
                    <input
                      type="number"
                      value={settings.delivery.rushDays}
                      onChange={(e) => updateSettings('delivery', 'rushDays', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Free Delivery Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.delivery.freeDeliveryThreshold}
                      onChange={(e) => updateSettings('delivery', 'freeDeliveryThreshold', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Standard Delivery Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.delivery.deliveryFee}
                      onChange={(e) => updateSettings('delivery', 'deliveryFee', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Service Areas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {settings.delivery.serviceAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    Contact support to modify service areas
                  </p>
                </div>
              </motion.div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <BellIcon className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">Order Updates</div>
                      <div className="text-sm text-neutral-600">Get notified when order status changes</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.orderUpdates}
                        onChange={(e) => updateSettings('notifications', 'orderUpdates', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">Payment Alerts</div>
                      <div className="text-sm text-neutral-600">Notifications for payment status</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.paymentAlerts}
                        onChange={(e) => updateSettings('notifications', 'paymentAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">Low Stock Alerts</div>
                      <div className="text-sm text-neutral-600">Alert when inventory is running low</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.lowStock}
                        onChange={(e) => updateSettings('notifications', 'lowStock', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">Customer Messages</div>
                      <div className="text-sm text-neutral-600">Notifications for customer inquiries</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.customerMessages}
                        onChange={(e) => updateSettings('notifications', 'customerMessages', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="border-t border-neutral-200 pt-4 mt-6">
                    <h3 className="font-medium text-neutral-900 mb-4">Delivery Methods</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg mb-2">
                      <div>
                        <div className="font-medium text-neutral-900">Email Notifications</div>
                        <div className="text-sm text-neutral-600">Receive notifications via email</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) => updateSettings('notifications', 'emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div>
                        <div className="font-medium text-neutral-900">SMS Notifications</div>
                        <div className="text-sm text-neutral-600">Receive notifications via SMS</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.smsNotifications}
                          onChange={(e) => updateSettings('notifications', 'smsNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button for Mobile */}
      {hasChanges && (
        <div className="lg:hidden fixed bottom-6 right-6">
          <Button 
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 shadow-lg"
            size="lg"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}