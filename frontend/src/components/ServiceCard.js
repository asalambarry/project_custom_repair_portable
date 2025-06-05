import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaClock, FaEuroSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleRepairRequest = () => {
    navigate('/reparation', {
      state: {
        categoryId: service.categorie._id,
        serviceDescription: `Service demandé : ${service.titre}\n${service.description}`
      }
    });
  };

  return (
    <Card className="h-100 service-card">
      {service.image && (
        <Card.Img variant="top" src={service.image} className="service-image" />
      )}
      <Card.Body>
        <Card.Title>{service.titre}</Card.Title>
        <Card.Text>{service.description}</Card.Text>
        <div className="service-details">
          <span className="price">
            <FaEuroSign /> {service.prix}€
          </span>
          <span className="duration">
            <FaClock /> {service.duree}
          </span>
        </div>
        <Button
          onClick={handleRepairRequest}
          className="btn-primary-gradient w-100 mt-3"
        >
          Demander une réparation
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;