import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticlesBackground, { defaultParticlesOptions } from "../components/Particles";
import { Form, Button, Card, Container, Row } from "react-bootstrap";
import "../App.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Forgot password request for:", email);
   
  };

  return (
    <Container fluid className="login-container">
      <ParticlesBackground options={defaultParticlesOptions} />
      <Row className="h-100">
      <div className="text-center logo-f pt-2">
            <img src="/images/omni_logo_white.png" alt="Logo" className="logo" />
          </div>
        <Card className="login-card-f" style={{ width: "100%", maxWidth: "400px", }}>
          <Card.Body>
            <Card.Title id="card-title-f">Forgot Password</Card.Title>
            <Form onSubmit={handleForgotPassword}>
              <Form.Group className="mb-3 form-input">
                <Form.Control
                  id="email"
                  style={{ backgroundColor: "transparent", borderColor: "#ABE2F4" }}
                  type="name"
                  placeholder="Enter your email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 form-input">
                <Form.Control
                  id="password"
                  style={{ backgroundColor: "transparent", borderColor: "#ABE2F4" }}
                  type="password"
                  placeholder="Enter your password"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 form-input">
                <Form.Control
                  id="password"
                  style={{ backgroundColor: "transparent", borderColor: "#ABE2F4" }}
                  type="password"
                  placeholder="Confirm new password"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Reset Password
              </Button>
            </Form>
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