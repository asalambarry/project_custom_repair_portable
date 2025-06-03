const Service = require('../models/Service');

// Obtenir tous les services (public)
exports.getAllServices = async (req, res) => {
  try {
    const { search, categorie } = req.query;
    let query = {};

    // Ajout de la recherche par titre ou description
    if (search) {
      query.$or = [
        { titre: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filtrage par catégorie
    if (categorie) {
      query.categorie = categorie;
    }

    const services = await Service.find(query)
      .populate('categorie', 'nom description icone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obtenir un service par ID (public)
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('categorie', 'nom description icone');
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Créer un nouveau service (admin uniquement)
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    const populatedService = await Service.findById(service._id)
      .populate('categorie', 'nom description icone');
    res.status(201).json({
      success: true,
      data: populatedService,
      message: 'Service créé avec succès'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Mettre à jour un service (admin uniquement)
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('categorie', 'nom description icone');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: service,
      message: 'Service mis à jour avec succès'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Supprimer un service (admin uniquement)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Service supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};