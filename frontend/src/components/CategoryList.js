import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { FaTools } from 'react-icons/fa';
import api from '../services/api';

const CategoryList = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
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
      <Container className="text-center my-3">
        <Spinner animation="border" role="status" size="sm">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mb-4">
      <h3 className="text-center mb-3">Nos Catégories de Services</h3>
      <Row className="g-3">
        {categories.map((category) => (
          <Col key={category._id} xs={6} md={4} lg={3}>
            <Card
              className={`h-100 shadow-sm category-card ${
                selectedCategory?._id === category._id ? 'border-primary' : ''
              }`}
              onClick={() => onSelectCategory && onSelectCategory(category)}
              style={{ cursor: onSelectCategory ? 'pointer' : 'default' }}
            >
              <Card.Body className="text-center">
                <div className="category-icon mb-3">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.nom}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <FaTools
                    style={{
                      fontSize: '3rem',
                      color: '#00ff88',
                      display: category.image ? 'none' : 'block'
                    }}
                  />
                </div>
                <Card.Title className="h6">{category.nom}</Card.Title>
                <Card.Text className="small text-muted">
                  {category.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryList;