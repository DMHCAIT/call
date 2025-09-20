'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function EthnicPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 'royal-sherwani',
      name: 'Royal Sherwani',
      price: 45000,
      image: '/placeholder-sherwani-1.jpg',
      category: 'sherwanis',
      description: 'Majestic traditional wear with intricate embroidery',
      fabrics: ['Silk', 'Brocade', 'Velvet'],
      colors: ['Gold', 'Maroon', 'Royal Blue']
    },
    {
      id: 'designer-kurta',
      name: 'Designer Kurta Set',
      price: 18000,
      image: '/placeholder-kurta-1.jpg',
      category: 'kurtas',
      description: 'Contemporary kurta with modern styling',
      fabrics: ['Cotton', 'Linen', 'Silk'],
      colors: ['White', 'Cream', 'Light Blue']
    },
    {
      id: 'indo-western-jacket',
      name: 'Indo-Western Jacket',
      price: 32000,
      image: '/placeholder-indo-1.jpg',
      category: 'indo-western',
      description: 'Perfect fusion of traditional and modern aesthetics',
      fabrics: ['Cotton Blend', 'Silk', 'Linen'],
      colors: ['Navy', 'Burgundy', 'Olive']
    },
    {
      id: 'wedding-sherwani',
      name: 'Wedding Sherwani',
      price: 85000,
      image: '/placeholder-sherwani-2.jpg',
      category: 'sherwanis',
      description: 'Luxurious wedding attire with gold thread work',
      fabrics: ['Premium Silk', 'Brocade'],
      colors: ['Ivory', 'Gold', 'Cream']
    },
    {
      id: 'festive-kurta',
      name: 'Festive Kurta',
      price: 25000,
      image: '/placeholder-kurta-2.jpg',
      category: 'kurtas',
      description: 'Elegant festive wear with subtle embellishments',
      fabrics: ['Silk', 'Cotton Silk'],
      colors: ['Saffron', 'Deep Red', 'Purple']
    },
    {
      id: 'nehru-jacket-set',
      name: 'Nehru Jacket Set',
      price: 28000,
      image: '/placeholder-nehru.jpg',
      category: 'indo-western',
      description: 'Classic Nehru jacket with kurta and churidar',
      fabrics: ['Cotton', 'Khadi', 'Linen'],
      colors: ['White', 'Beige', 'Grey']
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
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ethnic Wear
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Celebrate tradition with contemporary elegance. Our ethnic collection 
              combines timeless Indian craftsmanship with modern tailoring techniques 
              to create garments that honor heritage while embracing innovation.
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
                    ? 'bg-accent-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('sherwanis')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'sherwanis'
                    ? 'bg-accent-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Sherwanis
              </button>
              <button
                onClick={() => setFilter('kurtas')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'kurtas'
                    ? 'bg-accent-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Kurtas
              </button>
              <button
                onClick={() => setFilter('indo-western')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'indo-western'
                    ? 'bg-accent-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Indo-Western
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
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
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-accent-50 to-neutral-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-600 text-sm font-medium text-center px-4">
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
                    <span className="text-lg font-bold text-accent-600">
                      {formatPrice(product.price)}
                    </span>
                    <Link href={`/product/${product.id}`}>
                      <Button size="sm" variant="accent">
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

      {/* Cultural Heritage Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Preserving Cultural Heritage
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Each piece in our ethnic collection tells a story of Indian craftsmanship, 
              passed down through generations and refined for the modern gentleman.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧵</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Hand Embroidery</h3>
              <p className="text-neutral-600 text-sm">Traditional techniques by master craftsmen</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Fabrics</h3>
              <p className="text-neutral-600 text-sm">Finest silk, cotton, and brocade materials</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Authentic Designs</h3>
              <p className="text-neutral-600 text-sm">Traditional patterns with contemporary appeal</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Royal Heritage</h3>
              <p className="text-neutral-600 text-sm">Designs inspired by royal Indian traditions</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}