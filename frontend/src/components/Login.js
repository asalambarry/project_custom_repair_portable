import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { FaLaptop, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  // Rediriger si l'utilisateur est déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        console.log('🎉 Redirection vers dashboard...');
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Email ou mot de passe incorrect');
      }
    } catch (err) {
      console.error('Erreur d\'authentification:', err);
      setError('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '100px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="card-elegant shadow-elegant">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="login-logo mb-3">
                    <FaLaptop style={{ fontSize: '3rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                  </div>
                  <h2 className="login-title" style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--gray-800)' }}>
                    Connexion Administrateur
                  </h2>
                  <p className="login-subtitle" style={{ color: 'var(--gray-600)' }}>
                    Interface sécurisée TechRepair Pro
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4" style={{ borderRadius: 'var(--radius-md)' }}>
                    <strong>❌ Erreur de connexion :</strong><br />
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: 'var(--gray-700)' }}>
                      <FaUser className="me-2" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Votre email"
                      style={{
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 1rem',
                        border: '2px solid var(--gray-200)',
                        transition: 'var(--transition-normal)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-color)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--gray-200)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '600', color: 'var(--gray-700)' }}>
                      <FaLock className="me-2" />
                      Mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Votre mot de passe"
                      style={{
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 1rem',
                        border: '2px solid var(--gray-200)',
                        transition: 'var(--transition-normal)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-color)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--gray-200)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-primary-gradient btn-lg"
                      style={{
                        padding: '1rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          🔐 Connexion en cours...
                        </>
                      ) : (
                        '🚀 Se connecter'
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-4">
                  <small style={{ color: 'var(--gray-500)' }}>
                    🛡️ Interface d'administration sécurisée
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;