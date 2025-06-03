import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';

const ServicesListSimple = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('🔄 [ServicesListSimple] Début du chargement des services...');

        const response = await fetch('http://localhost:5001/api/services');
        console.log('📦 [ServicesListSimple] Réponse reçue:', response);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('📊 [ServicesListSimple] Données reçues:', data);

        // Gestion de la structure de données
        const servicesData = data.data || data;
        console.log('✅ [ServicesListSimple] Services extraits:', servicesData);

        if (Array.isArray(servicesData)) {
          setServices(servicesData);
          console.log(`✅ [ServicesListSimple] ${servicesData.length} services chargés avec succès`);
        } else {
          throw new Error('Format de données invalide - pas un tableau');
        }

        setLoading(false);
      } catch (err) {
        console.error('❌ [ServicesListSimple] Erreur:', err);
        setError(`Erreur de chargement: ${err.message}`);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement des services...</span>
        </Spinner>
        <p className="mt-3">Chargement des services...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Erreur de chargement</Alert.Heading>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            Vérifiez que le backend est démarré et accessible sur le port 5001.
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Services Disponibles (Version Simple)</h1>
      <p className="text-muted mb-4">
        {services.length} service{services.length > 1 ? 's' : ''} trouvé{services.length > 1 ? 's' : ''}
      </p>

      {services.length === 0 ? (
        <Alert variant="info">
          Aucun service disponible pour le moment.
        </Alert>
      ) : (
        <Row>
          {services.map((service, index) => (
            <Col key={service._id || index} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">
                    {service.titre || 'Service sans titre'}
                  </Card.Title>
                  <Card.Text>
                    {service.description || 'Aucune description disponible'}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 text-success mb-0">
                      {service.prix ? `${service.prix}€` : 'Prix non défini'}
                    </span>
                    <small className="text-muted">
                      {service.duree || 'Durée non définie'}
                    </small>
                  </div>
                  {service.categorie && (
                    <small className="text-muted d-block mt-2">
                      Catégorie: {service.categorie.nom}
                    </small>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="mt-4 p-3 bg-light rounded">
        <h6>Informations de Debug:</h6>
        <ul className="mb-0">
          <li>Services chargés: {services.length}</li>
          <li>État de chargement: {loading ? 'En cours' : 'Terminé'}</li>
          <li>Erreur: {error || 'Aucune'}</li>
          <li>URL API: http://localhost:5001/api/services</li>
        </ul>
      </div>
    </Container>
  );
};

export default ServicesListSimple;