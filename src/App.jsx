// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Annonces from "./pages/Annonces";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import ProfileView from "./pages/ProfileView";
import ProfileEdit from "./pages/ProfileEdit";
import UserDetails from "./pages/UserDetails";
import AnnonceDetails from "./pages/AnnonceDetails";
import TransactionDetails from "./pages/TransactionDetails";
import AddAdmin from "./pages/AddAdmin";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes avec sidebar */}
        <Route
          path="*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="app-main">
                <Navbar />
                <div className="app-content">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ErrorBoundary>
                          <Dashboard />
                        </ErrorBoundary>
                      }
                    />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/transactions/:id" element={<TransactionDetails />} />
                    <Route path="/annonces" element={<Annonces />} />
                    <Route path="/annonces/:id" element={<AnnonceDetails />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile/view" element={<ProfileView />} />
                    <Route path="/profile/edit" element={<ProfileEdit />} />
                    <Route path="/add-admin" element={<AddAdmin />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;