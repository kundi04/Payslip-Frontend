import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // If using React Router v6
import { Card, Table, Form } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper'; // Adjust path as needed

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [previousPayslips, setPreviousPayslips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    // Function to fetch employee details and payslips from your database
    const fetchEmployeeDetails = async (employeeId) => {
      try {
        // Replace this with your actual API endpoint to fetch employee data
        const employeeResponse = await fetch(`/api/employees/${employeeId}`);
        const employeeData = await employeeResponse.json();
        setEmployee(employeeData);

        // Replace this with your actual API endpoint to fetch previous payslips
        const payslipsResponse = await fetch(`/api/employees/${employeeId}/payslips`);
        const payslipsData = await payslipsResponse.json();
        setPreviousPayslips(payslipsData);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        // Handle error appropriately (e.g., display an error message)
      }
    };

    fetchEmployeeDetails(id);
  }, [id]);

  if (!employee) {
    return <div>Loading employee details...</div>; // Or a loading spinner
  }

  const filteredPayslips = selectedMonth
    ? previousPayslips.filter(payslip => new Date(payslip.date).toLocaleString('en-US', { month: 'long' }) === selectedMonth)
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
              {/* Add other relevant columns */}
            </tr>
          </thead>
          <tbody>
            {filteredPayslips.map(payslip => (
              <tr key={payslip.id}>
                <td>{new Date(payslip.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</td>
                <td>{payslip.date}</td>
                <td>{payslip.amount}</td>
                {/* Add other relevant data */}
              </tr>
            ))}
            {filteredPayslips.length === 0 && <tr><td colSpan="3">No payslips found for the selected month.</td></tr>}
          </tbody>
        </Table>
      </div>
    </PageWrapper>
  );
};

export default EmployeeDetails;