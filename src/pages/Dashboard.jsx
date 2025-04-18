// src/pages/Dashboard.jsx
import React from "react";
import DashboardCard from "../components/DashboardCard";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAnnonces, setTotalAnnonces] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [usersByMonth, setUsersByMonth] = useState([]);
  const [postsByMonth, setPostsByMonth] = useState([]);


  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Récupérer les données depuis l'API Laravel au chargement du composant
  useEffect(() => {
    // Récupérer le nombre total d'utilisateurs
    fetch("http://localhost:8000/api/users/count")
      .then((response) => response.json())
      .then((data) => setTotalUsers(data.totalUsers))
      .catch((error) =>
        console.error("Erreur lors de la récupération des utilisateurs :", error)
      );

    // Récupérer le nombre total d'annonces
    fetch("http://localhost:8000/api/posts/count")
      .then((response) => response.json())
      .then((data) => setTotalAnnonces(data.totalPosts))
      .catch((error) =>
        console.error("Erreur lors de la récupération des annonces :", error)
      );

    fetch('http://localhost:8000/api/visits/count')
      .then(response => response.json())
      .then(data => setVisitCount(data.visitCount))
      .catch(error => console.error('Erreur:', error));

    fetch("http://localhost:8000/api/users/by-month")
      .then((response) => response.json())
      .then((data) => {
        console.log("usersByMonth:", data.data);
        setUsersByMonth(data.data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des utilisateurs par mois :", error)
      );

    fetch("http://localhost:8000/api/posts/by-month")
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setPostsByMonth(data.data);
        } else {
          console.error("Erreur dans la réponse postsByMonth :", data);
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des postsByMonth :", error)
      );
  }, []);

  const monthLabels = [
    "Janv", "Fév", "Mars", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
  ];

  const dynamicUsersData = {
    labels: usersByMonth.map((item) => monthLabels[item.month - 1]),
    datasets: [
      {
        label: "Nouveaux Utilisateurs",
        data: usersByMonth.map((item) => item.count),
        borderColor: "#6f42c1",
        backgroundColor: "rgba(111, 66, 193, 0.2)",
        fill: true,
      },
    ],
  };

  const postsData = {
    labels: postsByMonth.length > 0
      ? postsByMonth.map((item) => {
        const monthNames = [
          "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
          "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
        ];
        return monthNames[item.month - 1]; // Assure-toi que ton API renvoie month = 1 pour Janvier
      })
      : [],
    datasets: [
      {
        label: "Posts Publiés",
        data: postsByMonth.length > 0
          ? postsByMonth.map((item) => item.count)
          : [],
        backgroundColor: "#3498db", // Choisis la couleur que tu veux
        borderColor: "#2980b9",
        borderWidth: 1,
      },
    ],
  };

  // Données fictives pour les graphiques linéaires
  // const revenueData = {
  //   labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
  //   datasets: [
  //     {
  //       label: "Revenus (Ar)",
  //       data: [5000000, 7000000, 12000000, 9000000, 15000000, 12500000],
  //       borderColor: "#ff4d94",
  //       backgroundColor: "rgba(255, 77, 148, 0.2)",
  //       fill: true,
  //     },
  //   ],
  // };

  // const usersData = {
  //   labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
  //   datasets: [
  //     {
  //       label: "Nouveaux Utilisateurs",
  //       data: [200, 300, 450, 380, 600, 520],
  //       borderColor: "#6f42c1",
  //       backgroundColor: "rgba(111, 66, 193, 0.2)",
  //       fill: true,
  //     },
  //   ],
  // };

  // Données fictives pour les graphiques cylindriques
  const annoncesData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Annonces Publiées",
        data: [50, 80, 120, 90, 150, 130],
        backgroundColor: "#2ecc71",
        borderColor: "#27ae60",
        borderWidth: 1,
      },
    ],
  };

  const transactionsData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Transactions",
        data: [30, 50, 80, 60, 100, 90],
        backgroundColor: "#ffd700",
        borderColor: "#ffaa00",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "" },
    },
  };

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <DashboardCard
          title="Utilisateurs"
          value={formatNumber(totalUsers)}
          icon="fas fa-users"
          color="linear-gradient(90deg, #ff4d94, #6f42c1)"
        />
        <DashboardCard
          title="Annonces"
          value={formatNumber(totalAnnonces)}
          icon="fas fa-bullhorn"
          color="linear-gradient(90deg, #2ecc71, #27ae60)"
        />
        {/* <DashboardCard
          title="Revenus"
          value="12,500,000 Ar"
          icon="fas fa-money-bill"
          color="linear-gradient(90deg, #ffd700, #ffaa00)"
        /> */}
        <DashboardCard
          title="Visites"
          value={visitCount}
          icon="fas fa-eye"
          color="linear-gradient(90deg, #3498db, #2980b9)"
        />
      </div>
      <div className="dashboard-charts">
        {/* <div className="chart-container">
          <h3>Revenus Mensuels</h3>
          <Line data={revenueData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Revenus Mensuels" } } }} />
        </div> */}
        <div className="chart-container">
          <h3>Nouveaux Utilisateurs</h3>
          <Line data={dynamicUsersData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Nouveaux Utilisateurs" } } }} />
        </div>
        <div className="chart-container">
          <h3>Annonces Publiées par Mois</h3>
          <Bar data={postsData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Annonces Publiées par Mois" } } }} />
        </div>
        {/* <div className="chart-container">
          <h3>Transactions par Mois</h3>
          <Bar data={transactionsData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Transactions par Mois" } } }} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;