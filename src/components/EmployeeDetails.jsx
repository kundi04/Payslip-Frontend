import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for back button
import { Card, Table, Form, Button } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper'; // Adjust path as needed

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [previousPayslips, setPreviousPayslips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchEmployeeDetails = async (employeeId) => {
      try {
        const employeeResponse = await fetch(`/api/employees/${employeeId}`);
        const employeeData = await employeeResponse.json();
        setEmployee(employeeData);

        const payslipsResponse = await fetch(`/api/employees/${employeeId}/payslips`);
        const payslipsData = await payslipsResponse.json();
        setPreviousPayslips(payslipsData);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails(id);
  }, [id]);

  if (employee === null) {
    return <div>Loading employee details...</div>;
  }

  if (!employee?.id) {
    return <div>Employee not found.</div>;
  }

  const filteredPayslips = selectedMonth
    ? previousPayslips.filter(
        payslip =>
          new Date(payslip.date).toLocaleString('en-US', { month: 'long' }) === selectedMonth
      )
    : previousPayslips;

  return (
    <PageWrapper>
      <div className="employee-details-container">
        <h2 className="mb-4">{employee.name}</h2>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Payslip Sent On:</strong> {employee.payslipSentDate || 'N/A'}</p>
        <p><strong>Viewed Payslip:</strong> {employee.hasViewedPayslip ? 'Yes' : 'No'}</p>
        <p><strong>Payslip Status:</strong> {employee.payslipStatus}</p>

        <h4 className="mt-4">Previous Payslips</h4>
        <div className="mb-3">
          <Form.Select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            <option value="">Filter by Month</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </Form.Select>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Month</th>
              <th>Date Sent</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayslips.map(payslip => (
              <tr key={payslip.id}>
                <td>
                  {new Date(payslip.date).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td>{new Date(payslip.date).toLocaleDateString()}</td>
                <td>{payslip.amount}</td>
              </tr>
            ))}
            {filteredPayslips.length === 0 && (
              <tr>
                <td colSpan="3">No payslips found for the selected month.</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Button variant="secondary" className="mt-3" onClick={() => navigate('/admin/employees')}>
          ← Back to Employees
        </Button>
      </div>
    </PageWrapper>
  );
};

export default EmployeeDetails;
