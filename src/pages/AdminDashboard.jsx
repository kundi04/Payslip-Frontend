import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import ParticlesBackground from '../components/Particles';

import '../App.css';
import { 
  Users,  
  Calendar,
  LineChartIcon
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const employeeData = [
  { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active', lastpayslip: '25/02/25' },
  { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'Pending', lastpayslip: '25/02/25' },
  { id: 3, name: 'Michael Johnson', department: 'HR', status: 'Active', lastpayslip: '25/02/25' },
  { id: 4, name: 'Sarah Williams', department: 'Finance', status: 'Pending', lastpayslip: '25/02/25' },
  { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active', lastpayslip: '25/02/25' },
  { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'Pending', lastpayslip: '25/02/25' },
  { id: 3, name: 'Michael Johnson', department: 'HR', status: 'Active', lastpayslip: '25/02/25' },
  { id: 4, name: 'Sarah Williams', department: 'Finance', status: 'Pending', lastpayslip: '25/02/25' },
  
];

const Dashboard = ({ sidebarOpen }) => {
  return (
    <PageWrapper>
      <ParticlesBackground />
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`} id='ad-dash'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h1 fw-bold  ">Welcome Admin Sarah</h1>
        <div className="d-flex align-items-center">
          <Calendar className="me-2" size={20} />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <Row className="g-3">
        <Col md={3}>
          <Card className="ad-card p-3">
            <Card.Body>
              <h5>Total Employees</h5>
              <h2>142</h2>
              <Users />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="ad-card p-3">
            <Card.Body>
              <h5>Pending Payslips</h5>
              <h2>300</h2>
              <LineChartIcon />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Card className="ad-card p-3">
            <Card.Body>
              <h5>Recent Employees</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Last Payslip</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.department}</td>
                      <td>{emp.status}</td>
                      <td>{emp.lastpayslip}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <button className='view-all' onClick={"/employees"}>View All</button>
        </Col>
      </Row>
    </div>
    </PageWrapper>
  );
};

export default Dashboard;




