'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  fabrics: string[];
  colors: string[];
  sizes: string[];
  features: string[];
  specifications: { [key: string]: string };
  customizations: { name: string; price: number; description: string }[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    // Handle params properly
    if (params?.id) {
      setId(params.id);
    }
  }, [params]);
  
  // Mock product data - in real app this would come from API/database
  const getProductData = (id: string): ProductDetails => {
    const products: { [key: string]: ProductDetails } = {
      'classic-navy-suit': {
        id: 'classic-navy-suit',
        name: 'Classic Navy Suit',
        category: 'Business Suits',
        price: 45000,
        originalPrice: 55000,
        description: 'Timeless elegance meets contemporary craftsmanship in our Classic Navy Suit. Meticulously tailored from premium Italian wool, this suit embodies sophistication and versatility. Perfect for business meetings, formal events, and special occasions.',
        images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
        fabrics: ['Premium Italian Wool', 'Luxury Cashmere Blend', 'Fine Merino Wool'],
        colors: ['Navy Blue', 'Charcoal Grey', 'Deep Black', 'Midnight Blue'],
        sizes: ['36R', '38R', '40R', '42R', '44R', '46R', '48R'],
        features: [
          'Hand-stitched lapels',
          'Mother-of-pearl buttons',
          'Functional buttonholes',
          'Canvas construction',
          'Bemberg lining',
          'Pick-stitched edges'
        ],
        specifications: {
          'Fabric Weight': '280gsm',
          'Construction': 'Half Canvas',
          'Lining': 'Bemberg Cupro',
          'Buttons': 'Mother of Pearl',
          'Delivery': '14-21 days',
          'Fittings': '2 included'
        },
        customizations: [
          { name: 'Monogram Initials', price: 2000, description: 'Elegant embroidered initials on jacket interior' },
          { name: 'Contrasting Buttons', price: 1500, description: 'Premium horn or wooden button upgrade' },
          { name: 'Inside Pockets', price: 1000, description: 'Additional internal pockets for functionality' },
          { name: 'Ticket Pocket', price: 800, description: 'Traditional ticket pocket on jacket' },
          { name: 'Surgeon Cuffs', price: 2500, description: 'Functional working buttonholes on sleeves' }
        ]
      },
      'royal-wedding-sherwani': {
        id: 'royal-wedding-sherwani',
        name: 'Royal Wedding Sherwani',
        category: 'Wedding Wear',
        price: 65000,
        originalPrice: 75000,
        description: 'Exquisite hand-embroidered wedding sherwani crafted for your special day. Features intricate gold threadwork, traditional motifs, and luxurious silk fabric. Comes with matching churidar and dupatta.',
        images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
        fabrics: ['Pure Silk Brocade', 'Velvet with Zardozi', 'Banarasi Silk'],
        colors: ['Cream Gold', 'Maroon', 'Royal Blue', 'Deep Green'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        features: [
          'Hand-embroidered patterns',
          'Gold thread work (Zardozi)',
          'Traditional collar design',
          'Silk lining',
          'Matching churidar included',
          'Designer buttons'
        ],
        specifications: {
          'Fabric': 'Pure Silk',
          'Embroidery': 'Hand Zardozi',
          'Includes': 'Sherwani + Churidar + Dupatta',
          'Delivery': '21-28 days',
          'Fittings': '3 included',
          'Occasion': 'Wedding & Festivals'
        },
        customizations: [
          { name: 'Groom Name Embroidery', price: 3000, description: 'Personalized name embroidery inside collar' },
          { name: 'Custom Color Scheme', price: 5000, description: 'Exclusive color combination as per preference' },
          { name: 'Extended Length', price: 2000, description: 'Ankle-length sherwani design' },
          { name: 'Matching Mojari', price: 8000, description: 'Handcrafted leather mojari shoes' }
        ]
      },
      'premium-business-blazer': {
        id: 'premium-business-blazer',
        name: 'Premium Business Blazer',
        category: 'Business Wear',
        price: 28000,
        originalPrice: 35000,
        description: 'Contemporary business blazer perfect for modern professionals. Tailored for a sharp silhouette with attention to detail and comfort. Ideal for presentations, meetings, and networking events.',
        images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
        fabrics: ['Wool Blend', 'Cotton Blend', 'Linen Blend'],
        colors: ['Charcoal', 'Navy', 'Black', 'Dark Brown'],
        sizes: ['36R', '38R', '40R', '42R', '44R', '46R'],
        features: [
          'Slim fit design',
          'Notched lapels',
          'Two-button closure',
          'Functional pockets',
          'Stretch lining',
          'Modern silhouette'
        ],
        specifications: {
          'Fit': 'Slim Modern',
          'Buttons': '2-Button',
          'Lapel': 'Notched',
          'Delivery': '10-14 days',
          'Fittings': '2 included',
          'Care': 'Dry Clean Only'
        },
        customizations: [
          { name: 'Contrast Lining', price: 1200, description: 'Colorful or patterned interior lining' },
          { name: 'Elbow Patches', price: 800, description: 'Leather or suede elbow reinforcement' },
          { name: 'Ticket Pocket', price: 600, description: 'Small chest pocket for tickets/cards' }
        ]
      }
    };
    
    return products[id] || products['classic-navy-suit']; // Fallback to navy suit if ID not found
  };

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedServiceType, setSelectedServiceType] = useState<'DIRECT_BUY' | 'VIDEO_CONSULTATION' | 'HOME_VISIT'>('DIRECT_BUY');

  useEffect(() => {
    if (id) {
      const productData = getProductData(id);
      setProduct(productData);
      setSelectedFabric(productData.fabrics[0] || '');
      setSelectedColor(productData.colors[0] || '');
    }
  }, [id]);

  const toggleCustomization = (customizationName: string) => {
    setSelectedCustomizations(prev => 
      prev.includes(customizationName)
        ? prev.filter(c => c !== customizationName)
        : [...prev, customizationName]
    );
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    const customizationPrice = product.customizations
      .filter(c => selectedCustomizations.includes(c.name))
      .reduce((sum, c) => sum + c.price, 0);
    
    let servicePrice = 0;
    if (selectedServiceType === 'VIDEO_CONSULTATION') {
      servicePrice = 500; // Video consultation fee
    } else if (selectedServiceType === 'HOME_VISIT') {
      servicePrice = 1000; // Home visit fee
    }
    
    return product.price + customizationPrice + servicePrice;
  };

  const addToCart = () => {
    if (!selectedSize) {
      // Create a more visible error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50';
      errorDiv.innerHTML = '⚠️ Please select a size first';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }
    
    // In real app, this would add to cart state/context
    console.log('Added to cart:', {
      product: product?.name,
      fabric: selectedFabric,
      color: selectedColor,
      size: selectedSize,
      customizations: selectedCustomizations,
      totalPrice: calculateTotalPrice()
    });
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50';
    successDiv.innerHTML = '✅ Product added to cart!';
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      // Create a more visible error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50';
      errorDiv.innerHTML = '⚠️ Please select a size first';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }
    
    // Redirect to payment page with order details
    const orderDetails = {
      product: product?.name || 'Unknown Product',
      fabric: selectedFabric,
      color: selectedColor,
      size: selectedSize,
      serviceType: selectedServiceType,
      customizations: selectedCustomizations,
      totalPrice: calculateTotalPrice()
    };
    
    // Store order details in sessionStorage for payment page
    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    
    // Redirect to payment page
    window.location.href = '/payment';
  };

  const addToWishlist = () => {
    // In real app, this would save to user's wishlist
    console.log('Added to wishlist:', product?.name);
    
    // Show success message
    const toastEl = document.createElement('div');
    toastEl.className = 'fixed top-4 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300';
    toastEl.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <span>Added to wishlist! Sign in to sync across devices.</span>
      </div>
    `;
    
    document.body.appendChild(toastEl);
    
    // Animate in
    setTimeout(() => {
      toastEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toastEl.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toastEl);
      }, 300);
    }, 3000);
  };

  // Loading state
  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading product details...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-primary-600">Collections</Link>
              <span>/</span>
              <Link href="/collections/suits" className="hover:text-primary-600">Suits</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-primary-600 font-serif text-4xl">
                    {product.name.split(' ')[0]}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-20 bg-neutral-100 rounded border-2 ${
                      currentImageIndex === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 rounded flex items-center justify-center">
                      <span className="text-primary-600 text-xs">{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Product Info */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-neutral-600 mb-4">{product.category}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-foreground">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-neutral-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {/* Consultation Options */}
                  <div className="flex space-x-2">
                    <Link href="/consultation/video">
                      <Button variant="ghost" size="sm" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">
                        📞 Video (₹300)
                      </Button>
                    </Link>
                    <Link href="/consultation/home-visit">
                      <Button variant="ghost" size="sm" className="text-xs bg-green-50 text-green-700 hover:bg-green-100 border border-green-200">
                        🏠 Home Visit (₹500)
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <p className="text-neutral-700 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></span>
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Fabric Selection */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Select Fabric</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.fabrics.map((fabric) => (
                    <label key={fabric} className="flex items-center">
                      <input
                        type="radio"
                        name="fabric"
                        value={fabric}
                        checked={selectedFabric === fabric}
                        onChange={(e) => setSelectedFabric(e.target.value)}
                        className="mr-3 text-primary-500"
                      />
                      <span className="text-sm">{fabric}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                        selectedColor === color
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-300 hover:border-primary-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Select Size *</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-300 hover:border-primary-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {/* Enhanced Size Guide & Fitting Section */}
                <div className="mt-4 p-5 bg-gradient-to-br from-neutral-50 to-blue-50/50 rounded-xl border border-neutral-200 shadow-sm">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center">
                    <span className="mr-2">✂️</span>
                    Perfect Fit Guarantee
                  </h4>
                  
                  {/* Size Guide and Home Visit Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Link href="/size-guide" className="group">
                      <div className="flex items-center p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary hover:shadow-md transition-all duration-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-xl">📏</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground group-hover:text-primary">Size Guide</div>
                          <div className="text-sm text-neutral-600">Measurement charts & tips</div>
                        </div>
                      </div>
                    </Link>

                    <Link href="/consultation/home-visit" className="group">
                      <div className="flex items-center p-4 bg-white rounded-lg border border-neutral-200 hover:border-green-500 hover:shadow-md transition-all duration-200">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-xl">🏠</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground group-hover:text-green-700">Home Visit</div>
                          <div className="text-sm text-neutral-600">Professional fitting (₹500)</div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Quick Size Reference */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-3 bg-white/70 rounded-lg border border-neutral-200">
                      <div className="font-medium text-sm">Small</div>
                      <div className="text-xs text-neutral-600">36-38&quot;</div>
                    </div>
                    <div className="text-center p-3 bg-white/70 rounded-lg border border-neutral-200">
                      <div className="font-medium text-sm">Medium</div>
                      <div className="text-xs text-neutral-600">40-42&quot;</div>
                    </div>
                    <div className="text-center p-3 bg-white/70 rounded-lg border border-neutral-200">
                      <div className="font-medium text-sm">Large</div>
                      <div className="text-xs text-neutral-600">44-46&quot;</div>
                    </div>
                  </div>

                  {/* Guarantee Features */}
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-700">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-1">✓</span>
                      2 complimentary fittings
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 mr-1">✓</span>
                      Perfect fit guarantee
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 mr-1">✓</span>
                      Free alterations (30 days)
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Type Selection */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Purchase Mode</h3>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input
                      type="radio"
                      name="serviceType"
                      value="DIRECT_BUY"
                      checked={selectedServiceType === 'DIRECT_BUY'}
                      onChange={(e) => setSelectedServiceType(e.target.value as any)}
                      className="mt-1 text-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Direct Buy</span>
                        <span className="text-sm text-green-600 font-medium">Included</span>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">Purchase the item as-is with standard measurements</p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input
                      type="radio"
                      name="serviceType"
                      value="VIDEO_CONSULTATION"
                      checked={selectedServiceType === 'VIDEO_CONSULTATION'}
                      onChange={(e) => setSelectedServiceType(e.target.value as any)}
                      className="mt-1 text-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Video Consultation</span>
                        <span className="text-sm font-semibold text-primary-600">+₹500</span>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">Personal session with expert tailor via video call for perfect measurements</p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input
                      type="radio"
                      name="serviceType"
                      value="HOME_VISIT"
                      checked={selectedServiceType === 'HOME_VISIT'}
                      onChange={(e) => setSelectedServiceType(e.target.value as any)}
                      className="mt-1 text-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Home Visit (NCR Only)</span>
                        <span className="text-sm font-semibold text-primary-600">+₹1,000</span>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">Professional tailor visits your location for precise measurements and consultation</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Customizations */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Customizations (Optional)</h3>
                <div className="space-y-3">
                  {product.customizations.map((customization) => (
                    <label key={customization.name} className="flex items-start space-x-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300">
                      <input
                        type="checkbox"
                        checked={selectedCustomizations.includes(customization.name)}
                        onChange={() => toggleCustomization(customization.name)}
                        className="mt-1 text-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">{customization.name}</span>
                          <span className="text-sm font-semibold text-primary-600">+₹{customization.price.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-1">{customization.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Price:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{calculateTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Primary Actions */}
                <div className="space-y-3">
                  <Button onClick={() => handleBuyNow()} size="lg" className="w-full bg-primary-600 hover:bg-primary-700">
                    Buy Now - ₹{calculateTotalPrice().toLocaleString()}
                  </Button>
                  <Button onClick={addToCart} size="lg" variant="ghost" className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50">
                    Add to Cart
                  </Button>
                </div>

                {/* Payment Options */}
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm text-foreground mb-3">Payment Options</h4>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="text-lg mb-1">💳</div>
                      <div className="text-xs text-neutral-600">Cards</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="text-lg mb-1">📱</div>
                      <div className="text-xs text-neutral-600">UPI</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="text-lg mb-1">🏦</div>
                      <div className="text-xs text-neutral-600">Net Banking</div>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-600 text-center">
                    💰 Pay 30% advance | 💳 EMI available | 🔒 Secure payments
                  </div>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/consultation/video">
                    <Button variant="ghost" size="sm" className="w-full">
                      📞 Consultation (₹300)
                    </Button>
                  </Link>
                  <Button onClick={() => addToWishlist()} variant="ghost" size="sm" className="w-full">
                    ❤️ Add to Wishlist
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-center space-x-4 text-sm text-neutral-600">
                  <Link href="/size-guide" className="hover:text-primary-600 underline">
                    📏 Size Guide
                  </Link>
                  <span>•</span>
                  <Link href="/fabric-samples" className="hover:text-primary-600 underline">
                    🧵 Request Samples
                  </Link>
                  <span>•</span>
                  <Link href="/help" className="hover:text-primary-600 underline">
                    ❓ Need Help?
                  </Link>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-semibold text-foreground mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-neutral-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-neutral-600">{key}</div>
                      <div className="font-medium text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Instructions */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-semibold text-foreground mb-4">Care Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600">
                  <div className="flex items-center space-x-2">
                    <span>🧴</span>
                    <span>Dry clean only for best results</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏠</span>
                    <span>Store on padded hangers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌡️</span>
                    <span>Steam to remove wrinkles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📦</span>
                    <span>Professional pressing included</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Product Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12"
          >
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="border-b border-neutral-200">
                <div className="flex">
                  <button className="px-6 py-4 font-medium text-primary-600 border-b-2 border-primary-600 bg-primary-50">
                    Description
                  </button>
                  <button className="px-6 py-4 font-medium text-neutral-600 hover:text-primary-600">
                    Fabric Details
                  </button>
                  <button className="px-6 py-4 font-medium text-neutral-600 hover:text-primary-600">
                    Sizing Guide
                  </button>
                  <button className="px-6 py-4 font-medium text-neutral-600 hover:text-primary-600">
                    Delivery Info
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="prose prose-neutral max-w-none">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-4">About This Product</h3>
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">What Makes It Special</h4>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>Handcrafted by master tailors with 20+ years experience</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>Premium fabrics sourced from renowned mills</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>Multiple fittings ensure perfect silhouette</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>Lifetime alteration service available</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Occasion Recommendations</h4>
                      <div className="space-y-2">
                        {product.category.includes('Wedding') ? (
                          <>
                            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs rounded-full mr-2 mb-2">Weddings</span>
                            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs rounded-full mr-2 mb-2">Festivals</span>
                            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs rounded-full mr-2 mb-2">Religious Ceremonies</span>
                          </>
                        ) : product.category.includes('Business') ? (
                          <>
                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full mr-2 mb-2">Business Meetings</span>
                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full mr-2 mb-2">Formal Events</span>
                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full mr-2 mb-2">Presentations</span>
                          </>
                        ) : (
                          <>
                            <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full mr-2 mb-2">Casual Outings</span>
                            <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full mr-2 mb-2">Social Events</span>
                            <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full mr-2 mb-2">Date Nights</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-neutral-50 p-8 rounded-xl"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
            
            {/* Review Summary */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">4.8</div>
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <div className="text-sm text-neutral-600">Based on 127 reviews</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{star}★</span>
                    <div className="flex-1 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: star === 5 ? '85%' : star === 4 ? '12%' : '3%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {[
                {
                  name: 'Rajesh Sharma',
                  rating: 5,
                  date: '2 weeks ago',
                  review: 'Exceptional quality and perfect fit. The consultation process was thorough and the final product exceeded my expectations. Highly recommend for anyone looking for bespoke tailoring.',
                  verified: true
                },
                {
                  name: 'Amit Kumar',
                  rating: 5,
                  date: '1 month ago',
                  review: 'Outstanding craftsmanship! The suit fits like a glove and the attention to detail is remarkable. The fabric quality is premium and the delivery was on time.',
                  verified: true
                },
                {
                  name: 'Priya Patel',
                  rating: 4,
                  date: '2 months ago',
                  review: 'Great experience overall. The home visit was convenient and the tailor was very professional. Minor adjustments were needed but they were handled quickly.',
                  verified: true
                }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground">{review.name}</h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="text-yellow-400">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-neutral-500">{review.date}</span>
                  </div>
                  <p className="text-neutral-700">{review.review}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: 'premium-business-blazer', name: 'Premium Business Blazer', price: 28000, category: 'Blazers' },
                { id: 'royal-wedding-sherwani', name: 'Royal Wedding Sherwani', price: 65000, category: 'Wedding Wear' },
                { id: 'casual-cotton-shirt', name: 'Casual Cotton Shirt', price: 8500, category: 'Casual Wear' }
              ].map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="group"
                >
                  <Link href={`/product/${relatedProduct.id}`}>
                    <div className="aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg mb-4 overflow-hidden group-hover:shadow-lg transition-shadow">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-neutral-500 font-serif text-lg">
                          {relatedProduct.name.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-600">{relatedProduct.category}</p>
                      <h3 className="font-medium text-foreground group-hover:text-primary-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="font-semibold text-primary-600">
                        ₹{relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}