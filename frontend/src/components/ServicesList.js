import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { FaClock, FaEuroSign, FaSearch } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import './ServicesList.css';

const API_URL = 'http://localhost:5001';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/services`),
          fetch(`${API_URL}/api/categories`)
        ]);

        if (!servicesRes.ok || !categoriesRes.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        const servicesData = await servicesRes.json();
        const categoriesData = await categoriesRes.json();

        const services = servicesData.data || servicesData;
        const categories = categoriesData.data || categoriesData;

        if (!Array.isArray(services) || !Array.isArray(categories)) {
          throw new Error('Format de données invalide');
        }

        setServices(services);
        setCategories(categories);

        // Si categoryId est fourni, filtrer les services
        if (categoryId) {
          const filtered = services.filter(service =>
            service.categorie && service.categorie._id === categoryId
          );
          setFilteredServices(filtered);

          // Trouver la catégorie sélectionnée
          const category = categories.find(cat => cat._id === categoryId);
          setSelectedCategory(category);
        } else {
          setFilteredServices(services);
        }

        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des services');
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  useEffect(() => {
    let filtered = services;

    // Filtrer par catégorie si categoryId est fourni
    if (categoryId) {
      filtered = filtered.filter(service =>
        service.categorie && service.categorie._id === categoryId
      );
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(service =>
        service.titre.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, services, categoryId]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" size="lg" />
          <p className="mt-3 text-muted">Chargement des services...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Oops ! Une erreur est survenue</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="services-page">
      <div className="services-header">
        <Container>
          <div className="text-center py-5">
            <h1 className="services-title">
              {selectedCategory ? selectedCategory.nom : 'Nos Services'}
            </h1>
            <p className="services-subtitle lead">
              {selectedCategory
                ? selectedCategory.description
                : 'Découvrez notre gamme complète de services de réparation informatique'
              }
            </p>
            {filteredServices.length > 0 && (
              <p className="text-muted">
                {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} disponible{filteredServices.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </Container>
      </div>

      <Container className="services-container">
        {/* Barre de recherche */}
        <div className="search-section mb-4">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <InputGroup size="lg">
                <InputGroup.Text className="bg-primary text-white">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Rechercher un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="shadow-sm"
                />
              </InputGroup>
            </Col>
          </Row>
        </div>

        {/* Navigation des catégories */}
        {!categoryId && (
          <div className="categories-navigation mb-5">
            <h3 className="text-center mb-4">Filtrer par catégorie</h3>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button
                size="lg"
                variant={!selectedCategory ? 'primary' : 'outline-primary'}
                className="category-btn"
                onClick={() => {
                  setSelectedCategory(null);
                  setFilteredServices(services);
                }}
              >
                Toutes
              </Button>
              {categories.map(category => (
                <Button
                  key={category._id}
                  size="lg"
                  variant={selectedCategory?._id === category._id ? 'primary' : 'outline-primary'}
                  className="category-btn"
                  onClick={() => {
                    setSelectedCategory(category);
                    const filtered = services.filter(service =>
                      service.categorie && service.categorie._id === category._id
                    );
                    setFilteredServices(filtered);
                  }}
                >
                  {category.nom}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Résultats */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-5">
            <Alert variant="info" className="d-inline-block">
              <h5>Aucun service trouvé</h5>
              {searchTerm ? (
                <p className="mb-0">Aucun service ne correspond à "{searchTerm}"</p>
              ) : (
                <p className="mb-0">Aucun service disponible dans cette catégorie</p>
              )}
            </Alert>
          </div>
        ) : (
          <Row className="g-4">
            {filteredServices.map((service, index) => (
              <Col key={service._id || index} md={6} lg={4}>
                <Card className="service-card h-100 shadow-hover">
                  <div className="service-image-container">
                    <Card.Img
                      variant="top"
                      src={service.image}
                      alt={service.titre}
                      className="service-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="service-title">{service.titre}</Card.Title>
                    <Card.Text className="service-description flex-grow-1">
                      {service.description}
                    </Card.Text>

                    <div className="service-details mb-3">
                      <div className="service-price">
                        <FaEuroSign className="me-1" />
                        <span className="price-value">{service.prix}€</span>
                      </div>
                      <div className="service-duration">
                        <FaClock className="me-1" />
                        <span>{service.duree}</span>
                      </div>
                    </div>

                    {service.categorie && (
                      <div className="service-category mb-3">
                        <small className="category-badge">
                          {service.categorie.nom}
                        </small>
                      </div>
                    )}

                    <Button
                      as={Link}
                      to="/reparation"
                      variant="primary"
                      className="service-btn w-100"
                      size="lg"
                    >
                      Demander ce service
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Bouton retour */}
        {categoryId && (
          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/categories"
              variant="outline-secondary"
              size="lg"
            >
              ← Retour aux catégories
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ServicesList;