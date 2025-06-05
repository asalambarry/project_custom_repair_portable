import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const RepairForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    typeMateriel: '',
    categorie: location.state?.categoryId || '',
    description: location.state?.serviceDescription || ''
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des catégories:', err);
        setError('Erreur lors du chargement des catégories. Veuillez réessayer plus tard.');
      }
    };

    fetchCategories();
  }, []);

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

    try {
      await api.post('/repair-requests', formData);
      setSuccess(true);
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        typeMateriel: '',
        categorie: '',
        description: ''
      });

      // Redirection après 3 secondes
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'envoi du formulaire');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Demande de Réparation</h2>
          <p className="text-center text-muted mb-4">
            Remplissez ce formulaire pour nous faire part de votre demande de réparation.
            Nous vous contacterons dans les plus brefs délais.
          </p>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" className="mb-4">
              Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom complet *</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Entrez votre nom complet"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Téléphone *</Form.Label>
              <Form.Control
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                placeholder="01 23 45 67 89"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type de matériel *</Form.Label>
              <Form.Select
                name="typeMateriel"
                value={formData.typeMateriel}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez le type de matériel</option>
                <option value="PC Portable">PC Portable</option>
                <option value="PC Fixe">PC Fixe</option>
                <option value="Mac / MacBook">Mac / MacBook</option>
                <option value="Tablette">Tablette</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Imprimante">Imprimante</option>
                <option value="Serveur">Serveur</option>
                <option value="Autre">Autre</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type de service souhaité *</Form.Label>
              <Form.Select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez le type de service</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.nom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Description du problème *</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Décrivez votre problème en détail : symptômes, circonstances, messages d'erreur, etc."
              />
              <Form.Text className="text-muted">
                Plus votre description sera précise, plus nous pourrons vous aider efficacement.
              </Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="py-2"
                size="lg"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-4">
            <small className="text-muted">
              * Champs obligatoires<br/>
              Vos données sont traitées de manière confidentielle conformément à notre politique de confidentialité.
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RepairForm;