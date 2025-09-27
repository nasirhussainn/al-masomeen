import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Heart, Globe, Clock } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Authentic Islamic Learning",
      description: "We provide traditional Islamic education rooted in the Quran and Sunnah, taught by qualified scholars."
    },
    {
      icon: Users,
      title: "Personalized Attention",
      description: "Small class sizes ensure each student receives individual attention and customized learning plans."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with students from around the world in our diverse and inclusive learning environment."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with flexible class times that accommodate your busy lifestyle."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-primary-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                <BookOpen className="h-8 w-8 text-secondary-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
                About <span className="text-gradient bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">Al-Masomeen</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Al-Masomeen Quran Academy is dedicated to providing authentic Islamic education through modern technology, 
                connecting students worldwide with qualified instructors in the comfort of their homes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🕌</div>
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                    وَقُل رَّبِّ زِدْنِي عِلْمًا
                  </h3>
                  <p className="text-gray-300 text-sm max-w-sm">
                    "And say: My Lord, increase me in knowledge."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-primary-50">
        <div className="max-w-6xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our approach to Islamic education and student development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-primary-800" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;