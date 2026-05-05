import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-teal-50 to-emerald-50 text-gray-800 border-t border-teal-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 border-2 border-teal-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-teal-600">MediCare</h2>
                <p className="text-[10px] text-gray-500">Healthcare Solutions</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Your trusted partner in healthcare innovation. We're committed to providing exceptional medical care with cutting-edge technology and compassionate service.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-teal-600" />
                <span>+91 8299431275</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-teal-600" />
                <span>hexagonservices@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="text-teal-600 mt-0.5" />
                <span>Lucknow, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-teal-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Doctors', path: '/doctors' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
                { name: 'Appointments', path: '/appointments' }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-teal-600 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-teal-800 mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                'Blood Pressure Check',
                'Blood Sugar Test',
                'Full Blood Count',
                'X-Ray Scan',
                'Blood Sugar Test'
              ].map((service, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-teal-800 mb-4">Stay Connected</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe for health tips, medical updates, and wellness insights delivered to your inbox.
            </p>
            
            <div className="flex space-x-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white border border-teal-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors">
                <Send size={16} />
              </button>
            </div>

            <div className="flex space-x-3">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/people/Hexagon-Digital-Services/61567156598660/', color: 'hover:bg-blue-600' },
                { Icon: Twitter, href: 'https://www.linkedin.com/company/hexagondigtial-services/', color: 'hover:bg-sky-500' },
                { Icon: Instagram, href: 'http://instagram.com/hexagondigitalservices?igsh=MWp2NG1oNTlibWVnZA%3D%3D', color: 'hover:bg-pink-600' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/hexagondigtial-services/', color: 'hover:bg-blue-700' },
                { Icon: Youtube, href: 'https://youtube.com/@hexagondigitalservices?si=lxEFYNCP42t6AoDJ', color: 'hover:bg-red-600' }
              ].map(({ Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 bg-white border border-teal-200 rounded-full flex items-center justify-center ${color} hover:text-white transition-all shadow-sm`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-teal-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2026 MediCare Healthcare.</p>
          <p className="mt-2 md:mt-0">
            Designed by <a href="https://www.linkedin.com/company/hexagondigtial-services/" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:underline">Hexagon Digital Services</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
