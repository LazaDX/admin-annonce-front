// src/pages/AddAdmin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAdmin.css";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adminData.password !== adminData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }
    if (adminData.name && adminData.email && adminData.password) {
      alert("Admin ajouté avec succès ! (Simulation)");
      navigate("/users");
    } else {
      setError("Veuillez remplir tous les champs !");
    }
  };

  return (
    <div className="add-admin-page">
      <div className="add-admin-container">
        <div className="add-admin-header">
          <h2>Ajouter un Admin - AnnonceMada</h2>
          <i className="fas fa-user-plus" style={{ color: "#e91e63", fontSize: "1.5rem", marginLeft: "0.5rem" }}></i>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="add-admin-form">
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i> Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={adminData.name}
              onChange={handleChange}
              placeholder="Entrez le nom de l'admin"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              placeholder="Entrez l'email de l'admin"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              placeholder="Entrez un mot de passe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <i className="fas fa-lock"></i> Confirmer Mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={adminData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmez le mot de passe"
              required
            />
          </div>
          <button type="submit" className="add-admin-btn">
            <i className="fas fa-plus"></i> Ajouter Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;