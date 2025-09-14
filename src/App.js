import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
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
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/testimonials" element={<Testimonials />} />
            
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
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;