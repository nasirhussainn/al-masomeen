import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock student data
const mockStudentData = {
  id: 1,
  name: 'Ahmed Ibrahim',
  email: 'ahmed.ibrahim@example.com',
  phone: '+1 (555) 123-4567',
  joinDate: '2024-01-15',
  avatar: '👨🏻‍🎓',
  level: 'Intermediate',
  enrolledCourses: [
    {
      id: 1,
      title: 'Quran Recitation & Tajweed',
      instructor: 'Sheikh Muhammad Al-Qari',
      progress: 75,
      totalLessons: 40,
      completedLessons: 30,
      nextClass: '2024-12-30T18:00:00Z',
      communicationChannel: 'zoom',
      channelLink: 'https://zoom.us/j/1234567890',
      currentModule: 'Advanced Tajweed Rules',
      assignments: [
        { id: 1, title: 'Recite Surah Al-Fatiha', completed: true, dueDate: '2024-12-20' },
        { id: 2, title: 'Practice Madd Rules', completed: false, dueDate: '2024-12-25' }
      ]
    },
    {
      id: 2,
      title: 'Islamic Studies',
      instructor: 'Dr. Fatima Al-Zahra',
      progress: 60,
      totalLessons: 25,
      completedLessons: 15,
      nextClass: '2024-12-29T16:00:00Z',
      communicationChannel: 'teams',
      channelLink: 'https://teams.microsoft.com/l/meetup-join/example',
      currentModule: 'Seerah of Prophet Muhammad (PBUH)',
      assignments: [
        { id: 3, title: 'Essay on Prophetic Character', completed: true, dueDate: '2024-12-18' },
        { id: 4, title: 'Timeline of Major Events', completed: false, dueDate: '2024-12-28' }
      ]
    },
    {
      id: 3,
      title: 'Arabic Language Basics',
      instructor: 'Ustadh Omar Hassan',
      progress: 40,
      totalLessons: 30,
      completedLessons: 12,
      nextClass: '2024-12-31T14:00:00Z',
      communicationChannel: 'whatsapp',
      channelLink: 'https://chat.whatsapp.com/example',
      currentModule: 'Grammar Fundamentals',
      assignments: [
        { id: 5, title: 'Vocabulary Exercise 1', completed: true, dueDate: '2024-12-22' },
        { id: 6, title: 'Grammar Practice', completed: false, dueDate: '2024-12-30' }
      ]
    }
  ],
  achievements: [
    { id: 1, title: 'First Surah Memorized', date: '2024-02-15', icon: '🏆' },
    { id: 2, title: 'Perfect Attendance - Month 1', date: '2024-02-28', icon: '⭐' },
    { id: 3, title: 'Tajweed Excellence', date: '2024-03-15', icon: '🎯' }
  ],
  overallProgress: 58,
  hoursStudied: 120,
  certificatesEarned: 1
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously logged in
    const savedAuth = localStorage.getItem('studentAuth');
    if (savedAuth) {
      setIsAuthenticated(true);
      setStudent(mockStudentData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call an API
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any email/password combination
    if (email && password) {
      setIsAuthenticated(true);
      setStudent(mockStudentData);
      localStorage.setItem('studentAuth', 'true');
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setStudent(null);
    localStorage.removeItem('studentAuth');
  };

  const updateProfile = (updatedData) => {
    // Mock profile update
    setStudent(prev => ({ ...prev, ...updatedData }));
  };

  const markAssignmentComplete = (courseId, assignmentId) => {
    setStudent(prev => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              assignments: course.assignments.map(assignment =>
                assignment.id === assignmentId
                  ? { ...assignment, completed: true }
                  : assignment
              )
            }
          : course
      )
    }));
  };

  const value = {
    isAuthenticated,
    student,
    loading,
    login,
    logout,
    updateProfile,
    markAssignmentComplete
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};