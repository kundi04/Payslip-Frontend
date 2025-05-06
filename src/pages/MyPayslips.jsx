import React, { useState } from 'react';
import { Card, Table, Button, Modal, Row, Col } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import EmployeeSidebar from '../components/EmployeeSidebar';
import { Download } from 'lucide-react';
import '../App.css';

const MyPayslips = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

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
      <EmployeeSidebar/>
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

       
        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          <Modal.Body className="neumorphic-card">
            {selectedPayslip && (
              <div className="payslip-detail">
                <h4 className="fw-bold mb-4">Payslip Details - {selectedPayslip.period}</h4>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <p><strong>Issue Date:</strong> {selectedPayslip.issueDate}</p>
                    <p><strong>Status:</strong> {selectedPayslip.status}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Employee ID:</strong> EMP001</p>
                    <p><strong>Department:</strong> Engineering</p>
                  </Col>
                </Row>

                <div className="payslip-amounts mb-4">
                  <h5 className="mb-3">Earnings & Deductions</h5>
                  <Row>
                    <Col md={6}>
                      <div className="amount-item">
                        <span>Basic Salary</span>
                        <span>${selectedPayslip.basicSalary}</span>
                      </div>
                      <div className="amount-item">
                        <span>Allowances</span>
                        <span>${selectedPayslip.allowances}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="amount-item text-danger">
                        <span>Deductions</span>
                        <span>-${selectedPayslip.deductions}</span>
                      </div>
                      <div className="amount-item fw-bold">
                        <span>Net Pay</span>
                        <span>${selectedPayslip.netPay}</span>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="d-flex justify-content-end">
                  <Button 
                    variant="outline-secondary" 
                    className="me-2"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                  <Button className="neumorphic-button empl-btn1">
                    <Download size={16} className="me-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </PageWrapper>
  );
};

export default MyPayslips;