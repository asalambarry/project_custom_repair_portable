import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import api from '../services/api';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post('/contact', formData);
      setSuccess(true);
      setFormData({
        nom: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm mb-4 mb-md-0">
            <Card.Body>
              <h3 className="text-center mb-4">Nos Coordonnées</h3>

              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <h5>Adresse</h5>
                    <p>1 Avenue de la République<br />91230 Montgeron</p>
                  </div>
                </div>

                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <div>
                    <h5>Téléphone</h5>
                    <p><a href="tel:01.69.52.09.16">01.69.52.09.16</a></p>
                    <p><a href="tel:06.30.24.70.08">06.30.24.70.08</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h5>Email</h5>
                    <p><a href="mailto:depannage@ordinet.info">depannage@ordinet.info</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <FaClock className="contact-icon" />
                  <div>
                    <h5>Horaires d'ouverture</h5>
                    <p>Du Mardi au Samedi<br />9h à 12h et de 14h à 18h</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Envoyez-nous un message</h2>

              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="mb-4">
                  Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom complet</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre nom"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre email"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Votre message"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="py-2"
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;