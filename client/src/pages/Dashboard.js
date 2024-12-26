import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import AvailableTests from "../components/AvailableTests";
import RecentResults from "../components/RecentResults";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Layout userData={userData} onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Stats Overview - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Test Completati */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Test Completati</p>
                <h3 className="text-xl font-bold">0</h3>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              </div>
            </div>
          </div>

          {userData.ruolo === 'insegnante' ? (
            <>
              {/* Statistiche Insegnante */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Test Creati</p>
                    <h3 className="text-xl font-bold">0</h3>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 4v16m8-8H4"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Da Correggere</p>
                    <h3 className="text-xl font-bold">0</h3>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Studenti Attivi</p>
                    <h3 className="text-xl font-bold">0</h3>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Statistiche Studente */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Media Voti</p>
                    <h3 className="text-xl font-bold">-</h3>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Test in Corso</p>
                    <h3 className="text-xl font-bold">0</h3>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions - Adjusted spacing */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Azioni Rapide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userData.ruolo === 'insegnante' ? (
              <>
                <a href="#" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4"/>
                  </svg>
                  <span className="text-sm">Nuovo Test</span>
                </a>
                <a href="#" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  <span className="text-sm">Correggi Test</span>
                </a>
              </>
            ) : (
              <>
                <a href="#" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-sm">Inizia Test</span>
                </a>
                <a href="#" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <span className="text-sm">I Miei Risultati</span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* Test Section - Proper container */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            {userData.ruolo === 'studente' ? 'Test Disponibili' : 'Gestione Test'}
          </h2>
          <div className="max-w-full overflow-x-auto">
            <AvailableTests />
          </div>
        </div>
      </div>
    </Layout>
  ) : null;
}

export default Dashboard;