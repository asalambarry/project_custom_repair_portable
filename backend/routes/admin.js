const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Service = require('../models/Service');
const Category = require('../models/Category');
const RepairRequest = require('../models/RepairRequest');
const { protect } = require('../middleware/auth');

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès non autorisé' });
  }
};

// Configuration multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Créer le dossier uploads s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Générer un nom unique pour le fichier
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB
  },
  fileFilter: (req, file, cb) => {
    // Vérifier que c'est bien une image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  }
});

// Protection des routes
router.use(protect);
router.use(isAdmin);

// Route d'upload d'images
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Aucun fichier fourni'
      });
    }

    // Générer l'URL publique de l'image
    const imageUrl = `http://localhost:5001/uploads/${req.file.filename}`;

    console.log('✅ Image uploadée:', {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      url: imageUrl
    });

    res.json({
      status: 'success',
      message: 'Image uploadée avec succès',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('❌ Erreur upload:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de l\'upload de l\'image'
    });
  }
});

// Routes pour les catégories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

router.post('/categories', upload.single('image'), async (req, res) => {
  try {
    // Vérifier si les champs requis sont présents
    if (!req.body.nom || !req.body.description) {
      return res.status(400).json({
        status: 'error',
        message: 'Le nom et la description sont requis'
      });
    }

    // Préparer les données de la catégorie
    const categoryData = {
      nom: req.body.nom,
      description: req.body.description,
      image: req.file ? `http://localhost:5001/uploads/${req.file.filename}` : undefined
    };

    // Créer et sauvegarder la catégorie
    const category = new Category(categoryData);
    const savedCategory = await category.save();

    res.status(201).json({
      status: 'success',
      data: savedCategory
    });
  } catch (error) {
    // Si l'erreur est due à un nom en double
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Une catégorie avec ce nom existe déjà'
      });
    }

    console.error('Erreur création catégorie:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

router.put('/categories/:id', upload.single('image'), async (req, res) => {
  try {
    const categoryData = {
      ...req.body,
      image: req.file ? `http://localhost:5001/uploads/${req.file.filename}` : undefined
    };

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      categoryData,
      { new: true }
    );
    res.json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
      message: 'Catégorie supprimée'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Routes pour les services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().populate('categorie');
    res.json({
      status: 'success',
      data: services
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

router.post('/services', upload.single('image'), async (req, res) => {
  try {
    const serviceData = {
      ...req.body,
      image: req.file ? `http://localhost:5001/uploads/${req.file.filename}` : undefined
    };

    const service = new Service(serviceData);
    const savedService = await service.save();
    res.status(201).json({
      status: 'success',
      data: savedService
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

router.put('/services/:id', upload.single('image'), async (req, res) => {
  try {
    const serviceData = {
      ...req.body,
      image: req.file ? `http://localhost:5001/uploads/${req.file.filename}` : undefined
    };

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      serviceData,
      { new: true }
    );
    res.json({
      status: 'success',
      data: service
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
      message: 'Service supprimé'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Routes pour les demandes de réparation
router.get('/repair-requests', async (req, res) => {
  try {
    const requests = await RepairRequest.find()
      .populate('categorie', 'nom')
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

router.delete('/repair-requests/:id', async (req, res) => {
  try {
    await RepairRequest.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
      message: 'Demande supprimée'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Ajouter cette route avec les autres routes admin
router.get('/repair-requests', protect, isAdmin, async (req, res) => {
  try {
    const requests = await RepairRequest.find()
      .populate('categorie', 'nom')
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Route pour créer une demande de réparation (publique)
router.post('/repair-requests', async (req, res) => {
  try {
    const request = new RepairRequest(req.body);
    await request.save();
    res.status(201).json({
      status: 'success',
      data: request
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;