import React from 'react';
import { Card, Container } from 'react-bootstrap';

const LegalMentions = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h1 className="text-center mb-4">Mentions Légales</h1>

          <section className="mb-5">
            <h2>1. Informations légales</h2>
            <p>
              <strong>Raison sociale :</strong> Réparation PC<br />
              <strong>Forme juridique :</strong> SAS<br />
              <strong>Capital social :</strong> 10 000 €<br />
              <strong>Siège social :</strong> 123 Rue de la Réparation, 75000 Paris<br />
              <strong>SIRET :</strong> 123 456 789 00010<br />
              <strong>N° TVA intracommunautaire :</strong> FR12345678900
            </p>
          </section>

          <section className="mb-5">
            <h2>2. Protection des données personnelles (RGPD)</h2>
            <p>
              Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD) du 27 avril 2016, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de limitation du traitement.
            </p>
            <p>
              Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.
            </p>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : contact@reparation-pc.fr
            </p>
          </section>

          <section className="mb-5">
            <h2>3. Collecte des données</h2>
            <p>
              Nous collectons les informations que vous nous fournissez directement, notamment :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale</li>
              <li>Informations relatives à votre équipement informatique</li>
            </ul>
            <p>
              Ces données sont collectées dans le but de :
            </p>
            <ul>
              <li>Traiter vos demandes de réparation</li>
              <li>Vous contacter concernant vos demandes</li>
              <li>Améliorer nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2>4. Conservation des données</h2>
            <p>
              Vos données personnelles sont conservées pendant une durée maximale de 3 ans à compter de votre dernière interaction avec nous.
            </p>
          </section>

          <section className="mb-5">
            <h2>5. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez à tout moment désactiver l'utilisation de cookies en sélectionnant les paramètres appropriés de votre navigateur.
            </p>
          </section>

          <section className="mb-5">
            <h2>6. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
            </p>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>
              Pour toute question concernant nos mentions légales ou notre politique de confidentialité, vous pouvez nous contacter à :<br />
              Email : contact@reparation-pc.fr<br />
              Téléphone : 01 23 45 67 89<br />
              Adresse : 123 Rue de la Réparation, 75000 Paris
            </p>
          </section>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LegalMentions;