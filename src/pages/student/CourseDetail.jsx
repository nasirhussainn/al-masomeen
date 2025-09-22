import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  Calendar,
  ExternalLink,
  User,
  BookOpen,
  AlertCircle,
  Download,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const StudentCourseDetail = () => {
  const { courseId } = useParams();
  const { student, markAssignmentComplete, logout } = useAuth();
  
  const course = student?.enrolledCourses?.find(c => c.id === parseInt(courseId));

  if (!course) {
    return (
      <PortalLayout
        portalType="student"
        portalTitle="Student Portal"
        portalIcon="🏛️"
        user={student}
        onLogout={logout}
      >
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Course not found</h2>
            <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
            <Link to="/student/courses">
              <Button>Back to My Courses</Button>
            </Link>
          </div>
        </div>
      </PortalLayout>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  const openCommunicationChannel = () => {
    window.open(course.channelLink, '_blank');
  };

  const handleMarkComplete = (assignmentId) => {
    markAssignmentComplete(course.id, assignmentId);
  };

  // Mock lesson data - in a real app, this would come from the backend
  const lessons = [
    { id: 1, title: 'Introduction to Tajweed', completed: true, duration: '45 min' },
    { id: 2, title: 'Arabic Alphabet and Pronunciation', completed: true, duration: '60 min' },
    { id: 3, title: 'Basic Tajweed Rules', completed: true, duration: '50 min' },
    { id: 4, title: 'Madd (Elongation) Rules', completed: false, duration: '55 min', current: true },
    { id: 5, title: 'Qalqalah (Echo) Rules', completed: false, duration: '45 min' },
    { id: 6, title: 'Advanced Pronunciation Techniques', completed: false, duration: '70 min' },
  ];

  return (
    <PortalLayout
      portalType="student"
      portalTitle="Student Portal"
      portalIcon="🏛️"
      user={student}
      onLogout={logout}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/student/courses"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Courses
        </Link>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8"
        >
          <div className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Next: {formatDate(course.nextClass)} at {formatTime(course.nextClass)}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Currently studying: <span className="font-medium text-gray-900">{course.currentModule}</span>
                </p>
              </div>

              {/* Progress and Actions */}
              <div className="flex-shrink-0">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary-600">{course.progress}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <div className="flex gap-3">
                  <Button icon={Play}>
                    Continue Learning
                  </Button>
                  <button
                    onClick={openCommunicationChannel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{getCommunicationIcon(course.communicationChannel)}</span>
                    <span className="text-sm font-medium">Join Class</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary-600 to-accent-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lessons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Course Lessons</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                        lesson.current 
                          ? 'border-primary-200 bg-primary-50' 
                          : lesson.completed
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : lesson.current ? (
                          <Play className="h-6 w-6 text-primary-600" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          lesson.current ? 'text-primary-900' : 'text-gray-900'
                        }`}>
                          Lesson {lesson.id}: {lesson.title}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                          {lesson.current && <span className="text-primary-600 font-medium">Current</span>}
                          {lesson.completed && <span className="text-green-600 font-medium">Completed</span>}
                        </div>
                      </div>
                      {lesson.current && (
                        <Button size="sm" icon={Play}>
                          Start
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Assignments</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {course.assignments?.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`p-4 rounded-lg border ${
                        assignment.completed 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-orange-200 bg-orange-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {assignment.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className={`font-medium ${
                              assignment.completed ? 'text-green-800' : 'text-orange-800'
                            }`}>
                              {assignment.title}
                            </div>
                            <div className={`text-sm ${
                              assignment.completed ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {assignment.completed 
                                ? 'Completed' 
                                : `Due: ${formatDate(assignment.dueDate)}`
                              }
                            </div>
                          </div>
                        </div>
                        {!assignment.completed && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkComplete(assignment.id)}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Class Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Next Class</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-lg font-bold text-primary-800">
                    {formatDate(course.nextClass)}
                  </div>
                  <div className="text-sm text-primary-600">
                    {formatTime(course.nextClass)}
                  </div>
                </div>
                
                <button
                  onClick={openCommunicationChannel}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all"
                >
                  <span className="text-lg">{getCommunicationIcon(course.communicationChannel)}</span>
                  <span>Join via {getCommunicationLabel(course.communicationChannel)}</span>
                  <ExternalLink className="h-4 w-4" />
                </button>

                <div className="text-center text-sm text-gray-600">
                  Click to open your communication platform
                </div>
              </div>
            </motion.div>

            {/* Course Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Course Resources</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Course Handbook</span>
                  <Download className="h-4 w-4 text-gray-400 ml-auto" />
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Tajweed Rules Reference</span>
                  <Download className="h-4 w-4 text-gray-400 ml-auto" />
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Practice Exercises</span>
                  <Download className="h-4 w-4 text-gray-400 ml-auto" />
                </button>
              </div>
            </motion.div>

            {/* Instructor Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Your Instructor</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{course.instructor}</div>
                    <div className="text-sm text-gray-600">Certified Quran Teacher</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Experienced Islamic scholar with over 10 years of teaching experience in Quranic studies and Tajweed.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default StudentCourseDetail;