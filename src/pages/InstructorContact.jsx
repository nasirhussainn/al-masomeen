import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, MapPin, Clock, Send, FileText, User, Award } from 'lucide-react';
import Button from '../components/ui/Button';

const InstructorContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualifications: '',
    experience: '',
    specialization: '',
    languages: '',
    availability: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Instructor application submitted:', formData);
    // In a real app, this would send the data to an API
    alert('Thank you for your application! We will review it and get back to you within 2-3 business days.');
  };

  const qualificationOptions = [
    'Quranic Studies Degree',
    'Islamic Studies Degree',
    'Arabic Language Degree',
    'Ijazah in Quran Recitation',
    'Ijazah in Quran Memorization',
    'Teaching Certification',
    'Other Religious Studies'
  ];

  const specializationOptions = [
    'Quran Recitation (Tilawah)',
    'Quran Memorization (Hifz)',
    'Tajweed',
    'Islamic Studies',
    'Arabic Language',
    'Hadith Studies',
    'Islamic Jurisprudence (Fiqh)',
    'Islamic History'
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["instructors@almasomeen.com", "hr@almasomeen.com"],
      description: "Send your application documents"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+44 20 7123 4567"],
      description: "Speak with our HR team"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Islamic Center St.", "London, UK"],
      description: "Visit for in-person interviews"
    },
    {
      icon: Clock,
      title: "Application Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Weekend consultations available"],
      description: "Best times to contact us"
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
              <GraduationCap className="h-8 w-8 text-secondary-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              Become an <span className="text-gradient bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">Instructor</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join our prestigious team of qualified Islamic scholars and help students worldwide in their journey to learn the Quran and Islamic knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-6">
              What We're Looking For
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We seek dedicated, qualified instructors who share our commitment to authentic Islamic education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Award,
                title: "Qualifications",
                items: ["Islamic Studies Degree", "Quran Memorization (Hafiz)", "Teaching Experience", "Fluency in Arabic"]
              },
              {
                icon: User,
                title: "Skills Required",
                items: ["Excellent Communication", "Patience & Empathy", "Technology Proficiency", "Flexible Schedule"]
              },
              {
                icon: FileText,
                title: "Documents Needed",
                items: ["Educational Certificates", "Ijazah/Certifications", "Teaching References", "Background Check"]
              }
            ].map((requirement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-primary-100 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                  <requirement.icon className="h-6 w-6 text-primary-800" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-4">{requirement.title}</h3>
                <ul className="text-gray-600 space-y-2">
                  {requirement.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                  <info.icon className="h-6 w-6 text-primary-800" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-3">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-700 font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Application Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-primary-100"
            >
              <h2 className="text-3xl font-playfair font-bold text-charcoal mb-6">Submit Your Application</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highest Qualification *
                  </label>
                  <select
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your qualification</option>
                    {qualificationOptions.map((qualification, index) => (
                      <option key={index} value={qualification}>{qualification}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teaching Experience (Years) *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your specialization</option>
                    {specializationOptions.map((specialization, index) => (
                      <option key={index} value={specialization}>{specialization}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="English, Arabic, Urdu, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability *
                  </label>
                  <textarea
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please mention your preferred time slots, time zone, and any scheduling constraints..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your teaching philosophy, why you want to join Al-Masomeen, and any other relevant information..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full group"
                  icon={Send}
                >
                  Submit Application
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  * Required fields. We will review your application within 2-3 business days.
                </p>
              </form>
            </motion.div>

            {/* Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary-100">
                <h3 className="text-2xl font-playfair font-bold text-charcoal mb-6">Why Join Us?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Competitive Compensation</h4>
                      <p className="text-gray-600 text-sm">Fair and competitive hourly rates with regular reviews and performance bonuses.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Flexible Schedule</h4>
                      <p className="text-gray-600 text-sm">Work from home with flexible hours that fit your lifestyle and commitments.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Global Impact</h4>
                      <p className="text-gray-600 text-sm">Teach students from around the world and make a meaningful difference in their lives.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Professional Development</h4>
                      <p className="text-gray-600 text-sm">Regular training sessions and workshops to enhance your teaching skills.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Supportive Environment</h4>
                      <p className="text-gray-600 text-sm">Join a team of dedicated educators with comprehensive support and resources.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-800 to-accent-800 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-playfair font-bold mb-4">Application Process</h3>
                <div className="space-y-3 text-primary-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Submit your application form</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Initial review and screening call</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Demo teaching session</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Final interview and onboarding</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-primary-100">
                    <strong>Timeline:</strong> The entire process typically takes 1-2 weeks from application to final decision.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorContact;