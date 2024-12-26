import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvailableTests from "../components/AvailableTests";
import RecentResults from "../components/RecentResults";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mantengo intatta la logica di autenticazione esistente
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token recuperato:", token); // Debug

      const cachedUserData = localStorage.getItem("userData");
      console.log("Dati utente in cache:", cachedUserData); // Debug

      if (!token) {
        console.log("Nessun token trovato, reindirizzamento al login"); // Debug
        navigate("/login");
        return;
      }

      if (cachedUserData) {
        setUserData(JSON.parse(cachedUserData));
      }

      try {
        console.log("Invio richiesta a /users/me con token:", token); // Debug
        
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        console.log("Risposta ricevuta:", {
          status: response.status,
          statusText: response.statusText
        }); // Debug

        const data = await response.json();
        console.log("Dati ricevuti:", data); // Debug

        if (response.ok) {
          const userData = data.success ? data.user : data;
          setUserData(userData);
          localStorage.setItem('userData', JSON.stringify(userData));
          setError(null);
        } else {
          if (response.status === 401) {
            console.log("Token non valido, reindirizzamento al login");
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            navigate("/login");
          } else {
            setError(data.message || 'Errore nel recupero dei dati utente');
          }
        }
      } catch (error) {
        console.error("Errore di rete dettagliato:", error);
        setError('Errore di connessione al server');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberedEmail');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Caricamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return userData ? (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside id="sidebar" className={`w-64 bg-white shadow-lg flex-shrink-0 ${!sidebarOpen && 'hidden'} md:block`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap">Test Platform</span>
          </div>
          
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            {userData.ruolo === 'insegnante' && (
              <>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="ml-3">Gestione Test</span>
                  </a>
                </li>
              </>
            )}
            {userData.ruolo === 'studente' && (
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="ml-3">I Miei Test</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="ml-2 text-xl font-semibold">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {userData.nome} {userData.cognome}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Il contenuto principale verrà aggiunto nella prossima iterazione */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Informazioni Utente</h2>
            <div className="grid gap-2">
              <p><span className="font-medium">Email:</span> {userData.email}</p>
              <p><span className="font-medium">Ruolo:</span> {userData.ruolo.charAt(0).toUpperCase() + userData.ruolo.slice(1)}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  ) : null;
}

export default Dashboard;