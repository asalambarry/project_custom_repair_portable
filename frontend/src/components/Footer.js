import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaClock, FaEnvelope, FaFacebook, FaInstagram, FaLaptop, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      <div className="footer-main">
        <Container>
          <Row className="g-4">
            {/* Logo et Description */}
            <Col lg={4} md={6}>
              <div className="footer-brand">
                <div className="footer-logo">
                  <FaLaptop className="footer-logo-icon" />
                  <span className="footer-brand-text">
                    <span className="footer-brand-main">SPI</span>
                    <span className="footer-brand-accent">Service Plus</span>
                  </span>
                </div>
                <p className="footer-description">
                  Votre expert en dépannage informatique à Montgeron.
                  Service professionnel et fiable pour tous vos appareils électroniques.
                </p>
                <div className="footer-stats">
                  <div className="footer-stat">
                    <span className="stat-number">Du Mardi</span>
                    <span className="stat-label">au Samedi</span>
                  </div>
                  <div className="footer-stat">
                    <span className="stat-number">9h-12h</span>
                    <span className="stat-label">14h-18h</span>
                  </div>
                </div>
              </div>
            </Col>

            {/* Liens Rapides */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h5 className="footer-title">Navigation</h5>
                <ul className="footer-links">
                  <li><Link to="/">Accueil</Link></li>
                  <li><Link to="/services">Nos Services</Link></li>
                  <li><Link to="/categories">Catégories</Link></li>
                  <li><Link to="/reparation">Demander un Devis</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </Col>

            {/* Services */}
            <Col lg={3} md={6}>
              <div className="footer-section">
                <h5 className="footer-title">Nos Services</h5>
                <ul className="footer-links">
                  <li><Link to="/services">Dépannage PC</Link></li>
                  <li><Link to="/services">Dépannage Laptop</Link></li>
                  <li><Link to="/services">Récupération de Données</Link></li>
                  <li><Link to="/services">Diagnostic Complet</Link></li>
                  <li><Link to="/services">Maintenance Préventive</Link></li>
                </ul>
              </div>
            </Col>

            {/* Contact */}
            <Col lg={3} md={6}>
              <div className="footer-section">
                <h5 className="footer-title">Contact</h5>
                <div className="footer-contact">
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <div>
                      <a href="tel:01.69.52.09.16">01.69.52.09.16</a><br />
                      <a href="tel:06.30.24.70.08">06.30.24.70.08</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <a href="mailto:depannage@ordinet.info">depannage@ordinet.info</a>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>1 Avenue de la République<br />91230 Montgeron</span>
                  </div>
                  <div className="contact-item">
                    <FaClock className="contact-icon" />
                    <span>Du Mardi au Samedi<br />9h à 12h et de 14h à 18h</span>
                  </div>
                </div>

                <div className="footer-social">
                  <h6 className="social-title">Suivez-nous</h6>
                  <div className="social-links">
                    <a href="#" className="social-link facebook">
                      <FaFacebook />
                    </a>
                    <a href="#" className="social-link instagram">
                      <FaInstagram />
                    </a>
                    <a href="#" className="social-link linkedin">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="footer-copyright">
                <p>&copy; {currentYear} SPI Service Plus. Tous droits réservés.</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="footer-bottom-links">
                <Link to="/mentions-legales">Mentions Légales</Link>
                <Link to="/mentions-legales">Politique de Confidentialité</Link>
                <Link to="/mentions-legales">CGV</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;