// server/app.js
require('dotenv').config(); // Aggiungi questa riga all'inizio
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

// Importa le routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const resultRoutes = require('./routes/resultRoutes');

// Configurazione CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Aggiungi i metodi permessi
  allowedHeaders: ['Content-Type', 'Authorization'] // Aggiungi gli headers permessi
}));

// Middleware per il parsing del body delle richieste
app.use(express.json());

// Per sicurezza, sposta la stringa di connessione nel file .env
const uri = process.env.MONGODB_URI || "mongodb+srv://RaikaSama:5LxHzpgip4CNxPMx@ai4sdb.7leax.mongodb.net/?retryWrites=true&w=majority&appName=ai4sDB";

// Connessione a MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connessione a MongoDB avvenuta con successo!');
})
.catch(err => {
  console.error('Errore di connessione a MongoDB:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/results', resultRoutes);

// Route di test per verificare che il server funzioni
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server funzionante!' 
  });
});

// Gestione errori globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Errore interno del server' 
  });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});