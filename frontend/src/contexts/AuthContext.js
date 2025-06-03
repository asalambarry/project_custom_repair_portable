import React, { createContext, useEffect, useState } from 'react';

// Créer le contexte d'authentification
export const AuthContext = createContext();

// Provider du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement de l'app
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erreur lors de la lecture des données utilisateur:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }

    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      console.log('🔐 Tentative de connexion:', email);

      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Statut de réponse:', response.status);
      const data = await response.json();
      console.log('📦 Données reçues:', data);

      if (response.ok && data.status === 'success') {
        // Le backend retourne data.data.user, pas data.user
        const userData = data.data.user;

        // Stocker le token et les données utilisateur
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);

        console.log('✅ Connexion réussie:', userData);
        return { success: true, user: userData };
      } else {
        console.log('❌ Échec de connexion:', data.message);
        return { success: false, message: data.message || 'Erreur de connexion' };
      }
    } catch (error) {
      console.error('💥 Erreur lors de la connexion:', error);
      return { success: false, message: 'Erreur de connexion au serveur. Vérifiez que le backend est démarré.' };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  // Fonction pour vérifier si l'utilisateur est administrateur
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  // Fonction pour obtenir le token d'authentification
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Fonction pour faire des requêtes authentifiées
  const authenticatedFetch = async (url, options = {}) => {
    const token = getAuthToken();

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      // Si le token a expiré, déconnecter l'utilisateur
      if (response.status === 401) {
        logout();
        return null;
      }

      return response;
    } catch (error) {
      console.error('Erreur lors de la requête authentifiée:', error);
      throw error;
    }
  };

  // Valeurs du contexte
  const contextValue = {
    user,
    loading,
    login,
    logout,
    isAdmin,
    getAuthToken,
    authenticatedFetch,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};