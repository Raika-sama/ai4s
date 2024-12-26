// server/app.js
require('dotenv').config();
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

// Configurazione CORS più permissiva per sviluppo
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Il resto del codice rimane invariato...
const uri = process.env.MONGODB_URI || "mongodb+srv://RaikaSama:5LxHzpgip4CNxPMx@ai4sdb.7leax.mongodb.net/?retryWrites=true&w=majority&appName=ai4sDB";

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

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/results', resultRoutes);

app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server funzionante!' 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Errore interno del server' 
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});