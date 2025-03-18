// src/pages/TransactionDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";

// Données fictives (à remplacer par une API plus tard)
const transactions = [
  {
    id: "TX001",
    user: "Toky ANDRIAMANANTSOA",
    annonce: "Appartement à louer",
    amount: "50,000 Ar",
    date: "15/03/2025",
    status: "Complétée",
    paymentMethod: "Mobile Money",
    transactionFee: "2,500 Ar",
    completedAt: "15/03/2025 14:30",
  },
  {
    id: "TX002",
    user: "Miora RAKOTO",
    annonce: "Voiture Toyota",
    amount: "75,000 Ar",
    date: "14/03/2025",
    status: "En attente",
    paymentMethod: "Carte bancaire",
    transactionFee: "3,750 Ar",
    completedAt: "-",
  },
  {
    id: "TX003",
    user: "Rajaona ANDRIA",
    annonce: "Maison à vendre",
    amount: "100,000 Ar",
    date: "13/03/2025",
    status: "Annulée",
    paymentMethod: "Mobile Money",
    transactionFee: "5,000 Ar",
    completedAt: "-",
  },
];

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      const foundTransaction = transactions.find((t) => t.id === id);
      setTransaction(foundTransaction || null);
      setLoading(false);
    }, 500); // Délai simulé de 500ms
  }, [id]);

  if (loading) {
    return <div className="details-page"><h2>Chargement...</h2></div>;
  }

  if (!transaction) {
    return <div className="details-page"><h2>Transaction non trouvée</h2></div>;
  }

  return (
    <div className="details-page">
      <h2>Détails de la transaction</h2>
      <div className="details-container">
        <div className="details-item">
          <label>ID :</label>
          <p>{transaction.id}</p>
        </div>
        <div className="details-item">
          <label>Utilisateur :</label>
          <p>{transaction.user}</p>
        </div>
        <div className="details-item">
          <label>Annonce :</label>
          <p>{transaction.annonce}</p>
        </div>
        <div className="details-item">
          <label>Montant :</label>
          <p>{transaction.amount}</p>
        </div>
        <div className="details-item">
          <label>Frais de transaction :</label>
          <p>{transaction.transactionFee}</p>
        </div>
        <div className="details-item">
          <label>Méthode de paiement :</label>
          <p>{transaction.paymentMethod}</p>
        </div>
        <div className="details-item">
          <label>Date :</label>
          <p>{transaction.date}</p>
        </div>
        <div className="details-item">
          <label>Complétée le :</label>
          <p>{transaction.completedAt}</p>
        </div>
        <div className="details-item">
          <label>Statut :</label>
          <p>{transaction.status}</p>
        </div>
      </div>
      <button className="back-btn" onClick={() => navigate("/transactions")}>
        Retour
      </button>
    </div>
  );
};

export default TransactionDetails;