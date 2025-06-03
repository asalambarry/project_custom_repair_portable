const Contact = require('../models/Contact');

// Créer un nouveau message de contact
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    // Log du message reçu
    console.log('Nouveau message de contact reçu:', {
      nom: contact.nom,
      email: contact.email,
      sujet: contact.sujet,
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
      error: error.message
    });
  }
};