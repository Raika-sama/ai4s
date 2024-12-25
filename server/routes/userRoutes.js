// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const authMiddleware = require('../middleware/authMiddleware'); // Importa il middleware di autenticazione

// API per ottenere i dati dell'utente autenticato
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user contiene i dati dell'utente autenticato (grazie al middleware)
    const user = await User.findById(req.user.userId); // Ottieni l'utente dal database

    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato.' });
    }

    // Restituisci i dati dell'utente (escludi la password)
    res.json({ 
      _id: user._id,
      nome: user.nome, 
      cognome: user.cognome, 
      email: user.email, 
      ruolo: user.ruolo 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore nel recupero dei dati utente.' });
  }
});

module.exports = router;

// Definiamo una route /me che gestisce le richieste GET per ottenere i dati dell'utente autenticato.
// Utilizziamo authMiddleware (che creeremo tra poco) per verificare che l'utente sia autenticato.
// Se l'utente è autenticato, req.user conterrà i dati dell'utente estratti dal token JWT.
// Recuperiamo l'utente dal database usando User.findById.
// Restituiamo i dati dell'utente nella risposta, escludendo la password.