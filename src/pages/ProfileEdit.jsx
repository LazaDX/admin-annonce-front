// src/pages/ProfileEdit.jsx
import React, { useState } from "react";
import "./Profile.css";

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: "Admin Annonce Mada",
    email: "admin@annoncemada.com",
    phone: "+261 34 12 345 67",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profile.name || !profile.email || !profile.phone) {
      setError("Veuillez remplir tous les champs obligatoires !");
      return;
    }
    if (profile.password && profile.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères !");
      return;
    }
    console.log("Profil mis à jour :", profile);
    alert("Profil mis à jour ! (Simulation)");
  };

  return (
    <div className="profile-page">
      <h2>Modifier le Profil Admin</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Nom *</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div className="form-group">
          <label>Téléphone *</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Entrez votre numéro de téléphone"
            required
          />
        </div>
        <div className="form-group">
          <label>Nouveau mot de passe (optionnel)</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Entrez un nouveau mot de passe"
          />
        </div>
        <button type="submit" className="submit-btn">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;