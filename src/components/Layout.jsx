import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="d-flex vh-100 bg-light position-relative">
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow-1 overflow-auto p-4 bg-light">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
