const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du service est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description du service est requise'],
    trim: true
  },
  prix: {
    type: Number,
    required: [true, 'Le prix du service est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('Service', serviceSchema);