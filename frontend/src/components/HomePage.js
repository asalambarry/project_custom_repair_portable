import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaArrowRight, FaClock, FaEuroSign, FaLaptop, FaMobileAlt, FaStar, FaTools, FaUsers, FaWrench } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Images spécialisées pour la réparation PC
  const pcRepairImages = {
    diagnostic: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    screen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    motherboard: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    repair: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    data: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  };

  useEffect(() => {
    const fetchPopularServices = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/services');
        const data = await response.json();
        const services = data.data || data;

        // Sélectionner les 3 services les plus populaires (simulation)
        const popular = services.slice(0, 3).map((service, index) => ({
          ...service,
          rating: 4.8 - (index * 0.1),
          image: Object.values(pcRepairImages)[index] || service.image
        }));

        setPopularServices(popular);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
        setLoading(false);
      }
    };

    fetchPopularServices();
  }, []);

  const stats = [
    { icon: FaUsers, number: '500+', label: 'Clients Satisfaits' },
    { icon: FaLaptop, number: '1000+', label: 'Réparations Effectuées' },
    { icon: FaStar, number: '4.9/5', label: 'Note Moyenne' },
    { icon: FaTools, number: '5 ans', label: 'D\'Expérience' }
  ];

  const features = [
    {
      icon: FaWrench,
      title: 'Réparation Rapide',
      description: 'Diagnostic et réparation en 24h pour la plupart des pannes'
    },
    {
      icon: FaUsers,
      title: 'Experts Certifiés',
      description: 'Techniciens qualifiés avec 5+ ans d\'expérience'
    },
    {
      icon: FaMobileAlt,
      title: 'Devis Gratuit',
      description: 'Estimation gratuite et transparente avant toute intervention'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <div className="fade-in-left">
                <h1 className="hero-title">
                  Dépannage <span className="text-gradient">Informatique</span>
                </h1>
                <p className="hero-subtitle">
                  Du Mardi au Samedi de 9h à 12h et de 14h à 18h
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
                    src={pcRepairImages.repair}
                    alt="Réparation PC"
                    className="img-fluid rounded-4 shadow-elegant"
                  />
                  <div className="floating-badge">
                    <FaStar className="text-warning" />
                    <span className="ms-2">4.9/5 - 500+ avis</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Populaires */}
      <section className="popular-services-section section-content">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title text-gradient">Services Les Plus Populaires</h2>
            <p className="section-subtitle">
              Découvrez nos services de réparation les plus demandés par nos clients
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <Row className="g-4">
              {popularServices.map((service, index) => (
                <Col key={service._id} lg={4} md={6} className="mb-4">
                  <Card className="service-card-popular card-elegant h-100" style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="service-image-wrapper">
                      <Card.Img
                        variant="top"
                        src={service.image}
                        className="service-image-popular"
                        alt={service.titre}
                      />
                      <div className="popular-badge">
                        <FaStar className="me-1" />
                        {service.rating}
                      </div>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="service-title-popular">
                        {service.titre}
                      </Card.Title>
                      <Card.Text className="service-description-popular flex-grow-1">
                        {service.description}
                      </Card.Text>
                      <div className="service-meta">
                        <div className="service-price-popular">
                          <FaEuroSign className="me-1" />
                          <span className="price-amount">{service.prix}€</span>
                        </div>
                        <div className="service-duration-popular">
                          <FaClock className="me-1" />
                          <span>{service.duree}</span>
                        </div>
                      </div>
                      <Button
                        as={Link}
                        to="/reparation"
                        className="btn-primary-gradient w-100 mt-3"
                      >
                        Commander Maintenant
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/services"
              className="btn-outline-gradient btn-lg"
            >
              Voir Tous Nos Services <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Statistiques */}
      <section className="stats-section gradient-primary">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} lg={3} md={6} className="text-center">
                <div className="stat-item fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="stat-icon">
                    <stat.icon />
                  </div>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="features-section section-content">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Pourquoi Ordinet ?</h2>
            <p className="section-subtitle">
              L'excellence technique au service de vos appareils
            </p>
          </div>

          <Row className="g-5">
            {features.map((feature, index) => (
              <Col key={index} lg={4} md={6}>
                <div className="feature-item text-center fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="feature-icon gradient-primary">
                    <feature.icon />
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section gradient-secondary">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div className="cta-content">
                <h2 className="cta-title">Votre PC a un Problème ?</h2>
                <p className="cta-subtitle">
                  Ne laissez pas une panne vous ralentir. Contactez nos experts dès maintenant
                  pour un diagnostic gratuit et une réparation rapide.
                </p>
                <div className="cta-buttons">
                  <Button
                    as={Link}
                    to="/contact"
                    className="btn-primary-gradient btn-lg me-3"
                    size="lg"
                  >
                    Diagnostic Gratuit
                  </Button>
                  <Button
                    as={Link}
                    to="/services"
                    variant="outline-light"
                    size="lg"
                  >
                    Voir Nos Tarifs
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;