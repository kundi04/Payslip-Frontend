import React, { useState, useEffect } from 'react';
import EmployeeSidebar from '../components/EmployeeSidebar';
import PageWrapper from '../components/PageWrapper';
import Lottie from '../components/LottieAnimation';
import { Button, Table, Modal, Card, Row , Col, Form} from 'react-bootstrap';


const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

const handleView = (payslip) => {
  setSelectedPayslip(payslip);
  setShowModal(true); 
};

  const handleClose = () => setShowModal(false);
  const toggleSidebar = (state) => setSidebarOpen(state !== undefined ? state : !sidebarOpen);
  const [filterMonth] = useState("All");


  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
 
  const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


 


  const [typedWelcome, setTypedWelcome] = useState('');
const welcomeText = 'Welcome Sarah Johnson';

useEffect(() => {
  let currentIndex = 0;
  
  const interval = setInterval(() => {
    if (currentIndex <= welcomeText.length) {
      setTypedWelcome(welcomeText.slice(0, currentIndex));
      currentIndex += 1;
    } else {
      clearInterval(interval);
    }
  }, 100);

  return () => clearInterval(interval);
}, []);

  const payslipData = [
    { id: 1, period: 'May 2025', issueDate: '25/05/2025', status: 'Paid' },
    { id: 2, period: 'April 2025', issueDate: '25/04/2025', status: 'Paid' },
    { id: 3, period: 'March 2025', issueDate: '25/03/2025', status: 'Pending' },
  ];
  
  const filteredPayslips = filterMonth === "All" 
    ? payslipData 
    : payslipData.filter(p => p.period.includes(filterMonth));
  

  return (
    <PageWrapper>
      <EmployeeSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

     <div className={`content ${sidebarOpen ? 'content-shift' : ''}`}>
  <div className="employee-dashboard p-3">
    <h2 className="fw-bold text-black mb-4">{typedWelcome}</h2>

    <Row className="mb-4 align-items-center em-row">
      <Col md={6} className="text-start">
      </Col>

     
      <Col md={6} className="text-end">
        <Lottie />
      </Col>
    </Row>



          {/* Payslips Table */}
         <Row className="mt-4 align-items-center">
  <Col md={6}>
    <h5 className="table-title mt-2">Employee Payslips</h5>
  </Col>
  <Col md={6}>
    <Row className="justify-content-end">
      <Col md="auto" className="mb-2">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col md="auto" className="mb-2">
        <Form.Select
          value={selectedMonth}npm
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Filter by Month</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </Form.Select>
      </Col>
      <Col md="auto" className="mb-2">
       
      </Col>
    </Row>
  </Col>
</Row>

<div className="table-responsive mt-3">
  <Table className="modern-table" hover>
    <thead className="head-table">
      <tr>
   
        <th>Period</th>
        <th>Issue Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredPayslips.map((payslip) => (
        <tr key={payslip.id}>
         
          <td>{payslip.period}</td>
          <td>{payslip.issueDate}</td>
          <td>
            <span className={`status-badge status-${payslip.status.toLowerCase()}`}>
              {payslip.status}
            </span>
          </td>
          <td>
            <Button
              variant="warning"
              size="sm"
              onClick={() => handleView(payslip)}
            >
              View
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>
        </div>

        </div>
      

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body className="payslip-card1 neumorphic-card">
          <h4 className="payslip-title text-center mb-2">
            <span className="payslip-heading-main">Statement of </span>
            <span className="payslip-heading-accent">Earnings</span>
          </h4>

          <p className="payslip-subtitle text-center">Strictly Confidential</p>
          <p className="payslip-info"><strong>User:</strong> Sarah Johnson</p>
          <p className="payslip-info"><strong>Title:</strong> Direct Sales Agent (DSA)</p>
          <p className="payslip-info"><strong>Date:</strong> 11/05/34</p>
          <p className="payslip-info"><strong>Region:</strong> Harare</p>

          <hr className="payslip-divider" />
          <p className="payslip-info"><strong>Currency:</strong> ZiG</p>

          <table className="table table-sm payslip-table">
            <thead>
              <tr>
                <th>Benefits & Balances</th>
                <th>Earnings</th>
                <th>Deductions</th>
              </tr>
            </thead>
            <tbody>
              <tr><td></td><td>Basic Salary: 2000</td><td></td></tr>
              <tr><td></td><td>Commission: 300</td><td></td></tr>
              <tr><td></td><td><em>Backpay(Basic):</em> 100</td><td></td></tr>
               <tr><td></td><td><em>Backpay(Commission):</em> 200</td><td></td></tr>
            </tbody>
          </table>

          <p className="payslip-info"><strong>Total Earnings (ZiG):</strong> 2450</p>
          <p className="payslip-info"><strong>Total Deductions (ZiG):</strong> 160</p>
          <p className="payslip-info"><strong>Net Pay (ZiG):</strong> 2290</p>

          <hr className="payslip-divider" />
          <p className="payslip-info"><strong>Currency:</strong> USD</p>

          <table className="table table-sm payslip-table">
            <thead>
              <tr>
                <th>Benefits & Balances</th>
                <th>Earnings</th>
                <th>Deductions</th>
              </tr>
            </thead>
            <tbody>
              <tr><td></td><td>Basic Salary: $500</td><td></td></tr>
              <tr><td></td><td><em>Backpay(Basic):</em> $100</td><td></td></tr>
               <tr><td></td><td><em>Backpay(Commission):</em> $20</td><td></td></tr>
            </tbody>
          </table>

          <p className="payslip-info"><strong>Total Earnings (USD):</strong> $630</p>
          <p className="payslip-info"><strong>Total Deductions (USD):</strong> $33</p>
          <p className="payslip-info"><strong>Net Pay (USD):</strong> $597</p>

          <div className="text-end mt-3">
            <Button className="payslip-button1 btn-sm" onClick={handleClose}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </PageWrapper>
  );
};

export default EmployeeDashboard;
