import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;