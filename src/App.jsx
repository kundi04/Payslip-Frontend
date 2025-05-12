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
import EmployeeSidebar from "./components/EmployeeSidebar";
import SuperUser from "./pages/SuperUser";
import Settings from './pages/Settings';
import AdminSettings from './pages/AdminSettings';
import EmployeeDetails from "./components/EmployeeDetails";

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = (state) => {
    setIsSidebarOpen((prevState) => (state !== undefined ? state : !prevState));
  };

  const showLayout = 
    location.pathname.startsWith("/admin-dashboard") || 
    location.pathname.startsWith("/employees") || 
    location.pathname.startsWith("/employee-dashboard") || 
    location.pathname.startsWith("/my-payslips") || 
    location.pathname.startsWith("/user-settings") ||
    location.pathname.startsWith("/admin-settings")||
    location.pathname.startsWith("/super-user");



  const handleClick = (e) => {

    if (isSidebarOpen && !e.target.closest('.sidebar')) {
      setIsSidebarOpen(false);
    }

    if (isSidebarOpen && !e.target.closest('.employee-sidebar')) {
      setIsSidebarOpen(false);
    }

    if (isSidebarOpen && !e.target.closest('.SuperUserSidebar')) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="app-container" onClick={handleClick}>
      {showLayout && <Navbar toggleSidebar={toggleSidebar} />}
      {showLayout && location.pathname.startsWith("/employee-dashboard") ? (
        <EmployeeSidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
      ) : showLayout ? (
        <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
      ) : null}

      <div className={`content ${isSidebarOpen ? 'content-shift' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/employees" element={<Employees sidebarOpen={isSidebarOpen} />} />
          <Route path="/user-settings" element={<Settings />} />
          <Route path="/super-user" element={<SuperUser sidebarOpen={isSidebarOpen}/>} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/employee-details/:id" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    
      <Router>
        <AppContent />
      </Router>

  );
}

export default App;