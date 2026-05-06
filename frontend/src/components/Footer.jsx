import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Appointments', path: '/appointments' },
  ];

  const services = [
    'Blood Pressure Check',
    'Blood Sugar Test',
    'Full Blood Count',
    'X-Ray Scan',
    'Blood Sugar Test',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-br from-teal-50 to-white border-t border-teal-100">
      {/* Main Footer */}
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11v14z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-teal-700">
                  Medi<span className="text-teal-600">Care</span>
                </h3>
                <p className="text-xs text-teal-600">Healthcare Solutions</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your trusted partner in healthcare innovation. We're committed to providing exceptional medical care with cutting-edge technology and compassionate service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-teal-800 font-bold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-teal-800 font-bold mb-4 text-sm">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    <span>{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="text-teal-800 font-bold mb-4 text-sm">Stay Connected</h4>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe for health tips, medical updates, and wellness insights delivered to your inbox.
            </p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border-2 border-teal-200 rounded-l-full focus:outline-none focus:border-teal-500 text-sm"
              />
              <button className="bg-teal-500 text-white px-4 py-2 rounded-r-full hover:bg-teal-600 transition-colors font-semibold text-sm">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 bg-teal-100 hover:bg-teal-500 hover:text-white text-teal-600 rounded-full flex items-center justify-center transition-all"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal-100 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} MediCare Healthcare. Designed by <span className="text-teal-600 font-semibold">Hexagon Digital Services</span>
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
