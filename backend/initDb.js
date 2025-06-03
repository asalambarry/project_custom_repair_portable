const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const initializeDb = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB');

    // Vérifier si un admin existe déjà
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      // Créer le compte admin par défaut
      const admin = await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      });
      console.log('Compte admin créé avec succès');
    } else {
      console.log('Un compte admin existe déjà');
    }

    // Fermer la connexion
    await mongoose.connection.close();
    console.log('Connexion à MongoDB fermée');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
};

initializeDb();