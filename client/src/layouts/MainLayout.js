import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Menu, User, LogOut, Settings } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import SchoolPage from '../pages/SchoolPage';

const MainLayout = () => {
  const navigate = useNavigate(); // Hook correttamente importato
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user || data);
        } else {
          throw new Error('Token validation failed');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="min-h-screen h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-xl font-semibold">Test Platform</span>
          </div>

          {/* User menu */}
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
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 bg-gray-50
          ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schools" element={<SchoolPage />} />  {/* Aggiungi questa linea */}
            {/* Aggiungi altre route quando crei nuove pagine */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;