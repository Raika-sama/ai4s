const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classRoutes = require('./routes/classRoutes');  // Aggiungiamo questa linea

const app = express();

// Middleware di base
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Connessione al database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connesso al database MongoDB'))
  .catch(err => console.error('Errore di connessione al database:', err));

// Middleware di logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/classes', classRoutes);  // Aggiungiamo questa linea

// Gestione degli errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Errore interno del server',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Risorsa non trovata'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});

module.exports = app;