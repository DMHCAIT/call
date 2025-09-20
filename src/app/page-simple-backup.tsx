'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Layout from '@/components/layout/Layout';
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
      name: 'Wedding Attire',
      description: 'Make your special day unforgettable',
      image: '/placeholder-wedding.jpg',
      href: '/collections/wedding',
    },
    {
      name: 'Casual Wear',
      description: 'Comfortable style for everyday elegance',
      image: '/placeholder-casual.jpg',
      href: '/collections/casual',
    },
  ];

  const howItWorks = [
    {
      icon: ScissorsIcon,
      title: 'Select Your Design',
      description: 'Browse our curated collections and choose your perfect style',
    },
    {
      icon: VideoCameraIcon,
      title: 'Provide Your Fit',
      description: 'Get measured via our guide, video call, or home visit',
    },
    {
      icon: TruckIcon,
      title: 'Receive Perfection',
      description: 'Get your custom-tailored garment delivered to your door',
    },
  ];

  const features = [
    {
      icon: VideoCameraIcon,
      title: 'Video Consultation',
      description: 'Personal styling session with expert tailors',
    },
    {
      icon: HomeIcon,
      title: 'Home Visit (NCR)',
      description: 'Professional measurement service at your doorstep',
    },
    {
      icon: SparklesIcon,
      title: 'Premium Fabrics',
      description: 'Finest materials sourced from around the world',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Perfect Fit Guarantee',
      description: 'Free alterations until you\'re completely satisfied',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Bespoke Tailoring,{' '}
              <span className="text-primary-500">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Experience custom-fit clothing with online video consultations and 
              personalized home visits across the NCR region
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/collections">
                <Button size="xl">
                  Explore Collections
                </Button>
              </Link>
              <Link href="/consultation">
                <Button variant="secondary" size="xl">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Collections
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover our carefully curated selection of premium garments, 
              each designed to reflect your unique style and personality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={collection.href}>
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-neutral-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-600 text-sm font-medium">
                        {collection.name} Image
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">Shop Now</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-neutral-600">
                    {collection.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Three simple steps to your perfect custom-tailored garment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose My Tailor
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Experience the difference of truly personalized service and craftsmanship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 text-accent-600 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Real experiences from real customers who trust My Tailor for their wardrobe needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Business Executive',
                rating: 5,
                comment: 'The home visit service was exceptional. The tailor was professional and the final suit fits perfectly.',
                location: 'Delhi NCR'
              },
              {
                name: 'Priya Sharma',
                role: 'Wedding Planner',
                rating: 5,
                comment: 'Amazing ethnic wear collection! The video consultation helped me choose the perfect lehenga for my sister\'s wedding.',
                location: 'Mumbai'
              },
              {
                name: 'Amit Patel',
                role: 'Software Engineer',
                rating: 5,
                comment: 'Fast delivery and great quality. The 3D visualization helped me understand how the blazer would look.',
                location: 'Bangalore'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="border-t border-neutral-100 pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">{testimonial.role}</div>
                  <div className="text-xs text-neutral-400 mt-1">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Stay Updated with My Tailor
            </h2>
            <p className="text-lg text-neutral-600">
              Get the latest fashion trends, styling tips, and exclusive offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-neutral-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
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
            className="space-y-8"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
              Ready for Your Perfect Fit?
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have experienced 
              the My Tailor difference. Book your consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/consultation/video">
                <Button variant="accent" size="xl">
                  Video Consultation
                </Button>
              </Link>
              <Link href="/consultation/home-visit">
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="bg-white text-primary-500 hover:bg-primary-50 border-white"
                >
                  Home Visit (NCR)
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
