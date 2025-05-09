import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticlesBackground, { defaultParticlesOptions } from "../components/Particles";
import { Form, Button, Card, Container, Row } from "react-bootstrap";
import "../App.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = (e) => {
    e.preventDefault();
    console.log("Send verification code to:", email);
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    console.log("Code entered:", code);
    if (code === "123456") {
      setIsCodeConfirmed(true);
      setStep(3);
    } else {
      alert("Invalid verification code.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset for:", email);
    // Proceed to submit new password
  };

  return (
    <Container fluid className="login-container">
      <ParticlesBackground options={defaultParticlesOptions} />
      <Row className="h-100">
        <div className="text-center logo-f pt-2">
          <img src="/images/omni_logo_white.png" alt="Logo" className="logo" />
        </div>

        <Card className="login-card-f " style={{ width: "100%", maxWidth: "400px", color: "white" }}>
          <Card.Body>
            <Card.Title id="card-title-f">Forgot Password</Card.Title>

            {step === 1 && (
              <Form onSubmit={handleSendCode}>
                <Form.Group className="mb-3 form-input">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ backgroundColor: "transparent", borderColor: "#ABE2F4", color:"white"}}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Send Verification Code
                </Button>
              </Form>
            )}

            {step === 2 && (
              <Form onSubmit={handleVerifyCode}>
                <Form.Group className="mb-3 form-input">
                  <Form.Control
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    style={{ backgroundColor: "transparent", borderColor: "#ABE2F4" }}
                  />
                </Form.Group>
                <div className="mb-2 text-muted" style={{ fontSize: "0.9rem"}}>
                  Didn’t receive the code?{" "}
                  <Button variant="link" onClick={() => alert("Resending code...")}>
                    Resend
                  </Button>
                </div>
                <Form.Check
                  type="checkbox"
                  label="I entered the correct code"
                  checked={isCodeConfirmed}
                  onChange={(e) => setIsCodeConfirmed(e.target.checked)}
                />
                <Button type="submit" variant="primary" className="w-100 mt-2">
                  Verify Code
                </Button>
              </Form>
            )}

            {step === 3 && (
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3 form-input">
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ backgroundColor: "transparent", borderColor: "#ABE2F4" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-input">
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ backgroundColor: "transparent", borderColor: "#ABE2F4" }}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Reset Password
                </Button>
              </Form>
            )}

            <Card.Text className="back mt-2">
              <Link to="/login">Back to Login</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
