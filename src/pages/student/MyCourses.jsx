import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ExternalLink, 
  Play,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const StudentCourses = () => {
  const { student, logout } = useAuth();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const getCommunicationLabel = (channel) => {
    switch (channel) {
      case 'zoom': return 'Zoom';
      case 'teams': return 'Microsoft Teams';
      case 'meet': return 'Google Meet';
      case 'whatsapp': return 'WhatsApp';
      default: return 'Join Class';
    }
  };

  const openCommunicationChannel = (channel, link) => {
    window.open(link, '_blank');
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-green-600';
    if (progress >= 60) return 'from-blue-500 to-blue-600';
    if (progress >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <PortalLayout
      portalType="student"
      portalTitle="Student Portal"
      portalIcon="🏛️"
      user={student}
      onLogout={logout}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
            My Courses
          </h1>
          <p className="text-gray-600">
            Track your progress and continue your Islamic learning journey
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="space-y-6">
          {student?.enrolledCourses?.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                {/* Course Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.instructor}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.completedLessons}/{course.totalLessons} lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Next: {formatDate(course.nextClass)} at {formatTime(course.nextClass)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Currently studying: <span className="font-medium">{course.currentModule}</span>
                    </p>
                  </div>

                  {/* Progress Circle */}
                  <div className="flex-shrink-0 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-200"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className={`text-primary-600`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${course.progress}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Course Progress</span>
                    <span className="text-sm text-gray-600">
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(course.progress)} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Assignments */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Assignments</h4>
                  <div className="space-y-2">
                    {course.assignments?.slice(0, 2).map((assignment) => (
                      <div
                        key={assignment.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          assignment.completed 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-orange-50 border border-orange-200'
                        }`}
                      >
                        {assignment.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${
                            assignment.completed ? 'text-green-800' : 'text-orange-800'
                          }`}>
                            {assignment.title}
                          </div>
                          <div className={`text-xs ${
                            assignment.completed ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {assignment.completed ? 'Completed' : `Due: ${formatDate(assignment.dueDate)}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link to={`/student/course/${course.id}`}>
                    <Button icon={Play}>
                      Continue Learning
                    </Button>
                  </Link>
                  
                  <button
                    onClick={() => openCommunicationChannel(course.communicationChannel, course.channelLink)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{getCommunicationIcon(course.communicationChannel)}</span>
                    <span className="text-sm font-medium">
                      Join via {getCommunicationLabel(course.communicationChannel)}
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Next class: {formatDate(course.nextClass)} at {formatTime(course.nextClass)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {(!student?.enrolledCourses || student.enrolledCourses.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
            <p className="text-gray-600 mb-6">
              Start your Islamic learning journey by enrolling in our courses
            </p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </PortalLayout>
  );
};

export default StudentCourses;