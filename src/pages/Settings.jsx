import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import PageWrapper from '../components/PageWrapper';
import '../App.css';

const Settings = () => {
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'sarah@employee.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    language: 'en',
  });

 

  // Add confirm password validation
  const validatePasswords = (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      return 'New password and confirmation password do not match';
    }
    return '';
  };

  // Enhanced password validation
  const validatePassword = (password) => {
    const minLength = 8; // Industry standard minimum length
    const maxLength = 128; // Reasonable maximum length
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    const hasNoCommonPatterns = !/^(?=.*password)(?=.*123)(?=.*abc)/i.test(password);

    const errors = [];
    
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (password.length > maxLength) {
      errors.push(`Password must not exceed ${maxLength} characters`);
    }
    if (!hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
      errors.push('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
      errors.push('Password must contain at least one special character');
    }
    if (!hasNoSpaces) {
      errors.push('Password must not contain spaces');
    }
    if (!hasNoCommonPatterns) {
      errors.push('Password contains common patterns that are not allowed');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate current password
      if (!formData.currentPassword) {
        throw new Error('Current password is required');
      }

      // Validate new password only if it's being changed
      if (formData.newPassword) {
        const passwordErrors = validatePassword(formData.newPassword);
        if (passwordErrors.length > 0) {
          throw new Error(passwordErrors.join('\n'));
        }

        // Validate password confirmation
        const confirmError = validatePasswords(formData.newPassword, formData.confirmPassword);
        if (confirmError) {
          throw new Error(confirmError);
        }

        // Prevent using the same password
        if (formData.newPassword === formData.currentPassword) {
          throw new Error('New password must be different from current password');
        }
      }

      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success feedback
      setFeedback({
        message: 'Account updated successfully!',
        type: 'success'
      });

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error) {
      setFeedback({
        message: error.message,
        type: 'danger'
      });
    } finally {
      setLoading(false);
      // Auto-dismiss success messages, but keep error messages
      if (feedback.type === 'success') {
        setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
      }
    }
  };

  return (
    <PageWrapper>
      <div className="settings-container dashboard-container">
        <h1 className="mb-4 fw-bold">Settings</h1>
        
        <Row>
          <Col lg={6} md={12}>
            <Card className="neumorphic-card p-4 mb-4 ">
              <h5 className="mb-3">Account Settings</h5>
              {feedback.message && (
                <Alert 
                  variant={feedback.type}
                  className="mb-3"
                  dismissible
                  onClose={() => setFeedback({ message: '', type: '' })}
                >
                  {feedback.message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="settings-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control 
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    className="settings-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control 
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className="settings-input"
                    placeholder="Enter new password"
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="settings-input"
                    placeholder="Confirm new password"
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="neumorphic-button empl-btn1"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Account'}
                </Button>
              </Form>
            </Card>
          </Col>
{/* 
          <Col lg={6} md={12}>
            <Card className="neumorphic-card p-4 mb-4">
              <h5 className="mb-3">Preferences</h5>
              <Form>
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
                  <Form.Label>Theme</Form.Label>
                  <Form.Select 
                    value={theme}
                    onChange={handleThemeChange}
                    className="settings-input"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="notifications"
                    label="Enable Notifications"
                    checked={formData.notifications}
                    onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                  />
                </Form.Group>

                <Button className="neumorphic-button empl-btn1">
                  Save Preferences
                </Button>
              </Form>
            </Card>
          </Col> */}
        </Row>
      </div>
    </PageWrapper>
  );
};

export default Settings;