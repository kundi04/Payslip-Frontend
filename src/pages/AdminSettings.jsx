import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import { useTheme } from '../context/ThemeContext';
import '../App.css';

const AdminSettings = () => {
  const { theme, setTheme } = useTheme();
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
    theme: theme,
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
        <h1 className="mb-4 fw-bold">System Settings</h1>
        
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
          <Row>
            <Col lg={6} className="mb-4">
              <Card className="neumorphic-card p-4">
                <h5 className="mb-3">System Configuration</h5>
                <Form.Group className="mb-3">
                  <Form.Label>System Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.systemEmail}
                    onChange={(e) => setFormData({...formData, systemEmail: e.target.value})}
                    className="settings-input"
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <Form.Label>Notification Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.notificationEmail}
                    onChange={(e) => setFormData({...formData, notificationEmail: e.target.value})}
                    className="settings-input"
                  />
                </Form.Group> */}

                <Form.Group className="mb-3">
                  <Form.Label>Default Payslip Template</Form.Label>
                  <Form.Select 
                    value={formData.payslipTemplate}
                    onChange={(e) => setFormData({...formData, payslipTemplate: e.target.value})}
                    className="settings-input"
                  >
                    <option value="default">Default Template</option>
                    <option value="detailed">Detailed Template</option>
                    <option value="simplified">Simplified Template</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="auto-approval"
                    label="Enable Auto-Approval for Payslips"
                    checked={formData.autoApproval}
                    onChange={(e) => setFormData({...formData, autoApproval: e.target.checked})}
                  />
                </Form.Group>
              </Card>
            </Col>

            <Col lg={6} className="mb-4">
              <Card className="neumorphic-card p-4">
                <h5 className="mb-3">Security Settings</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Maximum Login Attempts</Form.Label>
                  <Form.Select
                    value={formData.maxLoginAttempts}
                    onChange={(e) => setFormData({...formData, maxLoginAttempts: e.target.value})}
                    className="settings-input"
                  >
                    <option value="3">3 attempts</option>
                    <option value="5">5 attempts</option>
                    <option value="10">10 attempts</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Session Timeout (minutes)</Form.Label>
                  <Form.Select
                    value={formData.sessionTimeout}
                    onChange={(e) => setFormData({...formData, sessionTimeout: e.target.value})}
                    className="settings-input"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Data Retention Period (days)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.retentionPeriod}
                    onChange={(e) => setFormData({...formData, retentionPeriod: e.target.value})}
                    className="settings-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Backup Frequency</Form.Label>
                  <Form.Select
                    value={formData.backupFrequency}
                    onChange={(e) => setFormData({...formData, backupFrequency: e.target.value})}
                    className="settings-input"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Form.Select>
                </Form.Group>
              </Card>
            </Col>

            <Col lg={6} className="mb-4">
              <Card className="neumorphic-card p-4">
                <h5 className="mb-3">Appearance & Localization</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select
                    value={theme}
                    onChange={(e) => {
                      setTheme(e.target.value);
                      setFormData({...formData, theme: e.target.value});
                    }}
                    className="settings-input"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Select
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="settings-input"
                  >
                    <option value="en">English</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Timezone</Form.Label>
                  <Form.Select
                    value={formData.timezone}
                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                    className="settings-input"
                  >
                    <option value="UTC+00:00">UTC+00:00</option>
                    <option value="UTC+02:00">UTC+02:00 (CAT)</option>
                    <option value="UTC+03:00">UTC+03:00 (EAT)</option>
                  </Form.Select>
                </Form.Group>
              </Card>
            </Col>
          </Row>

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