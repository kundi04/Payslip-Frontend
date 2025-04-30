import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SuperUserSidebar from '../components/SuperUserSidebar';
import PageWrapper from '../components/PageWrapper';
import { Card, Row, Col } from 'react-bootstrap';
import { Shield, Users, Activity } from 'lucide-react';
import '../App.css';

const SuperUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = (state) => setSidebarOpen(state !== undefined ? state : !sidebarOpen);

  return (
    <PageWrapper>
      <Navbar toggleSidebar={toggleSidebar} />
      <SuperUserSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${sidebarOpen ? 'content-shift' : ''}`}>
        <div className="dashboard-container">
          <h1 className="mb-4 fw-bold">Super User Dashboard</h1>

          <Row className="g-4">
            <Col md={4}>
              <Card className="neumorphic-card">
                <Card.Body>
                  <h5>System Access</h5>
                  <p>Manage system-wide access and permissions</p>
                  <Shield size={24} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="neumorphic-card">
                <Card.Body>
                  <h5>User Management</h5>
                  <p>Configure user roles and access levels</p>
                  <Users size={24} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="neumorphic-card">
                <Card.Body>
                  <h5>System Health</h5>
                  <p>Monitor system performance and status</p>
                  <Activity size={24} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SuperUser;