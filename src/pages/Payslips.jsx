import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormControl,
  Modal
} from 'react-bootstrap';
import { FaFileUpload } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payslips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSingleAddModal, setShowSingleAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const payslips = [
    {
      id: 1,
      employeeName: 'Jane Doe',
      employeeId: 'EMP001',
      department: 'Finance',
      monthYear: 'April 2025',
      status: 'Sent',
      dateIssued: '2025-04-30'
    }
  ];

  const filteredPayslips = payslips.filter((p) => {
    return (
      (p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterDept || p.department === filterDept) &&
      (!filterStatus || p.status === filterStatus) &&
      (!filterMonth || p.monthYear.includes(filterMonth))
    );
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF or Excel file');
    }
  };

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setShowViewModal(true);
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Manage Payslips</h2>
<Row className="mb-3">
  <Col md="auto">
    <Button variant="success" onClick={() => setShowSingleAddModal(true)}>
      ➕ Generate New Payslip
    </Button>
  </Col>
  <Col md="auto">
  <Button variant="primary" onClick={() => setShowUploadModal(true)}>
  📁 Upload Payslips
</Button>
  </Col>
</Row>

<Row className="mb-4 justify-content-end" style={{ marginTop: "80px" }}>
  <Col md={3}>
    <FormControl
      placeholder="Search by name or ID"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </Col>
  <Col md={2}>
    <Form.Select onChange={(e) => setFilterDept(e.target.value)}>
      <option value="">All Departments</option>
      <option value="Finance">Finance</option>
      <option value="HR">HR</option>
      <option value="IT">IT</option>
    </Form.Select>
  </Col>
  <Col md={2}>
    <Form.Select onChange={(e) => setFilterMonth(e.target.value)}>
      <option value="">All Months</option>
      <option value="April 2025">April 2025</option>
      <option value="March 2025">March 2025</option>
    </Form.Select>
  </Col>
  <Col md={2}>
    <Form.Select onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="">All Statuses</option>
      <option value="Sent">Sent</option>
      <option value="Pending">Pending</option>
      <option value="Failed">Failed</option>
    </Form.Select>
  </Col>
</Row>

<Table striped bordered hover responsive>
  <thead className=" text-white" >
    <tr style={{ backgroundColor: '#007bff'}}>
      <th>Employee Name</th>
      <th>Employee ID</th>
      <th>Department</th>
      <th>Month & Year</th>
      <th>Status</th>
      <th>Date Issued</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredPayslips.map((p) => (
      <tr key={p.id}>
        <td>{p.employeeName}</td>
        <td>{p.employeeId}</td>
        <td>{p.department}</td>
        <td>{p.monthYear}</td>
        <td>{p.status}</td>
        <td>{p.dateIssued}</td>
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            className="me-1"
            onClick={() => alert('Show payslip modal for ' + p.employeeName)}
          >
            View
          </Button>
          <Button variant="outline-warning" size="sm" className="me-1">
            Resend
          </Button>
          <Button variant="outline-danger" size="sm">
            Delete
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Payslips</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaFileUpload size={40} className="mb-3" />
          <p>Upload PDF or Excel file containing payslip data</p>
          <input type="file" className="form-control" accept=".pdf,.xls,.xlsx" onChange={handleFileUpload} />
          {selectedFile && <p className="mt-2 text-success">Selected file: {selectedFile.name}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>Cancel</Button>
          <Button variant="primary" disabled={!selectedFile}>Upload</Button>
        </Modal.Footer>
      </Modal>

      {/* Single Add Modal */}
      <Modal show={showSingleAddModal} onHide={() => setShowSingleAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Single Payslip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" placeholder="Enter department" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Month & Year</Form.Label>
              <Form.Control type="text" placeholder="e.g. April 2025" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select>
                <option value="Sent">Sent</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSingleAddModal(false)}>Cancel</Button>
          <Button variant="primary">Save Payslip</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payslip Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayslip ? (
            <>
              <p><strong>Name:</strong> {selectedPayslip.employeeName}</p>
              <p><strong>ID:</strong> {selectedPayslip.employeeId}</p>
              <p><strong>Department:</strong> {selectedPayslip.department}</p>
              <p><strong>Month & Year:</strong> {selectedPayslip.monthYear}</p>
              <p><strong>Status:</strong> {selectedPayslip.status}</p>
              <p><strong>Date Issued:</strong> {selectedPayslip.dateIssued}</p>
            </>
          ) : (
            <p>No payslip selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Payslips;
