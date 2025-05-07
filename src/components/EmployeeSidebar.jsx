import React, { useRef, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut 
} from "lucide-react";

const EmployeeSidebar = ({ open, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const [showRequestLeave, setShowRequestLeave] = useState(false);

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
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/employee-dashboard" },
    { title: "Settings", icon: <Settings size={20} />, path: "/user-settings" },
    { title: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  return (
    <div
      className={`sidebar ${open ? "open" : ""}`}
      ref={sidebarRef}
    >
      <img src="/images/omni_logo_white.png" alt="logo" className="admin-logo"/>
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

    
    </div>
  );
};

export default EmployeeSidebar;