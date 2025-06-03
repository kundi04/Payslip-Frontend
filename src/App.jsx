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
import SuperUserSidebar from "./components/SuperUserSidebar";
import Settings from './pages/Settings';
import Payslips from "./pages/Payslips"
import AdminSettings from './pages/AdminSettings';
import EmployeeDetails from "./components/EmployeeDetails";

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = (state) => {
    setIsSidebarOpen((prevState) => (state !== undefined ? state : !prevState));
  };



const isAdminPath = 
  location.pathname.startsWith("/admin-dashboard") ||
  location.pathname.startsWith("/employees") ||
  location.pathname.startsWith("/payslips") ||
  location.pathname.startsWith("/admin-settings") ||
  location.pathname.startsWith("/super-user");

const isEmployeePath =
  location.pathname.startsWith("/employee-dashboard") ||
  location.pathname.startsWith("/user-settings") ||
  location.pathname.startsWith("/employee-details");

  const isSuperUserPath = location.pathname.startsWith("/super-user") ||
                        location.pathname.startsWith("/user-management") ||
                        location.pathname.startsWith("/system-logs") ||
                        location.pathname.startsWith("/database") ||
                        location.pathname.startsWith("/system-health") ||
                        location.pathname.startsWith("/configurations");


const showLayout = isAdminPath || isEmployeePath || isSuperUserPath;


const handleClick = (e) => {
  if (
    isSidebarOpen &&
    !e.target.closest(".sidebar") &&
    !e.target.closest(".employee-sidebar") &&
    !e.target.closest(".SuperUserSidebar")
  ) {
    setIsSidebarOpen(false);
  }
};

const [showLogoutModal, setShowLogoutModal] = useState(false);

const handleLogoutClick = () => {
  setShowLogoutModal(true);
};



  return (
      <div className="app-container" onClick={handleClick}>
    {showLayout && <Navbar toggleSidebar={toggleSidebar} />}
    
{showLayout && isEmployeePath ? (
  <EmployeeSidebar
    open={isSidebarOpen}
    toggleSidebar={toggleSidebar}
    onLogoutClick={handleLogoutClick}
  />
) : showLayout && isSuperUserPath ? (
  <SuperUserSidebar
    open={isSidebarOpen}
    toggleSidebar={toggleSidebar}
    onLogoutClick={handleLogoutClick}
  />
) : showLayout && isAdminPath ? (
 <Sidebar
  open={isSidebarOpen}
  toggleSidebar={toggleSidebar}
  onLogoutClick={handleLogoutClick}
/>

) : null}


{showLogoutModal && (
  <div
    className="custom-modal-backdrop"
    style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      className="modal-content p-4 bg-white rounded shadow"
      style={{
        maxWidth: "400px",
        width: "100%",
        zIndex: 10000,
        opacity: 1,
        position: "relative",
      }}
    >
      <h5 className="mb-3">Confirm Logout</h5>
      <div className="border rounded p-2 mb-3 bg-light text-dark">
        <strong>{localStorage.getItem("userName") || "User"}</strong>
        <br />
        <small>{localStorage.getItem("userEmail") || "user@example.com"}</small>
      </div>

      <p className="mb-3">Are you sure you want to logout?</p>

      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-danger"
          onClick={() => {
            setShowLogoutModal(false);
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Yes, Logout
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowLogoutModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}




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
          <Route path="/payslips" element={<Payslips />} />
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