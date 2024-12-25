import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvailableTests from "../components/AvailableTests"; // Importa il componente AvailableTests

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Aggiungi uno stato per l'autenticazione

  useEffect(() => {
    const fetchUserData = async () => {
      try {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Log the token

        if (!token) {
          // Reindirizza solo se l'utente non è autenticato
          if (!isAuthenticated) {
            navigate("/login");
          }
          return;
        }

        const response = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    console.log("Response from /api/users/me:", response); // Log the response object
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setIsAuthenticated(true); // Imposta l'utente come autenticato
        } else {
      console.error("Errore nel recupero dei dati utente:", response.status, await response.text()); // Log the response status and body
          navigate("/login");
        }
      } catch (error) {
    console.error("Errore di rete dettagliato:", error); // Log the error object
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, isAuthenticated]); // Aggiungi isAuthenticated alle dipendenze

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  return userData ? (
    <div>
      <h1>Dashboard</h1>
      <p>Benvenuto, {userData.nome}!</p>
      <AvailableTests />
    </div>
  ) : null;
}
export default Dashboard;