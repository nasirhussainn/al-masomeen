import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, Award, Heart, Globe } from 'lucide-react';
import Card from '../ui/Card';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'Complete Quranic education covering reading, tajweed, memorization, and understanding with structured lesson plans.',
      color: 'text-primary-600'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from qualified Islamic scholars and certified Quran teachers with years of experience in traditional education.',
      color: 'text-secondary-600'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose your preferred learning times with morning, evening, and weekend classes available to fit your lifestyle.',
      color: 'text-accent-600'
    },
    {
      icon: Award,
      title: 'Certification Programs',
      description: 'Earn recognized certificates upon completion of courses, validating your Quranic knowledge and Islamic studies.',
      color: 'text-primary-600'
    },
    {
      icon: Heart,
      title: 'Spiritual Guidance',
      description: 'Beyond academics, receive spiritual mentorship and character development rooted in Islamic values and ethics.',
      color: 'text-secondary-600'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Join students worldwide in our inclusive learning environment that celebrates diversity within Islamic unity.',
      color: 'text-accent-600'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-cream to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-bg opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full">
            <span className="text-primary-800 font-medium">✨ Why Choose Al-Masomeen</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">
            Excellence in{' '}
            <span className="text-gradient">Islamic Education</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the unique advantages of learning with Al-Masomeen Quran Academy, 
            where traditional Islamic scholarship meets innovative teaching methods.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center group hover:shadow-2xl transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color.split('-')[1]}-100 to-${feature.color.split('-')[1]}-50 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-playfair font-semibold text-charcoal mb-4 group-hover:text-primary-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 bg-gradient-to-r from-primary-800 to-accent-700 rounded-2xl text-white">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Ready to Begin Your Quranic Journey?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl">
              Join thousands of students who have transformed their lives through authentic Islamic education.
            </p>
            <button className="btn-secondary">
              Start Learning Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;