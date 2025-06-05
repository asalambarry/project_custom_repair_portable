const mongoose = require('mongoose');

const repairRequestSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
  },
  telephone: {
    type: String,
    required: [true, 'Le numéro de téléphone est requis'],
    trim: true
  },
  typeMateriel: {
    type: String,
    required: [true, 'Le type de matériel est requis'],
    trim: true
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La catégorie est requise']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  statut: {
    type: String,
    enum: ['en_attente', 'en_cours', 'terminee'],
    default: 'en_attente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RepairRequest', repairRequestSchema);