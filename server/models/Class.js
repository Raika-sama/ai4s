const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome della classe è obbligatorio']
  },
  sezione: {
    type: String,
    required: [true, 'La sezione è obbligatoria']
  },
  annoScolastico: {
    type: String,
    required: [true, "L'anno scolastico è obbligatorio"],
    default: () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      // Se siamo dopo agosto, l'anno scolastico è year/year+1, altrimenti year-1/year
      return month >= 8 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
    }
  },
  scuola: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: [true, 'La scuola è obbligatoria']
  },
  docenti: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indice composto per evitare duplicati di nome+sezione nella stessa scuola e anno
classSchema.index({ nome: 1, sezione: 1, scuola: 1, annoScolastico: 1 }, { unique: true });
// Middleware pre-save per aggiornare updatedAt
classSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
const Class = mongoose.model('Class', classSchema);

module.exports = Class;