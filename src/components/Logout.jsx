import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutModal = ({ show, handleClose, handleLogout, user }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You're currently logged in as:</p>
        <div className="border rounded p-2 mb-3 bg-light text-dark">
          <strong>{user?.name}</strong><br />
          <small>{user?.email}</small>
        </div>
        <p>Are you sure you want to log out?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
