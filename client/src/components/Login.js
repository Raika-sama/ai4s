import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('Tentativo di login con:', { email });

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('Risposta dal server:', data);
      
      // Verifica se il login è riuscito (controlla sia il nuovo che il vecchio formato)
      if (response.ok && (data.success || data.token)) {
        console.log('Login riuscito, token ricevuto');
        // Salva il token
        localStorage.setItem('token', data.token);
        
        // Se abbiamo i dati utente, salvali
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        
        // Gestisci "Ricordami"
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Reindirizza alla dashboard
        navigate('/dashboard');
      } else {
        // Gestisci l'errore
        const errorMessage = data.message || 'Errore durante il login. Verifica le tue credenziali.';
        console.log('Errore login:', errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Errore di rete:', error);
      setError('Errore di connessione al server. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Il resto del componente rimane invariato
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
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
          disabled={isLoading}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading}
          className="mr-2"
        />
        <label htmlFor="rememberMe" className="text-gray-700">Ricordami</label>
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Accesso in corso...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;