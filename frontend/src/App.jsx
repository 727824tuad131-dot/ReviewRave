import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login"; // Unga Login component path
import AdminDashboard from "./components/admin/AdminDashboard"; // Unga AdminDashboard component path

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route Login page-ku pogum */}
        <Route path="/" element={<Login />} />
        
        {/* Dashboard route */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* Catch-all route: Vera enna URL type pannalum login-ku redirect aagum */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;