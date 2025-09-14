import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  BookOpen, 
  Clock,
  Save,
  Edit3,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const StudentProfile = () => {
  const { student, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: student?.name || '',
      email: student?.email || '',
      phone: student?.phone || ''
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto container-padding py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and track your learning progress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit3}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        icon={Save}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-4xl">
                    {student?.avatar}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {student?.name}
                    </div>
                    <div className="text-gray-600">
                      Student • {student?.level} Level
                    </div>
                    <div className="text-sm text-gray-500">
                      Member since {formatDate(student?.joinDate)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{student?.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{student?.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{student?.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Join Date (Read Only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{formatDate(student?.joinDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      {student?.overallProgress}%
                    </div>
                    <div className="text-sm text-gray-600">Overall Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-600 mb-1">
                      {student?.hoursStudied}h
                    </div>
                    <div className="text-sm text-gray-600">Hours Studied</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-600 mb-1">
                      {student?.certificatesEarned}
                    </div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                </div>

                {/* Course Progress */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Course Progress</h3>
                  {student?.enrolledCourses?.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {course.title}
                        </span>
                        <span className="text-sm text-gray-600">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        {course.completedLessons} of {course.totalLessons} lessons completed
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Quick Stats</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {student?.enrolledCourses?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Enrolled Courses</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-accent-600" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {student?.hoursStudied || 0}h
                    </div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {student?.overallProgress || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Average Progress</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-secondary-600" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {student?.certificatesEarned || 0}
                    </div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Achievements</h3>
              </div>
              <div className="p-6 space-y-4">
                {student?.achievements?.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-lg">
                      {achievement.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatDate(achievement.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;