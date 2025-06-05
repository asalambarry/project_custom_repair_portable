const Contact = require('../models/Contact');

// Créer un nouveau message de contact
exports.createContact = async (req, res) => {
  try {
    // Validation des données
    if (!req.body.nom || !req.body.email || !req.body.message) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir tous les champs requis'
      });
    }

    const contact = new Contact({
      nom: req.body.nom,
      email: req.body.email,
      message: req.body.message
    });

    await contact.save();

    // Log du message reçu
    console.log('Nouveau message de contact reçu:', {
      nom: contact.nom,
      email: contact.email,
      message: contact.message,
      dateEnvoi: contact.dateEnvoi
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Message envoyé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(400).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message'
    });
  }
};