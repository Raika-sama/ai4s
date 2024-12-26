// src/components/Sidebar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  School,
  GraduationCap,
  Users,
  ClipboardList
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Scuole', path: '/schools', icon: School },
    { title: 'Classi', path: '/classes', icon: GraduationCap },
    { title: 'Studenti', path: '/students', icon: Users },
    { title: 'Test', path: '/tests', icon: ClipboardList }
  ];

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900 text-white 
      transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} z-40`}>
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
              {isOpen && (
                <span className="ml-3">{item.title}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;