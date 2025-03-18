// src/pages/Notifications.jsx
import React, { useState } from "react";
import "./Notifications.css";

const Notifications = () => {
  const [newUsers, setNewUsers] = useState([
    { id: 1, name: "Toky ANDRIAMANANTSOA", email: "tokyclick@gmail.com", joined: "15/03/2025", read: false },
    { id: 2, name: "Miora RAKOTO", email: "miora.r@gmail.com", joined: "14/03/2025", read: false },
  ]);

  const [recentPosts, setRecentPosts] = useState([
    { id: 1, user: "Toky ANDRIAMANANTSOA", annonce: "Appartement à louer", posted: "15/03/2025", read: false },
    { id: 2, user: "Miora RAKOTO", annonce: "Voiture Toyota", posted: "14/03/2025", read: false },
  ]);

  const markAsRead = (type, id) => {
    if (type === "user") {
      setNewUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, read: true } : user
        )
      );
    } else if (type === "post") {
      setRecentPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, read: true } : post
        )
      );
    }
  };

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      <div className="notifications-container">
        <div className="notification-section">
          <h3>Nouveaux Inscrits sur Annonce Mada</h3>
          {newUsers.length === 0 ? (
            <p>Aucun nouvel inscrit pour le moment.</p>
          ) : (
            newUsers.map((user) => (
              <div
                key={user.id}
                className={`notification-card ${user.read ? "read" : "unread"}`}
                onClick={() => markAsRead("user", user.id)}
              >
                <div className="notification-content">
                  <p>
                    <strong>{user.name}</strong> s'est inscrit avec l'email{" "}
                    <span>{user.email}</span> le {user.joined}.
                  </p>
                  {!user.read && <span className="notification-dot"></span>}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="notification-section">
          <h3>Dernières Annonces Publiées</h3>
          {recentPosts.length === 0 ? (
            <p>Aucune annonce récente pour le moment.</p>
          ) : (
            recentPosts.map((post) => (
              <div
                key={post.id}
                className={`notification-card ${post.read ? "read" : "unread"}`}
                onClick={() => markAsRead("post", post.id)}
              >
                <div className="notification-content">
                  <p>
                    <strong>{post.user}</strong> a publié{" "}
                    <span>{post.annonce}</span> le {post.posted}.
                  </p>
                  {!post.read && <span className="notification-dot"></span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;