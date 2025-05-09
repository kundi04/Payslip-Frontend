import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Col, Container, Row } from "react-bootstrap";
import ParticlesBackground, { defaultParticlesOptions } from "../components/Particles";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // for login credentials testing purposes only
    if (email === "admin@example.com" && password === "muzadmin12_") {
      console.log("Admin logged in");
      navigate("/admin-dashboard"); 
    } else {
      console.log("Invalid credentials");
      alert("Invalid email or password");
    }


    if (email === "sarah@employee.com" && password === "sarah2020_") {
      console.log("Employee logged in");
      navigate("/employee-dashboard"); 
    } else {
      console.log("Invalid credentials");
      alert("Invalid email or password");
    }

  };

  



  return (
    <Container fluid className="login-container">
      <ParticlesBackground options={defaultParticlesOptions} />
      <Row className="h-100">
        <Col  className="login-right d-flex flex-column align-items-center justify-content-center">
          <div className="text-center ">
            <img src="/images/omni_logo_white.png" alt="Logo" className="logo" />
          </div>
          <Card className="login-card ">
            <Card.Body className="card-body">
              <Card.Title id="card-title">Login</Card.Title>
              <Card.Subtitle className="mb-2 text-muted" id="p-title">
                Enter your credentials to access your account
              </Card.Subtitle>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3 form-input">
                  <Form.Control
                    id="email"
                    style={{ backgroundColor: "transparent", borderColor: "#ABE2F4" }}
                    type="email"
                    placeholder="Email/Phone-Number"
                    value={email}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    id="remember-me"
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Sign in
                </Button>
              </Form>
              <Card.Text className="text-center mt-2">
                <a href="/forgot-password">Forgot Password?</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
    
      </Row>
    </Container>
  );
};

export default Login;