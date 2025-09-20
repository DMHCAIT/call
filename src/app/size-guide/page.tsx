'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState<'suits' | 'ethnic' | 'shirts'>('suits');

  const sizeCharts = {
    suits: {
      name: 'Suits & Blazers',
      description: 'Professional measurements for business and formal wear',
      sizes: [
        { size: '36R', chest: '36"', waist: '30"', length: '29"', shoulder: '17"' },
        { size: '38R', chest: '38"', waist: '32"', length: '29.5"', shoulder: '17.5"' },
        { size: '40R', chest: '40"', waist: '34"', length: '30"', shoulder: '18"' },
        { size: '42R', chest: '42"', waist: '36"', length: '30.5"', shoulder: '18.5"' },
        { size: '44R', chest: '44"', waist: '38"', length: '31"', shoulder: '19"' },
        { size: '46R', chest: '46"', waist: '40"', length: '31.5"', shoulder: '19.5"' },
        { size: '48R', chest: '48"', waist: '42"', length: '32"', shoulder: '20"' }
      ]
    },
    ethnic: {
      name: 'Ethnic Wear',
      description: 'Traditional measurements for sherwanis and ethnic clothing',
      sizes: [
        { size: 'S', chest: '36-38"', waist: '30-32"', length: '42"', shoulder: '17"' },
        { size: 'M', chest: '38-40"', waist: '32-34"', length: '43"', shoulder: '17.5"' },
        { size: 'L', chest: '40-42"', waist: '34-36"', length: '44"', shoulder: '18"' },
        { size: 'XL', chest: '42-44"', waist: '36-38"', length: '45"', shoulder: '18.5"' },
        { size: 'XXL', chest: '44-46"', waist: '38-40"', length: '46"', shoulder: '19"' },
        { size: 'XXXL', chest: '46-48"', waist: '40-42"', length: '47"', shoulder: '19.5"' }
      ]
    },
    shirts: {
      name: 'Shirts',
      description: 'Casual and formal shirt measurements',
      sizes: [
        { size: 'S (14.5)', chest: '36"', waist: '34"', length: '29"', shoulder: '17"' },
        { size: 'M (15)', chest: '38"', waist: '36"', length: '29.5"', shoulder: '17.5"' },
        { size: 'L (15.5)', chest: '40"', waist: '38"', length: '30"', shoulder: '18"' },
        { size: 'XL (16)', chest: '42"', waist: '40"', length: '30.5"', shoulder: '18.5"' },
        { size: 'XXL (16.5)', chest: '44"', waist: '42"', length: '31"', shoulder: '19"' },
        { size: 'XXXL (17)', chest: '46"', waist: '44"', length: '31.5"', shoulder: '19.5"' }
      ]
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Size Guide
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Find your perfect fit with our comprehensive sizing charts and measurement guide. 
              For the most accurate fit, we recommend booking a consultation.
            </p>
          </motion.div>

          {/* Category Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-200">
              {Object.entries(sizeCharts).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key as 'suits' | 'ethnic' | 'shirts')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeCategory === key
                      ? 'bg-primary-500 text-white'
                      : 'text-neutral-600 hover:text-primary-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Size Chart */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                {sizeCharts[activeCategory].name}
              </h2>
              <p className="text-neutral-600">{sizeCharts[activeCategory].description}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Chest</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Waist</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Length</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Shoulder</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts[activeCategory].sizes.map((size, index) => (
                    <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 font-medium text-primary-600">{size.size}</td>
                      <td className="py-3 px-4 text-neutral-700">{size.chest}</td>
                      <td className="py-3 px-4 text-neutral-700">{size.waist}</td>
                      <td className="py-3 px-4 text-neutral-700">{size.length}</td>
                      <td className="py-3 px-4 text-neutral-700">{size.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Measurement Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"
            >
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                How to Measure
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📏 Chest</h4>
                  <p className="text-sm text-neutral-600">
                    Measure around the fullest part of your chest, keeping the tape horizontal and snug but not tight.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📐 Waist</h4>
                  <p className="text-sm text-neutral-600">
                    Measure around your natural waistline, typically where you bend to the side.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📏 Length</h4>
                  <p className="text-sm text-neutral-600">
                    For jackets: from the base of your neck to your desired length. For shirts: from shoulder to hem.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📐 Shoulder</h4>
                  <p className="text-sm text-neutral-600">
                    Measure from one shoulder point to the other across your back.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8"
            >
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                Need Help with Sizing?
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">📞 Video Consultation</h4>
                  <p className="text-sm text-neutral-600 mb-3">
                    Get personalized sizing advice from our expert tailors via video call.
                  </p>
                  <Link href="/consultation/video">
                    <Button size="sm" className="w-full">
                      Book Video Call - ₹300
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">🏠 Home Visit</h4>
                  <p className="text-sm text-neutral-600 mb-3">
                    Professional measurement service at your doorstep in NCR region.
                  </p>
                  <Link href="/consultation/home-visit">
                    <Button size="sm" className="w-full">
                      Book Home Visit - ₹500
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">✅ Our Guarantee</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• 2 complimentary fittings included</li>
                  <li>• Perfect fit guarantee</li>
                  <li>• Lifetime alteration service</li>
                  <li>• Expert tailoring guidance</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Additional Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center"
          >
            <h3 className="font-semibold text-foreground mb-2">💡 Pro Tips for Best Fit</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-700">
              <div>
                <span className="font-medium">Measure over undergarments:</span> Wear what you&apos;d typically wear under the garment.
              </div>
              <div>
                <span className="font-medium">Stand naturally:</span> Don&apos;t hold your breath or pull in your stomach.
              </div>
              <div>
                <span className="font-medium">Get help:</span> Ask someone to help you measure for accuracy.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}