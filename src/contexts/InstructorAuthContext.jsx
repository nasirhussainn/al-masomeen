import React, { createContext, useContext, useState, useEffect } from 'react';

const InstructorAuthContext = createContext();

export const useInstructorAuth = () => {
  const context = useContext(InstructorAuthContext);
  if (!context) {
    throw new Error('useInstructorAuth must be used within an InstructorAuthProvider');
  }
  return context;
};

// Mock instructor data
const mockInstructorData = {
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
  courses: [
    {
      id: 1,
      title: 'Quran Recitation & Tajweed',
      students: [
        { id: 1, name: 'Ahmed Ibrahim', email: 'ahmed.ibrahim@example.com', progress: 75, joinDate: '2024-01-15', avatar: '👨🏻‍🎓', status: 'active' },
        { id: 2, name: 'Fatima Al-Zahra', email: 'fatima.alzahra@example.com', progress: 85, joinDate: '2024-02-01', avatar: '👩🏻‍🎓', status: 'active' },
        { id: 3, name: 'Omar Hassan', email: 'omar.hassan@example.com', progress: 60, joinDate: '2024-03-10', avatar: '👨🏻‍🎓', status: 'active' }
      ],
      totalLessons: 40,
      completedLessons: 30,
      nextClass: '2024-12-30T18:00:00Z',
      schedule: [
        { day: 'Monday', time: '18:00', duration: 60 },
        { day: 'Wednesday', time: '18:00', duration: 60 },
        { day: 'Friday', time: '19:00', duration: 60 }
      ],
      communicationChannel: 'zoom',
      channelLink: 'https://zoom.us/j/1234567890',
      currentModule: 'Advanced Tajweed Rules',
      description: 'Comprehensive course covering proper pronunciation, Tajweed rules, and beautiful recitation of the Holy Quran.',
      assignments: [
        { 
          id: 1, 
          title: 'Recite Surah Al-Fatiha', 
          dueDate: '2024-12-25',
          submissions: [
            { studentId: 1, studentName: 'Ahmed Ibrahim', submitted: true, grade: 85, feedback: 'Excellent pronunciation, minor improvement needed in elongation' },
            { studentId: 2, studentName: 'Fatima Al-Zahra', submitted: true, grade: 90, feedback: 'Perfect recitation with proper Tajweed' },
            { studentId: 3, studentName: 'Omar Hassan', submitted: false, grade: null, feedback: null }
          ]
        },
        { 
          id: 2, 
          title: 'Practice Madd Rules', 
          dueDate: '2024-12-30',
          submissions: [
            { studentId: 1, studentName: 'Ahmed Ibrahim', submitted: false, grade: null, feedback: null },
            { studentId: 2, studentName: 'Fatima Al-Zahra', submitted: false, grade: null, feedback: null },
            { studentId: 3, studentName: 'Omar Hassan', submitted: false, grade: null, feedback: null }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Advanced Quranic Arabic',
      students: [
        { id: 4, name: 'Aisha Mohammed', email: 'aisha.mohammed@example.com', progress: 70, joinDate: '2024-01-20', avatar: '👩🏻‍🎓', status: 'active' },
        { id: 5, name: 'Yusuf Ali', email: 'yusuf.ali@example.com', progress: 55, joinDate: '2024-02-15', avatar: '👨🏻‍🎓', status: 'active' }
      ],
      totalLessons: 35,
      completedLessons: 25,
      nextClass: '2024-12-29T16:00:00Z',
      schedule: [
        { day: 'Tuesday', time: '16:00', duration: 90 },
        { day: 'Thursday', time: '16:00', duration: 90 }
      ],
      communicationChannel: 'teams',
      channelLink: 'https://teams.microsoft.com/l/meetup-join/example',
      currentModule: 'Complex Grammar Structures',
      description: 'Deep dive into classical Arabic grammar with focus on Quranic texts.',
      assignments: [
        { 
          id: 3, 
          title: 'Analyze Surah Al-Baqarah Verse 1-10', 
          dueDate: '2024-12-28',
          submissions: [
            { studentId: 4, studentName: 'Aisha Mohammed', submitted: true, grade: 88, feedback: 'Great analysis, good understanding of grammatical structures' },
            { studentId: 5, studentName: 'Yusuf Ali', submitted: false, grade: null, feedback: null }
          ]
        }
      ]
    }
  ],
  stats: {
    totalStudents: 5,
    activeCourses: 2,
    averageProgress: 69,
    hoursTeaching: 450,
    completionRate: 92
  },
  announcements: [
    {
      id: 1,
      title: 'Holiday Schedule Update',
      content: 'Classes will be suspended from Dec 24-26 for holiday break. Regular schedule resumes Dec 27.',
      date: '2024-12-20',
      priority: 'high',
      courses: [1, 2]
    },
    {
      id: 2,
      title: 'New Learning Materials Available',
      content: 'Updated Tajweed practice sheets are now available in the course materials section.',
      date: '2024-12-18',
      priority: 'medium',
      courses: [1]
    }
  ]
};

export const InstructorAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if instructor was previously logged in
    const savedAuth = localStorage.getItem('instructorAuth');
    if (savedAuth) {
      setIsAuthenticated(true);
      setInstructor(mockInstructorData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call an API
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept specific instructor credentials
    if (email === 'muhammad.alqari@almasomeen.com' || (email && password)) {
      setIsAuthenticated(true);
      setInstructor(mockInstructorData);
      localStorage.setItem('instructorAuth', 'true');
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setInstructor(null);
    localStorage.removeItem('instructorAuth');
  };

  const updateProfile = (updatedData) => {
    // Mock profile update
    setInstructor(prev => ({ ...prev, ...updatedData }));
  };

  const gradeAssignment = (courseId, assignmentId, studentId, grade, feedback) => {
    setInstructor(prev => ({
      ...prev,
      courses: prev.courses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              assignments: course.assignments.map(assignment =>
                assignment.id === assignmentId
                  ? {
                      ...assignment,
                      submissions: assignment.submissions.map(submission =>
                        submission.studentId === studentId
                          ? { ...submission, grade, feedback }
                          : submission
                      )
                    }
                  : assignment
              )
            }
          : course
      )
    }));
  };

  const updateStudentProgress = (courseId, studentId, progress) => {
    setInstructor(prev => ({
      ...prev,
      courses: prev.courses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              students: course.students.map(student =>
                student.id === studentId
                  ? { ...student, progress }
                  : student
              )
            }
          : course
      )
    }));
  };

  const addAnnouncement = (title, content, priority, courses) => {
    const newAnnouncement = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      priority,
      courses
    };
    
    setInstructor(prev => ({
      ...prev,
      announcements: [newAnnouncement, ...prev.announcements]
    }));
  };

  const value = {
    isAuthenticated,
    instructor,
    loading,
    login,
    logout,
    updateProfile,
    gradeAssignment,
    updateStudentProgress,
    addAnnouncement
  };

  return (
    <InstructorAuthContext.Provider value={value}>
      {children}
    </InstructorAuthContext.Provider>
  );
};