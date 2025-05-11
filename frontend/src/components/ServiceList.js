import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/services');
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Nos Services</h2>
      <Row>
        {services.map((service) => (
          <Col key={service._id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{service.nom}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Card.Text className="text-primary fw-bold">
                  {service.prix} €
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiceList;