// src/pages/ProfileView.jsx
import React from "react";
import "./Profile.css";

const ProfileView = () => {
  const adminProfile = {
    name: "Admin Annonce Mada",
    email: "admin@annoncemada.com",
    role: "Administrateur",
    joined: "01/01/2023",
    phone: "+261 34 12 345 67",
  };

  return (
    <div className="profile-page">
      <h2>Voir le Profil Admin</h2>
      <div className="profile-details">
        <div className="profile-item">
          <label>Nom :</label>
          <p>{adminProfile.name}</p>
        </div>
        <div className="profile-item">
          <label>Email :</label>
          <p>{adminProfile.email}</p>
        </div>
        <div className="profile-item">
          <label>Rôle :</label>
          <p>{adminProfile.role}</p>
        </div>
        <div className="profile-item">
          <label>Inscrit le :</label>
          <p>{adminProfile.joined}</p>
        </div>
        <div className="profile-item">
          <label>Téléphone :</label>
          <p>{adminProfile.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;