'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

export default function WeddingPage() {
  const products = [
    {
      id: 'luxury-wedding-suit',
      name: 'Luxury Wedding Suit',
      price: 125000,
      image: '/placeholder-wedding-suit.jpg',
      description: 'Exquisite three-piece suit for the modern groom',
      category: 'suits'
    },
    {
      id: 'royal-wedding-sherwani',
      name: 'Royal Wedding Sherwani',
      price: 150000,
      image: '/placeholder-wedding-sherwani.jpg',
      description: 'Magnificent sherwani with gold thread work',
      category: 'ethnic'
    },
    {
      id: 'designer-tuxedo',
      name: 'Designer Tuxedo',
      price: 95000,
      image: '/placeholder-tuxedo.jpg',
      description: 'Elegant black-tie formal wear',
      category: 'formal'
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
      <section className="py-20 bg-gradient-to-br from-accent-50 via-primary-50 to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Wedding Attire
            </h1>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto mb-8">
              Make your special day unforgettable with bespoke wedding attire designed 
              to perfection. From traditional sherwanis to contemporary suits, 
              we create garments that celebrate your unique love story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation/video">
                <Button size="lg">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/consultation/home-visit">
                <Button variant="accent" size="lg">
                  Schedule Home Visit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-accent-100 to-primary-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-700 text-sm font-medium text-center px-4">
                        {product.name}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Premium
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-semibold">{product.name}</h3>
                  <p className="text-neutral-600 text-sm">{product.description}</p>
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

      {/* Wedding Services */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold mb-4">
              Complete Wedding Solutions
            </h2>
            <p className="text-xl opacity-90">
              We understand that your wedding day is unique. Our comprehensive services 
              ensure every detail is perfect.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Personal Styling</h3>
              <p className="text-sm opacity-90">Expert styling consultation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Custom Design</h3>
              <p className="text-sm opacity-90">Unique designs for your day</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Express Delivery</h3>
              <p className="text-sm opacity-90">Fast turnaround for weddings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Perfect Fit Guarantee</h3>
              <p className="text-sm opacity-90">Multiple fittings included</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}