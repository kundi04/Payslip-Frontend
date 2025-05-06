import React, { useState } from 'react';
import EmployeeSidebar from '../components/EmployeeSidebar';
import PageWrapper from '../components/PageWrapper';
import { Button, Table, Modal } from 'react-bootstrap';

const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const toggleSidebar = (state) => setSidebarOpen(state !== undefined ? state : !sidebarOpen);

  return (
    
    <PageWrapper>
      <EmployeeSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    
      <div className={`content ${sidebarOpen ? 'content-shift' : ''}`}>
        <div className="employee-dashboard">
          <div className="d-flex mb-4 div-one">
            <h2 className="fw-bold text-black ">Welcome Sarah Johnson</h2>

            <div className="neumorphic-card mb-4" id="att-card">
              <h5 className="fw-bold fs-1">May 2025 Payslip</h5>
              <p className='fs-5'>View your payslip for the month of May 2025</p>
              <Button className=" btn-sm empl-btn1" onClick={handleShow}>
                View Full Details
              </Button>
            </div>
          </div>

         
          <div className="previous-payslips px-4">
            <Table striped bordered variant="light">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>April 2025</td>
                  <td>25/04/2025</td>
                  <td>Paid</td>
                  <td>
                    <Button variant="outline-primary" size="sm">View</Button>
                  </td>
                </tr>
                <tr>
                  <td>March 2025</td>
                  <td>25/03/2025</td>
                  <td>Paid</td>
                  <td>
                    <Button variant="outline-primary" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className="text-end mb-4">
              <Button className="view-all-btn">View All</Button>
            </div>
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
    <p className="payslip-info"><strong>Date:</strong>{Date = "11/05/34"}</p>
    <p className="payslip-info"><strong>Region:</strong> Harare</p>

    <hr className="payslip-divider" />
    <p className="payslip-info"><strong>Currency:</strong> ZWL</p>

    <table className="table table-sm payslip-table">
      <thead>
        <tr>
          <th>Benefits & Balances</th>
          <th>Earnings</th>
          <th>Deductions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>Basic Salary: $2000</td>
          <td>Basic Salary Deduction: $50</td>
        </tr>
        <tr>
          <td></td>
          <td>Commission: $300</td>
          <td>Commission Deduction: $20</td>
        </tr>
        <tr>
          <td></td>
          <td><em className="payslip-italic">Backpay (Basic):</em> $100</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td><em className="payslip-italic">Backpay (Commission):</em> $50</td>
          <td>30% WHT: $90</td>
        </tr>
      </tbody>
    </table>

    <p className="payslip-info"><strong>Total Earnings (ZWL):</strong> $2450</p>
    <p className="payslip-info"><strong>Total Deductions (ZWL):</strong> $160</p>
    <p className="payslip-info"><strong>Net Pay (ZWL):</strong> $2290</p>

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
        <tr>
          <td></td>
          <td>Basic Salary: $500</td>
          <td>Basic Salary Deduction: $10</td>
        </tr>
        <tr>
          <td></td>
          <td>Commission: $100</td>
          <td>Commission Deduction: $5</td>
        </tr>
        <tr>
          <td></td>
          <td><em className="payslip-italic">Backpay (Basic):</em> $20</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td><em className="payslip-italic">Backpay (Commission):</em> $10</td>
          <td>30% WHT: $18</td>
        </tr>
      </tbody>
    </table>

    <p className="payslip-info"><strong>Total Earnings (USD):</strong> $630</p>
    <p className="payslip-info"><strong>Total Deductions (USD):</strong> $33</p>
    <p className="payslip-info"><strong>Net Pay (USD):</strong> $597</p>

    <div className="text-end mt-3">
      <Button className="payslip-button1 btn-sm" onClick={handleClose}>
        Close
      </Button>
    </div>
  </Modal.Body>
</Modal>


      </PageWrapper>
    
  );
};

export default EmployeeDashboard;