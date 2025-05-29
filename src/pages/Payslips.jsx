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
import { FaPlus, FaFileUpload } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payslips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSingleAddModal, setShowSingleAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const payslips = [
    {
      id: 1,
      employeeName: 'Jane Doe',
      employeeId: 'EMP001',
      department: 'Finance',
      monthYear: 'April 2025',
      netPay: '$3,500',
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

  const handleShowOptionModal = () => {
    setShowOptionModal(true);
  };

  const handleSingleAdd = () => {
    setShowOptionModal(false);
    setShowSingleAddModal(true);
  };

  const handleBulkAdd = () => {
    setShowOptionModal(false);
    setShowUploadModal(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      console.log('File selected:', file);
    } else {
      alert('Please select a valid PDF or Excel file');
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Manage Payslips</h2>

      <Row className="mb-3">
        <Col md="auto">
          <Button variant="success">➕ Generate New Payslip</Button>
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={handleShowOptionModal}>📁 Upload Payslips</Button>
        </Col>
      </Row>

      <Row className="mb-4">
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
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Month & Year</th>
            <th>Net Pay</th>
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
              <td>{p.netPay}</td>
              <td>{p.status}</td>
              <td>{p.dateIssued}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-1">View</Button>
                <Button variant="outline-success" size="sm" className="me-1">Download</Button>
                <Button variant="outline-warning" size="sm" className="me-1">Resend</Button>
                <Button variant="outline-danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showOptionModal} onHide={() => setShowOptionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Add Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Would you like to generate a single payslip or upload multiple?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleSingleAdd}>Single Add</Button>
          <Button variant='primary' onClick={handleBulkAdd}>Bulk Upload</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Payslips</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <FaFileUpload size={40} className="mb-3" />
            <p>Upload PDF or Excel file containing payslip data</p>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.xls,.xlsx"
              onChange={handleFileUpload}
            />
            {selectedFile && (
              <p className="mt-2 text-success">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selectedFile}
            onClick={() => {
              console.log('Uploading file:', selectedFile);
              setShowUploadModal(false);
            }}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

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
              <Form.Label>Net Pay</Form.Label>
              <Form.Control type="text" placeholder="Enter net pay" />
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
          <Button variant="secondary" onClick={() => setShowSingleAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Save Payslip
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Payslips;
