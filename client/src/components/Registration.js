import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ruolo, setRuolo] = useState('studente');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Le password non corrispondono!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, cognome, email, password, ruolo })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Salva il token nel localStorage
        localStorage.setItem('token', data.token);
        // Salva anche i dati utente se disponibili
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        navigate('/dashboard');
      } else {
        setError(data.message || 'Errore durante la registrazione');
      }
    } catch (error) {
      console.error('Errore:', error);
      setError('Errore di connessione al server');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Registrazione</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <div className="mb-4">
        <label htmlFor="nome" className="block text-gray-700 mb-2">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cognome" className="block text-gray-700 mb-2">Cognome:</label>
        <input
          type="text"
          id="cognome"
          value={cognome}
          onChange={(e) => setCognome(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Conferma password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="ruolo" className="block text-gray-700 mb-2">Ruolo:</label>
        <select 
          id="ruolo" 
          value={ruolo} 
          onChange={(e) => setRuolo(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="studente">Studente</option>
          <option value="insegnante">Insegnante</option>
        </select>
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Registrati
      </button>
    </form>
  );
}

export default Registration;