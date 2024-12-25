// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailableTests from '../components/AvailableTests'; // Importa il componente AvailableTests

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Stato per indicare il caricamento

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Errore nel recupero dei dati utente');
          navigate('/login');
        }
      } catch (error) {
        console.error('Errore di rete:', error);
        // Gestisci l'errore di rete (es. mostra un messaggio di errore)
      } finally {
        setIsLoading(false); // Imposta isLoading a false dopo la richiesta, indipendentemente dal risultato
      }
    };

    fetchUserData();
  }, [navigate]);

  // Renderizza la dashboard solo se i dati utente sono disponibili e il caricamento è terminato
  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  if (!userData) {
    return <div>Errore nel caricamento dei dati utente.</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Benvenuto, {userData.nome}!</p>

      {/* Includi il componente AvailableTests */}
      <AvailableTests /> 

      {/* TODO: Aggiungi le altre sezioni della dashboard */}
    </div>
  );
}

export default Dashboard;


// Ho aggiunto isLoading per gestire lo stato di caricamento e mostrare un messaggio "Caricamento..." mentre i dati utente vengono recuperati.
// Ho aggiunto un controllo per gestire il caso in cui userData sia null dopo il caricamento, mostrando un messaggio di errore.
// Ho incluso il componente AvailableTests nella dashboard.