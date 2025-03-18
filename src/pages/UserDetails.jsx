import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        setError("Utilisateur non trouvé");
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <div className="details-page"><h2>Chargement...</h2></div>;
  }

  if (error) {
    return <div className="details-page"><h2>{error}</h2></div>;
  }

  return (
    <div className="details-page">
      <h2>Détails de l'utilisateur</h2>
      <div className="details-container">
        <div className="details-item">
          <label>ID :</label>
          <p>{user.id}</p>
        </div>
        <div className="details-item">
          <label>Nom :</label>
          <p>{user.first_name}</p>
        </div>
        <div className="details-item">
          <label>Prénom :</label>
          <p>{user.last_name}</p>
        </div>
        <div className="details-item">
          <label>Email :</label>
          <p>{user.email}</p>
        </div>
        <div className="details-item">
          <label>Téléphone :</label>
          <p>{user.contact}</p>
        </div>
        <div className="details-item">
          <label>Inscrit le :</label>
          <p>{formatDate(user.created_at)}</p>
        </div>
        <div className="details-item">
          <label>Total des annonces :</label>
          <p>{user.posts_count}</p>
        </div>
      </div>
      <button className="back-btn" onClick={() => navigate("/users")}>
        Retour
      </button>
    </div>
  );
};

export default UserDetails;
