// server/routes/authRoutes.js


const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importa il modello User
const bcrypt = require('bcrypt'); // Importa bcrypt per la crittografia delle password
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken per la gestione dei token JWT
const crypto = require('crypto');

// Genera una chiave segreta casuale
const secretKey = crypto.randomBytes(32).toString('hex');

// API per la registrazione
router.post('/register', async (req, res) => {
  try {
    const { nome, cognome, email, password, ruolo } = req.body; // Ottieni i dati dal body della richiesta

    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email già registrata.' });
    }
    
    // Genera un token JWT (usa la chiave segreta generata)
    const token = jwt.sign({ userId: user._id }, secretKey);
    
    
    // Cripta la password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 è il numero di salt round

    // Crea un nuovo utente
    const newUser = new User({ 
      nome, 
      cognome, 
      email, 
      password: hashedPassword, // Salva la password criptata
      ruolo 
    });

    // Salva l'utente nel database
    await newUser.save();

    res.status(201).json({ message: 'Utente registrato con successo!' });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: 'Utente registrato con successo!', token });
  }
});

// API per il login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Ottieni i dati dal body della richiesta

    // Trova l'utente nel database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide.' });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenziali non valide.' });
    }

    // Genera un token JWT (usa la chiave segreta generata)
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il login.' });
  }
});

module.exports = router;


// Definiamo una route /register che gestisce le richieste POST per la registrazione.
// Estraiamo i dati nome, cognome, email, password e ruolo dal body della richiesta.
// Creiamo un nuovo utente usando il modello User e i dati estratti.
// Salviamo l'utente nel database usando newUser.save().
// In caso di successo, inviamo una risposta con codice 201 e un messaggio di successo.
// In caso di errore, inviamo una risposta con codice 500 e un messaggio di errore.
// Spiegazione del codice

// API di registrazione (/register)
// Controlla se l'utente esiste già nel database.
// Cripta la password usando bcrypt.
// Crea un nuovo utente con la password criptata.
// Salva l'utente nel database.
// API di login (/login)
// Trova l'utente nel database in base all'email.
// Verifica la password usando bcrypt.compare.
// Genera un token JWT usando jsonwebtoken.
// Invia il token nella risposta.
//  Ho aggiunto la dipendenza bcrypt per la crittografia delle password. Esegui npm install bcrypt nella cartella server per installarla.
// Ho aggiunto la dipendenza jsonwebtoken per la gestione dei token JWT. Esegui npm install jsonwebtoken nella cartella server per installarla.
// Sostituisci 'your_secret_key' con una chiave segreta complessa e sicura.
//  Il token JWT può essere utilizzato per autenticare le richieste successive dell'utente.
// integrare la generazione della chiave segreta con crypto nel file authRoutes.js