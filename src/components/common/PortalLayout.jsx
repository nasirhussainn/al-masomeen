import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X,
  Home,
  Users,
  BookOpen,
  Settings,
  User,
  Calendar,
  BarChart3,
  GraduationCap,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Footer from './Footer';

const PortalLayout = ({ 
  children, 
  portalType, 
  user, 
  onLogout,
  menuItems = [],
  portalTitle,
  portalIcon 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getPortalColor = (portalType) => {
    switch (portalType) {
      case 'admin':
        return 'from-primary-600 to-secondary-600';
      case 'instructor':
        return 'from-primary-600 to-accent-600';
      case 'student':
        return 'from-primary-600 to-accent-600';
      default:
        return 'from-primary-600 to-secondary-600';
    }
  };

  const defaultMenuItems = {
    admin: [
      { path: '/admin/dashboard', name: 'Dashboard', icon: Home },
      { path: '/admin/students', name: 'Students', icon: Users },
      { path: '/admin/instructors', name: 'Instructors', icon: GraduationCap },
      { path: '/admin/registrations', name: 'Registrations', icon: User },
      { path: '/admin/courses', name: 'Courses', icon: BookOpen },
      { path: '/admin/reports', name: 'Reports', icon: BarChart3 },
      { path: '/admin/settings', name: 'Settings', icon: Settings }
    ],
    instructor: [
      { path: '/instructor/dashboard', name: 'Dashboard', icon: Home },
      { path: '/instructor/students', name: 'My Students', icon: Users },
      { path: '/instructor/courses', name: 'My Courses', icon: BookOpen },
      { path: '/instructor/schedule', name: 'Schedule', icon: Calendar },
      { path: '/instructor/messages', name: 'Messages', icon: MessageSquare },
      { path: '/instructor/profile', name: 'Profile', icon: User }
    ],
    student: [
      { path: '/student/dashboard', name: 'Dashboard', icon: Home },
      { path: '/student/courses', name: 'My Courses', icon: BookOpen },
      { path: '/student/schedule', name: 'Schedule', icon: Calendar },
      { path: '/student/progress', name: 'Progress', icon: BarChart3 },
      { path: '/student/profile', name: 'Profile', icon: User }
    ]
  };

  const currentMenuItems = menuItems.length > 0 ? menuItems : defaultMenuItems[portalType] || [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? '256px' : '80px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col bg-white shadow-lg border-r border-gray-200 relative z-30"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to={`/${portalType}/dashboard`} className="flex items-center">
            <div className={`w-8 h-8 bg-gradient-to-r ${getPortalColor(portalType)} rounded-lg flex items-center justify-center`}>
              <span className="text-white text-lg">{portalIcon || '🏛️'}</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-lg font-bold text-gray-900 truncate"
                >
                  {portalTitle}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {currentMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary-600' : ''}`} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm">{user?.avatar || '👤'}</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0"
                >
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user?.email || ''}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={onLogout}
            className={`flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <Link to={`/${portalType}/dashboard`} className="flex items-center">
                <div className={`w-8 h-8 bg-gradient-to-r ${getPortalColor(portalType)} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-lg">{portalIcon || '🏛️'}</span>
                </div>
                <span className="ml-3 text-lg font-bold text-gray-900">
                  {portalTitle}
                </span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {currentMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : ''}`} />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile User Profile */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">{user?.avatar || '👤'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user?.email || ''}
                  </div>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header for Mobile */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 h-16 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link to={`/${portalType}/dashboard`} className="flex items-center">
            <div className={`w-8 h-8 bg-gradient-to-r ${getPortalColor(portalType)} rounded-lg flex items-center justify-center mr-3`}>
              <span className="text-white text-lg">{portalIcon || '🏛️'}</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{portalTitle}</span>
          </Link>

          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default PortalLayout;