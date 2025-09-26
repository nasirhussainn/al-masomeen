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
    { name: 'Contact', href: '/contact', icon: Phone },
    { name: 'Instructor', href: '/instructor-contact', icon: User }
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
          : 'bg-black/20 backdrop-blur-sm'
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
          <div className="hidden lg:flex items-center space-x-6">
            {(isAuthenticated ? studentNavigationItems : navigationItems).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:scale-105 ${
                    scrolled
                      ? isActive
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-charcoal hover:text-primary-800 hover:bg-primary-50'
                      : isActive
                        ? 'text-secondary-400 bg-white/20 backdrop-blur-sm'
                        : 'text-white/90 hover:text-secondary-400 hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute -bottom-1 left-3 right-3 h-0.5 rounded-full ${
                        scrolled ? 'bg-primary-800' : 'bg-secondary-400'
                      }`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm ${
                  scrolled ? 'text-charcoal bg-gray-50' : 'text-white bg-white/10'
                }`}>
                  <span className="text-lg">{student?.avatar}</span>
                  <span className="text-sm font-medium">{student?.name}</span>
                </div>
                <Button 
                  variant={scrolled ? "outline" : "secondary"}
                  size="sm"
                  icon={LogOut}
                  onClick={logout}
                  className="backdrop-blur-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/student/login">
                  <Button 
                    variant={scrolled ? "outline" : "secondary"}
                    size="sm"
                    icon={User}
                    className="backdrop-blur-sm"
                  >
                    Student Login
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button 
                    variant={scrolled ? "primary" : "secondary"}
                    size="sm"
                    icon={Calendar}
                    className="backdrop-blur-sm hover:scale-105 transition-transform"
                  >
                    Book Free Trial
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-110 ${
                scrolled 
                  ? 'text-charcoal hover:bg-primary-50 border border-gray-200' 
                  : 'text-white hover:bg-white/20 border border-white/30'
              }`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-primary-100 shadow-xl"
          >
            <div className="container-padding py-6">
              <div className="space-y-2">
                {(isAuthenticated ? studentNavigationItems : navigationItems).map((item, index) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 font-medium shadow-sm'
                            : 'text-charcoal hover:bg-primary-50 hover:text-primary-700'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isActive ? 'bg-primary-200 text-primary-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeMobileTab"
                            className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                <motion.div 
                  className="pt-4 border-t border-primary-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-primary-50 rounded-xl">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <span className="text-lg">{student?.avatar}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{student?.name}</p>
                          <p className="text-xs text-gray-500">Student Account</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full hover:scale-[1.02] transition-transform"
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
                          className="w-full hover:scale-[1.02] transition-transform"
                          icon={User}
                        >
                          Student Login
                        </Button>
                      </Link>
                      <Link to="/book-demo" onClick={closeMenu}>
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full hover:scale-[1.02] transition-transform bg-gradient-to-r from-primary-600 to-primary-700"
                          icon={Calendar}
                        >
                          Book Free Trial Class
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;