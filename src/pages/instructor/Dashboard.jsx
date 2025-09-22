import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Clock, 
  TrendingUp,
  Calendar, 
  ExternalLink,
  Play,
  FileText,
  MessageSquare,
  Star
} from 'lucide-react';
import { useInstructorAuth } from '../../contexts/InstructorAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const InstructorDashboard = () => {
  const { instructor, logout } = useInstructorAuth();

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

  const upcomingClasses = instructor?.courses
    ?.map(course => ({
      ...course,
      nextClassDate: new Date(course.nextClass)
    }))
    .sort((a, b) => a.nextClassDate - b.nextClassDate)
    .slice(0, 3) || [];

  const pendingGrades = instructor?.courses
    ?.flatMap(course => 
      course.assignments
        ?.flatMap(assignment => 
          assignment.submissions
            ?.filter(submission => submission.submitted && !submission.grade)
            .map(submission => ({ 
              ...submission, 
              courseTitle: course.title, 
              assignmentTitle: assignment.title,
              assignmentId: assignment.id,
              courseId: course.id
            }))
        )
    )
    .slice(0, 5) || [];

  const recentAnnouncements = instructor?.announcements?.slice(0, 3) || [];

  return (
    <PortalLayout
      portalType="instructor"
      portalTitle="Instructor Portal"
      portalIcon="🏛️"
      user={instructor}
      onLogout={logout}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-secondary-800 to-primary-800 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-bold mb-2">
                Welcome, {instructor?.name}! {instructor?.avatar}
              </h1>
              <p className="text-white/90 mb-1">
                {instructor?.specialization}
              </p>
              <p className="text-white/80 text-sm">
                Empowering {instructor?.stats?.totalStudents} students in their Islamic learning journey
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-2xl font-bold">{instructor?.stats?.completionRate}%</div>
                <div className="text-sm text-white/80">Average Completion Rate</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {instructor?.stats?.totalStudents || 0}
                </div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-accent-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {instructor?.stats?.activeCourses || 0}
                </div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-secondary-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {instructor?.stats?.hoursTeaching || 0}h
                </div>
                <div className="text-sm text-gray-600">Teaching Hours</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {instructor?.stats?.averageProgress || 0}%
                </div>
                <div className="text-sm text-gray-600">Avg Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {instructor?.stats?.completionRate || 0}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
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
                  <Link to="/instructor/courses">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {instructor?.courses?.map((course, index) => (
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
                          {course.students?.length || 0} students enrolled
                        </p>
                        <p className="text-sm text-gray-600">
                          Current: {course.currentModule}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">
                          {Math.round((course.completedLessons / course.totalLessons) * 100)}%
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
                        style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Link to={`/instructor/course/${course.id}`}>
                        <Button size="sm" icon={Play}>
                          Manage Course
                        </Button>
                      </Link>
                      <button
                        onClick={() => openCommunicationChannel(course.communicationChannel, course.channelLink)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span>{getCommunicationIcon(course.communicationChannel)}</span>
                        Start Class
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Announcements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Announcements</h2>
                  <Link to="/instructor/announcements">
                    <Button variant="outline" size="sm" icon={MessageSquare}>
                      Manage
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentAnnouncements.map((announcement, index) => (
                    <div key={announcement.id} className="border-l-4 border-primary-500 pl-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {announcement.title}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {announcement.content}
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            {formatDate(announcement.date)} · 
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
                              announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {announcement.priority}
                            </span>
                          </div>
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
                  <div key={course.id} className="border-l-4 border-secondary-500 pl-4">
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
                      Start Class
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pending Grades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Pending Grades</h3>
              </div>
              <div className="p-6 space-y-4">
                {pendingGrades.map((submission, index) => (
                  <div key={`${submission.courseId}-${submission.assignmentId}-${submission.studentId}`} className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {submission.assignmentTitle}
                      </div>
                      <div className="text-xs text-gray-600">
                        {submission.studentName} · {submission.courseTitle}
                      </div>
                      <Link 
                        to={`/instructor/course/${submission.courseId}/assignments`}
                        className="text-xs text-primary-600 hover:text-primary-800"
                      >
                        Grade Assignment →
                      </Link>
                    </div>
                  </div>
                ))}
                {pendingGrades.length === 0 && (
                  <p className="text-sm text-gray-500">No pending grades</p>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/instructor/students">
                    <Button variant="outline" size="sm" className="w-full" icon={Users}>
                      View All Students
                    </Button>
                  </Link>
                  <Link to="/instructor/schedule">
                    <Button variant="outline" size="sm" className="w-full" icon={Calendar}>
                      Manage Schedule
                    </Button>
                  </Link>
                  <Link to="/instructor/announcements">
                    <Button variant="outline" size="sm" className="w-full" icon={MessageSquare}>
                      Create Announcement
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default InstructorDashboard;