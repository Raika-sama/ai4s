// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Se non c'è un token, reindirizza alla pagina di login
          navigate('/login'); 
          return;
        }

        const response = await fetch('/api/users/me', { // Sostituisci con l'endpoint corretto per ottenere i dati dell'utente
          headers: {
            'Authorization': `Bearer ${token}` // Invia il token nell'header Authorization
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Gestisci l'errore (es. token non valido)
          console.error('Errore nel recupero dei dati utente');
          navigate('/login'); 
        }
      } catch (error) {
        console.error('Errore di rete:', error);
        // Gestisci l'errore di rete
      }
    };

    fetchUserData();
  }, [navigate]); // Esegui l'effetto solo al montaggio del componente

  // Renderizza la dashboard solo se i dati utente sono disponibili
  if (!userData) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Benvenuto, {userData.nome}!</p> {/* Mostra il nome dell'utente */}

      {/* TODO: Aggiungi le altre sezioni della dashboard */}
      {/* Esempio: */}
      {/* <AvailableTests /> */}
      {/* <RecentResults /> */}
    </div>
  );
}

export default Dashboard;


Spiegazione del codice

// Utilizza useNavigate per reindirizzare l'utente alla pagina di login se non è autenticato.
// Utilizza useState per memorizzare i dati dell'utente.
// Utilizza useEffect per recuperare i dati dell'utente dal backend tramite un'API protetta (che richiede il token JWT).
// Mostra un messaggio di benvenuto con il nome dell'utente.
// Include un placeholder per le altre sezioni della dashboard (AvailableTests, RecentResults, etc.).