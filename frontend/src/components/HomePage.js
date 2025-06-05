import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaArrowRight, FaLaptop, FaMobileAlt, FaStar, FaTools, FaUsers, FaWrench } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Images professionnelles de réparation PC
  const pcRepairImages = {
    diagnostic: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    repair: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    workshop: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  };

  // Stats mis à jour
  const stats = [
    { icon: FaUsers, number: '2000+', label: 'Clients Satisfaits' },
    { icon: FaLaptop, number: '5000+', label: 'Réparations Réussies' },
    { icon: FaStar, number: '4.9/5', label: 'Note Moyenne' },
    { icon: FaTools, number: '10 ans', label: 'D\'Expertise' }
  ];

  // Caractéristiques mises à jour
  const features = [
    {
      icon: FaWrench,
      title: 'Diagnostic Professionnel',
      description: 'Analyse complète de votre matériel par nos experts certifiés'
    },
    {
      icon: FaUsers,
      title: 'Service Premium',
      description: 'Intervention rapide et garantie sur toutes nos réparations'
    },
    {
      icon: FaMobileAlt,
      title: 'Suivi Personnalisé',
      description: 'Devis détaillé gratuit et suivi en temps réel de votre réparation'
    }
  ];

  return (
    <div className="homepage">
      {/* Section Hero */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <div className="fade-in-left">
                <h1 className="hero-title">
                  SPI Service Plus <span className="text-gradient">Réparation Informatique</span>
                </h1>
                <p className="hero-subtitle">
                  Votre expert en réparation d'ordinateurs et maintenance informatique
                </p>
                <div className="hero-buttons">
                  <Button
                    as={Link}
                    to="/services"
                    className="btn-primary-gradient btn-lg me-3"
                  >
                    Nos Services <FaArrowRight className="ms-2" />
                  </Button>
                  <Button
                    as={Link}
                    to="/contact"
                    className="btn-outline-gradient btn-lg"
                  >
                    Devis Gratuit
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <div className="fade-in-right">
                <div className="floating-card">
                  <img
                    src={pcRepairImages.workshop}
                    alt="Atelier de réparation SPI Service Plus"
                    className="img-fluid rounded-4 shadow-elegant"
                  />
                  <div className="floating-badge">
                    <FaStar className="text-warning" />
                    <span className="ms-2">4.9/5 - Plus de 2000 clients satisfaits</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section Services */}
      <section className="services-section section-content">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Nos Services Spécialisés</h2>
            <p className="section-subtitle">
              Des solutions professionnelles pour tous vos besoins informatiques
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="service-card h-100">
                <Card.Img variant="top" src={pcRepairImages.diagnostic} alt="Diagnostic PC" />
                <Card.Body>
                  <Card.Title>Diagnostic Complet</Card.Title>
                  <Card.Text>
                    Analyse approfondie de votre matériel par nos techniciens experts
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="service-card h-100">
                <Card.Img variant="top" src={pcRepairImages.repair} alt="Réparation PC" />
                <Card.Body>
                  <Card.Title>Réparation PC</Card.Title>
                  <Card.Text>
                    Intervention rapide et professionnelle sur tous types de pannes
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="service-card h-100">
                <Card.Img variant="top" src={pcRepairImages.workshop} alt="Maintenance PC" />
                <Card.Body>
                  <Card.Title>Maintenance</Card.Title>
                  <Card.Text>
                    Entretien préventif pour optimiser les performances de votre matériel
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;