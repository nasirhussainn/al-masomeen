import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Star, CheckCircle, Play, Book } from 'lucide-react';
import Button from '../components/ui/Button';

const CourseDetail = () => {
  const { id } = useParams();

  // Hardcoded course data
  const courses = {
    'quran-recitation-tajweed': {
      id: 1,
      title: "Quran Recitation & Tajweed",
      subtitle: "Master the Art of Beautiful Quran Recitation",
      instructor: "Sheikh Muhammad Ahmed",
      price: "$80/month",
      duration: "6-12 months",
      students: "200+",
      rating: "4.9",
      level: "All Levels",
      image: "📖",
      description: "Master the art of beautiful Quran recitation with proper pronunciation and Tajweed rules. Learn from certified instructors who will guide you through every aspect of correct Quranic recitation.",
      features: [
        "One-on-one personalized classes",
        "Ijazah certification upon completion",
        "Flexible scheduling to fit your routine",
        "Progress tracking and regular assessments",
        "Access to recorded sessions",
        "Digital learning materials included"
      ],
      curriculum: [
        {
          module: "Module 1: Foundation",
          lessons: [
            "Arabic alphabet and proper pronunciation",
            "Basic Tajweed rules introduction",
            "Makharij (Points of articulation)",
            "Sifaat (Characteristics of letters)"
          ]
        },
        {
          module: "Module 2: Intermediate Rules",
          lessons: [
            "Noon Sakin and Tanween rules",
            "Meem Sakin rules", 
            "Qalqalah (Echoing sound)",
            "Madd (Prolongation) rules"
          ]
        },
        {
          module: "Module 3: Advanced Techniques",
          lessons: [
            "Waqf and Ibtida (Stopping and starting)",
            "Advanced Madd rules",
            "Tafkheem and Tarqeeq (Heavy and light pronunciation)",
            "Beautiful recitation techniques"
          ]
        },
        {
          module: "Module 4: Mastery & Certification",
          lessons: [
            "Complete Quran recitation practice",
            "Error correction and perfection",
            "Ijazah preparation and examination",
            "Teaching methodology basics"
          ]
        }
      ],
      outcomes: [
        "Read the Quran with proper Tajweed rules",
        "Understand and apply all major Tajweed principles",
        "Recite with beautiful, melodious voice",
        "Earn Ijazah certification if qualified",
        "Gain confidence in leading prayers",
        "Develop a lifelong love for Quranic recitation"
      ]
    },
    'quran-memorization-hifz': {
      id: 2,
      title: "Quran Memorization (Hifz)",
      subtitle: "Complete Memorization Program with Proven Techniques",
      instructor: "Ustadha Khadija Hassan",
      price: "$100/month",
      duration: "2-4 years",
      students: "150+",
      rating: "4.8",
      level: "All Levels",
      image: "🧠",
      description: "Comprehensive Hifz program with proven memorization techniques and regular revision. Our structured approach ensures strong retention and beautiful recitation throughout your memorization journey.",
      features: [
        "Daily structured classes",
        "Personalized memorization schedule",
        "Regular revision program",
        "Progress tracking system",
        "Weekend intensive sessions",
        "Family support guidance"
      ],
      curriculum: [
        {
          module: "Foundation Phase",
          lessons: [
            "Assessment of current Quran reading level",
            "Tajweed correction and improvement",
            "Memorization techniques introduction",
            "Daily routine establishment"
          ]
        },
        {
          module: "Memorization Phase",
          lessons: [
            "Systematic surah-by-surah memorization",
            "Daily new lesson (Sabaq)",
            "Recent revision (Sabaq Para)",
            "Distant revision (Manzil)"
          ]
        },
        {
          module: "Consolidation Phase",
          lessons: [
            "Complete Quran revision cycles",
            "Speed and fluency development",
            "Mistake identification and correction",
            "Retention strengthening techniques"
          ]
        },
        {
          module: "Completion & Certification",
          lessons: [
            "Final assessment and testing",
            "Hifz completion ceremony",
            "Ongoing maintenance program",
            "Teaching methodology for Huffaz"
          ]
        }
      ],
      outcomes: [
        "Complete memorization of the Holy Quran",
        "Strong retention and recall abilities",
        "Beautiful and accurate recitation",
        "Disciplined study habits",
        "Deep spiritual connection with the Quran",
        "Qualification to teach others"
      ]
    },
    'islamic-studies': {
      id: 3,
      title: "Islamic Studies",
      subtitle: "Comprehensive Islamic Education Program",
      instructor: "Dr. Omar Faruq",
      price: "$60/month",
      duration: "9-15 months",
      students: "120+",
      rating: "4.9",
      level: "All Levels",
      image: "🕌",
      description: "Comprehensive Islamic education covering Aqeedah (belief), Fiqh (jurisprudence), Seerah (biography of Prophet), and Islamic history. Build a strong foundation in Islamic knowledge.",
      features: [
        "Authentic classical sources",
        "Scholar-led interactive classes",
        "Discussion-based learning",
        "Practical application focus",
        "Historical context integration",
        "Modern relevance emphasis"
      ],
      curriculum: [
        {
          module: "Foundations of Faith (Aqeedah)",
          lessons: [
            "Six pillars of Iman (faith)",
            "Tawheed - Unity of Allah",
            "Names and attributes of Allah",
            "Prophethood and revelation"
          ]
        },
        {
          module: "Islamic Law (Fiqh)",
          lessons: [
            "Five pillars of Islam in detail",
            "Purification and prayer rules",
            "Fasting and Hajj guidelines",
            "Financial obligations (Zakat)"
          ]
        },
        {
          module: "Prophet's Biography (Seerah)",
          lessons: [
            "Early life and call to prophethood",
            "Meccan period challenges",
            "Migration to Medina",
            "Establishment of Islamic state"
          ]
        },
        {
          module: "Islamic History & Civilization",
          lessons: [
            "Rightly-guided Caliphs",
            "Islamic Golden Age",
            "Spread of Islam worldwide",
            "Contemporary Muslim world"
          ]
        }
      ],
      outcomes: [
        "Solid foundation in Islamic beliefs",
        "Understanding of Islamic law and practice",
        "Knowledge of Prophet's life and example",
        "Awareness of Islamic history and contributions",
        "Ability to apply Islamic principles in daily life",
        "Confidence in discussing Islamic topics"
      ]
    }
  };

  const course = courses[id] || courses['quran-recitation-tajweed'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-primary-50">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/courses"
              className="inline-flex items-center text-secondary-400 hover:text-secondary-300 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Courses
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                  <div className="text-4xl">{course.image}</div>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                  {course.title}
                </h1>
                
                <p className="text-xl text-secondary-400 mb-6 font-medium">
                  {course.subtitle}
                </p>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="secondary" size="lg" icon={Calendar}>
                    Book Free Trial
                  </Button>
                  <Button variant="accent" size="lg" icon={Play}>
                    Watch Demo
                  </Button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-400 mb-2">{course.price}</div>
                    <div className="text-gray-300 text-sm">Per month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-400 mb-2">{course.duration}</div>
                    <div className="text-gray-300 text-sm">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-400 mb-2">{course.students}</div>
                    <div className="text-gray-300 text-sm">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-6 w-6 text-yellow-400 fill-current mr-1" />
                      <span className="text-3xl font-bold text-secondary-400">{course.rating}</span>
                    </div>
                    <div className="text-gray-300 text-sm">Rating</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-medium text-white mb-2">Instructor</div>
                  <div className="text-secondary-400 font-medium">{course.instructor}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Features */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-primary-100"
            >
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-charcoal mb-6">
                Course Features
              </h2>
              
              <div className="space-y-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-primary-100"
            >
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-charcoal mb-6">
                What You'll Learn
              </h2>
              
              <div className="space-y-4">
                {course.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section-padding bg-primary-50">
        <div className="max-w-4xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
              Course Curriculum
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our structured curriculum ensures comprehensive learning with progressive skill development.
            </p>
          </motion.div>

          <div className="space-y-6">
            {course.curriculum.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-primary-100"
              >
                <h3 className="text-xl font-bold text-charcoal mb-4 flex items-center">
                  <Book className="h-5 w-5 text-primary-600 mr-3" />
                  {module.module}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{lesson}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Ready to Begin Your Learning Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have transformed their Islamic knowledge with our expert instruction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/book-demo">
                <Button variant="secondary" size="lg" icon={Calendar}>
                  Book Free Trial Class
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="accent" size="lg">
                  Ask Questions
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400 mb-1">Free</div>
                <div className="text-sm text-gray-300">Trial Class</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400 mb-1">100%</div>
                <div className="text-sm text-gray-300">Money-back Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400 mb-1">24/7</div>
                <div className="text-sm text-gray-300">Student Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;