import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./pages/Employees";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Background from "./components/Background";
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = (state) => {
    setIsSidebarOpen((prevState) => (state !== undefined ? state : !prevState));
  };

  const showLayout = location.pathname.startsWith("/admin-dashboard") || location.pathname.startsWith("/employees");


  const handleClick = (e) => {
    // Close only if click is outside the sidebar
    if (isSidebarOpen && !e.target.closest('.sidebar')) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="app-container" onClick={handleClick}>
      {showLayout && <Navbar toggleSidebar={toggleSidebar} />}
      {showLayout && (
        <Sidebar
          open={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
    
      <div
        className={`content ${isSidebarOpen ? 'content-shift' : ''}`}
    >
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/employees" element={<Employees sidebarOpen={isSidebarOpen} />} />
          <Route path="/user-settings" element={<Settings />} />
        </Routes>
       
      </div>
    </div>
  );
};


function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;