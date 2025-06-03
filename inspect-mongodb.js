const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import des modèles
const Category = require('./backend/models/Category');
const Service = require('./backend/models/Service');
const User = require('./backend/models/User');
const RepairRequest = require('./backend/models/RepairRequest');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27018/repair_pc?authSource=admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

const inspectDatabase = async () => {
  console.log('\n🔧 ===== INSPECTION BASE DE DONNÉES TechRepair Pro =====\n');

  try {
    // 1. Vérifier les catégories
    console.log('📁 ===== CATÉGORIES =====');
    const categories = await Category.find({});
    console.log(`Nombre de catégories: ${categories.length}\n`);

    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.nom}`);
      console.log(`   ID: ${cat._id}`);
      console.log(`   Description: ${cat.description}`);
      console.log(`   Image: ${cat.image ? cat.image.substring(0, 50) + '...' : 'Aucune'}`);
      console.log('');
    });

    // 2. Vérifier les services
    console.log('🛠️  ===== SERVICES =====');
    const services = await Service.find({}).populate('categorie');
    console.log(`Nombre de services: ${services.length}\n`);

    services.forEach((service, index) => {
      console.log(`${index + 1}. ${service.titre}`);
      console.log(`   ID: ${service._id}`);
      console.log(`   Prix: ${service.prix}€`);
      console.log(`   Durée: ${service.duree}`);
      console.log(`   Catégorie: ${service.categorie ? service.categorie.nom : 'Non définie'}`);
      console.log(`   Description: ${service.description}`);
      console.log('');
    });

    // 3. Vérifier les utilisateurs
    console.log('👥 ===== UTILISATEURS =====');
    const users = await User.find({}).select('-password'); // Exclure les mots de passe
    console.log(`Nombre d'utilisateurs: ${users.length}\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.prenom} ${user.nom}`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Rôle: ${user.role}`);
      console.log(`   Créé le: ${user.createdAt ? user.createdAt.toLocaleDateString('fr-FR') : 'Non défini'}`);
      console.log('');
    });

    // 4. Vérifier les demandes de réparation
    console.log('📋 ===== DEMANDES DE RÉPARATION =====');
    const repairRequests = await RepairRequest.find({}).populate('service');
    console.log(`Nombre de demandes: ${repairRequests.length}\n`);

    if (repairRequests.length > 0) {
      repairRequests.forEach((request, index) => {
        console.log(`${index + 1}. ${request.prenom} ${request.nom}`);
        console.log(`   ID: ${request._id}`);
        console.log(`   Email: ${request.email}`);
        console.log(`   Téléphone: ${request.telephone}`);
        console.log(`   Service: ${request.service ? request.service.titre : 'Non défini'}`);
        console.log(`   Matériel: ${request.materiel}`);
        console.log(`   Problème: ${request.description}`);
        console.log(`   Statut: ${request.statut}`);
        console.log(`   Date: ${request.createdAt ? request.createdAt.toLocaleDateString('fr-FR') : 'Non définie'}`);
        console.log('');
      });
    } else {
      console.log('Aucune demande de réparation trouvée.');
    }

    // 5. Statistiques globales
    console.log('📊 ===== STATISTIQUES =====');
    console.log(`Total catégories: ${categories.length}`);
    console.log(`Total services: ${services.length}`);
    console.log(`Total utilisateurs: ${users.length}`);
    console.log(`Total demandes: ${repairRequests.length}`);

    const adminUsers = users.filter(u => u.role === 'admin');
    console.log(`Administrateurs: ${adminUsers.length}`);

    console.log('\n✅ Inspection terminée avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors de l\'inspection:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Connexion MongoDB fermée');
  }
};

// Fonction principale
const main = async () => {
  await connectDB();
  await inspectDatabase();
};

// Gestion des arguments en ligne de commande
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🔧 INSPECTION MONGODB - TechRepair Pro

Usage: node inspect-mongodb.js [options]

Options:
  --help, -h     Afficher cette aide
  --categories   Afficher seulement les catégories
  --services     Afficher seulement les services
  --users        Afficher seulement les utilisateurs
  --requests     Afficher seulement les demandes

Exemples:
  node inspect-mongodb.js
  node inspect-mongodb.js --categories
  node inspect-mongodb.js --services --users
`);
  process.exit(0);
}

// Exécution
main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});