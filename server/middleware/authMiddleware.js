// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Ottieni il token dall'header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Autenticazione richiesta.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Verifica il token (usa la stessa chiave segreta)
    req.user = decoded; // Aggiungi i dati decodificati a req.user
    next(); // Prosegui con la richiesta
  } catch (error) {
    res.status(401).json({ message: 'Token non valido.' });
  }
};

module.exports = authMiddleware;


// Ottiene il token JWT dall'header Authorization della richiesta.
// Verifica il token usando jwt.verify.
// Se il token è valido, estrae i dati dell'utente e li aggiunge a req.user.
// Se il token non è valido, invia una risposta con codice 401.