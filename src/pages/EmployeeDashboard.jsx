import React, { useState, useEffect } from 'react';
import EmployeeSidebar from '../components/EmployeeSidebar';
import PageWrapper from '../components/PageWrapper';
import Lottie from '../components/LottieAnimation';
import { Button, Table, Modal, Card, Row } from 'react-bootstrap';
import { Download } from 'lucide-react';

const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const toggleSidebar = (state) => setSidebarOpen(state !== undefined ? state : !sidebarOpen);
  const [filterMonth, setFilterMonth] = useState("All");
  const [countdown, setCountdown] = useState('');
  const [quote, setQuote] = useState("");


  const motivationalQuotes = [
    "🌟 Success is the sum of small efforts, repeated day in and day out. — R. Collier",
    "🚀 Don’t watch the clock; do what it does. Keep going. — Sam Levenson",
    "💡 The future depends on what you do today. — Mahatma Gandhi",
    "🔥 Your limitation—it’s only your imagination.",
    "💪 Push yourself, because no one else is going to do it for you.",
    "🌈 Great things never come from comfort zones.",
    "🏁 Dream it. Wish it. Do it.",
    "🧠 Don’t stop when you’re tired. Stop when you’re done."
  ];
  
 

useEffect(() => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  setQuote(motivationalQuotes[randomIndex]);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const targetDate = new Date('2025-05-25'); // replace with actual payslip date
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      setCountdown("Payslips are here!");
      clearInterval(interval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / 1000 / 60) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
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
          <h2 className="fw-bold text-black mb-4">Welcome Sarah Johnson</h2>

          {/* Payslip Card */}
          <Row className="mb-4  ">
          <Card className="mb-4 p-4 shadow-lg border-0 rounded-4 text-white" style={{ background: '#6f42c1' }}>
  <h5 className="mb-3 fst-italic">{quote}</h5>
  <div className="d-flex justify-content-between align-items-center">
    <span className="fw-bold fs-6">⏳ Payslip arrives in:</span>
    <span className="fs-5 fw-semibold badge bg-light text-dark px-3 py-2">{countdown}</span>
  </div>
</Card>


          <div  className='lottie-row' >
            <Lottie/>
       
         </div>
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
