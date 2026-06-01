import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  LayoutDashboard, FolderKanban, Award, MessageSquare, LogOut, Code, User, Menu, X, ArrowLeft
} from 'lucide-react';
import api from '../../utils/api';

const AdminLayout = () => {
  const { user, logout, isAuthenticated, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ projects: 0, skills: 0, contacts: 0 });

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if user session is not active
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Fetch quick metrics on startup
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, skillRes, contactRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/contact')
        ]);
        
        setStats({
          projects: projRes.data.count || 0,
          skills: skillRes.data.count || 0,
          contacts: contactRes.data.count || 0
        });
      } catch (err) {
        // Safe defaults if backend local server is offline
        setStats({ projects: 4, skills: 21, contacts: 0 });
      }
    };

    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated, location.pathname]); // Refresh metrics when view changes

  if (loading || !isAuthenticated) {
    return (
      <div className="section-bg-gradient min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Project Portfolio', path: '/admin/projects', icon: FolderKanban, count: stats.projects },
    { label: 'Skill Sets', path: '/admin/skills', icon: Award, count: stats.skills },
    { label: 'Inbox Messages', path: '/admin/messages', icon: MessageSquare, count: stats.contacts }
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-slate-100">
      
      {/* 1. Mobile Top Bar Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white dark:bg-dark-card border-b border-slate-200 dark:border-dark-cardBorder/50 px-4 flex justify-between items-center z-40">
        <div className="flex items-center space-x-2 font-bold">
          <Code className="h-5 w-5 text-primary-500" />
          <span className="tracking-wide">Admin Workspace</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-dark-bg text-slate-500"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* 2. Responsive Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-dark-card border-r border-slate-200/50 dark:border-dark-cardBorder/50 z-50 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Brand Title */}
        <div className="h-16 border-b border-slate-100 dark:border-dark-cardBorder/40 px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 font-bold text-slate-800 dark:text-white">
            <Code className="h-5.5 w-5.5 text-primary-500" />
            <span className="text-sm tracking-wider uppercase">Sreeraj K T K</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile User Label details */}
        <div className="p-6 border-b border-slate-100 dark:border-dark-cardBorder/40 flex items-center space-x-3 bg-slate-50/50 dark:bg-dark-bg/20">
          <div className="p-2 bg-primary-500/10 rounded-xl text-primary-500 border border-primary-500/10">
            <User className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm truncate">{user?.username || 'Administrator'}</span>
            <span className="text-[10px] text-slate-400 truncate">{user?.email || 'sreerajk8@gmail.com'}</span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-bg/50 hover:text-primary-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-dark-bg text-slate-500'
                  }`}
                >
                  {item.count}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section controls */}
        <div className="p-4 border-t border-slate-100 dark:border-dark-cardBorder/40 space-y-1.5 bg-slate-50/50 dark:bg-dark-bg/25">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            <span>Launch Live Portfolio</span>
          </Link>
          
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* 3. Sub-Pages Render Container */}
      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0 min-h-screen flex flex-col">
        <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {/* Render children router endpoints */}
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
