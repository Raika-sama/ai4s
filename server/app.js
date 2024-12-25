// server/app.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000; // Puoi cambiare la porta se necessario

// Stringa di connessione a MongoDB Atlas
const uri = "mongodb+srv://RaikaSama:5LxHzpgip4CNxPMx@ai4sdb.7leax.mongodb.net/?retryWrites=true&w=majority&appName=ai4sDB"; 

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

// Definizione di una semplice route per testare il server
app.get('/', (req, res) => {
  res.send('Ciao dal server!');
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});