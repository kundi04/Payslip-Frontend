import React, { useRef, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { LayoutDashboard, Users, Receipt, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, DollarSign, Receipt, Clock, Settings, Shield, Heading } from "lucide-react";
import { style } from "framer-motion/client";

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
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = {
    name: "Jane Doe",
    email: "jane@example.com"
  };

  window.openAddEmployeePopup = () => setShowPopup(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
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

  const handleLogout = () => {
    console.log("User logged out");
    setShowLogoutModal(false);
    // Add your logout logic here: e.g., clearing auth tokens, redirecting
  };

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin-dashboard" },
    { title: "Employees", icon: <Users size={20} />, path: "/employees" },
    { title: "Payslips", icon: <Receipt size={20} />, path: "/payslips" },
    { title: "Settings", icon: <Settings size={20} />, path: "/admin-settings" },
    { title: "LogOut", icon: <LogOut size={20} />, onClick: handleLogoutClick, className: "logout-link text-white" },
    { title: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { title: "Logout", icon: <Clock size={20} />, path: "/logout" },
  ];

  return (
    <div className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
      <img src="/images/omni_logo_white.png" alt="logo" className="admin-logo" />
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
        {menuItems.map((item, index) => (
          <Nav.Item key={index} className={`nav-item ${item.className || ""}`}>
            {item.path ? (
              <Nav.Link href={item.path} className="nav-link">
                <span className="me-2">{item.icon}</span>
                {item.title}
              </Nav.Link>
            ) : (
              <span className="nav-link" onClick={item.onClick}>
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
      {/* Add Employee Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="neumorphic-card popup-card">
            <h3>Add Employee</h3>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter name" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" className="form-control" placeholder="Enter phone number" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" className="form-control" placeholder="Enter department" />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" className="form-control" placeholder="Enter job title" />
              </div>
              <button
                type="submit"
                className="neumorphic-button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPopup(false);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are currently logged in as:</p>
          <div className="border rounded p-2 mb-3 bg-light text-dark">
            <strong>{user.name}</strong><br />
            <small>{user.email}</small>
          </div>
          <p>Are you sure you want to log out?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;

