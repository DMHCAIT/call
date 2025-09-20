'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { showToast } from '../ui/ToastProvider';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  images: Array<{ url: string; altText?: string; isPrimary: boolean }>;
  category: { name: string; slug: string };
  isFeatured: boolean;
}

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard = ({ product, showAddToCart = true, className = '' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast.info('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      showToast.success('Added to wishlist');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.basePrice,
      image: primaryImage?.url || '/placeholder-product.jpg',
      quantity: 1,
      serviceType: 'DIRECT_BUY'
    });
    showToast.success('Added to cart');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    // Implement quick view modal
    showToast.info('Quick view coming soon');
  };

  return (
    <motion.div
      className={`group relative bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
          {primaryImage && (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText || product.name}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          )}
          
          {/* Overlay with loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isFeatured && (
              <Badge variant="accent" size="sm">
                Featured
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlistToggle}
              className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors"
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWishlisted ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-neutral-600" />
              )}
            </button>
            
            <button
              onClick={handleQuickView}
              className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors"
              title="Quick view"
            >
              <EyeIcon className="h-5 w-5 text-neutral-600" />
            </button>
          </div>

          {/* Quick Add to Cart - appears on hover */}
          {showAddToCart && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="sm"
              >
                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-neutral-500 uppercase tracking-wide">
              {product.category.name}
            </span>
          </div>
          
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xl font-bold text-foreground">
                {formatPrice(product.basePrice)}
              </div>
              <div className="text-xs text-neutral-500">
                Starting price
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View Details →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;