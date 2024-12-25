// src/components/Login.js

import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/login', { // Invia la richiesta all'API /login
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // Login avvenuto con successo
        const data = await response.json();
        const token = data.token; 

        // Salva il token JWT (es. in localStorage)
        localStorage.setItem('token', token);

        // TODO: Reindirizza l'utente alla pagina protetta
        console.log('Login avvenuto con successo!');
      } else {
        // Errore durante il login
        const errorData = await response.json();
        setError(errorData.message || 'Errore durante il login.');
      }
    } catch (error) {
      console.error('Errore di rete:', error);
      setError('Errore di rete. Riprova più tardi.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="rememberMe">Ricordami</label>
      </div>
      <button type="submit">Login</button>
      {/* TODO: Link per il recupero password */}
      {/* <a href="/recupero-password">Password dimenticata?</a> */} 
    </form>
  );
}

export default Login;


// Gestisce l'invio del form di login.
// Invia una richiesta POST all'API /login con email e password.
// Se il login ha successo, salva il token JWT in localStorage.
// Gestisce gli errori di login e di rete.
// Ho incluso la gestione degli errori e la memorizzazione del token JWT in localStorage.
// Il codice per reindirizzare l'utente alla pagina protetta e per il recupero password è ancora da implementare (// TODO: ...).