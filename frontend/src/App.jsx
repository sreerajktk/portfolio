import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Portals
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Administrative Dashboard
import AdminLayout from './pages/Admin/AdminLayout';
import ProjectManager from './pages/Admin/ProjectManager';
import SkillManager from './pages/Admin/SkillManager';
import MessageManager from './pages/Admin/MessageManager';

// Public Page Outer Layout (Includes global sticky Navbar & Footer)
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          {/* Public Portfolio Route Group */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Portfolio />} />
          </Route>

          {/* Secure Admin Authentication portal */}
          <Route path="/login" element={<Login />} />

          {/* Protected Administrative Dashboard CMS Group */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Redirect bare /admin to projects grid */}
            <Route index element={<Navigate to="/admin/projects" replace />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="skills" element={<SkillManager />} />
            <Route path="messages" element={<MessageManager />} />
          </Route>

          {/* Standard 404 custom viewport */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
