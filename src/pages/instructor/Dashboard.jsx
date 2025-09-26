import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Star,
  User,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Timer,
  Trophy,
  Target,
  BookmarkCheck,
  AlertCircle
} from 'lucide-react';
import { useInstructorAuth } from '../../contexts/InstructorAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const InstructorDashboard = () => {
  const { instructor, logout } = useInstructorAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <PortalLayout
      portalType="instructor"
      portalTitle="Instructor Portal"
      portalIcon="🏛️"
      user={instructor}
      onLogout={logout}
    >
      {/* Floating User Menu */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-xl shadow-lg border border-gray-200/50 rounded-2xl px-4 py-3 hover:bg-white transition-all duration-300"
          >
            <div className="relative">
              <span className="text-2xl">{instructor?.avatar}</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden md:block text-left">
              <div className="font-semibold text-gray-900 text-sm">{instructor?.name}</div>
              <div className="text-xs text-gray-600">Instructor</div>
            </div>
            <Settings className="h-4 w-4 text-gray-400" />
          </motion.button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl shadow-xl border border-gray-200/50 rounded-2xl overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{instructor?.avatar}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{instructor?.name}</div>
                      <div className="text-sm text-gray-600">{instructor?.specialization}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <Link 
                    to="/instructor/profile" 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Profile Settings</span>
                  </Link>
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Notifications</span>
                  </button>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button 
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Welcome Header */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-accent-800 rounded-3xl p-8 mb-8"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-4xl">{instructor?.avatar}</span>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-2">
                      Welcome, {instructor?.name}!
                    </h1>
                    <p className="text-white/90 text-lg mb-1">
                      {instructor?.specialization}
                    </p>
                    <p className="text-white/80">
                      Empowering {instructor?.stats?.totalStudents} students in their Islamic learning journey
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-6 text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    <span className="text-sm">{instructor?.stats?.totalStudents} Students</span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="text-center md:text-right"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">{instructor?.stats?.completionRate}%</div>
                  <div className="text-white/80 mb-3">Average Completion Rate</div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${instructor?.stats?.completionRate}%` }}
                      transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8"
        >
          {[
            {
              icon: Users,
              value: instructor?.stats?.totalStudents || 0,
              label: 'Total Students',
              color: 'primary',
              gradient: 'from-primary-500 to-primary-600'
            },
            {
              icon: BookOpen,
              value: instructor?.stats?.activeCourses || 0,
              label: 'Active Courses',
              color: 'accent',
              gradient: 'from-accent-500 to-accent-600'
            },
            {
              icon: Clock,
              value: `${instructor?.stats?.hoursTeaching || 0}h`,
              label: 'Teaching Hours',
              color: 'secondary',
              gradient: 'from-secondary-500 to-secondary-600'
            },
            {
              icon: TrendingUp,
              value: `${instructor?.stats?.averageProgress || 0}%`,
              label: 'Avg Progress',
              color: 'green',
              gradient: 'from-green-500 to-green-600'
            },
            {
              icon: Star,
              value: `${instructor?.stats?.completionRate || 0}%`,
              label: 'Completion Rate',
              color: 'yellow',
              gradient: 'from-yellow-500 to-yellow-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Courses */}
          <div className="xl:col-span-3">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-gray-50 to-primary-50/20 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary-100">
                      <BookOpen className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                      <p className="text-sm text-gray-600">Manage your teaching courses</p>
                    </div>
                  </div>
                  <Link to="/instructor/courses">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
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
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="group relative bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Progress Ring */}
                    <div className="absolute top-4 right-4">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-200" />
                          <circle 
                            cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" 
                            strokeDasharray={`${Math.round((course.completedLessons / course.totalLessons) * 100)}, 100`}
                            className="text-primary-500 transition-all duration-300"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-700">
                            {Math.round((course.completedLessons / course.totalLessons) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pr-20">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-primary-100 group-hover:bg-primary-200 transition-colors">
                          <BookOpen className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-primary-700 transition-colors">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students?.length || 0} students enrolled</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookmarkCheck className="h-4 w-4" />
                              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 bg-gray-100 rounded-lg px-3 py-1 inline-block">
                            Current: {course.currentModule}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full shadow-sm"
                          initial={{ width: 0 }}
                          animate={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                          transition={{ delay: 0.5 + 0.1 * index, duration: 1, ease: "easeOut" }}
                        />
                      </div>

                      {/* Enhanced Actions */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Link to={`/instructor/course/${course.id}`}>
                          <Button 
                            size="sm" 
                            icon={Play}
                            className="hover:scale-105 transition-transform shadow-md"
                          >
                            Manage Course
                          </Button>
                        </Link>
                        <button
                          onClick={() => openCommunicationChannel(course.communicationChannel, course.channelLink)}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl transition-all duration-200 hover:scale-105"
                        >
                          <span className="text-lg">{getCommunicationIcon(course.communicationChannel)}</span>
                          <span className="font-medium">Start Class</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Recent Announcements */}
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-secondary-50 to-accent-50/20 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-secondary-100">
                      <MessageSquare className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Recent Announcements</h2>
                      <p className="text-sm text-gray-600">Your latest updates</p>
                    </div>
                  </div>
                  <Link to="/instructor/announcements">
                    <Button variant="outline" size="sm" icon={MessageSquare} className="hover:scale-105 transition-transform">
                      Manage
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentAnnouncements.map((announcement, index) => (
                    <motion.div 
                      key={announcement.id} 
                      className="border-l-4 border-primary-500 pl-4 p-3 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-r-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-1">
                            {announcement.title}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {announcement.content}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(announcement.date)}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
                              announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {announcement.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Upcoming Classes */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-primary-50 to-accent-50/30 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-100">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Upcoming Classes</h3>
                    <p className="text-xs text-gray-600">Next sessions</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {upcomingClasses.map((course, index) => (
                  <motion.div 
                    key={course.id} 
                    className="relative pl-4 border-l-3 border-secondary-500 hover:border-secondary-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="font-medium text-gray-900 text-sm mb-1">
                      {course.title}
                    </div>
                    <div className="text-xs text-gray-600 mb-2 flex items-center gap-2">
                      <Timer className="h-3 w-3" />
                      {formatDate(course.nextClass)}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      {formatTime(course.nextClass)}
                    </div>
                    <button
                      onClick={() => openCommunicationChannel(course.communicationChannel, course.channelLink)}
                      className="text-xs bg-secondary-100 hover:bg-secondary-200 text-secondary-700 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <span>{getCommunicationIcon(course.communicationChannel)}</span>
                      Start Class
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pending Grades */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50/30 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Pending Grades</h3>
                    <p className="text-xs text-gray-600">Need attention</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {pendingGrades.map((submission, index) => (
                  <motion.div 
                    key={`${submission.courseId}-${submission.assignmentId}-${submission.studentId}`} 
                    className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <FileText className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {submission.assignmentTitle}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {submission.studentName} · {submission.courseTitle}
                      </div>
                      <Link 
                        to={`/instructor/course/${submission.courseId}/assignments`}
                        className="text-xs text-orange-600 hover:text-orange-800 font-medium"
                      >
                        Grade Assignment →
                      </Link>
                    </div>
                  </motion.div>
                ))}
                {pendingGrades.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No pending grades</p>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary-600" />
                Quick Actions
              </h3>
              <Link to="/instructor/students">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={Users}
                >
                  View All Students
                </Button>
              </Link>
              <Link to="/instructor/schedule">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={Calendar}
                >
                  Manage Schedule
                </Button>
              </Link>
              <Link to="/instructor/announcements">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={MessageSquare}
                >
                  Create Announcement
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </PortalLayout>
  );
};

export default InstructorDashboard;