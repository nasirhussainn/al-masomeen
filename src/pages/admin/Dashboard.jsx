import React from 'react';
import { motion } from 'framer-motion';
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
  Plus
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();

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

  return (
    <PortalLayout
      portalType="admin"
      portalTitle="Admin Portal"
      portalIcon="🏛️"
      user={admin}
      onLogout={logout}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-gray-800 via-primary-800 to-secondary-800 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-bold mb-2">
                Welcome, {admin?.name}! {admin?.avatar}
              </h1>
              <p className="text-white/90 mb-1">
                {admin?.role} - Al-Masomeen Quran Academy
              </p>
              <p className="text-white/80 text-sm">
                Managing {systemStats.totalStudents} students, {systemStats.totalInstructors} instructors, and {systemStats.totalCourses} courses
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold">{systemStats.totalStudents}</div>
                <div className="text-sm text-white/80">Total Students</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{systemStats.totalInstructors}</div>
                <div className="text-sm text-white/80">Instructors</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{systemStats.totalCourses}</div>
                <div className="text-sm text-white/80">Courses</div>
              </div>
            </div>
          </div>

          {/* Notifications Bar */}
          {systemStats.pendingApprovals > 0 && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">
                  {systemStats.pendingApprovals} pending approval(s) require your attention
                </span>
              </div>
              <Link to="/admin/pending">
                <Button variant="secondary" size="sm">
                  Review
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Revenue */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(systemStats.totalRevenue)}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-xs text-green-600 font-medium">
                  +{systemStats.revenueGrowth}% this month
                </div>
              </div>
            </div>
          </div>

          {/* Active Students */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {systemStats.activeStudents}
                </div>
                <div className="text-sm text-gray-600">Active Students</div>
                <div className="text-xs text-blue-600 font-medium">
                  {systemStats.newStudentsThisMonth} new this month
                </div>
              </div>
            </div>
          </div>

          {/* Total Instructors */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {systemStats.totalInstructors}
                </div>
                <div className="text-sm text-gray-600">Total Instructors</div>
                <div className="text-xs text-purple-600 font-medium">
                  {systemStats.activeInstructors} active
                </div>
              </div>
            </div>
          </div>

          {/* Course Completion Rate */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {systemStats.completionRate}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
                <div className="text-xs text-orange-600 font-medium">
                  +{systemStats.completionGrowth}% this month
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Students */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Students</h2>
                  <div className="flex gap-2">
                    <Link to="/admin/students">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                    <Link to="/admin/students/add">
                      <Button size="sm" icon={Plus}>Add Student</Button>
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
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-200 transition-colors"
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
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === 'active' 
                            ? 'text-green-600 bg-green-100' 
                            : student.status === 'pending'
                            ? 'text-yellow-600 bg-yellow-100'
                            : 'text-red-600 bg-red-100'
                        }`}>
                          {student.status}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {formatDate(student.enrollmentDate)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Instructors Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Instructors Overview</h2>
                  <div className="flex gap-2">
                    <Link to="/admin/instructors">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                    <Link to="/admin/instructors/add">
                      <Button size="sm" icon={Plus}>Add Instructor</Button>
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
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{instructor.avatar}</div>
                        <div>
                          <div className="font-medium text-gray-900">{instructor.name}</div>
                          <div className="text-xs text-gray-500">{instructor.specialization}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>
                          <span className="text-gray-500">Students:</span>
                          <span className="ml-1 font-medium">{instructor.totalStudents}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Courses:</span>
                          <span className="ml-1 font-medium">{instructor.activeCourses}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Link to={`/admin/instructors/${instructor.id}`}>
                          <Button variant="outline" size="sm" className="w-full">View Details</Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <Link to="/admin/students/add">
                  <Button variant="outline" size="sm" className="w-full" icon={Users}>
                    Add New Student
                  </Button>
                </Link>
                <Link to="/admin/instructors/add">
                  <Button variant="outline" size="sm" className="w-full" icon={GraduationCap}>
                    Add New Instructor
                  </Button>
                </Link>
                <Link to="/admin/students/assign">
                  <Button variant="outline" size="sm" className="w-full" icon={User}>
                    Assign Students
                  </Button>
                </Link>
                <Link to="/admin/courses/add">
                  <Button variant="outline" size="sm" className="w-full" icon={BookOpen}>
                    Create Course
                  </Button>
                </Link>
                <Link to="/admin/reports">
                  <Button variant="outline" size="sm" className="w-full" icon={BarChart3}>
                    View Reports
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">System Status</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Gateway</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-600">Limited</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default AdminDashboard;