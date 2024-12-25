// server/app.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000; // Puoi cambiare la porta se necessario
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const resultRoutes = require('./routes/resultRoutes');




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

app.use('/api/auth', authRoutes); // Usa le routes di autenticazione
app.use('/api/users', userRoutes); // Usa le routes degli utenti

app.use('/api/tests', testRoutes); // Usa le routes dei test. Al momento, questa API restituisce tutti i test presenti nel database. In futuro, potremmo aggiungere la logica per filtrare i test in base al ruolo dell'utente o ad altri criteri.

app.use('/api/results', resultRoutes); // Usa le routes dei risultati