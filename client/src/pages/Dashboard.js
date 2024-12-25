import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvailableTests from "../components/AvailableTests";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/users/me", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();
        
        if (response.ok) {
          setUserData(data);
        } else {
          // Se il token non è valido, pulisci il localStorage e reindirizza
          if (response.status === 401) {
            localStorage.removeItem('token');
          }
          setError(data.message || 'Errore nel recupero dei dati utente');
          navigate("/login");
        }
      } catch (error) {
        console.error("Errore di rete:", error);
        setError('Errore di connessione al server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div>Caricamento...</div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500">{error}</div>
    </div>;
  }

  return userData ? (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-lg">Benvenuto, {userData.nome}!</p>
        <p className="text-gray-600">Email: {userData.email}</p>
        <p className="text-gray-600">Ruolo: {userData.ruolo}</p>
      </div>

      <AvailableTests />
    </div>
  ) : null;
}

export default Dashboard;