'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

export default function CasualPage() {
  const products = [
    {
      id: 'premium-casual-shirt',
      name: 'Premium Casual Shirt',
      price: 12000,
      description: 'Comfortable elegance for everyday wear'
    },
    {
      id: 'smart-casual-blazer',
      name: 'Smart Casual Blazer',
      price: 22000,
      description: 'Versatile piece for any occasion'
    },
    {
      id: 'tailored-chinos',
      name: 'Tailored Chinos',
      price: 8500,
      description: 'Perfect fit casual trousers'
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
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Casual Wear
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Comfortable style for everyday elegance. Our casual collection combines 
              relaxed comfort with sophisticated tailoring.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg"
              >
                <div className="aspect-[3/4] bg-neutral-200 rounded mb-4 flex items-center justify-center">
                  <span className="text-neutral-500">{product.name}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-neutral-600 text-sm mb-4">{product.description}</p>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}