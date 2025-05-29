import React, { useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Button, Form, FormControl, Dropdown } from "react-bootstrap";
import { AlignJustify, Search, Bell, User, LogOut, Settings } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const [notifications] = useState([
    { id: 1, text: "New payroll processed", time: "10 min ago" },
    { id: 2, text: "Employee onboarding complete", time: "1 hour ago" },
    { id: 3, text: "System update scheduled", time: "Yesterday" },
  ]);

  return (
    <BootstrapNavbar expand="lg" className="border-bottom px-4 py-2 navbar">
      <div className="d-flex align-items-center">
      <Button  className="me-2 hamburger" onClick={toggleSidebar}>
  <AlignJustify size={24} />
</Button>
        <img src="/images/logo-blue.png" alt="Logo" className=" admin-logo" />
      </div>
      <Nav className="ms-auto d-flex align-items-center">
        <Form className="d-none d-md-flex position-relative me-3 ">
          <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
          <FormControl type="text" placeholder="Search..." className="ps-5" />
        </Form>
        <Dropdown align="end" className="notification">
          <Dropdown.Toggle as={Button} variant="light" className="position-relative">
            <Bell size={24} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-end w-100">
            <Dropdown.Header>Notifications</Dropdown.Header>
            {notifications.map((notification) => (
              <Dropdown.Item key={notification.id}>
                <div className="d-flex flex-column">
                  <span>{notification.text}</span>
                  <small className="text-muted">{notification.time}</small>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown align="end" className="ms-3 account">
          <Dropdown.Toggle as={Button} variant="light" className="p-0">
            <img src="https://github.com/shadcn.png" alt="HR Pic" className="rounded-circle" width={40} height={40} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>My Account</Dropdown.Header>
            <Dropdown.Item>
              <User className="me-2" size={18} /> Profile
            </Dropdown.Item>
            <Dropdown.Item>
              <Settings className="me-2" size={18} /> Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <LogOut className="me-2" size={18} /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </BootstrapNavbar>
  );
};

export default Navbar;
