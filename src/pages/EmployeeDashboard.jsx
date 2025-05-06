import React, { useState } from 'react';
import EmployeeSidebar from '../components/EmployeeSidebar';
import PageWrapper from '../components/PageWrapper';
import PayslipModal from '../components/PayslipModal';
import { Button, Table, Modal } from 'react-bootstrap';

const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleShow = (payslip) => {
    setSelectedPayslip(payslip);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
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
              <Button className="neumorphic-button btn-sm empl-btn1" onClick={handleShow}>
                View Full Details
              </Button>
            </div>
          </div>

          <div className="greeting px-4 py-3">
            <div className="neumorphic-card mb-4" id="payslip-card">
              <h5 className="fw-bold">May 2025 Attendance Report</h5>
              <p>Calendar showing your attendance report</p>

              <Button className="neumorphic-button btn-sm empl-btn1">View Full Details</Button>
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
     <PayslipModal show={showModal} onClose={handleClose} payslip={selectedPayslip} />

      </PageWrapper>
    
  );
};

export default EmployeeDashboard;