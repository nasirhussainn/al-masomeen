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
  Settings,
  BarChart3,
  Plus,
  Bell
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Button from '../../components/ui/Button';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const recentStudents = admin?.allStudents?.slice(0, 5) || [];
  const recentInstructors = admin?.allInstructors?.slice(0, 4) || [];
  const recentActivities = admin?.recentActivities?.slice(0, 8) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">🏛️</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Al-Masomeen Admin Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {admin?.systemStats?.pendingApprovals || 0}
                </span>
              </button>
              <Link to="/admin/profile">
                <Button variant="outline" size="sm" icon={User}>
                  Profile
                </Button>
              </Link>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

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
                Managing {admin?.systemStats?.totalStudents} students, {admin?.systemStats?.totalInstructors} instructors, and {admin?.systemStats?.totalCourses} courses
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{admin?.systemStats?.enrollmentGrowth || 0}%</div>
                <div className="text-sm text-white/80">Growth Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatCurrency(admin?.systemStats?.monthlyRevenue || 0)}</div>
                <div className="text-sm text-white/80">Monthly Revenue</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Students Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {admin?.systemStats?.totalStudents || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
              </div>
              <Link to="/admin/students">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Active: {admin?.systemStats?.activeStudents || 0}</span>
              <span className="text-red-600">Inactive: {admin?.systemStats?.inactiveStudents || 0}</span>
            </div>
          </div>

          {/* Instructors Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {admin?.systemStats?.totalInstructors || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Instructors</div>
                </div>
              </div>
              <Link to="/admin/instructors">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Active: {admin?.systemStats?.activeInstructors || 0}</span>
              <span className="text-red-600">Inactive: {admin?.systemStats?.inactiveInstructors || 0}</span>
            </div>
          </div>

          {/* Courses Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {admin?.systemStats?.totalCourses || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Courses</div>
                </div>
              </div>
              <Link to="/admin/courses">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Active: {admin?.systemStats?.activeCourses || 0}</span>
              <span className="text-blue-600">Completed: {admin?.systemStats?.completedCourses || 0}</span>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(admin?.systemStats?.totalRevenue || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
              </div>
              <Link to="/admin/revenue">
                <Button variant="outline" size="sm">Details</Button>
              </Link>
            </div>
            <div className="text-sm text-green-600">
              Monthly: {formatCurrency(admin?.systemStats?.monthlyRevenue || 0)}
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {admin?.systemStats?.averageProgress || 0}%
                </div>
                <div className="text-sm text-gray-600">Avg Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {admin?.systemStats?.completionRate || 0}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {admin?.systemStats?.recentSignups || 0}
                </div>
                <div className="text-sm text-gray-600">New Signups</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {admin?.systemStats?.supportTickets || 0}
                </div>
                <div className="text-sm text-gray-600">Support Tickets</div>
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
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Students</h2>
                  <div className="flex gap-2">
                    <Link to="/admin/students">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                    <Link to="/admin/students/assign">
                      <Button size="sm" icon={Plus}>Assign Student</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentStudents.map((student, index) => (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.4 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="text-2xl mr-3">{student.avatar}</div>
                              <div>
                                <div className="font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-600">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-900">{student.instructor}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Link to={`/admin/students/${student.id}`}>
                              <Button variant="outline" size="sm">View</Button>
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Recent Instructors */}
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{instructor.avatar}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{instructor.name}</h3>
                            <p className="text-sm text-gray-600">{instructor.specialization}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(instructor.status)}`}>
                          {instructor.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
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
                  <Button variant="outline" size="sm" className="w-full" icon={Plus}>
                    Add New Student
                  </Button>
                </Link>
                <Link to="/admin/instructors/add">
                  <Button variant="outline" size="sm" className="w-full" icon={GraduationCap}>
                    Add New Instructor
                  </Button>
                </Link>
                <Link to="/admin/students/assign">
                  <Button variant="outline" size="sm" className="w-full" icon={Users}>
                    Assign Student to Instructor
                  </Button>
                </Link>
                <Link to="/admin/courses/add">
                  <Button variant="outline" size="sm" className="w-full" icon={BookOpen}>
                    Create New Course
                  </Button>
                </Link>
                <Link to="/admin/reports">
                  <Button variant="outline" size="sm" className="w-full" icon={BarChart3}>
                    Generate Reports
                  </Button>
                </Link>
                <Link to="/admin/settings">
                  <Button variant="outline" size="sm" className="w-full" icon={Settings}>
                    System Settings
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
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* System Health */}
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
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Actions</span>
                  <span className="text-sm font-medium text-orange-600">
                    {admin?.systemStats?.pendingApprovals || 0}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;