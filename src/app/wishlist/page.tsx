'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  addedDate: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Classic Navy Suit',
      category: 'Business Suits',
      price: 45000,
      originalPrice: 55000,
      image: '/api/placeholder/300/400',
      inStock: true,
      addedDate: '2025-09-10'
    },
    {
      id: '2',
      name: 'Royal Wedding Sherwani',
      category: 'Ethnic Wear',
      price: 65000,
      image: '/api/placeholder/300/400',
      inStock: true,
      addedDate: '2025-09-08'
    },
    {
      id: '3',
      name: 'Casual Linen Blazer',
      category: 'Casual Wear',
      price: 25000,
      originalPrice: 30000,
      image: '/api/placeholder/300/400',
      inStock: false,
      addedDate: '2025-09-05'
    },
    {
      id: '4',
      name: 'Premium Tuxedo',
      category: 'Formal Wear',
      price: 75000,
      image: '/api/placeholder/300/400',
      inStock: true,
      addedDate: '2025-09-01'
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item: WishlistItem) => {
    // In real app, this would add to cart
    console.log('Added to cart:', item.name);
    alert(`${item.name} added to cart!`);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  if (wishlistItems.length === 0) {
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
                <HeartIcon className="h-16 w-16 text-neutral-300 mx-auto mb-6" />
                <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Your Wishlist is Empty
                </h1>
                <p className="text-neutral-600 mb-8">
                  Save your favorite items to your wishlist and keep track of what you love.
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
              My Wishlist
            </h1>
            <p className="text-neutral-600">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
            </p>
          </motion.div>

          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-neutral-600 text-sm font-medium">
                      {item.name}
                    </span>
                  </div>
                  
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>

                  {/* Stock Status */}
                  {!item.inStock && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-neutral-500">{item.category}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-lg text-foreground">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-neutral-400 mb-4">
                    Added on {new Date(item.addedDate).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className="w-full"
                      variant={item.inStock ? 'primary' : 'outline'}
                    >
                      {item.inStock ? 'Add to Cart' : 'Notify When Available'}
                    </Button>
                    
                    <Link href={`/product/${item.id}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <h3 className="font-serif text-xl font-bold text-foreground mb-6 text-center">
              Explore More
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/collections">
                <Button variant="outline" className="w-full">
                  Browse All Collections
                </Button>
              </Link>
              <Link href="/consultation">
                <Button variant="secondary" className="w-full">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/size-guide">
                <Button variant="ghost" className="w-full">
                  Size Guide
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}