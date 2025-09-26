import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  TrendingUp,
  Award,
  User,
  ExternalLink,
  Play,
  AlertCircle,
  LogOut,
  Settings,
  Bell,
  Calendar,
  Target,
  Star,
  ChevronRight,
  BookmarkCheck,
  Timer,
  Trophy,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const StudentDashboard = () => {
  const { student, logout } = useAuth();
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
      portalType="student"
      portalTitle="Student Portal"
      portalIcon="🏛️"
      user={student}
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
              <span className="text-2xl">{student?.avatar}</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden md:block text-left">
              <div className="font-semibold text-gray-900 text-sm">{student?.name}</div>
              <div className="text-xs text-gray-600">Student</div>
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
                    <span className="text-3xl">{student?.avatar}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{student?.name}</div>
                      <div className="text-sm text-gray-600">Progress: {student?.overallProgress}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <Link 
                    to="/student/profile" 
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
                  <span className="text-4xl">{student?.avatar}</span>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-2">
                      Welcome back, {student?.name}!
                    </h1>
                    <p className="text-white/90 text-lg">
                      Continue your Islamic learning journey
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
                    <span className="text-sm">{student?.certificatesEarned || 0} Certificates</span>
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
                  <div className="text-4xl font-bold text-white mb-2">{student?.overallProgress}%</div>
                  <div className="text-white/80 mb-3">Overall Progress</div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${student?.overallProgress}%` }}
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          {[
            {
              icon: BookOpen,
              value: student?.enrolledCourses?.length || 0,
              label: 'Enrolled Courses',
              color: 'primary',
              gradient: 'from-primary-500 to-primary-600'
            },
            {
              icon: Clock,
              value: `${student?.hoursStudied || 0}h`,
              label: 'Hours Studied',
              color: 'accent',
              gradient: 'from-accent-500 to-accent-600'
            },
            {
              icon: Target,
              value: `${student?.overallProgress || 0}%`,
              label: 'Progress',
              color: 'green',
              gradient: 'from-green-500 to-green-600'
            },
            {
              icon: Award,
              value: student?.certificatesEarned || 0,
              label: 'Certificates',
              color: 'secondary',
              gradient: 'from-secondary-500 to-secondary-600'
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
                      <p className="text-sm text-gray-600">Continue your learning journey</p>
                    </div>
                  </div>
                  <Link to="/student/courses">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
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
                            strokeDasharray={`${course.progress}, 100`}
                            className="text-primary-500 transition-all duration-300"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-700">{course.progress}%</span>
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
                              <User className="h-4 w-4" />
                              <span>{course.instructor}</span>
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
                          animate={{ width: `${course.progress}%` }}
                          transition={{ delay: 0.5 + 0.1 * index, duration: 1, ease: "easeOut" }}
                        />
                      </div>

                      {/* Enhanced Actions */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Link to={`/student/course/${course.id}`}>
                          <Button 
                            size="sm" 
                            icon={Play}
                            className="hover:scale-105 transition-transform shadow-md"
                          >
                            Continue Learning
                          </Button>
                        </Link>
                        <button
                          onClick={() => openCommunicationChannel(course.communicationChannel, course.channelLink)}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl transition-all duration-200 hover:scale-105"
                        >
                          <span className="text-lg">{getCommunicationIcon(course.communicationChannel)}</span>
                          <span className="font-medium">Join Class</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Achievements */}
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-secondary-50 to-accent-50/20 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-secondary-100">
                    <Trophy className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Achievements</h2>
                    <p className="text-sm text-gray-600">Your learning milestones</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student?.achievements?.map((achievement, index) => (
                    <motion.div 
                      key={achievement.id} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-secondary-50/30 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xl">{achievement.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">
                          {achievement.title}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {formatDate(achievement.date)}
                        </div>
                      </div>
                      <Star className="h-5 w-5 text-yellow-500" />
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
                    className="relative pl-4 border-l-3 border-primary-500 hover:border-primary-600 transition-colors"
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
                      className="text-xs bg-primary-100 hover:bg-primary-200 text-primary-700 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <span>{getCommunicationIcon(course.communicationChannel)}</span>
                      Join Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pending Assignments */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50/30 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Assignments</h3>
                    <p className="text-xs text-gray-600">Due soon</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {pendingAssignments.map((assignment, index) => (
                  <motion.div 
                    key={assignment.id} 
                    className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {assignment.title}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {assignment.courseTitle}
                      </div>
                      <div className="text-xs text-orange-600 font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Due: {formatDate(assignment.dueDate)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary-600" />
                Quick Actions
              </h3>
              <Link to="/student/profile">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={User}
                >
                  Edit Profile
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:scale-105 transition-transform" 
                icon={Bell}
              >
                Notifications
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:scale-105 transition-transform" 
                icon={MessageSquare}
              >
                Contact Support
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </PortalLayout>
  );
};

export default StudentDashboard;