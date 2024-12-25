// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authenticateJWT = require('../middleware/authMiddleware'); //Import the middleware


// Get the secret key from environment variables.  IMPORTANT!
const secretKey = process.env.JWT_SECRET;

//Check if the secret key is defined, otherwise throw an error
if(!secretKey){
    throw new Error("JWT_SECRET environment variable not defined.");
}

router.post('/register', async (req, res) => {
  try {
    const { nome, cognome, email, password, ruolo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email già registrata.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      nome, 
      cognome, 
      email, 
      password: hashedPassword,
      ruolo 
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, secretKey);
        return res.status(201).json({ 
        message: 'Utente registrato con successo!', 
        token,
        user: {
            nome: newUser.nome,
            email: newUser.email,
            ruolo: newUser.ruolo
        }
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante la registrazione.' });
    }
  });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenziali non valide.' });
    }

    const token = jwt.sign(
      { 
          userId: user._id,
          email: user.email,
          ruolo: user.ruolo 
      }, 
      secretKey,
      { 
          expiresIn: '24h' // Token expires in 24 hours
      }
  );
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Errore durante il login.' });
  }
});

//This was incorrectly nested
  router.get('/users/me', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        const { password, ...userToSend } = user.toObject();
        res.json(userToSend);
    } catch (error) {
        console.error('Errore nel recupero dell\'utente:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
});

module.exports = router;