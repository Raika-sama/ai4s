// src/components/Registration.js

import React, { useState } from 'react';

function Registration() {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ruolo, setRuolo] = useState('studente'); // Di default, il ruolo è 'studente'
  const [error, setError] = useState(null); // Stato per gestire eventuali errori

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impedisce il refresh della pagina al submit
    setError(null); // Resetta l'errore ad ogni submit

    if (password !== confirmPassword) {
      setError('Le password non corrispondono!');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', { // Invia la richiesta all'API /register
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cognome, email, password, ruolo })
      });

      if (response.ok) {
        // Registrazione avvenuta con successo
        console.log('Utente registrato con successo!');
        // TODO: Reindirizza alla pagina di login
      } else {
        // Errore durante la registrazione
        const errorData = await response.json();
        setError(errorData.message || 'Errore durante la registrazione.'); // Imposta il messaggio di errore
      }
    } catch (error) {
      console.error('Errore di rete:', error);
      setError('Errore di rete. Riprova più tardi.'); // Imposta un messaggio di errore generico per errori di rete
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrazione</h2>
      {error && <div className="error">{error}</div>} {/* Mostra l'errore se presente */}
      {/* Input per nome e cognome */}
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="cognome">Cognome:</label>
        <input
          type="text"
          id="cognome"
          value={cognome}
          onChange={(e) => setCognome(e.target.value)}
          required
        />
      </div>
      {/* Input per email */}
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
      {/* Input per password */}
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
      {/* Input per conferma password */}
      <div>
        <label htmlFor="confirmPassword">Conferma password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {/* Select per il ruolo */}
      <div>
        <label htmlFor="ruolo">Ruolo:</label>
        <select 
          id="ruolo" 
          value={ruolo} 
          onChange={(e) => setRuolo(e.target.value)}
        >
          <option value="studente">Studente</option>
          <option value="insegnante">Insegnante</option>
          {/* <option value="amministratore">Amministratore</option> */} {/* Nascondi l'opzione amministratore */}
        </select>
      </div>
      <button type="submit">Registrati</button>
    </form>
  );
}

export default Registration;