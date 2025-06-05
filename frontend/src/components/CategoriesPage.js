import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { FaArrowRight, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data || []);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des catégories:', err);
        setError('Erreur lors du chargement des catégories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="categories-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <Container>
          <h1 className="categories-title">Nos Catégories de Services</h1>
          <p className="categories-subtitle">
            Explorez nos différentes catégories de services de réparation informatique
          </p>
        </Container>
      </div>

      <Container className="categories-container">
        <Row>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Col key={category._id} md={6} lg={4} className="mb-4">
                <Card className="category-card h-100">
                  <Card.Body>
                    <div className="category-icon">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.nom}
                          className="category-image"
                        />
                      ) : (
                        <FaTools />
                      )}
                    </div>
                    <Card.Title>{category.nom}</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                    <Link
                      to={`/services/${category._id}`}
                      className="btn btn-primary mt-3 d-flex align-items-center justify-content-center"
                    >
                      Voir les services
                      <FaArrowRight className="ms-2" />
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="info">
                Aucune catégorie disponible pour le moment.
              </Alert>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesPage;