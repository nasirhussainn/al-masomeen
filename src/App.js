import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { InstructorAuthProvider } from './contexts/InstructorAuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import InstructorProtectedRoute from './components/common/InstructorProtectedRoute';
import AdminProtectedRoute from './components/common/AdminProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import BookDemo from './pages/BookDemo';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CourseDetail from './pages/CourseDetail';
import Testimonials from './pages/Testimonials';
// Student Portal Pages
import StudentLogin from './pages/student/Login';
import StudentDashboard from './pages/student/Dashboard';
import StudentCourses from './pages/student/MyCourses';
import StudentProfile from './pages/student/Profile';
import StudentCourseDetail from './pages/student/CourseDetail';
// Instructor Portal Pages
import InstructorLogin from './pages/instructor/Login';
import InstructorDashboard from './pages/instructor/Dashboard';
import InstructorProfile from './pages/instructor/Profile';
import InstructorCourseDetail from './pages/instructor/CourseDetail';
// Admin Portal Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminInstructors from './pages/admin/Instructors';
import AddInstructor from './pages/admin/AddInstructor';
import AssignStudent from './pages/admin/AssignStudent';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <InstructorAuthProvider>
          <AdminAuthProvider>
            <Routes>
              {/* Public routes with main site layout */}
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              <Route path="/about" element={
                <Layout>
                  <About />
                </Layout>
              } />
              <Route path="/courses" element={
                <Layout>
                  <Courses />
                </Layout>
              } />
              <Route path="/course/:id" element={
                <Layout>
                  <CourseDetail />
                </Layout>
              } />
              <Route path="/book-demo" element={
                <Layout>
                  <BookDemo />
                </Layout>
              } />
              <Route path="/contact" element={
                <Layout>
                  <Contact />
                </Layout>
              } />
              <Route path="/faq" element={
                <Layout>
                  <FAQ />
                </Layout>
              } />
              <Route path="/blog" element={
                <Layout>
                  <Blog />
                </Layout>
              } />
              <Route path="/blog/:id" element={
                <Layout>
                  <BlogPost />
                </Layout>
              } />
              <Route path="/testimonials" element={
                <Layout>
                  <Testimonials />
                </Layout>
              } />
              
              {/* Student Portal Routes */}
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/dashboard" element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/courses" element={
                <ProtectedRoute>
                  <StudentCourses />
                </ProtectedRoute>
              } />
              <Route path="/student/profile" element={
                <ProtectedRoute>
                  <StudentProfile />
                </ProtectedRoute>
              } />
              <Route path="/student/course/:courseId" element={
                <ProtectedRoute>
                  <StudentCourseDetail />
                </ProtectedRoute>
              } />

              {/* Instructor Portal Routes - Separate from main site */}
              <Route path="/instructor/login" element={<InstructorLogin />} />
              <Route path="/instructor/dashboard" element={
                <InstructorProtectedRoute>
                  <InstructorDashboard />
                </InstructorProtectedRoute>
              } />
              <Route path="/instructor/profile" element={
                <InstructorProtectedRoute>
                  <InstructorProfile />
                </InstructorProtectedRoute>
              } />
              <Route path="/instructor/course/:courseId" element={
                <InstructorProtectedRoute>
                  <InstructorCourseDetail />
                </InstructorProtectedRoute>
              } />

              {/* Admin Portal Routes - Separate from main site */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/students" element={
                <AdminProtectedRoute>
                  <AdminStudents />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/instructors" element={
                <AdminProtectedRoute>
                  <AdminInstructors />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/instructors/add" element={
                <AdminProtectedRoute>
                  <AddInstructor />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/students/assign" element={
                <AdminProtectedRoute>
                  <AssignStudent />
                </AdminProtectedRoute>
              } />
            </Routes>
          </AdminAuthProvider>
        </InstructorAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;