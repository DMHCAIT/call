'use client';

import Link from 'next/link';
import { 
  ScissorsIcon, 
  VideoCameraIcon, 
  HomeIcon,
  SparklesIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const featuredCollections = [
    {
      name: 'Suits & Blazers',
      description: 'Elegant formal wear for every occasion',
      image: '/placeholder-suit.jpg',
      href: '/collections/suits',
    },
    {
      name: 'Ethnic Wear',
      description: 'Traditional attire with modern craftsmanship',
      image: '/placeholder-ethnic.jpg',
      href: '/collections/ethnic',
    },
    {
      name: 'Wedding Collection',
      description: 'Special occasion wear for your big day',
      image: '/placeholder-wedding.jpg',
      href: '/collections/wedding',
    },
    {
      name: 'Casual Wear',
      description: 'Comfortable yet stylish everyday clothing',
      image: '/placeholder-casual.jpg',
      href: '/collections/casual',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      content: 'Exceptional craftsmanship and attention to detail. The home visit service made the entire process so convenient.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      location: 'Gurgaon', 
      content: 'The video consultation was amazing! Got the perfect fit without leaving my home.',
      rating: 5,
    },
    {
      name: 'Amit Singh',
      location: 'Noida',
      content: 'Best tailoring experience I have ever had. The quality is unmatched.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-500">
                My Tailor
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/collections" className="text-gray-700 hover:text-primary-500">Collections</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-500">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-500">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 min-h-screen flex items-center py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Bespoke Tailoring
              <span className="block text-primary-500 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Redefined
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience premium custom-fit clothing with our innovative online video consultations and personalized home visits across the entire NCR region.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center px-10 py-5 bg-primary-500 text-white text-lg font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <VideoCameraIcon className="h-6 w-6 mr-3" />
              Book Consultation
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center px-10 py-5 border-2 border-primary-500 text-primary-500 text-lg font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ScissorsIcon className="h-6 w-6 mr-3" />
              Browse Collections
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-primary-300 rounded-full opacity-10 animate-bounce delay-500"></div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-gray-600">
              Discover our curated selection of premium clothing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCollections.map((collection, index) => (
              <Link
                key={index}
                href={collection.href}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-gray-400">Image Placeholder</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Choose your preferred consultation method and get perfectly tailored clothing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ScissorsIcon className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Buy</h3>
              <p className="text-gray-600">
                Purchase ready-to-wear items with standard sizing options
              </p>
              <p className="text-primary-500 font-medium mt-2">Base Price</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <VideoCameraIcon className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Consultation</h3>
              <p className="text-gray-600">
                Virtual fitting sessions with our expert tailors from your home
              </p>
              <p className="text-primary-500 font-medium mt-2">+₹500</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Home Visit</h3>
              <p className="text-gray-600">
                Personal tailor visits for precise measurements and fittings
              </p>
              <p className="text-primary-500 font-medium mt-2">+₹1000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SparklesIcon key={i} className="h-5 w-5 text-accent-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, style tips, and the latest in bespoke fashion
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-primary-400">My Tailor</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Premier bespoke tailoring services offering custom-fit clothing with innovative online consultations 
                and personalized home visits across the NCR region. Experience the perfect blend of traditional 
                craftsmanship and modern convenience.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <HomeIcon className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">
                      <strong>Flagship Store:</strong><br />
                      123, Fashion Street, Connaught Place<br />
                      New Delhi - 110001, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">info@mytailor.com</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/collections" className="text-gray-300 hover:text-primary-400 transition-colors">Collections</Link></li>
                <li><Link href="/consultation" className="text-gray-300 hover:text-primary-400 transition-colors">Book Consultation</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</Link></li>
                <li><Link href="/size-guide" className="text-gray-300 hover:text-primary-400 transition-colors">Size Guide</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact</Link></li>
                <li><Link href="/account" className="text-gray-300 hover:text-primary-400 transition-colors">My Account</Link></li>
              </ul>
            </div>
            
            {/* Services & Policies */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 mb-6">
                <li><span className="text-gray-300">Video Consultation</span></li>
                <li><span className="text-gray-300">Home Visits</span></li>
                <li><span className="text-gray-300">Custom Tailoring</span></li>
                <li><span className="text-gray-300">Alterations</span></li>
                <li><span className="text-gray-300">Express Delivery</span></li>
              </ul>
              
              <h4 className="text-lg font-semibold mb-4 text-white">Policies</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-gray-300 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-primary-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/return-policy" className="text-gray-300 hover:text-primary-400 transition-colors">Return Policy</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Social Media & Business Hours */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              
              {/* Business Hours */}
              <div className="mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-2 text-white">Business Hours</h4>
                <div className="text-gray-300 text-sm">
                  <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p>Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-6">
                  <a href="https://facebook.com/mytailor" className="text-gray-300 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/mytailor" className="text-gray-300 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.329-1.297L6.826 14.1c.568.568 1.34.915 2.185.915 1.693 0 3.066-1.373 3.066-3.066s-1.373-3.066-3.066-3.066S5.945 10.256 5.945 11.949c0 .844.347 1.617.915 2.185l-1.591 1.706C4.472 14.937 3.982 13.786 3.982 12.489c0-2.734 2.215-4.949 4.949-4.949s4.949 2.215 4.949 4.949-2.215 4.949-4.949 4.949z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/mytailor" className="text-gray-300 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/mytailor" className="text-gray-300 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com/mytailor" className="text-gray-300 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Service Areas */}
              <div className="text-right">
                <h4 className="text-lg font-semibold mb-2 text-white">Service Areas</h4>
                <div className="text-gray-300 text-sm">
                  <p>Delhi • Gurgaon • Noida</p>
                  <p>Ghaziabad • Faridabad</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400">
              © 2025 My Tailor. All rights reserved. | Designed with ❤️ for bespoke fashion lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}