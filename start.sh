#!/bin/bash

echo "🚀 Démarrage de TechRepair Pro..."

# Arrêter les conteneurs existants
echo "📦 Arrêt des conteneurs existants..."
docker-compose down

# Supprimer le volume MongoDB pour repartir à zéro
echo "🗄️ Suppression du volume MongoDB..."
docker volume rm projet_reparation_pc_mongodb_data 2>/dev/null || true

# Construire et démarrer les conteneurs
echo "🏗️ Construction et démarrage des conteneurs..."
docker-compose up -d --build

# Attendre que MongoDB soit prêt
echo "⏳ Attente du démarrage de MongoDB..."
sleep 15

# Exécuter le script de seed
echo "🌱 Initialisation de la base de données..."
docker-compose exec backend npm run seed

echo "✅ Projet lancé avec succès !"
echo ""
echo "📍 Accès aux services :"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5001"
echo "   MongoDB: localhost:27018"
echo ""
echo "👤 Compte administrateur :"
echo "   Email: admin@techrepair.fr"
echo "   Mot de passe: Admin123!"
echo "   URL Admin: http://localhost:3000/admin/login"
echo ""
echo "📝 Pour voir les logs :"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Pour arrêter :"
echo "   docker-compose down"