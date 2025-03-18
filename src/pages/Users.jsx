import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Appel à l'API pour récupérer les utilisateurs
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users") // Remplace par l'URL de ton API
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        setError("Erreur lors du chargement des utilisateurs");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    (user.first_name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );
    if (confirmDelete) {
      // Ici, tu peux appeler une API de suppression si elle existe
      setUsers(users.filter((user) => user.id !== id));
      alert(`Utilisateur avec l'ID: ${id} supprimé ! (Simulation)`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="users-page">
      <h2>Utilisateurs</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Inscrit le</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6">Aucun utilisateur trouvé.</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  <button
                    className="action-btn view"
                    onClick={() => handleView(user.id)}
                  >
                    Voir
                  </button>
                  {/* <button
                    className="action-btn delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </button> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
