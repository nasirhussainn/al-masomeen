import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Mock admin data with comprehensive statistics
const mockAdminData = {
  id: 1,
  name: 'Admin Al-Masomeen',
  email: 'admin@almasomeen.com',
  phone: '+1 (555) 000-0000',
  joinDate: '2023-01-01',
  avatar: '👨🏻‍💼',
  role: 'Super Admin',
  permissions: ['manage_users', 'manage_courses', 'view_analytics', 'system_settings'],
  
  // System Statistics
  systemStats: {
    totalStudents: 45,
    activeStudents: 42,
    inactiveStudents: 3,
    totalInstructors: 8,
    activeInstructors: 7,
    inactiveInstructors: 1,
    totalCourses: 12,
    activeCourses: 10,
    completedCourses: 2,
    totalRevenue: 125000,
    monthlyRevenue: 15000,
    averageProgress: 73,
    completionRate: 85,
    enrollmentGrowth: 25,
    recentSignups: 8,
    pendingApprovals: 3,
    supportTickets: 5
  },

  // All students in the system
  allStudents: [
    {
      id: 1,
      name: 'Ahmed Ibrahim',
      email: 'ahmed.ibrahim@example.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      avatar: '👨🏻‍🎓',
      level: 'Intermediate',
      status: 'active',
      instructor: 'Sheikh Muhammad Al-Qari',
      courses: ['Quran Recitation & Tajweed', 'Islamic Studies'],
      progress: 75,
      hoursStudied: 120,
      certificatesEarned: 1,
      lastActivity: '2024-12-28',
      enrollmentDate: '2024-01-15',
      paymentStatus: 'paid',
      monthlyFee: 150
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      email: 'fatima.alzahra@example.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2024-02-01',
      avatar: '👩🏻‍🎓',
      level: 'Advanced',
      status: 'active',
      instructor: 'Dr. Fatima Al-Zahra',
      courses: ['Advanced Quranic Arabic', 'Islamic Jurisprudence'],
      progress: 85,
      hoursStudied: 180,
      certificatesEarned: 2,
      lastActivity: '2024-12-27',
      enrollmentDate: '2024-02-01',
      paymentStatus: 'paid',
      monthlyFee: 200
    },
    {
      id: 3,
      name: 'Omar Hassan',
      email: 'omar.hassan@example.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2024-03-10',
      avatar: '👨🏻‍🎓',
      level: 'Beginner',
      status: 'active',
      instructor: 'Ustadh Omar Hassan',
      courses: ['Arabic Language Basics'],
      progress: 40,
      hoursStudied: 60,
      certificatesEarned: 0,
      lastActivity: '2024-12-28',
      enrollmentDate: '2024-03-10',
      paymentStatus: 'pending',
      monthlyFee: 100
    },
    {
      id: 4,
      name: 'Aisha Mohammed',
      email: 'aisha.mohammed@example.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-01-20',
      avatar: '👩🏻‍🎓',
      level: 'Advanced',
      status: 'active',
      instructor: 'Sheikh Muhammad Al-Qari',
      courses: ['Advanced Quranic Arabic', 'Hadith Studies'],
      progress: 90,
      hoursStudied: 220,
      certificatesEarned: 3,
      lastActivity: '2024-12-29',
      enrollmentDate: '2024-01-20',
      paymentStatus: 'paid',
      monthlyFee: 250
    },
    {
      id: 5,
      name: 'Yusuf Ali',
      email: 'yusuf.ali@example.com',
      phone: '+1 (555) 567-8901',
      joinDate: '2024-02-15',
      avatar: '👨🏻‍🎓',
      level: 'Intermediate',
      status: 'inactive',
      instructor: 'Dr. Fatima Al-Zahra',
      courses: ['Islamic History'],
      progress: 30,
      hoursStudied: 45,
      certificatesEarned: 0,
      lastActivity: '2024-12-15',
      enrollmentDate: '2024-02-15',
      paymentStatus: 'overdue',
      monthlyFee: 120
    }
  ],

  // All instructors in the system
  allInstructors: [
    {
      id: 1,
      name: 'Sheikh Muhammad Al-Qari',
      email: 'muhammad.alqari@almasomeen.com',
      phone: '+1 (555) 987-6543',
      joinDate: '2023-01-15',
      avatar: '👨🏻‍🏫',
      specialization: 'Quran Recitation & Tajweed',
      qualification: 'PhD in Islamic Studies, Ijazah in Quran Recitation',
      experience: '15 years',
      languages: ['Arabic', 'English', 'Urdu'],
      status: 'active',
      totalStudents: 25,
      activeCourses: 3,
      rating: 4.9,
      hoursTeaching: 450,
      salary: 5000,
      paymentStatus: 'paid',
      lastActivity: '2024-12-28'
    },
    {
      id: 2,
      name: 'Dr. Fatima Al-Zahra',
      email: 'fatima.alzahra@almasomeen.com',
      phone: '+1 (555) 876-5432',
      joinDate: '2023-02-01',
      avatar: '👩🏻‍🏫',
      specialization: 'Islamic Studies & Arabic Literature',
      qualification: 'PhD in Arabic Literature, MA in Islamic Studies',
      experience: '12 years',
      languages: ['Arabic', 'English', 'French'],
      status: 'active',
      totalStudents: 18,
      activeCourses: 2,
      rating: 4.8,
      hoursTeaching: 380,
      salary: 4800,
      paymentStatus: 'paid',
      lastActivity: '2024-12-27'
    },
    {
      id: 3,
      name: 'Ustadh Omar Hassan',
      email: 'omar.hassan@almasomeen.com',
      phone: '+1 (555) 765-4321',
      joinDate: '2023-03-15',
      avatar: '👨🏻‍🏫',
      specialization: 'Arabic Language & Grammar',
      qualification: 'MA in Arabic Language, Certificate in Teaching Arabic',
      experience: '8 years',
      languages: ['Arabic', 'English'],
      status: 'active',
      totalStudents: 15,
      activeCourses: 2,
      rating: 4.7,
      hoursTeaching: 280,
      salary: 4000,
      paymentStatus: 'paid',
      lastActivity: '2024-12-28'
    },
    {
      id: 4,
      name: 'Sheikh Abdullah Al-Makki',
      email: 'abdullah.almakki@almasomeen.com',
      phone: '+1 (555) 654-3210',
      joinDate: '2023-06-01',
      avatar: '👨🏻‍🏫',
      specialization: 'Hadith Studies & Islamic Jurisprudence',
      qualification: 'PhD in Hadith Studies, MA in Islamic Jurisprudence',
      experience: '20 years',
      languages: ['Arabic', 'English', 'Turkish'],
      status: 'inactive',
      totalStudents: 0,
      activeCourses: 0,
      rating: 4.6,
      hoursTeaching: 0,
      salary: 4500,
      paymentStatus: 'pending',
      lastActivity: '2024-12-01'
    }
  ],

  // All courses in the system
  allCourses: [
    {
      id: 1,
      title: 'Quran Recitation & Tajweed',
      instructor: 'Sheikh Muhammad Al-Qari',
      instructorId: 1,
      students: 15,
      capacity: 20,
      duration: '6 months',
      level: 'All Levels',
      price: 150,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      schedule: ['Monday 18:00', 'Wednesday 18:00', 'Friday 19:00'],
      description: 'Comprehensive course covering proper pronunciation, Tajweed rules, and beautiful recitation of the Holy Quran.',
      category: 'Quran Studies',
      completionRate: 85,
      averageProgress: 78
    },
    {
      id: 2,
      title: 'Islamic Studies',
      instructor: 'Dr. Fatima Al-Zahra',
      instructorId: 2,
      students: 12,
      capacity: 15,
      duration: '4 months',
      level: 'Intermediate',
      price: 120,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      schedule: ['Tuesday 16:00', 'Thursday 16:00'],
      description: 'In-depth study of Islamic history, culture, and fundamental principles.',
      category: 'Islamic Studies',
      completionRate: 90,
      averageProgress: 65
    },
    {
      id: 3,
      title: 'Arabic Language Basics',
      instructor: 'Ustadh Omar Hassan',
      instructorId: 3,
      students: 18,
      capacity: 25,
      duration: '8 months',
      level: 'Beginner',
      price: 100,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-09-01',
      schedule: ['Monday 14:00', 'Wednesday 14:00', 'Friday 14:00'],
      description: 'Foundation course for learning Arabic language, grammar, and vocabulary.',
      category: 'Language Studies',
      completionRate: 75,
      averageProgress: 45
    }
  ],

  // Recent activities
  recentActivities: [
    {
      id: 1,
      type: 'student_enrollment',
      message: 'Ahmed Ibrahim enrolled in Quran Recitation & Tajweed',
      timestamp: '2024-12-28T10:30:00Z',
      actor: 'Ahmed Ibrahim'
    },
    {
      id: 2,
      type: 'payment_received',
      message: 'Payment received from Fatima Al-Zahra - $200',
      timestamp: '2024-12-28T09:15:00Z',
      actor: 'Fatima Al-Zahra'
    },
    {
      id: 3,
      type: 'instructor_added',
      message: 'New instructor Sheikh Abdullah Al-Makki was added',
      timestamp: '2024-12-27T16:45:00Z',
      actor: 'Admin'
    },
    {
      id: 4,
      type: 'course_completed',
      message: 'Aisha Mohammed completed Advanced Quranic Arabic',
      timestamp: '2024-12-27T14:20:00Z',
      actor: 'Aisha Mohammed'
    }
  ]
};

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin was previously logged in
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth) {
      setIsAuthenticated(true);
      setAdmin(mockAdminData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call an API
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept specific admin credentials
    if (email === 'admin@almasomeen.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setAdmin(mockAdminData);
      localStorage.setItem('adminAuth', 'true');
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: 'Invalid admin credentials' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem('adminAuth');
  };

  const updateProfile = (updatedData) => {
    setAdmin(prev => ({ ...prev, ...updatedData }));
  };

  // Admin functions for managing students
  const updateStudentStatus = (studentId, status) => {
    setAdmin(prev => ({
      ...prev,
      allStudents: prev.allStudents.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    }));
  };

  const assignStudentToInstructor = (studentId, instructorId, courseId) => {
    const instructor = mockAdminData.allInstructors.find(i => i.id === instructorId);
    const course = mockAdminData.allCourses.find(c => c.id === courseId);
    
    setAdmin(prev => ({
      ...prev,
      allStudents: prev.allStudents.map(student =>
        student.id === studentId 
          ? { 
              ...student, 
              instructor: instructor?.name || student.instructor,
              courses: course ? [...new Set([...student.courses, course.title])] : student.courses
            }
          : student
      )
    }));
  };

  // Admin functions for managing instructors
  const addInstructor = (instructorData) => {
    const newInstructor = {
      id: Date.now(),
      ...instructorData,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      totalStudents: 0,
      activeCourses: 0,
      rating: 0,
      hoursTeaching: 0,
      paymentStatus: 'pending',
      lastActivity: new Date().toISOString().split('T')[0]
    };

    setAdmin(prev => ({
      ...prev,
      allInstructors: [...prev.allInstructors, newInstructor],
      systemStats: {
        ...prev.systemStats,
        totalInstructors: prev.systemStats.totalInstructors + 1,
        activeInstructors: prev.systemStats.activeInstructors + 1
      }
    }));
  };

  const updateInstructorStatus = (instructorId, status) => {
    setAdmin(prev => ({
      ...prev,
      allInstructors: prev.allInstructors.map(instructor =>
        instructor.id === instructorId ? { ...instructor, status } : instructor
      )
    }));
  };

  const updateSystemStats = () => {
    // Recalculate system statistics
    setAdmin(prev => {
      const activeStudents = prev.allStudents.filter(s => s.status === 'active').length;
      const activeInstructors = prev.allInstructors.filter(i => i.status === 'active').length;
      const activeCourses = prev.allCourses.filter(c => c.status === 'active').length;

      return {
        ...prev,
        systemStats: {
          ...prev.systemStats,
          totalStudents: prev.allStudents.length,
          activeStudents,
          inactiveStudents: prev.allStudents.length - activeStudents,
          totalInstructors: prev.allInstructors.length,
          activeInstructors,
          inactiveInstructors: prev.allInstructors.length - activeInstructors,
          totalCourses: prev.allCourses.length,
          activeCourses
        }
      };
    });
  };

  const value = {
    isAuthenticated,
    admin,
    loading,
    login,
    logout,
    updateProfile,
    updateStudentStatus,
    assignStudentToInstructor,
    addInstructor,
    updateInstructorStatus,
    updateSystemStats
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};