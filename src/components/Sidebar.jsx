import React, { useRef, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { LayoutDashboard, Users, Receipt, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Mocked profile info – ideally fetched from context or props
  const userProfile = {
    name: "Admin User",
    email: "admin@example.com",
    image: "/images/default-profile.png"
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, toggleSidebar]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/"); // Redirect to login page
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin-dashboard" },
    { title: "Employees", icon: <Users size={20} />, path: "/employees" },
    { title: "Payslips", icon: <Receipt size={20} />, path: "/payslips" },
    { title: "Settings", icon: <Settings size={20} />, path: "/admin-settings" },
    { title: "LogOut", icon: <LogOut size={20} />, onClick: handleLogoutClick, className: "logout-link text-white" },
  ];

  return (
    <div className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
      <img src="/images/omni_logo_white.png" alt="logo" className="admin-logo" />
      <Nav className="flex-column mt-5">
      {menuItems.map((item, index) => (
 <Nav.Item key={index} className={`nav-item ${item.className || ""}`}>
 {item.path ? (
   <Nav.Link href={item.path} className="nav-link">
     <span className="me-2">{item.icon}</span>
     {item.title}
   </Nav.Link>
 ) : (
  <span className={`nav-link ${item.className || ""}`} onClick={item.onClick}>
  <span className="me-2">{item.icon}</span>
  {item.title}
</span>


 )}
</Nav.Item>

))}
      </Nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="popup-overlay">
          <div className="neumorphic-card popup-card text-center p-4">
            <img src={userProfile.image} alt="Profile" className="rounded-circle mb-3" style={{ width: "80px", height: "80px" }} />
            <h5>{userProfile.name}</h5>
            <p>{userProfile.email}</p>
            <p>Are you sure you want to log out?</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-danger" onClick={confirmLogout}>Confirm</button>
              <button className="btn btn-secondary" onClick={cancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;