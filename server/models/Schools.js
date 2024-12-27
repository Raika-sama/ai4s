const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true 
    },
    codice_meccanografico: {
        type: String,
        required: true,
        unique: true
    },
    tipo_istituto: {
        type: String,
        required: true,
        enum: ['primo_grado', 'secondo_grado', 'entrambi']
    },
    indirizzo_scolastico: [{
        type: String,
        // Esempio: ['liceo_scientifico', 'liceo_classico']
        // Richiesto solo se tipo_istituto include secondo_grado
    }],
    // Dati geografici
    regione: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    citta: {
        type: String,
        required: true
    },
    indirizzo: {
        type: String,
        required: true
    },
    // Contatti
    email_istituzionale: {
        type: String,
        required: true
    },
    referente: {
        nome: String,
        cognome: String,
        email: String,
        telefono: String
    },
    // Metadata
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

// Middleware pre-save per aggiornare updated_at
schoolSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;