import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search,
  UserX,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Button from '../../components/ui/Button';
import PortalLayout from '../../components/common/PortalLayout';

const UserRegistrations = () => {
  const { admin, logout } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);

  // Mock data for demonstration - in real app, this would come from the context/API
  const mockRegistrations = [
    {
      id: 1,
      name: "Ahmad Hassan",
      email: "ahmad.hassan@email.com",
      phone: "+1 (555) 123-4567",
      registrationDate: "2024-01-15",
      status: "pending",
      instructor: null,
      preferredSubject: "Quran Recitation",
      level: "Beginner",
      avatar: "🧑‍🎓",
      notes: "New student, very eager to learn"
    },
    {
      id: 2,
      name: "Fatima Ali",
      email: "fatima.ali@email.com",
      phone: "+1 (555) 234-5678",
      registrationDate: "2024-01-14",
      status: "unassigned",
      instructor: null,
      preferredSubject: "Arabic Language",
      level: "Intermediate",
      avatar: "👩‍🎓",
      notes: "Has some prior Arabic knowledge"
    },
    {
      id: 3,
      name: "Omar Abdullah",
      email: "omar.abdullah@email.com",
      phone: "+1 (555) 345-6789",
      registrationDate: "2024-01-13",
      status: "assigned",
      instructor: "Ustaz Muhammad",
      preferredSubject: "Tajweed",
      level: "Advanced",
      avatar: "👨‍🎓",
      notes: "Advanced student, wants to perfect Tajweed"
    },
    {
      id: 4,
      name: "Aisha Rahman",
      email: "aisha.rahman@email.com",
      phone: "+1 (555) 456-7890",
      registrationDate: "2024-01-12",
      status: "unassigned",
      instructor: null,
      preferredSubject: "Quran Memorization",
      level: "Beginner",
      avatar: "👩‍🎓",
      notes: "Wants to start Hifz program"
    },
    {
      id: 5,
      name: "Yusuf Ibrahim",
      email: "yusuf.ibrahim@email.com",
      phone: "+1 (555) 567-8901",
      registrationDate: "2024-01-11",
      status: "pending",
      instructor: null,
      preferredSubject: "Islamic Studies",
      level: "Intermediate",
      avatar: "🧑‍🎓",
      notes: "Adult learner, flexible schedule"
    }
  ];

  const availableInstructors = admin?.allInstructors || [
    { id: 1, name: "Ustaz Muhammad", specialization: "Quran Recitation", students: 15, maxStudents: 20 },
    { id: 2, name: "Ustazah Khadijah", specialization: "Arabic Language", students: 12, maxStudents: 18 },
    { id: 3, name: "Ustaz Abdullah", specialization: "Tajweed", students: 18, maxStudents: 20 },
    { id: 4, name: "Ustazah Maryam", specialization: "Quran Memorization", students: 10, maxStudents: 15 },
    { id: 5, name: "Ustaz Ibrahim", specialization: "Islamic Studies", students: 14, maxStudents: 20 }
  ];

  const registrations = mockRegistrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'text-green-600 bg-green-100';
      case 'unassigned': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAssignInstructor = (student) => {
    setSelectedStudent(student);
    setSelectedInstructor('');
    setAssignmentModalOpen(true);
  };

  const handleSubmitAssignment = () => {
    if (selectedStudent && selectedInstructor) {
      const instructor = availableInstructors.find(inst => inst.id === parseInt(selectedInstructor));
      console.log(`Assigning ${selectedStudent.name} to ${instructor.name}`);
      
      // In real app, this would call the actual API
      // assignInstructorToStudent(selectedStudent.id, selectedInstructor);
      
      alert(`Successfully assigned ${selectedStudent.name} to ${instructor.name}!`);
      setAssignmentModalOpen(false);
      setSelectedStudent(null);
      setSelectedInstructor('');
    }
  };

  const unassignedCount = registrations.filter(r => r.status === 'unassigned').length;
  const pendingCount = registrations.filter(r => r.status === 'pending').length;
  const assignedCount = registrations.filter(r => r.status === 'assigned').length;

  return (
    <PortalLayout
      portalType="admin"
      portalTitle="Admin Portal"
      portalIcon="🏛️"
      user={admin}
      onLogout={logout}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Registrations</h1>
              <p className="text-gray-600 mt-2">
                Manage new registrations and assign instructors to students
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin/students">
                <Button variant="outline" icon={Users}>
                  View All Students
                </Button>
              </Link>
              <Link to="/admin/instructors">
                <Button variant="outline" icon={GraduationCap}>
                  View Instructors
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{registrations.length}</div>
                <div className="text-sm text-gray-600">Total Registrations</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{pendingCount}</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <UserX className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{unassignedCount}</div>
                <div className="text-sm text-gray-600">Unassigned</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{assignedCount}</div>
                <div className="text-sm text-gray-600">Assigned</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="unassigned">Unassigned</option>
                <option value="assigned">Assigned</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Registrations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              Registrations ({registrations.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preferred Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration, index) => (
                  <motion.tr
                    key={registration.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{registration.avatar}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                          <div className="text-xs text-gray-500">{registration.level}</div>
                          <div className="text-xs text-gray-400">{registration.notes}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center text-gray-900">
                          <Mail className="h-3 w-3 mr-1" />
                          {registration.email}
                        </div>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {registration.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{registration.preferredSubject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {registration.instructor || (
                          <span className="text-gray-400 italic">Not assigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(registration.registrationDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!registration.instructor && (
                          <Button
                            size="sm"
                            onClick={() => handleAssignInstructor(registration)}
                            className="text-xs"
                          >
                            Assign Instructor
                          </Button>
                        )}
                        {registration.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {registrations.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No registrations found matching your criteria.</p>
            </div>
          )}
        </motion.div>

        {/* Assignment Modal */}
        {assignmentModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Assign Instructor
              </h3>
              
              {selectedStudent && (
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Assigning instructor to:</div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">{selectedStudent.avatar}</span>
                    <div>
                      <div className="font-medium text-gray-900">{selectedStudent.name}</div>
                      <div className="text-sm text-gray-600">{selectedStudent.preferredSubject} • {selectedStudent.level}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Instructor
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                >
                  <option value="">Choose an instructor...</option>
                  {availableInstructors
                    .filter(inst => inst.students < inst.maxStudents)
                    .map(instructor => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.name} - {instructor.specialization} ({instructor.students}/{instructor.maxStudents} students)
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setAssignmentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitAssignment}
                  disabled={!selectedInstructor}
                >
                  Assign
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default UserRegistrations;