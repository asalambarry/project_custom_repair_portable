db = db.getSiblingDB('admin');

// Création de l'utilisateur admin
db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
});

// Création de la base de données repair_pc
db = db.getSiblingDB('repair_pc');

// Création des collections avec validation
db.createCollection("clients", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nom", "email", "telephone"],
      properties: {
        nom: {
          bsonType: "string",
          description: "Le nom du client est requis"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "L'email doit être valide"
        },
        telephone: {
          bsonType: "string",
          description: "Le numéro de téléphone est requis"
        }
      }
    }
  }
});

db.createCollection("reparations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["clientId", "description", "statut"],
      properties: {
        clientId: {
          bsonType: "objectId",
          description: "L'ID du client est requis"
        },
        description: {
          bsonType: "string",
          description: "La description de la réparation est requise"
        },
        statut: {
          enum: ["en_attente", "en_cours", "terminee"],
          description: "Le statut doit être l'un des suivants: en_attente, en_cours, terminee"
        }
      }
    }
  }
});