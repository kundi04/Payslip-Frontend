import React, { useState } from 'react';
import { Card, Row, Col, Table, Form, Button } from 'react-bootstrap';
import avatar from '../images/avatar.png';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarComponent from 'react-calendar';
import {
  Users,
  Calendar,
  LineChartIcon
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import '../App.css';

const employeeData = [
  { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active', lastpayslip: '2025-01-25' },
  { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'Pending', lastpayslip: '2025-02-25' },
  { id: 3, name: 'Michael Johnson', department: 'HR', status: 'Active', lastpayslip: '2025-03-25' },
  { id: 4, name: 'Sarah Williams', department: 'Finance', status: 'Pending', lastpayslip: '2025-12-25' },
  { id: 5, name: 'Alice Brown', department: 'IT', status: 'Active', lastpayslip: '2025-10-25' },
  { id: 6, name: 'Robert Green', department: 'Logistics', status: 'Pending', lastpayslip: '2025-11-25' },
];

const Dashboard = ({ sidebarOpen }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const departments = [...new Set(employeeData.map(emp => emp.department))];

  const filteredEmployees = employeeData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesMonth = selectedMonth
      ? new Date(emp.lastpayslip).toLocaleString('en-US', { month: 'long' }) === selectedMonth
      : true;
    const matchesDept = selectedDept ? emp.department === selectedDept : true;
    return matchesSearch && matchesMonth && matchesDept;
  });

  return (
    <PageWrapper>
     
      <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`} id="ad-dash">
        <div className="d-flex justify-content-between align-items-center mb-4 main-dash">
          <h1 className="h1 fw-bold">Welcome Admin Sarah</h1>

          <div
            className="calendar-wrapper"
            onMouseEnter={() => setShowCalendar(true)}
            onMouseLeave={() => setShowCalendar(false)}
          >
            <div className="d-flex align-items-center">
              <Calendar className="me-2" size={20} />
              <span className="calendar">
                {date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  className="calendar-popup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CalendarComponent onChange={setDate} value={date} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Row className="g-3 first-row">
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


        {/* EMPLOYEE TABLE */}
        <Row className="mt-4 align-items-center">
          <Col md={6}>
            <h5 className="table-title mt-2">Recent Employees</h5>
          </Col>
          <Col md={6}>
            <Row className="justify-content-end">
              <Col md="auto" className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </Col>
              <Col md="auto" className="mb-2">
                <Form.Select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                >
                  <option value="">Filter by Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md="auto" className="mb-2">
                <Form.Select
                  value={selectedDept}
                  onChange={e => setSelectedDept(e.target.value)}
                >
                  <option value="">Filter by Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* TABLE */}
        <div className="table-responsive">
          <Table className="modern-table" hover>
            <thead className="head-table">
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Payslip</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id + emp.name}>
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src={avatar}
                      alt={emp.name}
                      className="avatar"
                    />
                    <span>{emp.name}</span>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.status}</td>
                  <td>{emp.lastpayslip}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => window.location.href = `/employee-details/${emp.id}`}                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            className="view-all-btn"
            style={{
              borderRadius: '4px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              cursor: 'pointer',
              margin: '-12px 10px 0',
            }}
            onClick={() => window.location.href = "/employees"}
          >
            View All
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;