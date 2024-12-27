const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { authMiddleware, loginLimiter } = require('../middleware/authMiddleware');

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

    const hashedPassword = await bcrypt.hash(password, 10);
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
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Log della richiesta (senza password)
    console.log('Tentativo di login per email:', email);

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('Utente non trovato:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Credenziali non valide.' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password non valida per utente:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Credenziali non valide.' 
      });
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
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        ruolo: user.ruolo
      }
    });
  } catch (error) {
    console.error('Errore durante il login:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Errore durante il login.' 
    });
  }
});



module.exports = router;