// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPages';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Reindirizza alla pagina di login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/results/:resultId" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;