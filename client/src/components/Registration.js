// src/components/Registration.js

import React, { useState } from 'react';

function Registration() {
  // Utilizziamo useState per gestire lo stato dei campi di input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impedisce il refresh della pagina al submit

    // TODO: Inviare i dati al backend per la registrazione
    if (password !== confirmPassword) {
      alert('Le password non corrispondono!');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit}> {/* Gestisce l'invio del form */}
      <h2>Registrazione</h2>
      <div>
        <label htmlFor="email">Email:</label> {/* Etichetta per il campo email */}
        <input
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Aggiorna lo stato email al cambiamento del valore
          required // Campo obbligatorio
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label> {/* Etichetta per il campo password */}
        <input
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Aggiorna lo stato password al cambiamento del valore
          required // Campo obbligatorio
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Conferma password:</label> {/* Etichetta per il campo conferma password */}
        <input
          type="password" 
          id="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} // Aggiorna lo stato confirmPassword al cambiamento del valore
          required // Campo obbligatorio
        />
      </div>
      <button type="submit">Registrati</button> {/* Bottone per inviare il form */}
    </form>
  );
}

export default Registration;