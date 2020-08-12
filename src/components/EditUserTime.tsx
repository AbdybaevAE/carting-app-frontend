import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { TUser } from "../lib/types";
import {ApiService} from '../services/api';
type PropsType = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (user: TUser, time: number) => void;
  user: TUser;
};
export default ({ show, handleClose, handleSubmit, user }: PropsType) => {
  const [time, setTime] = useState<string>();
  const onSubmit = () => {
    handleClose();
    const data = {
        time: Number(time),
        id: user.id
    };
    ApiService.updateUserTime(data).then(console.log).catch(console.error);
    
  };
  useEffect(() => {
    setTime("");
  }, [user]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit user form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Current result</Form.Label>
            <Form.Control
              disabled={true}
              type="number"
              value={user.result}
              placeholder="Enter new result"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>New result</Form.Label>
            <Form.Control
              value={time}
              type="number"
              placeholder="Enter new value"
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
