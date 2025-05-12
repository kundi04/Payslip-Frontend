import React, { useState, useEffect } from 'react';
import EmployeeSidebar from '../components/EmployeeSidebar';
import PageWrapper from '../components/PageWrapper';
import Lottie from '../components/LottieAnimation';
import { Button, Table, Modal, Card, Row , Col} from 'react-bootstrap';
import { Download } from 'lucide-react';

const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

const handleView = (payslip) => {
  setSelectedPayslip(payslip); // Set the selected payslip data
  setShowModal(true); // Show the modal
};
  const handleClose = () => setShowModal(false);
  const toggleSidebar = (state) => setSidebarOpen(state !== undefined ? state : !sidebarOpen);
  const [filterMonth, setFilterMonth] = useState("All");
  const [countdown, setCountdown] = useState('');
  const [quote, setQuote] = useState("");


  const motivationalQuotes = [
    " Success is the sum of small efforts, repeated day in and day out. — R. Collier",
    " Don’t watch the clock; do what it does. Keep going. — Sam Levenson",
    " The future depends on what you do today. — Mahatma Gandhi",
    " Your limitation—it’s only your imagination.",
    " Push yourself, because no one else is going to do it for you.",
    " Great things never come from comfort zones.",
    " Dream it. Wish it. Do it.",
    " Don’t stop when you’re tired. Stop when you’re done."
  ];
  
 

useEffect(() => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  setQuote(motivationalQuotes[randomIndex]);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const targetDate = new Date('2025-05-25T00:00:00'); // Set the correct time if needed
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      setCountdown("00:00");
      clearInterval(interval);
      return;
    }

    const totalSeconds = Math.floor(distance / 1000);
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    setCountdown(formatted);
  }, 1000);

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

          {/* Welcome Header */}
        <Row className="mb-4 align-items-center">
  {/* Left Column */}
  <Col md={6}>
    <h2 className="fw-bold text-black mb-3">Welcome Sarah Johnson</h2>

    <Card className="mb-3 p-4 border-0 rounded-4 text-white" style={{ backgroundColor: 'transparent' }}>
      <h5 className="mb-3 fst-italic quote">{quote}</h5>
      <h2 className="fw-bold countdown-text" style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>
        ⏳ {countdown}
      </h2>
    </Card>
  </Col>

  {/* Right Column */}
  <Col md={6} className="text-center">
    <Lottie />
  </Col>
</Row>

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
