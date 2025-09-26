import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Users, MessageCircle, Phone, Calendar, HelpCircle, FileText, User, LogOut, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      
      // Update scrolled state with smoother threshold
      setScrolled(currentScrollY > 50);
      
      // Only hide/show if there's significant scroll movement
      if (scrollDifference > 5) {
        if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setIsVisible(true);
        } else if (currentScrollY > 150 && currentScrollY > lastScrollY) {
          // Scrolling down and past threshold - hide navbar
          setIsVisible(false);
          setIsOpen(false); // Close mobile menu when hiding
        }
      }
      
      // Always show at top of page
      if (currentScrollY <= 100) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navVariants = {
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for smooth feel
      }
    },
    hidden: { 
      y: -20,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  return (
    <motion.nav
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 transform-gpu' 
          : 'bg-gradient-to-r from-primary-900/20 via-primary-800/10 to-accent-900/20 backdrop-blur-sm transform-gpu'
      }`}
      style={{
        transformOrigin: 'top center'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group relative z-10"
            onClick={closeMenu}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                scrolled 
                  ? 'bg-gradient-to-br from-primary-600 to-primary-800 shadow-lg shadow-primary-200' 
                  : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20'
              }`}>
                <span className="text-white font-bold text-xl">🕌</span>
              </div>
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                scrolled ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="absolute inset-0 rounded-xl bg-white/5 animate-pulse"></div>
              </div>
            </motion.div>
            
            <div className="hidden sm:block">
              <motion.h1 
                className={`text-xl lg:text-2xl font-playfair font-bold transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white drop-shadow-sm'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                Al-Masomeen
              </motion.h1>
              <p className={`text-xs lg:text-sm transition-all duration-300 ${
                scrolled ? 'text-gray-600' : 'text-white/80'
              }`}>
                Quran Academy
              </p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className={`flex items-center space-x-1 p-2 rounded-2xl transition-all duration-300 ${
              scrolled 
                ? 'bg-gray-50/50 backdrop-blur-sm border border-gray-200/50' 
                : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`}>
              {(isAuthenticated ? studentNavigationItems : navigationItems).map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        isActive
                          ? scrolled
                            ? 'text-primary-700 bg-white shadow-sm'
                            : 'text-white bg-white/20 backdrop-blur-sm'
                          : scrolled
                            ? 'text-gray-700 hover:text-primary-700 hover:bg-white/70'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      
                      {/* Active indicator with realistic movement */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDesktop"
                          className={`absolute inset-0 rounded-xl ${
                            scrolled 
                              ? 'bg-white shadow-lg border border-primary-100' 
                              : 'bg-white/20 backdrop-blur-sm border border-white/30'
                          }`}
                          style={{ zIndex: -1 }}
                          transition={{
                            type: "tween",
                            duration: 0.3,
                            ease: [0.4, 0.0, 0.2, 1]
                          }}
                        />
                      )}
                      
                      {/* Realistic hover effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100"
                        style={{ zIndex: -2 }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ 
                          scale: 1, 
                          opacity: 1,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        exit={{ 
                          scale: 0.8, 
                          opacity: 0,
                          transition: { duration: 0.15, ease: "easeIn" }
                        }}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <motion.div 
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                    scrolled 
                      ? 'bg-gray-50 border border-gray-200' 
                      : 'bg-white/10 backdrop-blur-sm border border-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl">{student?.avatar}</span>
                  <div>
                    <span className={`text-sm font-medium ${
                      scrolled ? 'text-gray-900' : 'text-white'
                    }`}>
                      {student?.name}
                    </span>
                    <div className={`flex items-center gap-1 ${
                      scrolled ? 'text-gray-500' : 'text-white/70'
                    }`}>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs">Online</span>
                    </div>
                  </div>
                </motion.div>
                
                <Button 
                  variant={scrolled ? "outline" : "secondary"}
                  size="sm"
                  icon={LogOut}
                  onClick={logout}
                  className="hover:scale-105 transition-transform"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/student/login">
                  <Button 
                    variant={scrolled ? "ghost" : "outline"}
                    size="md"
                    icon={User}
                    className="hover:scale-105 transition-transform border-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button 
                    variant="primary"
                    size="md"
                    icon={Calendar}
                    className="hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                  >
                    Free Trial
                  </Button>
                </Link>
              </div>
            )}

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100 bg-white/50 backdrop-blur-sm border border-gray-200' 
                  : 'text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm border border-white/20'
              }`}
            >
              <motion.div
                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl"
            style={{ transformOrigin: 'top' }}
          >
            <div className="px-4 sm:px-6 py-6">
              <div className="space-y-2">
                {(isAuthenticated ? studentNavigationItems : navigationItems).map((item, index) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={itemVariants}
                    >
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative group ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 shadow-sm border-l-4 border-primary-500'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50/30 hover:text-primary-600'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-primary-100 text-primary-600' 
                            : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                        
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute right-4 w-2 h-2 bg-primary-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Enhanced Mobile CTA Section */}
                <motion.div 
                  className="pt-6 mt-6 border-t border-gray-200"
                  custom={navigationItems.length}
                  variants={itemVariants}
                >
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl">
                        <div className="relative">
                          <span className="text-3xl">{student?.avatar}</span>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-gray-900">{student?.name}</span>
                          <p className="text-sm text-gray-600">Student Account</p>
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
                          variant="ghost" 
                          size="lg" 
                          className="w-full hover:scale-[1.02] transition-transform border-2"
                          icon={User}
                        >
                          Student Login
                        </Button>
                      </Link>
                      <Link to="/book-demo" onClick={closeMenu}>
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full hover:scale-[1.02] transition-transform shadow-lg"
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