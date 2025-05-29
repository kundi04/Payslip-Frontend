import React, { useRef, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Settings, 
  Terminal,
  Database,
  Activity,
  AlertCircle,
  FileCode,
  LogOut 
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SuperUserSidebar = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

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
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/super-user" },
    { title: "User Management", icon: <Users size={20} />, path: "/user-management" },
    { title: "System Logs", icon: <Terminal size={20} />, path: "/system-logs" },
    { title: "Database", icon: <Database size={20} />, path: "/database" },
    { title: "System Health", icon: <Activity size={20} />, path: "/system-health" },
    { title: "Configurations", icon: <Settings size={20} />, path: "/configurations" },
    { 
      title: "Logout", 
      icon: <LogOut size={20} />, 
      onClick: () => handleLogout(navigate),
      className: "logout-link" 
    }
  ];

  return (
    <div className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
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
              <span 
                className="nav-link" 
                onClick={item.onClick}
                style={{ cursor: 'pointer' }}
              >
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

export default SuperUserSidebar;