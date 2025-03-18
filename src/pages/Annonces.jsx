import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Annonces.css";

const Annonces = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Appel à l'API pour récupérer les posts
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts") // Remplace par l'URL de ton API
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des posts :", err);
        setError("Erreur lors du chargement des posts");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrage des posts par titre ou par nom complet de l'utilisateur
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.user &&
      `${post.user.first_name} ${post.user.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()))
  );

  const handleView = (id) => {
    navigate(`/annonces/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce post ?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/api/posts/${id}`)
        .then((response) => {
          // Mise à jour de l'état en retirant le post supprimé
          setPosts(posts.filter((post) => post.id !== id));
          alert(`Post avec l'ID: ${id} supprimé avec succès !`);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du post :", error);
          alert("Une erreur est survenue lors de la suppression du post");
        });
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
    <div className="annonces-page">
      <h2>Posts</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par titre ou utilisateur..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      <table className="annonces-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Utilisateur</th>
            <th>Prix</th>
            <th>Date</th>
            {/* <th>Statut</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length === 0 ? (
            <tr>
              <td colSpan="7">Aucun post trouvé.</td>
            </tr>
          ) : (
            filteredPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  {post.user
                    ? `${post.user.first_name} ${post.user.last_name}`
                    : "N/A"}
                </td>
                <td>{post.title_price}</td>
                <td>{formatDate(post.created_at)}</td>
                {/* <td>{post.status}</td> */}
                <td>
                  <button
                    className="action-btn view"
                    onClick={() => handleView(post.id)}
                  >
                    Voir
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Annonces;
