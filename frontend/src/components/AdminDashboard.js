import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { FaEdit, FaImage, FaPlus, FaSignOutAlt, FaTrash, FaUpload } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import './AdminDashboard.css';

const API_URL = 'http://localhost:5001';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [repairRequests, setRepairRequests] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    image: '',
    titre: '',
    prix: '',
    duree: '',
    categorie: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { logout, authenticatedFetch } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Chargement des données admin...');

      const [categoriesRes, servicesRes, repairRequestsRes] = await Promise.all([
        authenticatedFetch('http://localhost:5001/api/admin/categories'),
        authenticatedFetch('http://localhost:5001/api/admin/services'),
        authenticatedFetch('http://localhost:5001/api/admin/repair-requests')
      ]);

      if (categoriesRes && servicesRes && repairRequestsRes) {
        const categoriesData = await categoriesRes.json();
        const servicesData = await servicesRes.json();
        const repairRequestsData = await repairRequestsRes.json();

        setCategories(categoriesData.data || []);
        setServices(servicesData.data || []);
        setRepairRequests(repairRequestsData.data || []);

        console.log('✅ Données chargées:', {
          categories: categoriesData.data?.length || 0,
          services: servicesData.data?.length || 0,
          requests: repairRequestsData.data?.length || 0
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      setError('Erreur lors du chargement des données');
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await authenticatedFetch('http://localhost:5001/api/admin/upload', {
        method: 'POST',
        body: formData,
        headers: {} // Ne pas définir Content-Type pour FormData
      });

      if (response && response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        throw new Error('Erreur upload');
      }
    } catch (error) {
      console.error('❌ Erreur upload image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Session expirée. Veuillez vous reconnecter.');
        logout(); // Déconnexion si pas de token
        return;
      }

      const formDataToSend = new FormData();

      // Ajouter les champs selon le type
      if (type === 'category') {
        formDataToSend.append('nom', formData.nom);
        formDataToSend.append('description', formData.description);
      } else {
        formDataToSend.append('titre', formData.titre);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('prix', formData.prix);
        formDataToSend.append('duree', formData.duree);
        formDataToSend.append('categorie', formData.categorie);
      }

      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      const response = await fetch(`${API_URL}/api/admin/${type === 'category' ? 'categories' : 'services'}${selectedItem ? `/${selectedItem._id}` : ''}`, {
        method: selectedItem ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          logout(); // Déconnexion si token invalide
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        throw new Error(data.message || 'Erreur lors de la sauvegarde');
      }

      await fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      try {
        console.log(`🗑️ Suppression ${type} ID:`, id);

        const response = await authenticatedFetch(`http://localhost:5001/api/admin/${type}/${id}`, {
          method: 'DELETE'
        });

        if (response && response.ok) {
          console.log('✅ Suppression réussie');
          fetchData();
          setError(null);
        } else {
          throw new Error('Erreur de suppression');
        }
      } catch (error) {
        console.error('❌ Erreur suppression:', error);
        setError('Erreur lors de la suppression');
      }
    }
  };

  const handleDeleteRepairRequest = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      try {
        console.log('🗑️ Suppression demande ID:', id);

        const response = await authenticatedFetch(`http://localhost:5001/api/admin/repair-requests/${id}`, {
          method: 'DELETE'
        });

        if (response && response.ok) {
          console.log('✅ Suppression demande réussie');
          setRepairRequests(repairRequests.filter(r => r._id !== id));
          setError(null);
        } else {
          throw new Error('Erreur de suppression');
        }
      } catch (error) {
        console.error('❌ Erreur suppression demande:', error);
        setError('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (item, type) => {
    console.log(`✏️ Édition ${type}:`, item);
    setSelectedItem(item);
    setFormData({
      ...item,
      categorie: item.categorie?._id || ''
    });
    setImagePreview(item.image || null);
    if (type === 'category') {
      setShowCategoryModal(true);
    } else {
      setShowServiceModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowCategoryModal(false);
    setShowServiceModal(false);
    setSelectedItem(null);
    setSelectedFile(null);
    setImagePreview(null);
    setFormData({
      nom: '',
      description: '',
      image: '',
      titre: '',
      prix: '',
      duree: '',
      categorie: ''
    });
  };

  const handleLogout = () => {
    console.log('🚪 Déconnexion admin');
    logout();
    window.location.href = '/admin/login';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="text-center my-5" style={{ paddingTop: '100px' }}>
        <div className="d-flex flex-column align-items-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 text-muted">Chargement du dashboard admin...</p>
        </div>
      </Container>
    );
  }

  return (
    <div style={{ paddingTop: '100px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Container className="admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 style={{ color: 'var(--gray-800)', fontFamily: 'var(--font-heading)' }}>
              🛡️ Administration SPI Service Plus
            </h1>
            <p className="text-muted">Gestion des services, catégories et demandes</p>
          </div>
        <Button
          variant="outline-danger"
            onClick={handleLogout}
            className="btn-outline-gradient"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <FaSignOutAlt className="me-2" />
          Déconnexion
        </Button>
      </div>

      {error && (
          <Alert variant="danger" className="mb-4" style={{ borderRadius: 'var(--radius-md)' }}>
            <strong>❌ Erreur :</strong> {error}
        </Alert>
      )}

        <Tabs defaultActiveKey="categories" id="admin-tabs" className="mb-3">
          <Tab eventKey="categories" title={`📁 Catégories (${categories.length})`}>
            <Card className="card-elegant shadow-hover">
              <Card.Header className="d-flex justify-content-between align-items-center" style={{ background: 'var(--primary-gradient)', color: 'white' }}>
                <h3 className="mb-0">📁 Gestion des Catégories</h3>
                <Button
                  variant="light"
                  onClick={() => setShowCategoryModal(true)}
                  className="btn-primary-gradient"
                >
                  <FaPlus className="me-2" />
                  Nouvelle catégorie
                </Button>
              </Card.Header>
              <Card.Body>
                <Row>
                  {categories.map(category => (
                    <Col md={6} lg={4} key={category._id} className="mb-3">
                      <Card className="h-100 card-elegant shadow-hover">
                        {category.image && (
                          <Card.Img variant="top" src={category.image} style={{ height: '150px', objectFit: 'cover' }} />
                        )}
                        <Card.Body>
                          <Card.Title style={{ color: 'var(--gray-800)' }}>{category.nom}</Card.Title>
                          <Card.Text style={{ color: 'var(--gray-600)' }}>{category.description}</Card.Text>
                          <div className="d-flex gap-2">
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleEdit(category, 'category')}
                              style={{ borderRadius: 'var(--radius-md)' }}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(category._id, 'categories')}
                              style={{ borderRadius: 'var(--radius-md)' }}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="services" title={`🔧 Services (${services.length})`}>
            <Card className="card-elegant shadow-hover">
              <Card.Header className="d-flex justify-content-between align-items-center" style={{ background: 'var(--secondary-gradient)', color: 'white' }}>
                <h3 className="mb-0">🔧 Gestion des Services</h3>
                <Button
                  variant="light"
                  onClick={() => setShowServiceModal(true)}
                  className="btn-primary-gradient"
                >
                  <FaPlus className="me-2" />
                  Nouveau service
                </Button>
              </Card.Header>
              <Card.Body>
                <Row>
                  {services.map(service => (
                    <Col md={6} lg={4} key={service._id} className="mb-3">
                      <Card className="h-100 card-elegant shadow-hover">
                        {service.image && (
                          <Card.Img variant="top" src={service.image} style={{ height: '150px', objectFit: 'cover' }} />
                        )}
                        <Card.Body>
                          <Card.Title style={{ color: 'var(--gray-800)' }}>{service.titre}</Card.Title>
                          <Card.Text style={{ color: 'var(--gray-600)' }}>{service.description}</Card.Text>
                          <p><strong>💰 Prix:</strong> {service.prix}€</p>
                          <p><strong>⏱️ Durée:</strong> {service.duree}</p>
                          <p><strong>📁 Catégorie:</strong> {service.categorie?.nom}</p>
                          <div className="d-flex gap-2">
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleEdit(service, 'service')}
                              style={{ borderRadius: 'var(--radius-md)' }}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(service._id, 'services')}
                              style={{ borderRadius: 'var(--radius-md)' }}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="repair-requests" title={`📋 Demandes (${repairRequests.length})`}>
            <Card className="card-elegant shadow-hover">
              <Card.Header style={{ background: 'var(--accent-gradient)', color: 'white' }}>
                <h3 className="mb-0">📋 Demandes de Réparation</h3>
              </Card.Header>
              <Card.Body>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
                      <th>📅 Date</th>
                      <th>👤 Client</th>
                      <th>📧 Email</th>
                      <th>📞 Téléphone</th>
                      <th>💻 Matériel</th>
                      <th>📝 Description</th>
                      <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
                    {repairRequests.map((request) => (
                      <tr key={request._id}>
                        <td>{formatDate(request.createdAt)}</td>
                        <td>{request.nom}</td>
                        <td>{request.email}</td>
                        <td>{request.telephone}</td>
                        <td>{request.typeMateriel}</td>
                        <td>{request.description}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                            onClick={() => handleDeleteRepairRequest(request._id)}
                            style={{ borderRadius: 'var(--radius-md)' }}
                >
                            <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        {/* Modal pour les catégories */}
        <Modal show={showCategoryModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>{selectedItem ? '✏️ Modifier la catégorie' : '➕ Nouvelle catégorie'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={(e) => handleSubmit(e, 'category')}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>📁 Nom</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      required
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>📝 Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>🖼️ Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                    <Form.Text className="text-muted">
                      <FaUpload className="me-1" />
                      Formats acceptés: JPG, PNG, GIF (max 5MB)
                    </Form.Text>
                  </Form.Group>
                  {imagePreview && (
                    <div className="text-center">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        style={{
                          maxWidth: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-md)',
                          border: '2px solid var(--gray-200)'
                        }}
                      />
                      <p className="mt-2 text-muted">
                        <FaImage className="me-1" />
                        Aperçu de l'image
                      </p>
                    </div>
                  )}
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                className="btn-primary-gradient"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {selectedItem ? '✏️ Modifier' : '➕ Créer'}
              </Button>
            </Form>
        </Modal.Body>
        </Modal>

        {/* Modal pour les services */}
        <Modal show={showServiceModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem ? '✏️ Modifier le service' : '➕ Nouveau service'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleSubmit(e, 'service')}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>🔧 Titre</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.titre}
                      onChange={(e) => setFormData({...formData, titre: e.target.value})}
                      required
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>📝 Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>💰 Prix (€)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formData.prix}
                      onChange={(e) => setFormData({...formData, prix: e.target.value})}
                      required
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>⏱️ Durée</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.duree}
                      onChange={(e) => setFormData({...formData, duree: e.target.value})}
                      placeholder="ex: 2-3 heures"
                      required
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>📁 Catégorie</Form.Label>
                    <Form.Select
                      value={formData.categorie}
                      onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                      required
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.nom}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>🖼️ Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                    <Form.Text className="text-muted">
                      <FaUpload className="me-1" />
                      Formats acceptés: JPG, PNG, GIF (max 5MB)
                    </Form.Text>
                  </Form.Group>
                  {imagePreview && (
                    <div className="text-center">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        style={{
                          maxWidth: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-md)',
                          border: '2px solid var(--gray-200)'
                        }}
                      />
                      <p className="mt-2 text-muted">
                        <FaImage className="me-1" />
                        Aperçu de l'image
                      </p>
                    </div>
                  )}
                </Col>
              </Row>
          <Button
                variant="primary"
                type="submit"
                className="btn-primary-gradient"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {selectedItem ? '✏️ Modifier' : '➕ Créer'}
          </Button>
            </Form>
          </Modal.Body>
      </Modal>
    </Container>
    </div>
  );
};

export default AdminDashboard;