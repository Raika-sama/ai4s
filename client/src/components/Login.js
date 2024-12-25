import React, { useState } from 'react';

function Login() {
  // Utilizziamo useState per gestire lo stato dei campi di input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Stato per la checkbox "Ricordami"

  const handleSubmit = (event) => {
    event.preventDefault(); // Impedisce il refresh della pagina al submit

    // TODO: Inviare i dati al backend per l'autenticazione
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Ricordami:', rememberMe);
  };

  return (
    <form onSubmit={handleSubmit}> {/* Gestisce l'invio del form */}
      <h2>Login</h2>
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
        <input 
          type="checkbox" 
          id="rememberMe" 
          checked={rememberMe} 
          onChange={(e) => setRememberMe(e.target.checked)} // Aggiorna lo stato rememberMe 
        />
        <label htmlFor="rememberMe">Ricordami</label> {/* Etichetta per la checkbox */}
      </div>
      <button type="submit">Login</button> {/* Bottone per inviare il form */}
      <a href="/recupero-password">Password dimenticata?</a> {/* Link per il recupero password */}
    </form>
  );
}

export default Login;