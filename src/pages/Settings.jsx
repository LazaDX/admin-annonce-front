// src/pages/Settings.jsx
import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    publicationFee: "50000", // Sans "Ar" pour faciliter la validation numérique
    currency: "Ar",
    maxPrice: "50000000", // Sans "Ar"
    maxAdDuration: "30", // Durée maximale d'une annonce en jours
    notificationsEnabled: true, // Notifications activées par défaut
    maxAdsPerUser: "5", // Nombre maximum d'annonces par utilisateur
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Réinitialiser l'erreur lors de la modification
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs
    if (
      !settings.publicationFee ||
      !settings.currency ||
      !settings.maxPrice ||
      !settings.maxAdDuration ||
      !settings.maxAdsPerUser
    ) {
      setError("Tous les champs doivent être remplis !");
      return;
    }

    // Validation numérique
    if (isNaN(settings.publicationFee) || settings.publicationFee <= 0) {
      setError("Le tarif de publication doit être un nombre positif !");
      return;
    }
    if (isNaN(settings.maxPrice) || settings.maxPrice <= 0) {
      setError("Le prix maximum doit être un nombre positif !");
      return;
    }
    if (isNaN(settings.maxAdDuration) || settings.maxAdDuration <= 0) {
      setError("La durée maximale d'une annonce doit être un nombre positif !");
      return;
    }
    if (isNaN(settings.maxAdsPerUser) || settings.maxAdsPerUser <= 0) {
      setError("Le nombre maximum d'annonces doit être un nombre positif !");
      return;
    }

    // Confirmation avant sauvegarde
    const confirmSave = window.confirm("Voulez-vous vraiment enregistrer ces paramètres ?");
    if (!confirmSave) return;

    // Simulation de sauvegarde
    console.log("Paramètres sauvegardés :", settings);
    setSuccess("Paramètres mis à jour avec succès !");
    setError("");
  };

  return (
    <div className="settings-page">
      <h2>Paramètres</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h3>Paramètres des Annonces</h3>
          <div className="form-group">
            <label>Tarif de publication (en {settings.currency})</label>
            <input
              type="number"
              name="publicationFee"
              value={settings.publicationFee}
              onChange={handleChange}
              placeholder="Entrez le tarif de publication"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Devise</label>
            <input
              type="text"
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              placeholder="Entrez la devise (ex. Ar, USD)"
              required
            />
          </div>
          <div className="form-group">
            <label>Prix maximum autorisé (en {settings.currency})</label>
            <input
              type="number"
              name="maxPrice"
              value={settings.maxPrice}
              onChange={handleChange}
              placeholder="Entrez le prix maximum"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Durée maximale d'une annonce (en jours)</label>
            <input
              type="number"
              name="maxAdDuration"
              value={settings.maxAdDuration}
              onChange={handleChange}
              placeholder="Entrez la durée maximale (jours)"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre maximum d'annonces par utilisateur</label>
            <input
              type="number"
              name="maxAdsPerUser"
              value={settings.maxAdsPerUser}
              onChange={handleChange}
              placeholder="Entrez le nombre maximum d'annonces"
              min="1"
              required
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Paramètres de Notifications</h3>
          <div className="form-group toggle-group">
            <label>Activer les notifications push</label>
            <label className="switch">
              <input
                type="checkbox"
                name="notificationsEnabled"
                checked={settings.notificationsEnabled}
                onChange={handleChange}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default Settings;