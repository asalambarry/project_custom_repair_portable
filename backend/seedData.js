const mongoose = require('mongoose');
const Category = require('./models/Category');
const Service = require('./models/Service');
const User = require('./models/User');
require('dotenv').config();

const categories = [
  {
    nom: 'Réparation Hardware',
    description: 'Réparation et maintenance des composants physiques de votre ordinateur',
    icone: 'fa-microchip'
  },
  {
    nom: 'Maintenance Logicielle',
    description: 'Installation, configuration et optimisation de vos logiciels',
    icone: 'fa-laptop-code'
  },
  {
    nom: 'Sécurité',
    description: 'Protection de vos données et sécurisation de votre système',
    icone: 'fa-shield-alt'
  },
  {
    nom: 'Récupération de Données',
    description: 'Récupération de vos données perdues ou corrompues',
    icone: 'fa-database'
  },
  {
    nom: 'Optimisation',
    description: 'Amélioration des performances de votre ordinateur',
    icone: 'fa-tachometer-alt'
  }
];

const services = [
  // Services de Réparation Hardware
  {
    titre: 'Nettoyage complet PC',
    description: 'Nettoyage approfondi de votre ordinateur, remplacement de la pâte thermique, optimisation des ventilateurs',
    prix: 49.99,
    duree: '2-3 heures',
    image: 'https://i.imgur.com/8XZQZQJ.jpg',
    categorie: 'Réparation Hardware'
  },
  {
    titre: 'Remplacement écran',
    description: 'Remplacement de l\'écran de votre ordinateur portable avec garantie',
    prix: 149.99,
    duree: '1-2 heures',
    image: 'https://i.imgur.com/JQZQZQJ.jpg',
    categorie: 'Réparation Hardware'
  },
  {
    titre: 'Remplacement batterie',
    description: 'Remplacement de la batterie de votre ordinateur portable',
    prix: 79.99,
    duree: '1 heure',
    image: 'https://i.imgur.com/KQZQZQJ.jpg',
    categorie: 'Réparation Hardware'
  },

  // Services de Maintenance Logicielle
  {
    titre: 'Installation Windows',
    description: 'Installation propre de Windows 10/11 avec tous les drivers nécessaires',
    prix: 39.99,
    duree: '1-2 heures',
    image: 'https://i.imgur.com/LQZQZQJ.jpg',
    categorie: 'Maintenance Logicielle'
  },
  {
    titre: 'Installation logiciels',
    description: 'Installation et configuration de vos logiciels professionnels',
    prix: 24.99,
    duree: '1-2 heures',
    image: 'https://i.imgur.com/MQZQZQJ.jpg',
    categorie: 'Maintenance Logicielle'
  },

  // Services de Sécurité
  {
    titre: 'Installation Antivirus',
    description: 'Installation et configuration d\'un antivirus professionnel',
    prix: 29.99,
    duree: '1 heure',
    image: 'https://i.imgur.com/NQZQZQJ.jpg',
    categorie: 'Sécurité'
  },

  // Services de Récupération de Données
  {
    titre: 'Récupération de données',
    description: 'Récupération de vos données perdues suite à un crash ou une suppression accidentelle',
    prix: 99.99,
    duree: '2-4 heures',
    image: 'https://i.imgur.com/OQZQZQJ.jpg',
    categorie: 'Récupération de Données'
  },

  // Services d'Optimisation
  {
    titre: 'Optimisation système',
    description: 'Optimisation complète de votre système pour de meilleures performances',
    prix: 39.99,
    duree: '1-2 heures',
    image: 'https://i.imgur.com/PQZQZQJ.jpg',
    categorie: 'Optimisation'
  },
  {
    titre: 'Diagnostic complet',
    description: 'Diagnostic approfondi de votre système et rapport détaillé',
    prix: 29.99,
    duree: '1-2 heures',
    image: 'https://i.imgur.com/QQZQZQJ.jpg',
    categorie: 'Optimisation'
  }
];

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB');

    // Suppression des données existantes
    await Category.deleteMany({});
    await Service.deleteMany({});
    await User.deleteMany({});
    console.log('Données existantes supprimées');

    // Création des catégories
    const createdCategories = await Category.insertMany(categories);
    console.log('Catégories créées');

    // Création d'un map des catégories par nom
    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.nom] = category._id;
      return map;
    }, {});

    // Association des services aux catégories
    const servicesWithCategories = services.map(service => ({
      ...service,
      categorie: categoryMap[service.categorie]
    }));

    // Création des services
    await Service.insertMany(servicesWithCategories);
    console.log('Services créés');

    // Création de l'utilisateur admin
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin'
    });
    await adminUser.save();
    console.log('Utilisateur admin créé');

    console.log('Base de données initialisée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

seedDatabase();