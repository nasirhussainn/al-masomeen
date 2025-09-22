import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Users,
  GraduationCap,
  BookOpen,
  Search,
  Check,
  X,
  UserPlus
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const AssignStudent = () => {
  const { admin, assignStudentToInstructor, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchStudent, setSearchStudent] = useState('');
  const [searchInstructor, setSearchInstructor] = useState('');

  const availableStudents = admin?.allStudents?.filter(student => 
    student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
    student.email.toLowerCase().includes(searchStudent.toLowerCase())
  ) || [];

  const availableInstructors = admin?.allInstructors?.filter(instructor => 
    instructor.status === 'active' &&
    (instructor.name.toLowerCase().includes(searchInstructor.toLowerCase()) ||
     instructor.specialization.toLowerCase().includes(searchInstructor.toLowerCase()))
  ) || [];

  const availableCourses = admin?.allCourses?.filter(course => 
    course.status === 'active' &&
    (!selectedInstructor || course.instructorId === parseInt(selectedInstructor))
  ) || [];

  const getSelectedStudent = () => {
    return admin?.allStudents?.find(s => s.id === parseInt(selectedStudent));
  };

  const getSelectedInstructor = () => {
    return admin?.allInstructors?.find(i => i.id === parseInt(selectedInstructor));
  };

  const getSelectedCourse = () => {
    return admin?.allCourses?.find(c => c.id === parseInt(selectedCourse));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedInstructor || !selectedCourse) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Assign student to instructor
      assignStudentToInstructor(
        parseInt(selectedStudent),
        parseInt(selectedInstructor),
        parseInt(selectedCourse)
      );
      
      // Navigate back to students list or show success
      navigate('/admin/students');
    } catch (error) {
      console.error('Error assigning student:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return selectedStudent && selectedInstructor && selectedCourse;
  };

  return (
    <PortalLayout
      portalType="admin"
      portalTitle="Admin Portal"
      portalIcon="🏛️"
      user={{ name: "Admin" }}
      onLogout={logout}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Select Student */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </div>
                <Users className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Select Student</h2>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students by name or email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={searchStudent}
                    onChange={(e) => setSearchStudent(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {availableStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedStudent === student.id.toString()
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedStudent(student.id.toString())}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{student.avatar}</div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.email}</div>
                          <div className="text-xs text-gray-400">{student.level}</div>
                        </div>
                      </div>
                      {selectedStudent === student.id.toString() && (
                        <Check className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                    <div className="mt-3 text-sm">
                      <div className="text-gray-600">Current Instructor: {student.instructor}</div>
                      <div className="text-gray-500">{student.courses.length} courses enrolled</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {availableStudents.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No students found matching your search.</p>
                </div>
              )}
            </div>

            {/* Step 2: Select Instructor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                  selectedStudent ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  2
                </div>
                <GraduationCap className={`h-6 w-6 mr-2 ${selectedStudent ? 'text-primary-600' : 'text-gray-400'}`} />
                <h2 className={`text-xl font-bold ${selectedStudent ? 'text-gray-900' : 'text-gray-400'}`}>
                  Select Instructor
                </h2>
              </div>

              {selectedStudent && (
                <>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search instructors by name or specialization..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        value={searchInstructor}
                        onChange={(e) => setSearchInstructor(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {availableInstructors.map((instructor, index) => (
                      <motion.div
                        key={instructor.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedInstructor === instructor.id.toString()
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                        onClick={() => setSelectedInstructor(instructor.id.toString())}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{instructor.avatar}</div>
                            <div>
                              <div className="font-medium text-gray-900">{instructor.name}</div>
                              <div className="text-sm text-gray-600">{instructor.specialization}</div>
                              <div className="text-xs text-gray-400">{instructor.experience} experience</div>
                            </div>
                          </div>
                          {selectedInstructor === instructor.id.toString() && (
                            <Check className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Students:</span>
                            <span className="ml-1 font-medium">{instructor.totalStudents}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Courses:</span>
                            <span className="ml-1 font-medium">{instructor.activeCourses}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {!selectedStudent && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Please select a student first.</p>
                </div>
              )}
            </div>

            {/* Step 3: Select Course */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                  selectedInstructor ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  3
                </div>
                <BookOpen className={`h-6 w-6 mr-2 ${selectedInstructor ? 'text-primary-600' : 'text-gray-400'}`} />
                <h2 className={`text-xl font-bold ${selectedInstructor ? 'text-gray-900' : 'text-gray-400'}`}>
                  Select Course
                </h2>
              </div>

              {selectedInstructor && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCourse === course.id.toString()
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedCourse(course.id.toString())}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-600">{course.instructor}</div>
                        </div>
                        {selectedCourse === course.id.toString() && (
                          <Check className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-1">{course.duration}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Level:</span>
                            <span className="ml-1">{course.level}</span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="text-gray-500">Students: {course.students}/{course.capacity}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${(course.students / course.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Schedule: {course.schedule.join(', ')}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!selectedInstructor && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Please select an instructor first.</p>
                </div>
              )}

              {selectedInstructor && availableCourses.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No active courses available for this instructor.</p>
                </div>
              )}
            </div>

            {/* Assignment Summary */}
            {isFormValid() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    ✓
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Assignment Summary</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">{getSelectedStudent()?.avatar}</div>
                    <div className="font-medium text-gray-900">{getSelectedStudent()?.name}</div>
                    <div className="text-sm text-gray-600">Student</div>
                  </div>

                  <div className="flex items-center justify-center">
                    <UserPlus className="h-8 w-8 text-primary-600" />
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">{getSelectedInstructor()?.avatar}</div>
                    <div className="font-medium text-gray-900">{getSelectedInstructor()?.name}</div>
                    <div className="text-sm text-gray-600">Instructor</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg mb-6">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">{getSelectedCourse()?.title}</div>
                  <div className="text-sm text-gray-600">Course</div>
                </div>
              </motion.div>
            )}

            {/* Form Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Complete all steps to assign the student to the instructor
                </div>
                <div className="flex gap-3">
                  <Link to="/admin/students">
                    <Button variant="outline" icon={X}>
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading || !isFormValid()}
                    icon={UserPlus}
                  >
                    {loading ? 'Assigning Student...' : 'Assign Student'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </PortalLayout>
  );
};

export default AssignStudent;