import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Edit2,
  Save,
  X,
  ArrowLeft,
  Languages,
  Clock
} from 'lucide-react';
import { useInstructorAuth } from '../../contexts/InstructorAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const InstructorProfile = () => {
  const { instructor, updateProfile, logout } = useInstructorAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: instructor?.name || '',
    email: instructor?.email || '',
    phone: instructor?.phone || '',
    specialization: instructor?.specialization || '',
    qualification: instructor?.qualification || '',
    languages: instructor?.languages?.join(', ') || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedData = {
      ...editForm,
      languages: editForm.languages.split(',').map(lang => lang.trim()).filter(lang => lang)
    };
    updateProfile(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: instructor?.name || '',
      email: instructor?.email || '',
      phone: instructor?.phone || '',
      specialization: instructor?.specialization || '',
      qualification: instructor?.qualification || '',
      languages: instructor?.languages?.join(', ') || ''
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
    <PortalLayout
      portalType="instructor"
      portalTitle="Instructor Portal"
      portalIcon="🏛️"
      user={instructor}
      onLogout={logout}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
            >
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">{instructor?.avatar}</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {instructor?.name}
              </h1>
              <p className="text-gray-600 mb-4">{instructor?.specialization}</p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(instructor?.joinDate)}</span>
              </div>

              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="w-full"
                  icon={Edit2}
                >
                  Edit Profile
                </Button>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Teaching Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-gray-600">Active Courses</span>
                  </div>
                  <span className="font-semibold">{instructor?.stats?.activeCourses || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-accent-600" />
                    <span className="text-sm text-gray-600">Total Students</span>
                  </div>
                  <span className="font-semibold">{instructor?.stats?.totalStudents || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-secondary-600" />
                    <span className="text-sm text-gray-600">Teaching Hours</span>
                  </div>
                  <span className="font-semibold">{instructor?.stats?.hoursTeaching || 0}h</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Completion Rate</span>
                  </div>
                  <span className="font-semibold">{instructor?.stats?.completionRate || 0}%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        variant="primary"
                        size="sm"
                        icon={Save}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        icon={X}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-gray-400" />
                        <span>{instructor?.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span>{instructor?.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span>{instructor?.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span>{instructor?.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="specialization"
                      value={editForm.specialization}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                      <span>{instructor?.specialization}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualifications
                  </label>
                  {isEditing ? (
                    <textarea
                      name="qualification"
                      value={editForm.qualification}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="h-5 w-5 text-gray-400 mt-0.5" />
                      <span>{instructor?.qualification}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="languages"
                      value={editForm.languages}
                      onChange={handleInputChange}
                      placeholder="Separate with commas (e.g., Arabic, English, Urdu)"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Languages className="h-5 w-5 text-gray-400" />
                      <span>{instructor?.languages?.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Courses Taught */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Courses Taught</h2>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {instructor?.courses?.map((course) => (
                    <Link
                      key={course.id}
                      to={`/instructor/course/${course.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-primary-200 hover:bg-primary-50/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {course.students?.length || 0} students • {course.totalLessons} lessons
                          </p>
                          <p className="text-sm text-gray-600">
                            Current: {course.currentModule}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">
                            {Math.round((course.completedLessons / course.totalLessons) * 100)}%
                          </div>
                          <div className="text-xs text-gray-500">Complete</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default InstructorProfile;