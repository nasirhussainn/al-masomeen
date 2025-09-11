import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Card from '../ui/Card';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Fatima Al-Zahra',
      role: 'Student',
      location: 'New York, USA',
      rating: 5,
      content: 'Al-Masomeen Academy has transformed my understanding of the Quran. The instructors are knowledgeable and patient, making complex concepts easy to understand. The spiritual growth I\'ve experienced is immeasurable.',
      image: '👩🏻‍🦳',
      course: 'Quran Memorization'
    },
    {
      id: 2,
      name: 'Muhammad Ali',
      role: 'Parent',
      location: 'London, UK',
      rating: 5,
      content: 'My children have been studying here for two years. The improvement in their Arabic pronunciation and understanding of Islamic values has been remarkable. Highly recommend this academy to all Muslim families.',
      image: '🧔🏻‍♂️',
      course: 'Family Program'
    },
    {
      id: 3,
      name: 'Aisha Khan',
      role: 'Student',
      location: 'Toronto, Canada',
      rating: 5,
      content: 'The flexible scheduling and personalized attention make learning so convenient. I\'ve completed my Tajweed course and now I\'m working on memorization. The support from instructors is exceptional.',
      image: '👩🏽',
      course: 'Tajweed & Memorization'
    },
    {
      id: 4,
      name: 'Omar Hassan',
      role: 'Student',
      location: 'Sydney, Australia',
      rating: 5,
      content: 'As a new Muslim, I was looking for authentic Islamic education. Al-Masomeen provided exactly what I needed - patient teachers, comprehensive curriculum, and a supportive learning environment.',
      image: '🧔🏽‍♂️',
      course: 'Islamic Studies'
    },
    {
      id: 5,
      name: 'Maryam Ibrahim',
      role: 'Student',
      location: 'Dubai, UAE',
      rating: 5,
      content: 'The online platform is user-friendly and the quality of education is outstanding. I\'ve improved my Quran recitation significantly and gained deeper spiritual insights through their courses.',
      image: '👩🏻‍🦱',
      course: 'Online Quran Reading'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-secondary-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary-200/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-secondary-100 rounded-full">
            <span className="text-secondary-800 font-medium">💬 Student Voices</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">
            What Our{' '}
            <span className="text-gradient">Students Say</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our community of learners who have experienced transformation 
            through authentic Islamic education at Al-Masomeen Academy.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center p-8 md:p-12 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 opacity-20">
                  <Quote className="h-12 w-12 text-primary-600" />
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-secondary-500 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-4xl">
                    {testimonials[currentIndex].image}
                  </div>
                  <div className="text-left">
                    <h4 className="font-playfair font-semibold text-lg text-charcoal">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                    </p>
                    <p className="text-sm text-primary-600 font-medium">
                      {testimonials[currentIndex].course}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-primary-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-primary-600" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">98%</div>
            <div className="text-gray-600">Student Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent-600 mb-2">15+</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;