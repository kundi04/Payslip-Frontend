import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Modal, Button, Row, Col, Form } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import { FaPlus } from 'react-icons/fa';
import { FaFileUpload } from 'react-icons/fa';
import '../App.css';
import avatar from '../../public/images/avatar.png'; // Assuming the path is correct

const employeeData = [
  { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active', lastpayslip: '25/02/25' },
  { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'Pending', lastpayslip: '25/02/25' },
  { id: 3, name: 'Michael Johnson', department: 'HR', status: 'Active', lastpayslip: '25/02/25' },
  { id: 4, name: 'Sarah Williams', department: 'Finance', status: 'Pending', lastpayslip: '25/02/25' },
  { id: 5, name: 'Emily Brown', department: 'Sales', status: 'Active', lastpayslip: '25/02/25' },
  { id: 6, name: 'Chris Evans', department: 'IT', status: 'Pending', lastpayslip: '25/02/25' },
];

const Employees = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showSingleAddModal, setShowSingleAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const departments = [...new Set(employeeData.map(emp => emp.department))];

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // single add
  const handleSingleAdd = () => {
    setShowSingleAddModal(true);
    handleCloseModal();
  };

  // bulk add
  const handleBulkAdd = () => {
    setShowUploadModal(true);
    handleCloseModal();
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

  const filteredEmployees = employeeData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept ? emp.department === selectedDept : true;
    return matchesSearch && matchesDept;
  });

  return (
    <PageWrapper>
      <div className="dashboard-container">
        <h1 className="mb-4 fw-bold">All Employees</h1>

        <Row className="mb-4 first-row"> {/* Using first-row class for top margin */}
          <Col md={6} className="mb-3 mb-md-0">
            <Card className='ad-card p-3 add-employee'> {/* Applying ad-card and add-employee styles */}
              <Card.Body className='d-flex justify-content-between align-items-center p-3'>
                <div>
                  <h2 className='fs-4'>Add a new employee to the system</h2>
                  <div className='d-flex gap-3'>
                    <button className='p-1 btn btn-secondary' onClick={handleOpenModal}>
                      Add Employee
                    </button>
                  </div>
                </div>
                <div className='icon-top-right'> {/* Positioning the plus icon */}
                  <FaPlus size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* You can add more ad-card widgets here if needed */}
        </Row>

        <Row className="mt-4 align-items-center">
          <Col md={6}>
            <h5 className="table-title mt-2">Employee List</h5> {/* Using table-title */}
          </Col>
          <Col md={6}>
            <Row className="justify-content-end">
              <Col md="auto" className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </Col>
              <Col md="auto" className="mb-2">
                <Form.Select
                  value={selectedDept}
                  onChange={e => setSelectedDept(e.target.value)}
                >
                  <option value="">Filter by Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table className="modern-table" hover> {/* Applying modern-table */}
            <thead className="head-table"> {/* Applying head-table */}
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Payslip</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src={avatar}
                      alt={emp.name}
                      className="avatar"
                    />
                    <span>{emp.name}</span>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.status}</td>
                  <td>{emp.lastpayslip}</td>
                  <td>
                    <Button variant="warning" size="sm" className="rounded">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modals remain the same */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Add Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Would you like to add a single employee or bulk upload multiple employees?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleSingleAdd}>
              Single Add
            </Button>
            <Button variant='primary' onClick={handleBulkAdd}>
              Bulk Add
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Upload Employees Data</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <FaFileUpload size={40} className="mb-3" />
            <p>Upload PDF or Excel file containing employee data</p>
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
            <Modal.Title>Add Single Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Enter name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input type="text" className="form-control" placeholder="Enter department" />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select">
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSingleAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              Save Employee
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="d-flex justify-content-end mt-3">
          <button
            className="view-all-btn"
            style={{
              borderRadius: '4px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              cursor: 'pointer',
              margin: '-12px 10px 0',
            }}
            onClick={() => navigate("/admin-dashboard")} // Adjusted navigation
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Employees;