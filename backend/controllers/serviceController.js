const Service = require('../models/Service');

// Obtenir tous les services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau service
exports.createService = async (req, res) => {
  const service = new Service({
    nom: req.body.nom,
    description: req.body.description,
    prix: req.body.prix
  });

  try {
    const nouveauService = await service.save();
    res.status(201).json(nouveauService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir un service spécifique
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      service.nom = req.body.nom || service.nom;
      service.description = req.body.description || service.description;
      service.prix = req.body.prix || service.prix;

      const serviceMisAJour = await service.save();
      res.json(serviceMisAJour);
    } else {
      res.status(404).json({ message: 'Service non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      await service.deleteOne();
      res.json({ message: 'Service supprimé' });
    } else {
      res.status(404).json({ message: 'Service non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};