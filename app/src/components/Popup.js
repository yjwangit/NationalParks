import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Popup = ({ show, closePopup }) => {
  const { loginWithRedirect } = useAuth0();
  const handleClose = () => {
    closePopup();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>National Park Finder</Modal.Title>
      </Modal.Header>
      <Modal.Body>If you want to save your parks, please login!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={loginWithRedirect}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Popup;
