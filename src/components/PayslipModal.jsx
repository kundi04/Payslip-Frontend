import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { Download } from 'lucide-react';

const PayslipModal = ({ show, onClose, payslip }) => {
  if (!payslip) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body className="neumorphic-card">
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
  );
};

export default PayslipModal;