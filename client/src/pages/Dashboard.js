import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvailableTests from "../components/AvailableTests";
import RecentResults from "../components/RecentResults";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      // Mostra i dati in cache mentre verifichiamo il token
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Benvenuto, {userData.nome} {userData.cognome}!
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informazioni Utente</h2>
        <div className="grid gap-2">
          <p><span className="font-medium">Email:</span> {userData.email}</p>
          <p><span className="font-medium">Ruolo:</span> {userData.ruolo.charAt(0).toUpperCase() + userData.ruolo.slice(1)}</p>
        </div>
      </div>

      {userData.ruolo === 'studente' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Disponibili</h2>
          <div> {/* Puoi usare un div per contenere la lista */}
          <AvailableTests /> {/* Inserisci il componente qui */}
        </div>
        </div>
      )}

      {userData.ruolo === 'insegnante' && (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Gestione Test</h2>
        <div> {/* Puoi usare un div per contenere la lista */}
          <AvailableTests /> {/* Inserisci il componente qui */}
        </div>
        {/* ... */}
      </div>
    )}
    </div>
  ) : null;
  
  
  
}

export default Dashboard;