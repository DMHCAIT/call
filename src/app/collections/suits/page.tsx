'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function SuitsPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 'classic-business-suit',
      name: 'Classic Business Suit',
      price: 35000,
      image: '/placeholder-suit-1.jpg',
      category: 'business',
      description: 'Timeless elegance for the modern professional',
      fabrics: ['Wool', 'Cotton Blend'],
      colors: ['Navy', 'Charcoal', 'Black']
    },
    {
      id: 'slim-fit-blazer',
      name: 'Slim Fit Blazer',
      price: 25000,
      image: '/placeholder-blazer-1.jpg',
      category: 'blazers',
      description: 'Contemporary cut for a sharp, modern look',
      fabrics: ['Wool', 'Linen'],
      colors: ['Navy', 'Grey', 'Beige']
    },
    {
      id: 'formal-evening-suit',
      name: 'Formal Evening Suit',
      price: 45000,
      image: '/placeholder-suit-2.jpg',
      category: 'formal',
      description: 'Sophisticated attire for special occasions',
      fabrics: ['Premium Wool', 'Silk Blend'],
      colors: ['Black', 'Midnight Blue']
    },
    {
      id: 'casual-sport-coat',
      name: 'Casual Sport Coat',
      price: 28000,
      image: '/placeholder-blazer-2.jpg',
      category: 'casual',
      description: 'Versatile piece for smart-casual occasions',
      fabrics: ['Cotton', 'Tweed'],
      colors: ['Brown', 'Grey', 'Navy']
    },
    {
      id: 'luxury-tuxedo',
      name: 'Luxury Tuxedo',
      price: 65000,
      image: '/placeholder-tux.jpg',
      category: 'formal',
      description: 'Ultimate formal wear for black-tie events',
      fabrics: ['Premium Wool', 'Velvet'],
      colors: ['Black', 'Midnight Blue']
    },
    {
      id: 'three-piece-suit',
      name: 'Three Piece Suit',
      price: 42000,
      image: '/placeholder-suit-3.jpg',
      category: 'business',
      description: 'Complete formal ensemble with waistcoat',
      fabrics: ['Wool', 'Wool Blend'],
      colors: ['Navy', 'Charcoal', 'Brown']
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredProducts = products
    .filter(product => filter === 'all' || product.category === filter)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Suits & Blazers
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Professional elegance crafted to perfection. Our suits and blazers combine 
              traditional tailoring techniques with contemporary design to create pieces 
              that command respect and confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation/video">
                <Button size="lg">
                  Book Video Consultation
                </Button>
              </Link>
              <Link href="/consultation/home-visit">
                <Button variant="secondary" size="lg">
                  Schedule Home Visit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('business')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'business'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Business
              </button>
              <button
                onClick={() => setFilter('formal')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'formal'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Formal
              </button>
              <button
                onClick={() => setFilter('blazers')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'blazers'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Blazers
              </button>
              <button
                onClick={() => setFilter('casual')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'casual'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Casual
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-neutral-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-600 text-sm font-medium">
                        {product.name}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-wrap gap-1">
                        {product.colors.slice(0, 3).map((color) => (
                          <span key={color} className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-500">
                      {formatPrice(product.price)}
                    </span>
                    <Link href={`/product/${product.id}`}>
                      <Button size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              How Would You Like to Proceed?
            </h2>
            <p className="text-xl text-neutral-600">
              Choose the service option that works best for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Direct Purchase</h3>
              <p className="text-neutral-600 mb-4">
                Order online with standard measurements
              </p>
              <Button variant="secondary" className="w-full">
                Shop Now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Video Consultation</h3>
              <p className="text-neutral-600 mb-4">
                Personal styling session with expert tailors
              </p>
              <Link href="/consultation/video">
                <Button className="w-full">
                  Book Session
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Home Visit (NCR)</h3>
              <p className="text-neutral-600 mb-4">
                Professional measurement service at your doorstep
              </p>
              <Link href="/consultation/home-visit">
                <Button variant="accent" className="w-full">
                  Schedule Visit
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}