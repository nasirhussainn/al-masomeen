import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  TrendingUp,
  Award,
  User,
  ExternalLink,
  Play,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const { student } = useAuth();

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

  const openCommunicationChannel = (channel, link) => {
    window.open(link, '_blank');
  };

  const upcomingClasses = student?.enrolledCourses
    ?.map(course => ({
      ...course,
      nextClassDate: new Date(course.nextClass)
    }))
    .sort((a, b) => a.nextClassDate - b.nextClassDate)
    .slice(0, 3) || [];

  const pendingAssignments = student?.enrolledCourses
    ?.flatMap(course => 
      course.assignments
        ?.filter(assignment => !assignment.completed)
        .map(assignment => ({ ...assignment, courseTitle: course.title }))
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto container-padding py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-800 to-accent-800 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-bold mb-2">
                Welcome back, {student?.name}! {student?.avatar}
              </h1>
              <p className="text-white/90">
                Continue your Islamic learning journey. You're doing great!
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-2xl font-bold">{student?.overallProgress}%</div>
                <div className="text-sm text-white/80">Overall Progress</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {student?.enrolledCourses?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Enrolled Courses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-accent-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {student?.hoursStudied || 0}h
                </div>
                <div className="text-sm text-gray-600">Hours Studied</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {student?.overallProgress || 0}%
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-secondary-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {student?.certificatesEarned || 0}
                </div>
                <div className="text-sm text-gray-600">Certificates</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                  <Link to="/student/courses">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {student?.enrolledCourses?.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Instructor: {course.instructor}
                        </p>
                        <p className="text-sm text-gray-600">
                          Current: {course.currentModule}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">
                          {course.progress}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Link to={`/student/course/${course.id}`}>
                        <Button size="sm" icon={Play}>
                          Continue
                        </Button>
                      </Link>
                      <button
                        onClick={() => openCommunicationChannel(course.communicationChannel, course.channelLink)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span>{getCommunicationIcon(course.communicationChannel)}</span>
                        Join Class
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Achievements</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {student?.achievements?.map((achievement, index) => (
                    <div key={achievement.id} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
                        <span className="text-lg">{achievement.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {achievement.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDate(achievement.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Classes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Classes</h3>
              </div>
              <div className="p-6 space-y-4">
                {upcomingClasses.map((course, index) => (
                  <div key={course.id} className="border-l-4 border-primary-500 pl-4">
                    <div className="font-medium text-gray-900 text-sm">
                      {course.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(course.nextClass)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatTime(course.nextClass)}
                    </div>
                    <button
                      onClick={() => openCommunicationChannel(course.communicationChannel, course.channelLink)}
                      className="mt-2 text-xs text-primary-600 hover:text-primary-800 flex items-center gap-1"
                    >
                      <span>{getCommunicationIcon(course.communicationChannel)}</span>
                      Join Now
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pending Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Pending Assignments</h3>
              </div>
              <div className="p-6 space-y-4">
                {pendingAssignments.map((assignment, index) => (
                  <div key={assignment.id} className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {assignment.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {assignment.courseTitle}
                      </div>
                      <div className="text-xs text-orange-600">
                        Due: {formatDate(assignment.dueDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6">
                <Link to="/student/profile">
                  <Button variant="outline" size="sm" className="w-full" icon={User}>
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;