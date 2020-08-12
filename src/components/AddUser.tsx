import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { TUser } from "../lib/types";
import { ApiService } from "../services/api";
type PropsType = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (user: TUser, time: number) => void;
};
export default ({ show, handleClose, handleSubmit }: PropsType) => {
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const onSubmit = () => {
    handleClose();
    const data = {
      time: Number(time),
      username: name,
      email,
    };
    ApiService.addUser(data).then(console.log).catch(console.error);
  };
  useEffect(() => {
    setTime("");
    setName("");
    setEmail("")
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add user form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>New result</Form.Label>
            <Form.Control
              value={time}
              type="number"
              placeholder="Enter result"
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
