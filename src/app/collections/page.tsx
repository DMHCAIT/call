'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

export default function CollectionsPage() {
  const collections = [
    {
      id: 'suits',
      name: 'Suits & Blazers',
      description: 'Professional elegance for every business occasion. From boardroom meetings to formal events.',
      image: '/placeholder-suits.jpg',
      productCount: 45,
      priceFrom: 25000,
      href: '/collections/suits'
    },
    {
      id: 'ethnic',
      name: 'Ethnic Wear',
      description: 'Traditional craftsmanship meets contemporary design. Sherwanis, Kurtas, and Indo-Western attire.',
      image: '/placeholder-ethnic.jpg',
      productCount: 32,
      priceFrom: 15000,
      href: '/collections/ethnic'
    },
    {
      id: 'wedding',
      name: 'Wedding Attire',
      description: 'Make your special day unforgettable with bespoke wedding outfits designed just for you.',
      image: '/placeholder-wedding.jpg',
      productCount: 28,
      priceFrom: 45000,
      href: '/collections/wedding'
    },
    {
      id: 'casual',
      name: 'Casual Wear',
      description: 'Comfortable elegance for everyday occasions. Shirts, trousers, and casual blazers.',
      image: '/placeholder-casual.jpg',
      productCount: 38,
      priceFrom: 8000,
      href: '/collections/casual'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our Collections
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover our curated selection of premium garments, each crafted with 
              meticulous attention to detail and personalized to your unique style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={collection.href}>
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg bg-neutral-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-600 text-lg font-semibold">
                        {collection.name}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 z-20 text-white">
                      <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          {collection.productCount} Products
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          From {formatPrice(collection.priceFrom)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    {collection.name}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {collection.description}
                  </p>
                  <Link href={collection.href}>
                    <Button variant="secondary" className="w-full sm:w-auto">
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Why Choose Our Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✂️</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Craftsmanship</h3>
                <p className="text-neutral-600">Master tailors with decades of experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Perfect Fit</h3>
                <p className="text-neutral-600">Customized measurements for your body</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Premium Fabrics</h3>
                <p className="text-neutral-600">Finest materials from around the world</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100">
              Book a consultation or visit our showroom to begin your bespoke journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button variant="accent" size="lg">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="bg-white text-primary-500 hover:bg-primary-50">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}