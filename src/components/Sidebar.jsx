import React, { useRef, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { LayoutDashboard, Users, Receipt, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ open, toggleSidebar, onLogoutClick }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

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

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin-dashboard" },
    { title: "Employees", icon: <Users size={20} />, path: "/employees" },
    { title: "Payslips", icon: <Receipt size={20} />, path: "/payslips" },
    { title: "Settings", icon: <Settings size={20} />, path: "/admin-settings" },
    { title: "LogOut", icon: <LogOut size={20} />, onClick: onLogoutClick, className: "d-flex align-items-center gap-2" },
  ];

  return (
    <div className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
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
    </div>
  );
};

export default Sidebar;




