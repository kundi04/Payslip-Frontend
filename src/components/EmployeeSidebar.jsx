import React, { useRef, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { 
  LayoutDashboard, 
  Calendar, 
  Receipt, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
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
    { title: "Payslips", icon: <Receipt size={20} />, path: "/my-payslips" },
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

      {showRequestLeave && (
        <div className="popup-overlay">
          <div className="neumorphic-card popup-card">
            <h3>Request Leave</h3>
            <form>
              <div className="form-group">
                <label>Leave Type</label>
                <select className="form-control">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>Reason</label>
                <textarea className="form-control" rows="3" placeholder="Brief description..."></textarea>
              </div>
              <button
                type="submit"
                className="neumorphic-button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowRequestLeave(false); // Close the pop-up on submit
                }}
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSidebar;