const express = require('express');
const router = express.Router();
const repairRequestController = require('../controllers/repairRequestController');
const { protect } = require('../middleware/auth');

// Route publique
router.post('/', repairRequestController.createRepairRequest);

// Routes protégées
router.get('/', protect, repairRequestController.getAllRepairRequests);
router.delete('/:id', protect, repairRequestController.deleteRepairRequest);

module.exports = router;