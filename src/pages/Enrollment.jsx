import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, GraduationCap } from 'lucide-react';
import Button from '../components/ui/Button';

const Enrollment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    country: '',
    
    // Course Information
    course: searchParams.get('course') || '',
    level: searchParams.get('level') || '',
    studentAge: '',
    previousExperience: '',
    goals: '',
    
    // Guardian Information (for minors)
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianRelation: '',
    
    // Scheduling
    timezone: '',
    preferredTime: '',
    preferredDays: [],
    startDate: '',
    
    // Additional Information
    hearAboutUs: '',
    specialRequirements: '',
    
    // Payment
    paymentPlan: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'preferredDays') {
      setFormData(prev => ({
        ...prev,
        preferredDays: checked 
          ? [...prev.preferredDays, value]
          : prev.preferredDays.filter(day => day !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Enrollment submitted:', formData);
    setStep(6); // Success step
  };

  const timeSlots = [
    "Morning (6 AM - 12 PM)",
    "Afternoon (12 PM - 6 PM)", 
    "Evening (6 PM - 12 AM)",
    "Night (12 AM - 6 AM)",
    "Weekend Only",
    "Flexible"
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const courses = [
    'Quran Recitation & Tajweed',
    'Quran Memorization (Hifz)',
    'Arabic Language',
    'Islamic Studies',
    'Aqeedah & Fiqh'
  ];

  const paymentPlans = [
    { value: 'monthly', label: 'Monthly Payment ($80/month)' },
    { value: 'quarterly', label: 'Quarterly Payment ($210/3 months - Save $30)' },
    { value: 'semi-annual', label: 'Semi-Annual Payment ($400/6 months - Save $80)' },
    { value: 'annual', label: 'Annual Payment ($720/year - Save $240)' }
  ];

  const stepTitles = {
    1: 'Personal Information',
    2: 'Course Selection',
    3: 'Guardian Information',
    4: 'Schedule & Preferences',
    5: 'Payment Plan',
    6: 'Confirmation'
  };

  // Check if student is minor (under 18)
  const isMinor = () => {
    if (!formData.dateOfBirth) return false;
    const today = new Date();
    const birthDate = new Date(formData.dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age < 18;
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
              <GraduationCap className="h-8 w-8 text-secondary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
              Course Enrollment
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Complete your enrollment to begin your Islamic learning journey with Al-Masomeen Academy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100"
          >
            {/* Progress Bar */}
            <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-6">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm ${
                      step >= num
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {step > num ? <CheckCircle className="h-5 w-5" /> : num}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-playfair font-bold text-charcoal">
                  Step {step < 6 ? step : 5} of 5: {stepTitles[step] || stepTitles[5]}
                </h2>
              </div>
            </div>

            {step < 6 && (
              <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }} className="p-8">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-playfair font-bold text-charcoal mb-6 text-center">
                      Personal Information
                    </h3>

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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationality
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Your nationality"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Your country"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Your full address"
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Course Selection */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-playfair font-bold text-charcoal mb-6 text-center">
                      Course Selection
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Course *
                        </label>
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Choose a course</option>
                          {courses.map((course) => (
                            <option key={course} value={course}>{course}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Level *
                        </label>
                        <select
                          name="level"
                          value={formData.level}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Select your level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Learning Goals
                      </label>
                      <textarea
                        name="goals"
                        value={formData.goals}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="What do you hope to achieve with this course?"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Previous Experience
                      </label>
                      <textarea
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Any previous Islamic studies or Arabic learning experience?"
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Guardian Information (conditional) */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-playfair font-bold text-charcoal mb-6 text-center">
                      Guardian Information
                    </h3>

                    {isMinor() ? (
                      <>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                          <p className="text-blue-700">
                            <strong>Note:</strong> Since the student is under 18, guardian information is required for enrollment.
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Guardian Name *
                            </label>
                            <input
                              type="text"
                              name="guardianName"
                              value={formData.guardianName}
                              onChange={handleInputChange}
                              required={isMinor()}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Guardian's full name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Guardian Email *
                            </label>
                            <input
                              type="email"
                              name="guardianEmail"
                              value={formData.guardianEmail}
                              onChange={handleInputChange}
                              required={isMinor()}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="guardian@email.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Guardian Phone *
                            </label>
                            <input
                              type="tel"
                              name="guardianPhone"
                              value={formData.guardianPhone}
                              onChange={handleInputChange}
                              required={isMinor()}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Relationship *
                            </label>
                            <select
                              name="guardianRelation"
                              value={formData.guardianRelation}
                              onChange={handleInputChange}
                              required={isMinor()}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="">Select relationship</option>
                              <option value="parent">Parent</option>
                              <option value="guardian">Legal Guardian</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">No Guardian Information Required</h4>
                        <p className="text-gray-600">
                          Since you are 18 or older, you can proceed directly to scheduling preferences.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Schedule & Preferences */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-playfair font-bold text-charcoal mb-6 text-center">
                      Schedule & Preferences
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone *
                        </label>
                        <select
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Select your timezone</option>
                          <option value="UTC-12">UTC-12 (Baker Island)</option>
                          <option value="UTC-11">UTC-11 (American Samoa)</option>
                          <option value="UTC-10">UTC-10 (Hawaii)</option>
                          <option value="UTC-9">UTC-9 (Alaska)</option>
                          <option value="UTC-8">UTC-8 (Pacific Time)</option>
                          <option value="UTC-7">UTC-7 (Mountain Time)</option>
                          <option value="UTC-6">UTC-6 (Central Time)</option>
                          <option value="UTC-5">UTC-5 (Eastern Time)</option>
                          <option value="UTC-4">UTC-4 (Atlantic Time)</option>
                          <option value="UTC-3">UTC-3 (Brazil Time)</option>
                          <option value="UTC-2">UTC-2 (South Georgia)</option>
                          <option value="UTC-1">UTC-1 (Azores)</option>
                          <option value="UTC+0">UTC+0 (London)</option>
                          <option value="UTC+1">UTC+1 (Central Europe)</option>
                          <option value="UTC+2">UTC+2 (Eastern Europe)</option>
                          <option value="UTC+3">UTC+3 (Moscow)</option>
                          <option value="UTC+4">UTC+4 (Gulf Time)</option>
                          <option value="UTC+5">UTC+5 (Pakistan Time)</option>
                          <option value="UTC+6">UTC+6 (Bangladesh Time)</option>
                          <option value="UTC+7">UTC+7 (Thailand Time)</option>
                          <option value="UTC+8">UTC+8 (China Time)</option>
                          <option value="UTC+9">UTC+9 (Japan Time)</option>
                          <option value="UTC+10">UTC+10 (Australia East)</option>
                          <option value="UTC+11">UTC+11 (Solomon Islands)</option>
                          <option value="UTC+12">UTC+12 (New Zealand)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Select preferred time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          name="hearAboutUs"
                          value={formData.hearAboutUs}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          <option value="google">Google Search</option>
                          <option value="social-media">Social Media</option>
                          <option value="friend">Friend/Family Referral</option>
                          <option value="website">Direct Website Visit</option>
                          <option value="advertisement">Advertisement</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Days (select multiple)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {weekDays.map((day) => (
                          <label key={day} className="flex items-center">
                            <input
                              type="checkbox"
                              name="preferredDays"
                              value={day}
                              checked={formData.preferredDays.includes(day)}
                              onChange={handleInputChange}
                              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requirements or Notes
                      </label>
                      <textarea
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Any special requirements, accessibility needs, or additional information..."
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Payment Plan */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-playfair font-bold text-charcoal mb-6 text-center">
                      Payment Plan Selection
                    </h3>

                    <div className="space-y-4">
                      {paymentPlans.map((plan) => (
                        <label key={plan.value} className="block">
                          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            formData.paymentPlan === plan.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-300 hover:border-primary-300'
                          }`}>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="paymentPlan"
                                value={plan.value}
                                checked={formData.paymentPlan === plan.value}
                                onChange={handleInputChange}
                                className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500"
                                required
                              />
                              <span className="font-medium text-gray-800">{plan.label}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <p className="text-yellow-700 text-sm">
                        <strong>Note:</strong> Payment processing will be handled after enrollment confirmation. 
                        You will receive detailed payment instructions via email within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8">
                  {step > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePrevStep}
                    >
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      {step === 5 ? 'Complete Enrollment' : 'Next Step'}
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* Success Step */}
            {step === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-8"
              >
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-3xl font-playfair font-bold text-charcoal mb-4">
                  Enrollment Submitted Successfully!
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Thank you for enrolling with Al-Masomeen Quran Academy! Our admissions team will review your application 
                  and contact you within 24 hours to confirm your enrollment and provide further instructions.
                </p>
                <div className="space-x-4">
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/')}
                  >
                    Return to Home
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/courses')}
                  >
                    Browse Other Courses
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Enrollment;