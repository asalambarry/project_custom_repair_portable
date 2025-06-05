import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center py-4">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-0">SPI Service Plus</h5>
            <p className="mb-0 text-muted">Dépannage informatique</p>
          </Col>

          <Col md={4} className="text-center mb-3 mb-md-0">
            <div className="contact-info">
              <p className="mb-1"><FaPhone className="me-2" />01.69.52.09.16</p>
              <p className="mb-1"><FaEnvelope className="me-2" />depannage@ordinet.info</p>
              <p className="mb-0"><FaMapMarkerAlt className="me-2" />1 Avenue de la République, 91230 Montgeron</p>
            </div>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <div className="footer-links">
              <Link to="/mentions-legales" className="me-3">Mentions Légales</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <p className="mt-2 mb-0 text-muted">&copy; {currentYear} Tous droits réservés</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;