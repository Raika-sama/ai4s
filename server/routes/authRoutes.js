// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

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
    return res.status(201).json({ message: 'Utente registrato con successo!', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Errore durante la registrazione.' });
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

    const token = jwt.sign({ userId: user._id }, secretKey);
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Errore durante il login.' });
  }
});

module.exports = router;