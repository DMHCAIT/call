'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

export default function ConsultationPage() {
  const consultationOptions = [
    {
      type: 'video',
      title: 'Video Consultation',
      price: 300,
      duration: 60,
      description: 'Personal styling session with our expert tailors via video call',
      features: [
        'One-on-one styling consultation',
        'Fabric and design recommendations', 
        'Measurement guidance',
        'Style preference discussion',
        'Follow-up support'
      ],
      href: '/consultation/video'
    },
    {
      type: 'home-visit',
      title: 'Home Visit (NCR)',
      price: 500,
      duration: 90,
      description: 'Professional tailor visits your home for in-person consultation',
      features: [
        'In-person measurement service',
        'Fabric samples and catalogs',
        'Style consultation at home',
        'Detailed fitting analysis',
        'Premium service experience'
      ],
      href: '/consultation/home-visit'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Book a Consultation
            </h1>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto mb-8">
              Get personalized styling advice from our expert tailors. Choose between 
              a convenient video consultation or an in-person home visit in the NCR region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {consultationOptions.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-neutral-50 to-white p-8 rounded-xl border border-neutral-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    option.type === 'video' 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-accent-100 text-accent-600'
                  }`}>
                    <span className="text-3xl">
                      {option.type === 'video' ? '💻' : '🏠'}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                    {option.title}
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    {option.description}
                  </p>
                  <div className="flex items-center justify-center gap-6 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <span className="text-lg">⏱️</span>
                      {option.duration} minutes
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-lg">
                      {formatPrice(option.price)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-lg text-foreground">What&apos;s Included:</h3>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={option.href}>
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant={option.type === 'video' ? 'primary' : 'accent'}
                  >
                    Book {option.title}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Simple steps to get your perfect custom-tailored garment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Book Consultation',
                description: 'Choose your preferred consultation type and schedule'
              },
              {
                step: 2,
                title: 'Style Discussion',
                description: 'Discuss your preferences, occasion, and style goals'
              },
              {
                step: 3,
                title: 'Measurements',
                description: 'Get professionally measured for the perfect fit'
              },
              {
                step: 4,
                title: 'Place Order',
                description: 'Finalize your order and await your custom creation'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How long does a consultation take?',
                answer: 'Video consultations typically take 60 minutes, while home visits are scheduled for 90 minutes to allow for comprehensive measurements and fabric selection.'
              },
              {
                question: 'What areas do you cover for home visits?',
                answer: 'We provide home visit services across the NCR region including Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad.'
              },
              {
                question: 'Can I reschedule my consultation?',
                answer: 'Yes, you can reschedule your consultation up to 24 hours before the scheduled time without any additional charges.'
              },
              {
                question: 'Do I need to pay the consultation fee separately?',
                answer: 'The consultation fee is adjusted against your final order value if you proceed with a purchase within 30 days.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-50 p-6 rounded-lg"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}