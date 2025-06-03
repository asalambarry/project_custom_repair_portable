# 🔧 TechRepair Pro

Application web complète de gestion de services de réparation informatique avec interface d'administration.

## 🌟 Fonctionnalités

### Frontend Public
- 🏠 Page d'accueil moderne et responsive
- 🛠️ Catalogue de services de réparation
- 📂 Navigation par catégories
- 📝 Formulaire de demande de réparation
- 📞 Page de contact
- ⚖️ Mentions légales

### Backend Administration
- 🔐 Authentification administrateur sécurisée
- ➕ Création/modification/suppression de catégories
- 🛠️ Gestion complète des services (CRUD)
- 📋 Visualisation des demandes de réparation
- 🗑️ Suppression des demandes traitées

## 🏗️ Architecture Technique

### Technologies Utilisées
- **Frontend**: React 18, Bootstrap 5, React Router
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Base de données**: MongoDB avec Mongoose
- **Containerisation**: Docker & Docker Compose

### Structure du Projet
```
projet_reparation_pc/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── services/        # Services API
│   │   └── pages/           # Pages principales
│   └── Dockerfile
├── backend/                 # API Node.js
│   ├── models/             # Modèles MongoDB
│   ├── routes/             # Routes API
│   ├── controllers/        # Contrôleurs
│   ├── middleware/         # Middlewares
│   └── Dockerfile
├── docker-compose.yml      # Configuration Docker
└── start.sh               # Script de lancement
```

## 🚀 Installation et Démarrage

### Prérequis
- Docker et Docker Compose installés
- Port 3000, 5001 et 27018 disponibles

### Lancement Rapide
```bash
# Rendre le script exécutable
chmod +x start.sh

# Lancer le projet
./start.sh

# Tester le projet (optionnel)
chmod +x test-frontend.sh
./test-frontend.sh
```

### Lancement Manuel
```bash
# Arrêter les conteneurs existants
docker-compose down

# Supprimer le volume MongoDB (optionnel)
docker volume rm projet_reparation_pc_mongodb_data

# Démarrer les services
docker-compose up -d --build

# Initialiser la base de données
docker-compose exec backend npm run seed
```

## 🌐 Accès aux Services

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:5001
- **MongoDB**: localhost:27018

## 👤 Compte Administrateur

- **Email**: admin@techrepair.fr
- **Mot de passe**: Admin123!
- **URL**: http://localhost:3000/admin/login

## 📚 API Endpoints

### Routes Publiques
- `GET /api/services` - Liste des services
- `GET /api/categories` - Liste des catégories
- `POST /api/repair-requests` - Créer une demande
- `POST /api/contact` - Envoyer un message

### Routes Admin (Authentifiées)
- `POST /api/auth/login` - Connexion admin
- `GET/POST/PUT/DELETE /api/admin/categories` - Gestion catégories
- `GET/POST/PUT/DELETE /api/admin/services` - Gestion services
- `GET/DELETE /api/admin/repair-requests` - Gestion demandes

## 🎨 Interface Utilisateur

### Design System
- **Couleurs principales**:
  - Accent: #00ff88 (Vert néon tech)
  - Sombre: #212529
  - Fond: #ffffff
- **Typographie**: Polices system avec fallbacks
- **Responsive**: Mobile-first design
- **Animations**: Transitions fluides CSS

### Composants Principaux
- Navigation moderne avec scroll effects
- Cards interactives pour services/catégories
- Modals pour l'administration
- Tables responsives pour les données
- Footer fixe en bas de page

## 🛠️ Développement

### Commandes Utiles
```bash
# Voir les logs
docker-compose logs -f

# Accéder au container backend
docker-compose exec backend bash

# Accéder au container frontend
docker-compose exec frontend bash

# Redémarrer un service
docker-compose restart backend

# Arrêter tous les services
docker-compose down
```

### Structure de la Base de Données

#### Modèle User
```javascript
{
  email: String,
  password: String (hashé),
  nom: String,
  role: 'admin'
}
```

#### Modèle Category
```javascript
{
  nom: String,
  description: String,
  image: String (URL),
  actif: Boolean
}
```

#### Modèle Service
```javascript
{
  titre: String,
  description: String,
  prix: Number,
  duree: String,
  categorie: ObjectId (ref: Category),
  image: String (URL),
  actif: Boolean
}
```

#### Modèle RepairRequest
```javascript
{
  nom: String,
  email: String,
  telephone: String,
  typeMateriel: String,
  description: String,
  dateCreation: Date
}
```

## 🔒 Sécurité

- Authentification JWT pour les routes admin
- Hachage des mots de passe avec bcryptjs
- Validation des données côté serveur
- Protection CORS configurée
- Variables d'environnement pour les secrets

## 📱 Responsive Design

L'application est entièrement responsive avec:
- Breakpoints Bootstrap 5
- Navigation mobile adaptée
- Tables scrollables sur mobile
- Modals optimisées pour tactile

## 🐛 Dépannage

### Problèmes Courants

#### Port déjà utilisé
```bash
# Vérifier les ports utilisés
lsof -i :3000
lsof -i :5001
lsof -i :27018

# Arrêter le processus
kill -9 <PID>
```

#### MongoDB ne démarre pas
```bash
# Supprimer le volume et redémarrer
docker volume rm projet_reparation_pc_mongodb_data
docker-compose up mongodb -d
```

#### Erreur de connexion API
- Vérifier que le backend est démarré
- Contrôler les variables d'environnement
- Vérifier les logs: `docker-compose logs backend`

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Créer une Pull Request

---

Développé avec ❤️ pour TechRepair Pro

## 🔧 Corrections Frontend Appliquées

### Problèmes Résolus
- ✅ **ServicesList** : Correction de la gestion des catégories et filtrage
- ✅ **RepairForm** : Correction de l'URL API (/repair-requests) et amélioration UX
- ✅ **CategoryList** : Utilisation du champ `image` au lieu de `icone`
- ✅ **API Services** : Simplification et suppression des fonctions utilitaires problématiques
- ✅ **Navigation** : Cohérence des routes et liens
- ✅ **HomePage** : Redirection vers formulaire de réparation au lieu de pages inexistantes

### Nouvelles Fonctionnalités Frontend
- 🎯 **Filtrage par catégorie** : Interface intuitive pour filtrer les services
- 🔍 **Recherche améliorée** : Recherche en temps réel dans les services
- 📱 **Responsive design** : Adaptation parfaite à tous les écrans
- 🎨 **Images de fallback** : Gestion des erreurs d'images avec icônes par défaut
- ✨ **Animations fluides** : Transitions CSS modernes
- 🔗 **Navigation cohérente** : Liens logiques entre les pages

### Interface Utilisateur Améliorée
- **Page Services** : Navigation par catégories + recherche
- **Page Catégories** : Cards interactives avec liens vers services
- **Formulaire Réparation** : Validation améliorée et meilleure UX
- **Administration** : Interface tabs organisée et moderne
- **Navigation** : Menu responsive avec effets visuels