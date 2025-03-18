// src/pages/Transactions.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Transactions.css";

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions] = useState([
    { id: "TX001", user: "Toky ANDRIAMANANTSOA", annonce: "Appartement à louer", amount: "50,000 Ar", date: "15/03/2025", status: "Complétée" },
    { id: "TX002", user: "Miora RAKOTO", annonce: "Voiture Toyota", amount: "75,000 Ar", date: "14/03/2025", status: "En attente" },
    { id: "TX003", user: "Rajaona ANDRIA", annonce: "Maison à vendre", amount: "100,000 Ar", date: "13/03/2025", status: "Annulée" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.annonce.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id) => {
    navigate(`/transactions/${id}`);
  };

  const handleCancel = (id) => {
    const confirmCancel = window.confirm("Voulez-vous vraiment annuler cette transaction ?");
    if (confirmCancel) {
      alert(`Transaction avec l'ID: ${id} annulée ! (Simulation)`);
    }
  };

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par ID, utilisateur ou annonce..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Annonce</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan="7">Aucune transaction trouvée.</td>
            </tr>
          ) : (
            filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.user}</td>
                <td>{transaction.annonce}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.status}</td>
                <td>
                  <button className="action-btn view" onClick={() => handleView(transaction.id)}>
                    Voir
                  </button>
                  {transaction.status === "En attente" && (
                    <button className="action-btn cancel" onClick={() => handleCancel(transaction.id)}>
                      Annuler
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;