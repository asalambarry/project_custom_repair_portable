const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

// Routes publiques
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// Routes protégées (admin uniquement)
router.post('/', protect, serviceController.createService);
router.put('/:id', protect, serviceController.updateService);
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;