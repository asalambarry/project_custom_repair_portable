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
  typeAppareil: {
    type: String,
    required: [true, 'Le type d\'appareil est requis'],
    trim: true
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
});

module.exports = mongoose.model('RepairRequest', repairRequestSchema);