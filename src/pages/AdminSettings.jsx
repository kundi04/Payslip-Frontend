import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import '../App.css';

const AdminSettings = () => {
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    systemEmail: 'admin@example.com',
    notificationEmail: 'notifications@example.com',
    payslipTemplate: 'default',
    autoApproval: false,
    retentionPeriod: '90',
    emailNotifications: true,
    backupFrequency: 'daily',
 
    language: 'en',
    timezone: 'UTC+02:00',
    maxLoginAttempts: '3',
    sessionTimeout: '30'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFeedback({
        message: 'Settings updated successfully!',
        type: 'success'
      });
    } catch (error) {
      setFeedback({
        message: error.message || 'Failed to update settings',
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="settings-container dashboard-container">
       
        
        {feedback.message && (
          <Alert 
            variant={feedback.type}
            dismissible
            onClose={() => setFeedback({ message: '', type: '' })}
          >
            {feedback.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
        <div className="mb-4">


  <Card className="neumorphic-card p-4 mb-5">
  <h2 className="mb-4 fw-bold">System Settings</h2>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Employees to View Previous Payslips"
    checked={formData.viewOldPayslips}
    onChange={(e) => setFormData({...formData, viewOldPayslips: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Restrict Payslip Access to Active Employees Only"
    checked={formData.restrictToActive}
    onChange={(e) => setFormData({...formData, restrictToActive: e.target.checked})}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Receive Email on Payslip Upload"
    checked={formData.adminUploadAlert}
    onChange={(e) => setFormData({...formData, adminUploadAlert: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Send Reminder Before Payroll Deadline"
    checked={formData.payrollReminder}
    onChange={(e) => setFormData({...formData, payrollReminder: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Payslip Upload Audit Logs"
    checked={formData.auditLogs}
    onChange={(e) => setFormData({...formData, auditLogs: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Select
    value={formData.logRetention}
    onChange={(e) => setFormData({...formData, logRetention: e.target.value})}
  >
    <option value="30">Keep Logs for 30 Days</option>
    <option value="90">Keep Logs for 90 Days</option>
    <option value="365">Keep Logs for 1 Year</option>
  </Form.Select>
</Form.Group>
  </Card>

  <Card className="neumorphic-card p-4 mb-5">
  <h2 className="mb-4 fw-bold">Manage Users</h2>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Employees to View Previous Payslips"
    checked={formData.viewOldPayslips}
    onChange={(e) => setFormData({...formData, viewOldPayslips: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Restrict Payslip Access to Active Employees Only"
    checked={formData.restrictToActive}
    onChange={(e) => setFormData({...formData, restrictToActive: e.target.checked})}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Receive Email on Payslip Upload"
    checked={formData.adminUploadAlert}
    onChange={(e) => setFormData({...formData, adminUploadAlert: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Send Reminder Before Payroll Deadline"
    checked={formData.payrollReminder}
    onChange={(e) => setFormData({...formData, payrollReminder: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Payslip Upload Audit Logs"
    checked={formData.auditLogs}
    onChange={(e) => setFormData({...formData, auditLogs: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Select
    value={formData.logRetention}
    onChange={(e) => setFormData({...formData, logRetention: e.target.value})}
  >
    <option value="30">Keep Logs for 30 Days</option>
    <option value="90">Keep Logs for 90 Days</option>
    <option value="365">Keep Logs for 1 Year</option>
  </Form.Select>
</Form.Group>
  </Card>

  <Card className="neumorphic-card p-4 mb-5">
  <h2 className="mb-4 fw-bold">Notifications</h2>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Employees to View Previous Payslips"
    checked={formData.viewOldPayslips}
    onChange={(e) => setFormData({...formData, viewOldPayslips: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Restrict Payslip Access to Active Employees Only"
    checked={formData.restrictToActive}
    onChange={(e) => setFormData({...formData, restrictToActive: e.target.checked})}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Receive Email on Payslip Upload"
    checked={formData.adminUploadAlert}
    onChange={(e) => setFormData({...formData, adminUploadAlert: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Send Reminder Before Payroll Deadline"
    checked={formData.payrollReminder}
    onChange={(e) => setFormData({...formData, payrollReminder: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Payslip Upload Audit Logs"
    checked={formData.auditLogs}
    onChange={(e) => setFormData({...formData, auditLogs: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Select
    value={formData.logRetention}
    onChange={(e) => setFormData({...formData, logRetention: e.target.value})}
  >
    <option value="30">Keep Logs for 30 Days</option>
    <option value="90">Keep Logs for 90 Days</option>
    <option value="365">Keep Logs for 1 Year</option>
  </Form.Select>
</Form.Group>
  </Card>


  <Card className="neumorphic-card p-4 mb-5">
  <h2 className="mb-4 fw-bold">Appearance and Customization</h2>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Employees to View Previous Payslips"
    checked={formData.viewOldPayslips}
    onChange={(e) => setFormData({...formData, viewOldPayslips: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Restrict Payslip Access to Active Employees Only"
    checked={formData.restrictToActive}
    onChange={(e) => setFormData({...formData, restrictToActive: e.target.checked})}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Receive Email on Payslip Upload"
    checked={formData.adminUploadAlert}
    onChange={(e) => setFormData({...formData, adminUploadAlert: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Send Reminder Before Payroll Deadline"
    checked={formData.payrollReminder}
    onChange={(e) => setFormData({...formData, payrollReminder: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Payslip Upload Audit Logs"
    checked={formData.auditLogs}
    onChange={(e) => setFormData({...formData, auditLogs: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Select
    value={formData.logRetention}
    onChange={(e) => setFormData({...formData, logRetention: e.target.value})}
  >
    <option value="30">Keep Logs for 30 Days</option>
    <option value="90">Keep Logs for 90 Days</option>
    <option value="365">Keep Logs for 1 Year</option>
  </Form.Select>
</Form.Group>
  </Card>

  <Card className="neumorphic-card p-4 ">
  <h2 className="mb-4 fw-bold">Account</h2>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Employees to View Previous Payslips"
    checked={formData.viewOldPayslips}
    onChange={(e) => setFormData({...formData, viewOldPayslips: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Restrict Payslip Access to Active Employees Only"
    checked={formData.restrictToActive}
    onChange={(e) => setFormData({...formData, restrictToActive: e.target.checked})}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Receive Email on Payslip Upload"
    checked={formData.adminUploadAlert}
    onChange={(e) => setFormData({...formData, adminUploadAlert: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Send Reminder Before Payroll Deadline"
    checked={formData.payrollReminder}
    onChange={(e) => setFormData({...formData, payrollReminder: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Check
    type="switch"
    label="Enable Payslip Upload Audit Logs"
    checked={formData.auditLogs}
    onChange={(e) => setFormData({...formData, auditLogs: e.target.checked})}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Select
    value={formData.logRetention}
    onChange={(e) => setFormData({...formData, logRetention: e.target.value})}
  >
    <option value="30">Keep Logs for 30 Days</option>
    <option value="90">Keep Logs for 90 Days</option>
    <option value="365">Keep Logs for 1 Year</option>
  </Form.Select>
</Form.Group>
  </Card>
</div>


          <div className="text-end mt-3">
            <Button 
              type="submit" 
              className="neumorphic-button empl-btn1"
              disabled={loading}
            >
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </div>
    </PageWrapper>
  );
};

export default AdminSettings;