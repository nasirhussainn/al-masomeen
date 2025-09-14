import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const CourseGrid = () => {
  const courses = [
    {
      id: 1,
      title: "Quran Recitation & Tajweed",
      slug: "quran-recitation-tajweed",
      description: "Master the art of beautiful Quran recitation with proper pronunciation and Tajweed rules.",
      duration: "6-12 months",
      students: "200+",
      level: "All Levels",
      rating: 4.9,
      image: "📖",
      price: "$80/month",
      features: ["One-on-one classes", "Ijazah certification", "Flexible scheduling"]
    },
    {
      id: 2,
      title: "Quran Memorization (Hifz)",
      slug: "quran-memorization-hifz",
      description: "Comprehensive Hifz program with proven memorization techniques and regular revision.",
      duration: "2-4 years",
      students: "150+",
      level: "All Levels",
      rating: 4.8,
      image: "🧠",
      price: "$100/month",
      features: ["Daily classes", "Revision schedule", "Progress tracking"]
    },
    {
      id: 3,
      title: "Islamic Studies",
      slug: "islamic-studies",
      description: "Comprehensive Islamic education covering Aqeedah, Fiqh, Seerah, and Islamic history.",
      duration: "9-15 months",
      students: "120+",
      level: "All Levels",
      rating: 4.9,
      image: "🕌",
      price: "$60/month",
      features: ["Authentic sources", "Scholar-led classes", "Interactive discussions"]
    }
  ];

  return (
    <section className="section-padding bg-primary-50">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-charcoal mb-4">
            Popular <span className="text-gradient bg-gradient-to-r from-primary-800 to-accent-600 bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our most sought-after courses designed to help you excel in your Islamic education journey.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100"
            >
              {/* Course Header */}
              <div className="bg-gradient-to-br from-primary-800 to-accent-800 p-6 text-white">
                <div className="text-4xl mb-3 text-center">{course.image}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{course.title}</h3>
                <p className="text-primary-100 text-sm text-center">{course.description}</p>
              </div>

              {/* Course Details */}
              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-600">Duration</div>
                    <div className="text-xs text-gray-500">{course.duration}</div>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-600">Students</div>
                    <div className="text-xs text-gray-500">{course.students}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center gap-1 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'fill-secondary-400 text-secondary-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{course.rating}</span>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-primary-800">{course.price}</div>
                      <div className="text-sm text-gray-500">Per student</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">{course.level}</div>
                    </div>
                  </div>
                  
                  <Link to={`/course/${course.slug}`}>
                    <Button 
                      variant="primary" 
                      className="w-full group"
                      icon={ArrowRight}
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Courses Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/courses">
            <Button 
              variant="outline" 
              size="lg"
              className="group"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseGrid;