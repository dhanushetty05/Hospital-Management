import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white sticky top-0 z-50 py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-teal-600 rounded-full flex items-center justify-center">
               <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-teal-600 leading-none">MediCare</h1>
              <p className="text-[10px] text-gray-500 leading-tight">Healthcare Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation - Pill Shaped Container */}
          <div className="hidden md:flex items-center bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)] rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                  isActive(link.path)
                    ? 'text-teal-700'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/doctor-login"
              className="flex items-center space-x-2 px-5 py-2 text-sm font-bold text-gray-700 border-2 border-gray-200 rounded-full hover:border-teal-600 hover:text-teal-600 transition-colors"
            >
              <User size={16} />
              <span>Doctor Admin</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 px-6 py-2.5 text-sm font-bold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t mt-0 py-4 px-4 flex flex-col space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t space-y-3">
              <Link
                to="/doctor-login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 py-3 text-gray-700 border border-gray-200 rounded-xl font-medium"
              >
                <User size={18} />
                <span>Doctor Admin</span>
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 py-3 bg-teal-500 text-white rounded-xl font-medium"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
