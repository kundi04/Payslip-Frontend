import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { Download } from 'lucide-react';

const PayslipModal = ({ show, onClose, payslip }) => {
  if (!payslip) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body className="neumorphic-card">
        <div className="payslip-detail">
          <h4 className="fw-bold mb-4">Payslip Details - {payslip.period}</h4>

          <Row className="mb-3">
            <Col md={6}>
              <p><strong>Issue Date:</strong> {payslip.issueDate}</p>
              <p><strong>Status:</strong> {payslip.status}</p>
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
                  <span>${payslip.basicSalary}</span>
                </div>
                <div className="amount-item">
                  <span>Allowances</span>
                  <span>${payslip.allowances}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="amount-item text-danger">
                  <span>Deductions</span>
                  <span>-${payslip.deductions}</span>
                </div>
                <div className="amount-item fw-bold">
                  <span>Net Pay</span>
                  <span>${payslip.netPay}</span>
                </div>
              </Col>
            </Row>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" className="me-2" onClick={onClose}>
              Close
            </Button>
            <Button className="neumorphic-button empl-btn1">
              <Download size={16} className="me-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PayslipModal;