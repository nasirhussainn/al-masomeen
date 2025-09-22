import React from 'react';
import { Link } from 'react-router-dom';

const PortalFooter = ({ portalType }) => {
  const currentYear = new Date().getFullYear();

  const getPortalTitle = (type) => {
    switch (type) {
      case 'admin':
        return 'Admin Portal';
      case 'instructor':
        return 'Instructor Portal';
      case 'student':
        return 'Student Portal';
      default:
        return 'Portal';
    }
  };

  const getPortalLinks = (type) => {
    const commonLinks = [
      { name: 'Support', path: '/support' },
      { name: 'Help Center', path: '/help' },
    ];

    switch (type) {
      case 'admin':
        return [
          { name: 'System Settings', path: '/admin/settings' },
          { name: 'User Management', path: '/admin/users' },
          ...commonLinks
        ];
      case 'instructor':
        return [
          { name: 'My Courses', path: '/instructor/courses' },
          { name: 'Resources', path: '/instructor/resources' },
          ...commonLinks
        ];
      case 'student':
        return [
          { name: 'My Courses', path: '/student/courses' },
          { name: 'Course Catalog', path: '/courses' },
          ...commonLinks
        ];
      default:
        return commonLinks;
    }
  };

  const portalLinks = getPortalLinks(portalType);
  const portalTitle = getPortalTitle(portalType);

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Portal Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {portalTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Al-Masomeen Quran Academy - Excellence in Islamic Education
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {portalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Need Help?
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Email: support@almasomeen.com
                </p>
                <p className="text-sm text-gray-600">
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">
                © {currentYear} Al-Masomeen Quran Academy. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PortalFooter;