import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import CategoriesPage from './components/CategoriesPage';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LegalMentions from './components/LegalMentions';
import Login from './components/Login';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import RepairForm from './components/RepairForm';
import ServicesList from './components/ServicesList';
import ServicesListSimple from './components/ServicesListSimple';
import { AuthProvider } from './contexts/AuthContext';
import './styles/theme.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Container fluid className="px-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesList />} />
                <Route path="/services-simple" element={<ServicesListSimple />} />
                <Route path="/services/:categoryId" element={<ServicesList />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/reparation" element={<RepairForm />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/mentions-legales" element={<LegalMentions />} />
                <Route path="/admin/login" element={<Login />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;