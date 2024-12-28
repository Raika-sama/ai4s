const express = require('express');
const router = express.Router();
const User = require('../models/Users');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { authMiddleware, loginLimiter } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');
const secretKey = process.env.JWT_SECRET;

if(!secretKey){
    throw new Error("JWT_SECRET environment variable not defined.");
}

router.post('/register', async (req, res) => {
  try {
    const { nome, cognome, email, password, ruolo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email già registrata.' 
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ 
      nome, 
      cognome, 
      email, 
      password: hashedPassword,
      ruolo 
    });

    await newUser.save();
    
    const token = jwt.sign(
      { 
        userId: newUser._id,
        email: newUser.email,
        ruolo: newUser.ruolo 
      }, 
      secretKey,
      { 
        expiresIn: '24h'
      }
    );

    return res.status(201).json({ 
      success: true,
      message: 'Utente registrato con successo!', 
      token,
      user: {
        nome: newUser.nome,
        cognome: newUser.cognome,
        email: newUser.email,
        ruolo: newUser.ruolo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Errore durante la registrazione.' 
    });
  }
});

// Aggiungi il loginLimiter come middleware alla route login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', {email, mongoConnection: mongoose.connection.readyState});
    
    const user = await User.findOne({ email });
    console.log('User found:', !!user);
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenziali non valide' });
    }

    const isMatch = await verifyPassword(user.password, password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Credenziali non valide' });
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        ruolo: user.ruolo 
      }, 
      secretKey,
      { 
        expiresIn: '24h'
      }
    );

    console.log('Login riuscito per utente:', email);

    return res.json({ 
      success: true,
      message: 'Login effettuato con successo!',
      token,
      user: {
        id: user._id,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        ruolo: user.ruolo
      }
    });

  } catch (error) {
    console.error('Errore durante il login:', error);
    res.status(500).json({ success: false, message: 'Errore durante il login' });
  }
});

module.exports = router;