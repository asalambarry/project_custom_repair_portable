const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const Category = require('./models/Category');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const categories = [
  {
    nom: "Réparation Ordinateurs Portables",
    description: "Réparation et maintenance de tous types d'ordinateurs portables",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    nom: "Réparation Ordinateurs de Bureau",
    description: "Services de réparation pour PC fixes et stations de travail",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    nom: "Récupération de Données",
    description: "Récupération de données perdues ou corrompues",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    nom: "Installation Logiciels",
    description: "Installation et configuration de logiciels et systèmes d'exploitation",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const services = [
  {
    titre: "Diagnostic complet",
    description: "Analyse approfondie de votre équipement pour identifier les problèmes",
    prix: 29.99,
    duree: "1-2 heures",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    titre: "Nettoyage complet",
    description: "Nettoyage professionnel de votre ordinateur",
    prix: 49.99,
    duree: "2-3 heures",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    titre: "Remplacement écran",
    description: "Remplacement d'écran pour ordinateurs portables",
    prix: 149.99,
    duree: "1-2 jours",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    titre: "Installation Windows",
    description: "Installation propre de Windows avec sauvegarde des données",
    prix: 79.99,
    duree: "3-4 heures",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    titre: "Récupération données",
    description: "Récupération de données perdues ou corrompues",
    prix: 99.99,
    duree: "1-3 jours",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    titre: "Upgrade RAM",
    description: "Installation de mémoire RAM supplémentaire",
    prix: 69.99,
    duree: "1-2 heures",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const adminUser = {
  email: 'admin@techrepair.fr',
  password: 'Admin123!',
  nom: 'Admin',
  prenom: 'TechRepair',
  role: 'admin'
};

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:password123@mongodb:27017/repair_pc?authSource=admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connecté à MongoDB');

    // Suppression des données existantes
    await Category.deleteMany({});
    await Service.deleteMany({});
    await User.deleteMany({});
    console.log('Données existantes supprimées');

    // Création de l'administrateur
    const hashedPassword = await bcrypt.hash(adminUser.password, 12);
    const admin = new User({
      ...adminUser,
      password: hashedPassword
    });

    // Contourner le middleware de hachage car on a déjà haché le mot de passe
    admin.isModified = () => false;
    await admin.save();

    console.log('Administrateur créé avec succès');
    console.log('Email: admin@techrepair.fr');
    console.log('Mot de passe: Admin123!');

    // Insertion des catégories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} catégories créées`);

    // Association des services avec les catégories
    const servicesWithCategories = services.map((service, index) => ({
      ...service,
      categorie: createdCategories[index % createdCategories.length]._id
    }));

    // Insertion des services
    const createdServices = await Service.insertMany(servicesWithCategories);
    console.log(`${createdServices.length} services créés`);

    console.log('Base de données initialisée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

seedDatabase();