// src/pages/Employees.jsx
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import '../App.css';

const employeeData = [
  { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active', lastpayslip: '25/02/25' },
  { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'Pending', lastpayslip: '25/02/25' },
  { id: 3, name: 'Michael Johnson', department: 'HR', status: 'Active', lastpayslip: '25/02/25' },
  { id: 4, name: 'Sarah Williams', department: 'Finance', status: 'Pending', lastpayslip: '25/02/25' },
  { id: 5, name: 'Emily Brown', department: 'Sales', status: 'Active', lastpayslip: '25/02/25' },
  { id: 6, name: 'Chris Evans', department: 'IT', status: 'Pending', lastpayslip: '25/02/25' },
];

const Employees = () => {
  return (
    <PageWrapper>
    <div className="dashboard-container">
      <h1 className="mb-4 fw-bold">All Employees</h1>
      <Card className="neumorphic-card p-3">
        <Card.Body>
          <Table striped bordered hover responsive size="sm">
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
    </div>
    </PageWrapper>
  );
};

export default Employees;
