'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Crafting Excellence Since 1950
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Three generations of master tailors dedicated to creating the perfect fit 
              for discerning gentlemen who value quality, craftsmanship, and timeless style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  Founded in 1950 by Master Tailor Rajesh Kumar, My Tailor began as a small 
                  workshop in the heart of Delhi&apos;s textile district. What started with a single 
                  vision - to create perfectly fitted garments that enhance a man&apos;s confidence - 
                  has grown into India&apos;s premier bespoke tailoring house.
                </p>
                <p>
                  Today, under the guidance of the third generation, we combine traditional 
                  hand-tailoring techniques with modern technology and contemporary design sensibilities. 
                  Our commitment to quality remains unchanged: every garment is a testament to 
                  our dedication to perfection.
                </p>
                <p>
                  With over 70 years of experience and more than 50,000 satisfied customers, 
                  we continue to set the standard for bespoke tailoring in India.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center"
            >
              <span className="text-primary-600 font-serif text-2xl">Heritage Workshop</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600">
              The principles that guide every stitch, every measurement, and every interaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Precision',
                description: 'Every measurement matters. We use advanced techniques and multiple fittings to ensure the perfect fit.'
              },
              {
                icon: '✨',
                title: 'Quality',
                description: 'From Italian fabrics to hand-stitched details, we never compromise on the quality of materials or craftsmanship.'
              },
              {
                icon: '🤝',
                title: 'Service',
                description: 'Your satisfaction is our priority. We offer personalized service, timely delivery, and lifetime alterations.'
              },
              {
                icon: '💎',
                title: 'Heritage',
                description: 'Three generations of expertise passed down through traditional apprenticeships and modern innovation.'
              },
              {
                icon: '🌟',
                title: 'Innovation',
                description: 'Blending time-honored techniques with cutting-edge technology like 3D visualization and virtual consultations.'
              },
              {
                icon: '🌱',
                title: 'Sustainability',
                description: 'Committed to ethical sourcing, sustainable practices, and creating garments that last a lifetime.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Master Craftsmen
            </h2>
            <p className="text-xl text-neutral-600">
              Meet the artisans who bring your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arjun Kumar',
                role: 'Master Tailor & CEO',
                experience: '25+ Years',
                specialty: 'Business Suits & Formal Wear'
              },
              {
                name: 'Priya Sharma',
                role: 'Head Designer',
                experience: '15+ Years',
                specialty: 'Contemporary & Ethnic Fusion'
              },
              {
                name: 'Rajesh Gupta',
                role: 'Senior Craftsman',
                experience: '30+ Years',
                specialty: 'Wedding & Traditional Wear'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 font-serif text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-neutral-600 mb-1">{member.role}</p>
                <p className="text-sm text-primary-600 mb-2">{member.experience}</p>
                <p className="text-sm text-neutral-500">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-neutral-600">
              Honored for excellence in craftsmanship and service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Best Bespoke Tailor - India Fashion Awards 2023',
              'Excellence in Craftsmanship - Delhi Chamber of Commerce',
              'Top Luxury Service Provider - Economic Times',
              'Heritage Business Award - Government of India'
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 text-center"
              >
                <div className="text-4xl mb-4">🏆</div>
                <p className="font-medium text-foreground">{award}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Experience the Difference
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of satisfied customers who trust us with their most important occasions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button variant="ghost" size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/collections">
                <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  View Collections
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}