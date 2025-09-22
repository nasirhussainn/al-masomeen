import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock,
  FileText,
  TrendingUp,
  Edit,
  Plus,
  ExternalLink,
  ArrowLeft,
  User
} from 'lucide-react';
import { useInstructorAuth } from '../../contexts/InstructorAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { instructor, gradeAssignment, logout } = useInstructorAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [gradeModal, setGradeModal] = useState(null);
  const [gradeForm, setGradeForm] = useState({ grade: '', feedback: '' });

  const course = instructor?.courses?.find(c => c.id === parseInt(courseId));

  if (!course) {
    return (
      <PortalLayout
        portalType="instructor"
        portalTitle="Instructor Portal"
        portalIcon="🏛️"
        user={instructor}
        onLogout={logout}
      >
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
            <Link to="/instructor/dashboard">
              <Button variant="primary" icon={ArrowLeft}>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </PortalLayout>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const openGradeModal = (assignment, submission) => {
    setGradeModal({ assignment, submission });
    setGradeForm({ 
      grade: submission.grade || '', 
      feedback: submission.feedback || '' 
    });
  };

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    if (gradeModal) {
      gradeAssignment(
        course.id,
        gradeModal.assignment.id,
        gradeModal.submission.studentId,
        parseInt(gradeForm.grade),
        gradeForm.feedback
      );
      setGradeModal(null);
      setGradeForm({ grade: '', feedback: '' });
    }
  };

  const getCommunicationIcon = (channel) => {
    switch (channel) {
      case 'zoom': return '📹';
      case 'teams': return '💼';
      case 'meet': return '🎥';
      case 'whatsapp': return '💬';
      default: return '🔗';
    }
  };

  const averageProgress = course.students.reduce((sum, student) => sum + student.progress, 0) / course.students.length;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'schedule', name: 'Schedule', icon: Calendar }
  ];

  return (
    <PortalLayout
      portalType="instructor"
      portalTitle="Instructor Portal"
      portalIcon="🏛️"
      user={instructor}
      onLogout={logout}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {course.students?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Enrolled Students</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-accent-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {course.completedLessons}/{course.totalLessons}
                </div>
                <div className="text-sm text-gray-600">Lessons Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(averageProgress)}%
                </div>
                <div className="text-sm text-gray-600">Average Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-secondary-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {course.assignments?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Total Assignments</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Description</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Module</h3>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <p className="text-primary-800 font-medium">{course.currentModule}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-primary-600 to-accent-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {course.completedLessons} of {course.totalLessons} lessons completed ({Math.round((course.completedLessons / course.totalLessons) * 100)}%)
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Enrolled Students</h3>
                  <Button variant="outline" size="sm" icon={Plus}>
                    Add Student
                  </Button>
                </div>

                <div className="grid gap-4">
                  {course.students?.map((student) => (
                    <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-lg">{student.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <p className="text-xs text-gray-500">
                              Joined: {formatDate(student.joinDate)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">
                            {student.progress}%
                          </div>
                          <div className="text-xs text-gray-500">Progress</div>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                            student.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {student.status}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
                  <Button variant="outline" size="sm" icon={Plus}>
                    Create Assignment
                  </Button>
                </div>

                <div className="space-y-6">
                  {course.assignments?.map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">Due: {formatDate(assignment.dueDate)}</p>
                        </div>
                        <Button variant="outline" size="sm" icon={Edit}>
                          Edit
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900">Submissions</h5>
                        {assignment.submissions?.map((submission) => (
                          <div key={submission.studentId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <User className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900">{submission.studentName}</p>
                                <p className="text-sm text-gray-600">
                                  {submission.submitted ? 'Submitted' : 'Not submitted'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {submission.submitted && (
                                <>
                                  {submission.grade ? (
                                    <div className="text-right">
                                      <div className="font-bold text-primary-600">
                                        {submission.grade}/100
                                      </div>
                                      <div className="text-xs text-gray-500">Graded</div>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => openGradeModal(assignment, submission)}
                                    >
                                      Grade
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Class Schedule</h3>
                  <Button variant="outline" size="sm" icon={Edit}>
                    Edit Schedule
                  </Button>
                </div>

                <div className="grid gap-4">
                  {course.schedule?.map((slot, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <div>
                            <p className="font-medium text-gray-900">{slot.day}</p>
                            <p className="text-sm text-gray-600">{slot.duration} minutes</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{slot.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Grade Assignment Modal */}
      {gradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Grade Assignment: {gradeModal.assignment.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Student: {gradeModal.submission.studentName}
            </p>

            <form onSubmit={handleGradeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradeForm.grade}
                  onChange={(e) => setGradeForm(prev => ({ ...prev, grade: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback
                </label>
                <textarea
                  value={gradeForm.feedback}
                  onChange={(e) => setGradeForm(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Provide feedback for the student..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                  Save Grade
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setGradeModal(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </PortalLayout>
  );
};

export default CourseDetail;