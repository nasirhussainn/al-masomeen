import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, Award } from 'lucide-react';
import Button from '../components/ui/Button';

const Courses = () => {
  const navigate = useNavigate();
  
  const handleEnrollment = (course) => {
    const params = new URLSearchParams({
      course: course.title,
      level: 'beginner' // default level, user can change later
    });
    navigate(`/enrollment?${params.toString()}`);
  };
  const courses = [
    {
      id: 1,
      title: "Quran Recitation & Tajweed",
      description: "Master the art of beautiful Quran recitation with proper pronunciation and Tajweed rules.",
      duration: "6-12 months",
      students: "200+",
      level: "Beginner to Advanced",
      rating: 4.9,
      features: ["One-on-one classes", "Ijazah certification", "Flexible scheduling", "Native Arabic speakers"],
      price: "$80/month",
      image: "📖"
    },
    {
      id: 2,
      title: "Quran Memorization (Hifz)",
      description: "Comprehensive Hifz program with proven memorization techniques and regular revision.",
      duration: "2-4 years",
      students: "150+",
      level: "All levels",
      rating: 4.8,
      features: ["Daily classes", "Revision schedule", "Progress tracking", "Expert guidance"],
      price: "$100/month",
      image: "🧠"
    },
    {
      id: 3,
      title: "Arabic Language",
      description: "Learn classical and modern Arabic to understand the Quran and Islamic texts.",
      duration: "12-18 months",
      students: "180+",
      level: "Beginner to Intermediate",
      rating: 4.7,
      features: ["Grammar & vocabulary", "Conversation practice", "Reading & writing", "Cultural context"],
      price: "$70/month",
      image: "🔤"
    },
    {
      id: 4,
      title: "Islamic Studies",
      description: "Comprehensive Islamic education covering Aqeedah, Fiqh, Seerah, and Islamic history.",
      duration: "9-15 months",
      students: "120+",
      level: "All levels",
      rating: 4.9,
      features: ["Authentic sources", "Scholar-led classes", "Interactive discussions", "Practical applications"],
      price: "$60/month",
      image: "🕌"
    },
    {
      id: 5,
      title: "Kids Quran Program",
      description: "Fun and engaging Quran classes specially designed for children aged 5-12.",
      duration: "Ongoing",
      students: "300+",
      level: "Kids only",
      rating: 4.9,
      features: ["Age-appropriate content", "Interactive games", "Visual learning", "Parent progress reports"],
      price: "$50/month",
      image: "👶"
    },
    {
      id: 6,
      title: "Women's Islamic Studies",
      description: "Dedicated program for sisters covering women's issues in Islam with female instructors.",
      duration: "6-12 months",
      students: "100+",
      level: "All levels",
      rating: 4.8,
      features: ["Female instructors only", "Women-specific topics", "Flexible timing", "Supportive environment"],
      price: "$65/month",
      image: "👩‍🎓"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-primary-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              <BookOpen className="h-8 w-8 text-secondary-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              Our <span className="text-gradient bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">Courses</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of Islamic education programs designed to suit learners of all ages and backgrounds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100"
              >
                {/* Course Header */}
                <div className="bg-gradient-to-br from-primary-800 to-accent-800 p-6 text-white">
                  <div className="text-4xl mb-3">{course.image}</div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-primary-100 text-sm">{course.description}</p>
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
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">What's Included:</h4>
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
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-primary-800">{course.price}</div>
                        <div className="text-sm text-gray-500">Per student</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-600">{course.level}</div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => handleEnrollment(course)}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses */}
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
              Why Choose Al-Masomeen Courses?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the difference with our authentic, comprehensive, and flexible Islamic education programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Certified Instructors",
                description: "Learn from qualified scholars with proper Islamic education credentials and years of teaching experience."
              },
              {
                icon: Users,
                title: "Small Class Sizes",
                description: "Benefit from personalized attention with maximum 5 students per class for optimal learning outcomes."
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description: "Choose class times that work for you with morning, evening, and weekend options available."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                  <feature.icon className="h-8 w-8 text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;