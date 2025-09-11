import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      category: "Getting Started",
      faqs: [
        {
          question: "How do I enroll in a course?",
          answer: "You can enroll by clicking the 'Enroll Now' button on any course page, filling out the registration form, and completing the payment. Once registered, you'll receive login credentials and class schedule information."
        },
        {
          question: "Do you offer free trial classes?",
          answer: "Yes! We offer a complimentary 30-minute trial class for all new students. This allows you to meet your instructor, understand our teaching methodology, and ensure our program meets your needs."
        },
        {
          question: "What age groups do you accept?",
          answer: "We welcome students of all ages, from children as young as 5 years old to adults. We have specialized programs for different age groups: Kids (5-12), Teens (13-17), and Adults (18+)."
        },
        {
          question: "What technology do I need for online classes?",
          answer: "You'll need a computer, tablet, or smartphone with a stable internet connection, a webcam, and a microphone. We use Zoom for our classes, which is free and easy to use."
        }
      ]
    },
    {
      category: "Courses & Curriculum",
      faqs: [
        {
          question: "What courses do you offer?",
          answer: "We offer Quran Recitation & Tajweed, Quran Memorization (Hifz), Arabic Language, Islamic Studies, Kids Quran Program, and Women's Islamic Studies. Each course is designed with authentic curriculum and qualified instructors."
        },
        {
          question: "How long does it take to complete a course?",
          answer: "Course duration varies: Quran Recitation (6-12 months), Hifz (2-4 years), Arabic (12-18 months), Islamic Studies (9-15 months). Progress depends on individual pace and commitment."
        },
        {
          question: "Do you provide certificates upon completion?",
          answer: "Yes, we provide certificates for course completion. For advanced students in Quran recitation, we also offer Ijazah certification from qualified scholars."
        },
        {
          question: "Can I take multiple courses simultaneously?",
          answer: "Absolutely! Many students combine courses like Quran recitation with Islamic studies or Arabic language. We can help create a customized learning plan that fits your schedule and goals."
        }
      ]
    },
    {
      category: "Instructors & Teaching",
      faqs: [
        {
          question: "Are your instructors qualified?",
          answer: "All our instructors are certified Islamic scholars with proper credentials from recognized institutions like Al-Azhar University. They have years of teaching experience and hold Ijazah in Quran recitation."
        },
        {
          question: "Can I choose my instructor?",
          answer: "Yes! We'll match you with instructors based on your preferences, schedule, and learning needs. If you're not satisfied, we can arrange a different instructor at no extra cost."
        },
        {
          question: "What is the student-to-teacher ratio?",
          answer: "We maintain small class sizes with a maximum of 5 students per group class. We also offer one-on-one classes for personalized attention and faster progress."
        },
        {
          question: "Do you have female instructors for women and girls?",
          answer: "Yes, we have qualified female instructors specifically for our women's and girls' programs. This ensures a comfortable learning environment while maintaining Islamic values."
        }
      ]
    },
    {
      category: "Scheduling & Flexibility",
      faqs: [
        {
          question: "What are your class timings?",
          answer: "We offer flexible scheduling with classes available 24/7 to accommodate different time zones. You can choose morning, afternoon, evening, or weekend slots based on your availability."
        },
        {
          question: "Can I reschedule or makeup missed classes?",
          answer: "Yes, you can reschedule classes with 24-hour notice. We also offer makeup classes for legitimate absences like illness or emergencies."
        },
        {
          question: "How often are classes held?",
          answer: "Regular courses typically have 2-3 classes per week, each lasting 45-60 minutes. Intensive programs may have daily classes. You can also opt for weekend-only schedules."
        },
        {
          question: "What happens during holidays?",
          answer: "We observe major Islamic holidays and provide advance notice. Regular classes continue during other holidays, but you can request time off and make up classes later."
        }
      ]
    },
    {
      category: "Pricing & Payments",
      faqs: [
        {
          question: "What are your course fees?",
          answer: "Our fees range from $50-100/month depending on the course and class type. Kids programs start at $50/month, while specialized courses like Hifz are $100/month. All fees include materials and resources."
        },
        {
          question: "Do you offer family discounts?",
          answer: "Yes! We offer 15% discount for the second family member and 25% for three or more family members enrolling in courses simultaneously."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, bank transfers, and cryptocurrency. Monthly, quarterly, and annual payment plans are available with discounts for longer commitments."
        },
        {
          question: "Is there a refund policy?",
          answer: "We offer a 30-day money-back guarantee if you're not satisfied with our services. After 30 days, refunds are prorated based on remaining classes."
        }
      ]
    },
    {
      category: "Technical Support",
      faqs: [
        {
          question: "What if I have technical issues during class?",
          answer: "We provide 24/7 technical support. If you experience issues during class, contact our support team immediately, and we'll help resolve the problem or arrange a makeup session."
        },
        {
          question: "Do you record classes for review?",
          answer: "Yes, with student consent, we can record classes for review purposes. These recordings are private and only accessible to enrolled students for a limited time."
        },
        {
          question: "Can I access course materials offline?",
          answer: "Yes, we provide downloadable materials including PDFs, audio files, and practice exercises that you can access offline for studying and practice."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
  };

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
              <HelpCircle className="h-8 w-8 text-secondary-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              Frequently Asked <span className="text-gradient bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">Questions</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our courses, instructors, and learning process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto container-padding">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-charcoal mb-8 text-center">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openFAQ === `${categoryIndex}-${faqIndex}`;
                  return (
                    <div
                      key={faqIndex}
                      className="bg-white rounded-xl shadow-lg border border-primary-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-charcoal pr-4">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-primary-600 flex-shrink-0" />
                        )}
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 pt-0">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary-600 hover:bg-secondary-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </a>
              <a
                href="/book-demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-800 font-semibold rounded-lg transition-all duration-300"
              >
                Book Free Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;