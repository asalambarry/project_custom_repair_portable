const { MongoClient } = require('mongodb');

// Images attractives pour la réparation PC
const pcRepairImages = {
  // Diagnostic et Dépannage
  'Diagnostic Complet': 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // Réparation d'écran
  'Réparation Écran': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // Remplacement carte mère
  'Remplacement Carte Mère': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // Récupération de données
  'Récupération de Données': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // Maintenance générale
  'Maintenance': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // Réparation laptop
  'Réparation Laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // Images par défaut pour différents types
  'default_laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default_desktop': 'https://images.unsplash.com/photo-1587202372634-32705e3f87f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default_motherboard': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default_screen': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default_data': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default_repair': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

// Fonction pour obtenir une image appropriée
function getAppropriateImage(title, description) {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();

  // Correspondances exactes
  if (pcRepairImages[title]) {
    return pcRepairImages[title];
  }

  // Correspondances par mots-clés
  if (titleLower.includes('écran') || titleLower.includes('screen') || descLower.includes('écran')) {
    return pcRepairImages['default_screen'];
  }

  if (titleLower.includes('laptop') || titleLower.includes('portable') || descLower.includes('laptop')) {
    return pcRepairImages['default_laptop'];
  }

  if (titleLower.includes('carte mère') || titleLower.includes('motherboard') || descLower.includes('carte mère')) {
    return pcRepairImages['default_motherboard'];
  }

  if (titleLower.includes('données') || titleLower.includes('data') || descLower.includes('données')) {
    return pcRepairImages['default_data'];
  }

  if (titleLower.includes('diagnostic') || titleLower.includes('dépannage') || descLower.includes('diagnostic')) {
    return pcRepairImages['Diagnostic Complet'];
  }

  // Image par défaut
  return pcRepairImages['default_repair'];
}

async function updateServiceImages() {
  const client = new MongoClient('mongodb://admin:password123@localhost:27018/repair_pc?authSource=admin');

  try {
    await client.connect();
    console.log('✅ Connexion à MongoDB réussie');

    const db = client.db('repair_pc');
    const servicesCollection = db.collection('services');

    // Récupérer tous les services
    const services = await servicesCollection.find({}).toArray();
    console.log(`📋 ${services.length} services trouvés`);

    let updatedCount = 0;

    for (const service of services) {
      const newImage = getAppropriateImage(service.titre, service.description);

      if (service.image !== newImage) {
        await servicesCollection.updateOne(
          { _id: service._id },
          { $set: { image: newImage } }
        );

        console.log(`🖼️  Image mise à jour pour "${service.titre}"`);
        console.log(`   Ancienne: ${service.image}`);
        console.log(`   Nouvelle: ${newImage}`);

        updatedCount++;
      }
    }

    console.log(`\n✨ Mise à jour terminée: ${updatedCount} services mis à jour`);

    // Afficher le résumé des services avec leurs nouvelles images
    console.log('\n📸 Résumé des images des services:');
    const updatedServices = await servicesCollection.find({}).toArray();
    updatedServices.forEach((service, index) => {
      console.log(`${index + 1}. ${service.titre}`);
      console.log(`   Image: ${service.image}`);
      console.log(`   Prix: ${service.prix}€ - Durée: ${service.duree}`);
      console.log();
    });

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
  } finally {
    await client.close();
    console.log('🔌 Connexion fermée');
  }
}

// Exécuter le script
updateServiceImages();