import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  GraduationCap,
  DollarSign,
  Save,
  X
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Button from '../../components/ui/Button';

const AddInstructor = () => {
  const { addInstructor } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    qualification: '',
    experience: '',
    languages: [],
    salary: '',
    avatar: '👨🏻‍🏫'
  });

  const availableAvatars = ['👨🏻‍🏫', '👩🏻‍🏫', '👨🏽‍🏫', '👩🏽‍🏫', '👨🏿‍🏫', '👩🏿‍🏫'];
  const availableLanguages = ['Arabic', 'English', 'Urdu', 'French', 'Turkish', 'Malay', 'Indonesian'];
  
  const specializationOptions = [
    'Quran Recitation & Tajweed',
    'Islamic Studies & Arabic Literature',
    'Arabic Language & Grammar',
    'Hadith Studies & Islamic Jurisprudence',
    'Islamic History & Civilization',
    'Fiqh & Islamic Law',
    'Tafseer & Quranic Sciences',
    'Seerah & Prophetic Studies'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add the instructor
      addInstructor({
        ...formData,
        salary: parseInt(formData.salary)
      });
      
      // Navigate back to instructors list
      navigate('/admin/instructors');
    } catch (error) {
      console.error('Error adding instructor:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.name &&
           formData.email &&
           formData.phone &&
           formData.specialization &&
           formData.qualification &&
           formData.experience &&
           formData.languages.length > 0 &&
           formData.salary;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/instructors" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Instructors
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">🏛️</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Add New Instructor</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter full name"
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
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="instructor@almasomeen.com"
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
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar
                  </label>
                  <div className="flex gap-2">
                    {availableAvatars.map((avatar, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                        className={`text-2xl p-2 rounded-lg border-2 transition-colors ${
                          formData.avatar === avatar
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <GraduationCap className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Professional Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Specialization</option>
                    {specializationOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., 10 years"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification & Certifications *
                  </label>
                  <textarea
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., PhD in Islamic Studies, Ijazah in Quran Recitation, MA in Arabic Literature"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Salary (USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableLanguages.map((language, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(language)}
                          onChange={() => handleLanguageChange(language)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm text-gray-700">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  * Required fields
                </div>
                <div className="flex gap-3">
                  <Link to="/admin/instructors">
                    <Button variant="outline" icon={X}>
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading || !isFormValid()}
                    icon={Save}
                  >
                    {loading ? 'Adding Instructor...' : 'Add Instructor'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddInstructor;