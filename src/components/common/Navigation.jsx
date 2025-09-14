import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Users, MessageCircle, Phone, Calendar, HelpCircle, FileText, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, student, logout } = useAuth();

  const navigationItems = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Testimonials', href: '/testimonials', icon: MessageCircle },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Phone }
  ];

  const studentNavigationItems = [
    { name: 'Dashboard', href: '/student/dashboard', icon: BookOpen },
    { name: 'My Courses', href: '/student/courses', icon: BookOpen },
    { name: 'Profile', href: '/student/profile', icon: User },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={closeMenu}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-800 to-accent-800 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">🕌</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-playfair font-bold ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}>
                Al-Masomeen
              </h1>
              <p className={`text-xs ${
                scrolled ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Quran Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {(isAuthenticated ? studentNavigationItems : navigationItems).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative font-medium transition-colors duration-300 ${
                    scrolled
                      ? isActive
                        ? 'text-primary-800'
                        : 'text-charcoal hover:text-primary-800'
                      : isActive
                        ? 'text-secondary-400'
                        : 'text-white hover:text-secondary-400'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        scrolled ? 'bg-primary-800' : 'bg-secondary-400'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <div className={`flex items-center gap-2 ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}>
                  <span className="text-lg">{student?.avatar}</span>
                  <span className="text-sm font-medium">{student?.name}</span>
                </div>
                <Button 
                  variant={scrolled ? "outline" : "secondary"}
                  size="sm"
                  icon={LogOut}
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/student/login">
                  <Button 
                    variant={scrolled ? "outline" : "secondary"}
                    size="md"
                    icon={User}
                  >
                    Student Login
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button 
                    variant={scrolled ? "primary" : "secondary"}
                    size="md"
                    icon={Calendar}
                  >
                    Book Free Trial
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled 
                  ? 'text-charcoal hover:bg-primary-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-primary-100 shadow-xl"
          >
            <div className="container-padding py-6">
              <div className="space-y-4">
                {(isAuthenticated ? studentNavigationItems : navigationItems).map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-800 font-medium'
                          : 'text-charcoal hover:bg-primary-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-primary-200">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-3 py-2">
                        <span className="text-lg">{student?.avatar}</span>
                        <span className="text-sm font-medium text-charcoal">{student?.name}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                        icon={LogOut}
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/student/login" onClick={closeMenu}>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full"
                          icon={User}
                        >
                          Student Login
                        </Button>
                      </Link>
                      <Link to="/book-demo" onClick={closeMenu}>
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full"
                          icon={Calendar}
                        >
                          Book Free Trial Class
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;