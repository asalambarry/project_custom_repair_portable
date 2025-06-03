const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/repair_pc', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Vérifier si un admin existe déjà
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Un administrateur existe déjà');
      process.exit(0);
    }

    // Créer l'admin
    const admin = new User({
      username: 'admin',
      password: 'admin123', // À changer après la première connexion
      role: 'admin'
    });

    await admin.save();
    console.log('Administrateur créé avec succès');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('IMPORTANT: Changez le mot de passe après la première connexion !');

  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur:', error);
  } finally {
    process.exit(0);
  }
};

createAdmin();