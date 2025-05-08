import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Modal, Button } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import { FaPlus } from 'react-icons/fa';
import { FaFileUpload } from 'react-icons/fa';
import '../App.css';

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

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const [showUploadModal, setShowUploadModal] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);


// single add
  const handleSingleAdd = () => {
    if (window.openAddEmployeePopup) {
      window.openAddEmployeePopup();
    }
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
      // Here you would typically handle the file upload to your backend
      // For now, we'll just console.log the file
      console.log('File selected:', file);
    } else {
      alert('Please select a valid PDF or Excel file');
    }
  };

  return (
    <PageWrapper>
      <div className="dashboard-container">
        <h1 className="mb-4 fw-bold">All Employees</h1>

        <Card className='neumorphic-card add-employee'>
          <Card.Body className='d-flex justify-content-between align-items-center p-3'>
            <div>
              <FaPlus />
              <h2 className='fs-4'>Add a new employee to the system</h2>
              <div className='d-flex gap-3'>
                <button className='p-1 btn btn-secondary' onClick={handleOpenModal}>
                  Add Employee
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card className="neumorphic-card p-3 bg-light">
          <Card.Body>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Last Payslip</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.department}</td>
                    <td>{emp.status}</td>
                    <td>{emp.lastpayslip}</td>
                    <td><button className='rounded'>View</button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Modal */}
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
  <Modal.Body>
    <div className="text-center">
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
        // Handle file submission here
        console.log('Uploading file:', selectedFile);
        setShowUploadModal(false);
      }}
    >
      Upload
    </Button>
  </Modal.Footer>
</Modal>
      </div>
    </PageWrapper>
  );
};

export default Employees;
