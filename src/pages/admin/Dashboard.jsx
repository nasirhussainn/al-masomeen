import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck,
  GraduationCap,
  BookOpen, 
  TrendingUp,
  User,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Plus,
  Settings,
  Bell,
  LogOut,
  Calendar,
  ChevronRight,
  Target,
  Timer,
  Trophy
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'student_enrollment': return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'payment_received': return <DollarSign className="h-4 w-4 text-blue-500" />;
      case 'instructor_added': return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case 'course_completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const systemStats = admin?.systemStats || {
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    revenueGrowth: 0,
    activeStudents: 0,
    newStudentsThisMonth: 0,
    activeInstructors: 0,
    completionRate: 0,
    completionGrowth: 0
  };

  const recentStudents = admin?.allStudents?.slice(0, 5) || [];
  const recentInstructors = admin?.allInstructors?.slice(0, 4) || [];
  const recentActivities = admin?.recentActivities?.slice(0, 8) || [];

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
      portalType="admin"
      portalTitle="Admin Portal"
      portalIcon="🏛️"
      user={admin}
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
              <span className="text-2xl">{admin?.avatar}</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden md:block text-left">
              <div className="font-semibold text-gray-900 text-sm">{admin?.name}</div>
              <div className="text-xs text-gray-600">Administrator</div>
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
                    <span className="text-3xl">{admin?.avatar}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{admin?.name}</div>
                      <div className="text-sm text-gray-600">{admin?.role}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <Link 
                    to="/admin/profile" 
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
                  <span className="text-4xl">{admin?.avatar}</span>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-2">
                      Welcome, {admin?.name}!
                    </h1>
                    <p className="text-white/90 text-lg mb-1">
                      {admin?.role} - Al-Masomeen Quran Academy
                    </p>
                    <p className="text-white/80">
                      Managing {systemStats.totalStudents} students, {systemStats.totalInstructors} instructors, and {systemStats.totalCourses} courses
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
                    <span className="text-sm">System Administrator</span>
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
                  <div className="text-4xl font-bold text-white mb-2">{systemStats.completionRate}%</div>
                  <div className="text-white/80 mb-3">System Efficiency</div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${systemStats.completionRate}%` }}
                      transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Notifications Bar */}
          {systemStats.pendingApprovals > 0 && (
            <motion.div 
              className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-white">
                  {systemStats.pendingApprovals} pending approval(s) require your attention
                </span>
              </div>
              <Link to="/admin/pending">
                <Button variant="secondary" size="sm" className="hover:scale-105 transition-transform">
                  Review
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          {[
            {
              icon: DollarSign,
              value: formatCurrency(systemStats.totalRevenue),
              label: 'Total Revenue',
              subtitle: `+${systemStats.revenueGrowth}% this month`,
              color: 'green',
              gradient: 'from-green-500 to-green-600'
            },
            {
              icon: Users,
              value: systemStats.activeStudents,
              label: 'Active Students',
              subtitle: `${systemStats.newStudentsThisMonth} new this month`,
              color: 'blue',
              gradient: 'from-blue-500 to-blue-600'
            },
            {
              icon: GraduationCap,
              value: systemStats.totalInstructors,
              label: 'Total Instructors',
              subtitle: `${systemStats.activeInstructors} active`,
              color: 'purple',
              gradient: 'from-purple-500 to-purple-600'
            },
            {
              icon: TrendingUp,
              value: `${systemStats.completionRate}%`,
              label: 'Completion Rate',
              subtitle: `+${systemStats.completionGrowth}% this month`,
              color: 'orange',
              gradient: 'from-orange-500 to-orange-600'
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
                  <div className={`text-xs font-medium text-${stat.color}-600`}>
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Enhanced Recent Students */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-gray-50 to-primary-50/20 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary-100">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Recent Students</h2>
                      <p className="text-sm text-gray-600">Latest enrollments</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/admin/students">
                      <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                    <Link to="/admin/students/add">
                      <Button size="sm" icon={Plus} className="hover:scale-105 transition-transform">
                        Add Student
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl hover:border-primary-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{student.avatar}</div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.email}</div>
                          <div className="text-xs text-gray-500">
                            Progress: {student.progress}% • {student.instructor}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          student.status === 'active' 
                            ? 'text-green-600 bg-green-100' 
                            : student.status === 'pending'
                            ? 'text-yellow-600 bg-yellow-100'
                            : 'text-red-600 bg-red-100'
                        }`}>
                          {student.status}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(student.enrollmentDate)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Instructors Overview */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-secondary-50 to-accent-50/20 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-secondary-100">
                      <GraduationCap className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Instructors Overview</h2>
                      <p className="text-sm text-gray-600">Teaching staff performance</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/admin/instructors">
                      <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                    <Link to="/admin/instructors/add">
                      <Button size="sm" icon={Plus} className="hover:scale-105 transition-transform">
                        Add Instructor
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentInstructors.map((instructor, index) => (
                    <motion.div
                      key={instructor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className="bg-gradient-to-r from-gray-50 to-secondary-50/30 border border-gray-200 rounded-2xl p-4 hover:border-secondary-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{instructor.avatar}</div>
                        <div>
                          <div className="font-medium text-gray-900">{instructor.name}</div>
                          <div className="text-xs text-gray-500">{instructor.specialization}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1 mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span className="text-gray-500">Students:</span>
                          <span className="ml-1 font-medium">{instructor.totalStudents}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3" />
                          <span className="text-gray-500">Courses:</span>
                          <span className="ml-1 font-medium">{instructor.activeCourses}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Link to={`/admin/instructors/${instructor.id}`}>
                          <Button variant="outline" size="sm" className="w-full hover:scale-105 transition-transform">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary-600" />
                Quick Actions
              </h3>
              <Link to="/admin/students/add">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={Users}
                >
                  Add New Student
                </Button>
              </Link>
              <Link to="/admin/instructors/add">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={GraduationCap}
                >
                  Add New Instructor
                </Button>
              </Link>
              <Link to="/admin/students/assign">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={User}
                >
                  Assign Students
                </Button>
              </Link>
              <Link to="/admin/courses/add">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={BookOpen}
                >
                  Create Course
                </Button>
              </Link>
              <Link to="/admin/reports">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start hover:scale-105 transition-transform" 
                  icon={BarChart3}
                >
                  View Reports
                </Button>
              </Link>
            </motion.div>

            {/* Enhanced Recent Activities */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-accent-50 to-primary-50/30 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent-100">
                    <Activity className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Recent Activities</h3>
                    <p className="text-xs text-gray-600">System updates</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {recentActivities.map((activity, index) => (
                    <motion.div 
                      key={activity.id} 
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 truncate">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Timer className="h-3 w-3" />
                          {formatDate(activity.timestamp)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced System Status */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50/30 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">System Status</h3>
                    <p className="text-xs text-gray-600">All systems operational</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: 'Server Status', status: 'Online', color: 'green' },
                  { label: 'Database', status: 'Connected', color: 'green' },
                  { label: 'Payment Gateway', status: 'Active', color: 'green' },
                  { label: 'Email Service', status: 'Limited', color: 'yellow' }
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 bg-${item.color}-500 rounded-full animate-pulse`}></div>
                      <span className={`text-sm font-medium text-${item.color}-600`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </PortalLayout>
  );
};

export default AdminDashboard;