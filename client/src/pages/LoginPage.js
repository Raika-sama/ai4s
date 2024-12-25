// src/pages/LoginPage.js Questa pagina include i componenti Login e Registration, rendendoli entrambi disponibili all'utente.

import React from 'react';
import Login from '../components/Login'; // Importa il componente Login
import Registration from '../components/Registration'; // Importa il componente Registration

function LoginPage() {
  return (
    <div>
      <h1>Benvenuto in AI4S!</h1>
      <Login /> {/* Renderizza il componente Login */}
      <Registration /> {/* Renderizza il componente Registration */}
    </div>
  );
}

export default LoginPage;