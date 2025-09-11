import React from 'react';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import CourseGrid from '../components/sections/CourseGrid';
import CallToAction from '../components/sections/CallToAction';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CourseGrid />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;