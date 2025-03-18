import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const AnnonceDetails = () => {
  const { id } = useParams(); // Récupère l'ID de l'URL
  const navigate = useNavigate();

  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Appel API pour récupérer les détails
  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
        setAnnonce(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        setError("Impossible de récupérer les détails de l'annonce.");
        setLoading(false);
      }
    };

    fetchAnnonce();
  }, [id]);

  // Gestion du chargement et des erreurs
  if (loading) {
    return <div className="details-page"><p>Chargement en cours...</p></div>;
  }

  if (error) {
    return <div className="details-page"><p>{error}</p></div>;
  }

  if (!annonce) {
    return <div className="details-page"><h2>Annonce non trouvée</h2></div>;
  }

  // Formatage de la date si besoin
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="details-page">
      <h2>Détails de l'annonce</h2>
      <div className="details-container">
        <div className="details-item">
          <label>ID :</label>
          <p>{annonce.id}</p>
        </div>
        <div className="details-item">
          <label>Titre :</label>
          <p>{annonce.title}</p>
        </div>
        <div className="details-item">
          <label>Utilisateur :</label>
          <p>{annonce.user ? `${annonce.user.first_name} ${annonce.user.last_name}` : "N/A"}</p>
        </div>
        <div className="details-item">
          <label>Prix :</label>
          <p>{annonce.title_price || "N/A"}</p>
        </div>
        <div className="details-item">
          <label>Description :</label>
          <p>{annonce.description || "Pas de description"}</p>
        </div>
        <div className="details-item">
          <label>Catégorie :</label>
          <p>{annonce.category?.name || "N/A"}</p>
        </div>
        <div className="details-item">
          <label>Localisation :</label>
          <p>{annonce.city || "Non renseignée"}</p>
        </div>
        <div className="details-item">
          <label>Publiée le :</label>
          <p>{formatDate(annonce.created_at)}</p>
        </div>
        {/* <div className="details-item">
          <label>Statut :</label>
          <p>{annonce.status || "Inconnu"}</p>
        </div>
        <div className="details-item">
          <label>Nombre de vues :</label>
          <p>{annonce.views || 0}</p>
        </div> */}
      </div>

      <button className="back-btn" onClick={() => navigate("/annonces")}>
        Retour
      </button>
    </div>
  );
};

export default AnnonceDetails;
