const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Get the secret key from environment variables.  IMPORTANT!
const secretKey = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex'); // Fallback if not set, but not ideal

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
    console.error("Error registering user:", error); // Log the error for debugging
    return res.status(500).json({ message: 'Errore durante la registrazione.' });
  }
});


router.post('/login', async (req, res) => {
  // ... (login code remains unchanged)
});

module.exports = router;
