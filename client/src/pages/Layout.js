import React, { useState } from 'react';

const Layout = ({ children, userData, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Keep fixed width but adjust visibility */}
      <aside className={`w-64 bg-white shadow-lg fixed md:static h-full z-50 transition-transform duration-300 ${!sidebarOpen ? '-translate-x-full' : ''} md:translate-x-0`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold">Test Platform</span>
          </div>
          
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            
            {userData?.ruolo === 'insegnante' && (
              <>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                    <span className="ml-3">Gestione Test</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 4v16m8-8H4"/>
                    </svg>
                    <span className="ml-3">Crea Test</span>
                  </a>
                </li>
              </>
            )}

            {userData?.ruolo === 'studente' && (
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  <span className="ml-3">I Miei Test</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* Main content area - Add proper spacing and container */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Navigation bar */}
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full z-40">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <span className="text-xl font-semibold ml-2">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              {userData && (
                <span className="text-sm text-gray-600">
                  {userData.nome} {userData.cognome}
                </span>
              )}
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main content with proper padding and container */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;