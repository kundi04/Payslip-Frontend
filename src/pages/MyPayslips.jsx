import React, { useState } from 'react';
import { Card, Table, Button, Modal, Row, Col } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import EmployeeSidebar from '../components/EmployeeSidebar';
import { Download } from 'lucide-react';
import '../App.css';


const MyPayslips = () => {
  // Group all state declarations together at the top
  const [showModal, setShowModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (state) => {
    setSidebarOpen(state !== undefined ? state : !sidebarOpen);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  

  const payslipData = [
    { id: 1, period: 'May 2025', issueDate: '25/05/2025', basicSalary: 2000, allowances: 300, deductions: 100, netPay: 2200, status: 'Paid' },
    { id: 2, period: 'April 2025', issueDate: '25/04/2025', basicSalary: 2000, allowances: 300, deductions: 100, netPay: 2200, status: 'Paid' },
    { id: 3, period: 'March 2025', issueDate: '25/03/2025', basicSalary: 2000, allowances: 300, deductions: 100, netPay: 2200, status: 'Paid' },
    { id: 4, period: 'February 2025', issueDate: '25/02/2025', basicSalary: 2000, allowances: 300, deductions: 100, netPay: 2200, status: 'Paid' },
  ];

  const handleView = (payslip) => {
    setSelectedPayslip(payslip);
    setShowModal(true);
  };


  return (
    <PageWrapper>
     <EmployeeSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="payslips-container dashboard-container">
        <h1 className="mb-4 fw-bold">My Payslips</h1>
        
        <Row>
          <Col>
            <Card className="neumorphic-card p-4">
              <div className="table-responsive">
                <Table hover className="payslips-table">
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Issue Date</th>
                      <th>Net Pay</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payslipData.map((payslip) => (
                      <tr key={payslip.id}>
                        <td>{payslip.period}</td>
                        <td>{payslip.issueDate}</td>
                        <td>${payslip.netPay}</td>
                        <td>
                          <span className={`status-badge status-${payslip.status.toLowerCase()}`}>
                            {payslip.status}
                          </span>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleView(payslip)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                          >
                            <Download size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>

       
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
       
      </div>
    </PageWrapper>
  );
};

export default MyPayslips;