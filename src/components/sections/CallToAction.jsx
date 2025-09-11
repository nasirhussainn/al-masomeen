import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users } from 'lucide-react';
import Button from '../ui/Button';

const CallToAction = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-secondary-400/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>

      <div className="relative z-10 max-w-4xl mx-auto container-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/20">
            <BookOpen className="h-10 w-10 text-secondary-400" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-6">
            Begin Your Sacred Journey Today
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students worldwide in learning the Holy Quran with proper Tajweed, 
            Islamic studies, and spiritual guidance from our certified instructors.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="secondary"
              className="group"
            >
              Book Free Trial Class
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-800"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Our Community
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-secondary-400 mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-secondary-400 mb-2">100%</div>
              <div className="text-gray-300">Satisfaction Guarantee</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-secondary-400 mb-2">Free</div>
              <div className="text-gray-300">Trial Class</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;