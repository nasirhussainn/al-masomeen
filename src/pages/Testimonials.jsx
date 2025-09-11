import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aisha Rahman",
      role: "Parent",
      location: "London, UK",
      rating: 5,
      text: "Al-Masomeen has been a blessing for our family. My daughter has learned to recite the Quran beautifully with proper Tajweed. The instructors are patient and knowledgeable.",
      image: "👩‍🦰"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      role: "Student",
      location: "Toronto, Canada",
      rating: 5,
      text: "I've been learning with Al-Masomeen for 6 months now. The online classes are interactive and the Islamic studies program has deepened my understanding of our faith.",
      image: "👨‍💼"
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      role: "Adult Learner",
      location: "Dubai, UAE",
      rating: 5,
      text: "As an adult learning to read Arabic, I was worried it would be too difficult. The teachers at Al-Masomeen made it so easy and enjoyable. Alhamdulillah!",
      image: "👩‍🎓"
    },
    {
      id: 4,
      name: "Omar Abdullah",
      role: "Parent",
      location: "Manchester, UK",
      rating: 5,
      text: "Excellent academy! Both my sons are enrolled and they love their classes. The curriculum is well-structured and the teachers are truly dedicated.",
      image: "👨‍🏫"
    },
    {
      id: 5,
      name: "Mariam Khan",
      role: "Student",
      location: "Sydney, Australia",
      rating: 5,
      text: "The memorization program is amazing. I've completed 5 Paras so far and the revision techniques they teach really help retain what I've learned.",
      image: "👩‍🎤"
    },
    {
      id: 6,
      name: "Yusuf Ali",
      role: "Professional",
      location: "New York, USA",
      rating: 5,
      text: "Balancing work and studies was challenging until I found Al-Masomeen's flexible scheduling. Now I can learn at my own pace without compromising my career.",
      image: "👨‍💻"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-primary-50">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              <Quote className="h-8 w-8 text-secondary-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              Student <span className="text-gradient bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">Testimonials</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Hear from our students and parents about their transformative journey with Al-Masomeen Quran Academy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100"
              >
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-8 w-8 text-primary-300" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary-400 text-secondary-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-lg">{testimonial.name}</h4>
                    <p className="text-primary-600 font-medium">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="max-w-6xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Trusted by Students Worldwide
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our global community of learners who are transforming their lives through Quranic education.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Students" },
              { number: "50+", label: "Countries Served" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20"
              >
                <div className="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;