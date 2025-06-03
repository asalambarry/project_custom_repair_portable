import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 text-muted">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Vérifier si l'utilisateur est administrateur
  if (user.role !== 'admin') {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger text-center">
              <h4>Accès Refusé</h4>
              <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
              <button
                className="btn btn-primary"
                onClick={() => window.history.back()}
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si tout est OK, afficher le composant protégé
  return children;
};

export default PrivateRoute;