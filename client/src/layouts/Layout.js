import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  School,
  GraduationCap,
  Users,
  ClipboardList,
  Settings,
  User,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // ... (mantieni la logica di autenticazione esistente) ...

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Scuole', path: '/schools', icon: School },
    { title: 'Classi', path: '/classes', icon: GraduationCap },
    { title: 'Studenti', path: '/students', icon: Users },
    { title: 'Test', path: '/tests', icon: ClipboardList }
  ];

  return (
    <div className="min-h-screen h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Logo"
                className="h-8 w-8"
                onError={(e) => e.target.src = 'https://via.placeholder.com/32'} 
              />
              <span className="ml-2 text-xl font-semibold">Test Platform</span>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              {userData && (
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium">{userData.nome} {userData.cognome}</div>
                  <div className="text-xs text-gray-500">{userData.email}</div>
                </div>
              )}
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                {/* ... (mantieni il menu utente esistente) ... */}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar and Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900 text-white transition-all duration-300
            ${isSidebarOpen ? 'w-64' : 'w-20'} z-40`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-3 top-4 bg-white text-gray-900 p-1 rounded-full shadow-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* Navigation Menu */}
          <nav className="mt-6 px-3">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {isSidebarOpen && (
                    <span className="ml-3">{item.title}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          className={`flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 bg-gray-50
            ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
        >
          <div className="p-6 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;