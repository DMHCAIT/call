import Link from 'next/link';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const footerSections = [
    {
      title: 'Collections',
      links: [
        { href: '/collections/suits', label: 'Suits & Blazers' },
        { href: '/collections/ethnic', label: 'Ethnic Wear' },
        { href: '/collections/wedding', label: 'Wedding Attire' },
        { href: '/collections/casual', label: 'Casual Wear' },
      ]
    },
    {
      title: 'Services',
      links: [
        { href: '/consultation/video', label: 'Video Consultation' },
        { href: '/consultation/home-visit', label: 'Home Visit (NCR)' },
        { href: '/measurement-guide', label: 'Measurement Guide' },
        { href: '/alterations', label: 'Alterations' },
      ]
    },
    {
      title: 'Support',
      links: [
        { href: '/help', label: 'Help Center' },
        { href: '/size-guide', label: 'Size Guide' },
        { href: '/shipping', label: 'Shipping Info' },
        { href: '/returns', label: 'Returns & Exchanges' },
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press' },
        { href: '/contact', label: 'Contact' },
      ]
    }
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-serif text-2xl font-bold text-white">
                My Tailor
              </span>
            </Link>
            <p className="text-neutral-200 mb-6 text-sm leading-relaxed">
              Experience bespoke tailoring redefined. Custom-fit clothing with online consultations 
              and personalized home visits across the NCR region.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-neutral-200">
                <PhoneIcon className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-200">
                <EnvelopeIcon className="h-4 w-4" />
                <span>hello@mytailor.com</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-neutral-200">
                <MapPinIcon className="h-4 w-4 mt-0.5" />
                <span>New Delhi, NCR<br />India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-200 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Service Hours */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <div className="flex items-center space-x-3 text-sm text-neutral-200">
            <ClockIcon className="h-4 w-4" />
            <span>
              <strong>Service Hours:</strong> Mon-Sat 10:00 AM - 7:00 PM, 
              Sun 11:00 AM - 6:00 PM
            </span>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-neutral-200 text-sm mb-4">
              Get the latest updates on new collections and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-neutral-800 text-white placeholder-neutral-300 border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-l-md"
              />
              <button className="px-6 py-2 bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors duration-200 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-neutral-300 text-sm">
              © 2025 My Tailor. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-neutral-300 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-300 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-neutral-300 hover:text-white text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;