import React, { useRef, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { LayoutDashboard, Users, DollarSign, Receipt, Clock, Settings, Shield, Heading } from "lucide-react";

const Sidebar = ({ open, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false); // Close the sidebar if clicked outside
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, toggleSidebar]);

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin-dashboard" },
    { title: "Employees", icon: <Users size={20} />, path: "/employees" },
    { title: "Payslips", icon: <Receipt size={20} />, path: "/payslips" },
    { title: "Settings", icon: <Settings size={20} />, path: "/settings" },
    
    { title: "Quick Actions" , className: "quick-actions-title"},

    { 
      title: "Add Employee", 
      icon: <Users size={20} />, 
      onClick: () => setShowPopup(true), 
       className: "add-employee-text"
  
    },
    { title: "Pending Payslips", icon: <Receipt size={20} />, path: "/add-payslip" },
    { title: "Messages", icon: <DollarSign size={20} />, path: "/add-payroll" },
    { title: "Help & Support", icon: <Shield size={20} />, path: "/security" },
    { title: "Logout", icon: <Clock size={20} />, path: "/logout" },
  ];

  return (
    <div
      className=  {`sidebar ${open ? "open" : ""}`}
      ref={sidebarRef}
    >
      <img src= "/images/omni_logo_white.png" alt="logo" className="admin-logo"/>
      <Nav className="flex-column mt-5">
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
            setShowPopup(false); // Close the pop-up on submit
          }}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Sidebar;