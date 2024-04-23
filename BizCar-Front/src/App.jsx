import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import BusinessCardList from "./Components/BusinessCardList";
import BusinessCardCreate from "./Components/BusinessCardCreate";
import BusinessCardEdit from "./Components/BusinessCardEdit";
import Nav from "./Components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in session storage
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Remove token from session storage upon logout
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // Function to render protected routes only if authenticated
  const renderProtectedRoute = (Component) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <main className="container-fluid mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/business-cards"
            element={renderProtectedRoute(BusinessCardList)}
          />
          <Route
            path="/business-cards/create"
            element={renderProtectedRoute(BusinessCardCreate)}
          />
          <Route
            path="/business-cards/:id/edit"
            element={renderProtectedRoute(BusinessCardEdit)}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
