import React, { useState } from 'react';
import EmployeeSidebar from '../components/EmployeeSidebar';
import PageWrapper from '../components/PageWrapper';
import { Button, Table, Modal, Card } from 'react-bootstrap';
import { Download } from 'lucide-react';

const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const toggleSidebar = (state) => setSidebarOpen(state !== undefined ? state : !sidebarOpen);

  const payslipData = [
    { id: 1, period: 'May 2025', issueDate: '25/05/2025',  status: 'Paid' },
    { id: 2, period: 'April 2025', issueDate: '25/04/2025', status: 'Paid' },
    { id: 3, period: 'March 2025', issueDate: '25/03/2025', status: 'Paid' },
  ];

  const handleView = (payslip) => {
    setSelectedPayslip(payslip);
    handleShow();
  };

  return (
    <PageWrapper>
      <EmployeeSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${sidebarOpen ? 'content-shift' : ''}`}>
        <div className="employee-dashboard p-3">

          {/* Welcome Header */}
          <h2 className="fw-bold text-black mb-4">Welcome Sarah Johnson</h2>

          {/* Payslip Card */}
          {/* <div className="neumorphic-card mb-4 p-4" id="att-card">
            <h5 className="fw-bold fs-1">May 2025 Payslip</h5>
            <p className='fs-5'>View your payslip for the month of May 2025</p>
            <Button className="btn-sm empl-btn1" onClick={handleShow}>
              View Full Details
            </Button>
          </div> */}

          {/* Payslips Table */}
          <Card className="neumorphic-card p-4">
            <div className="table-responsive">
              <Table hover className="payslips-table">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Issue Date</th>
                   
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payslipData.map((payslip) => (
                    <tr key={payslip.id}>
                      <td>{payslip.period}</td>
                      <td>{payslip.issueDate}</td>
                     
                      <td>
                        <span className={`status-badge status-${payslip.status.toLowerCase()}`}>
                          {payslip.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleView(payslip)}>
                          View
                        </Button>
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>

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
              <tr><td></td><td>Perfomance Incentive: 300</td><td></td></tr>
              <tr><td></td><td><em>Overtime (ZiG):</em> 100</td><td></td></tr>
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
              <tr><td></td><td>Perfomance Incentive: $100</td><td></td></tr>
              <tr><td></td><td><em>Overtime (USD):</em> $20</td><td></td></tr>
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
