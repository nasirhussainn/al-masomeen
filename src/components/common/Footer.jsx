import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Star, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Book Demo', path: '/book-demo' },
    { name: 'Contact', path: '/contact' },
  ];

  const courses = [
    { name: 'Quran Reading', path: '/courses' },
    { name: 'Tajweed', path: '/courses' },
    { name: 'Quran Memorization', path: '/courses' },
    { name: 'Islamic Studies', path: '/courses' },
    { name: 'Arabic Language', path: '/courses' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white geometric-pattern">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Moon className="h-10 w-10 text-white" />
                <Star className="h-5 w-5 text-secondary-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-white">
                  Al-Masomeen
                </h2>
                <p className="text-sm text-gray-300">Quran Academy</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dedicated to providing authentic Islamic education and Quranic studies with traditional values and modern teaching methods.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  className="p-2 rounded-full bg-white/10 hover:bg-secondary-600 transition-colors duration-300 group"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5 text-white group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-secondary-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6 text-white">
              Our Courses
            </h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    to={course.path}
                    className="text-gray-300 hover:text-secondary-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6 text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Islamic Center Street<br />
                  City, State 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary-400 flex-shrink-0" />
                <span className="text-gray-300">info@almasomeen.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Class Times</h4>
              <p className="text-gray-300 text-sm">
                Monday - Friday: 5:00 PM - 8:00 PM<br />
                Saturday - Sunday: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © {currentYear} Al-Masomeen Quran Academy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-300 hover:text-secondary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-secondary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-secondary-400 text-sm transition-colors">
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