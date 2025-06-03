const RepairRequest = require('../models/RepairRequest');

// Créer une nouvelle demande de réparation
exports.createRepairRequest = async (req, res) => {
  try {
    const repairRequest = new RepairRequest(req.body);
    await repairRequest.save();

    res.status(201).json({
      success: true,
      data: repairRequest,
      message: 'Demande de réparation créée avec succès'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Obtenir toutes les demandes de réparation (protégé)
exports.getAllRepairRequests = async (req, res) => {
  try {
    const repairRequests = await RepairRequest.find().sort({ dateCreation: -1 });

    res.status(200).json({
      success: true,
      count: repairRequests.length,
      data: repairRequests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Supprimer une demande de réparation (protégé)
exports.deleteRepairRequest = async (req, res) => {
  try {
    const repairRequest = await RepairRequest.findByIdAndDelete(req.params.id);

    if (!repairRequest) {
      return res.status(404).json({
        success: false,
        message: 'Demande de réparation non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Demande de réparation supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};