// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import ClassDetail from './pages/ClassDetail';
import Classes from './pages/Classes';

const App = () => {
  // Funzione per verificare se l'utente è autenticato
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Componente per proteggere le route
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Route pubblica per il login */}
        <Route path="/login" element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />
        <Route path="/classes/:classId" element={<ClassDetail />} />
        {/* Route protetta per il layout principale */}
        <Route path="/classes/:classId" element={<ClassDetail />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;