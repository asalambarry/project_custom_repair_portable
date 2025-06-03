import React, { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaCog, FaHome, FaLaptop, FaPhone, FaSignOutAlt, FaTh, FaTools } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <div className="logo-container">
            <FaLaptop className="logo-icon" />
            <span className="brand-text">
              <span className="brand-main">SPI</span>
              <span className="brand-accent">Service Plus</span>
            </span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              <FaHome className="nav-icon" />
              <span>Accueil</span>
            </Nav.Link>

            <Nav.Link as={Link} to="/services" className="nav-link-custom">
              <FaTools className="nav-icon" />
              <span>Services</span>
            </Nav.Link>

            <Nav.Link as={Link} to="/categories" className="nav-link-custom">
              <FaTh className="nav-icon" />
              <span>Catégories</span>
            </Nav.Link>

            <Nav.Link as={Link} to="/reparation" className="nav-link-custom">
              <FaLaptop className="nav-icon" />
              <span>Réparation</span>
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              <FaPhone className="nav-icon" />
              <span>Contact</span>
            </Nav.Link>

            {/* Admin menu seulement visible pour les utilisateurs connectés */}
            {user && user.role === 'admin' && (
              <NavDropdown
                title={
                  <span className="nav-link-custom admin-link">
                    <FaCog className="nav-icon" />
                    <span>Admin</span>
                  </span>
                }
                id="admin-dropdown"
                className="custom-dropdown admin-dropdown"
              >
                <NavDropdown.Item as={Link} to="/admin/dashboard" className="dropdown-item-custom">
                  <FaCog className="dropdown-icon" />
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="dropdown-item-custom logout-item">
                  <FaSignOutAlt className="dropdown-icon" />
                  Déconnexion
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;