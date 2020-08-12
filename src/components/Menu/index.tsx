import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddUser from "../AddUser";
import "./menu.css";
export default () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const handleShowAddUser = () => setShowAddUser(true);
  const handleCloseAddUser = () => setShowAddUser(false);
  const addUser = () => {
    handleShowAddUser();
  };
  return (
    <div className="menu">
      <Button variant="dark" className="create-new-user" onClick={addUser}>
        Add user
      </Button>
      <AddUser
        show={showAddUser}
        handleClose={handleCloseAddUser}
        handleSubmit={handleCloseAddUser}
      />
    </div>
  );
};
