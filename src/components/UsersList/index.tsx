import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";
import { TableContainer } from "./style";
import moment from "moment";
import { TUser } from "../../lib/types";
import { EmptyUser } from "../../lib/util";
import EditUserTime from "../EditUserTime";
import { SocketService } from "../../services/socket";
export default () => {
  const currentPage = 1;
  const [page, setPage] = useState(currentPage);
  const [totalCount, setTotalCount] = useState(1);
  const [list, setUsers] = useState<TUser[]>([]);
  const [user, setUser] = useState<TUser>(EmptyUser());

  const [showEditTime, setShowEditTime] = useState(false);

  const handleShowEditTime = () => setShowEditTime(true);
  const handleCloseEditTime = () => setShowEditTime(false);

  const editTime = (user: TUser) => {
    setUser(user);
    handleShowEditTime();
  };
  const nextPage = () => {
    if (page === totalCount) return;
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  useEffect(() => {
    SocketService.subscribeToPage(page);
  }, [page]);

  useEffect(() => {
    SocketService.subscribeToJoinEvent((users, meta) => {
      setUsers(users);
      setTotalCount(meta.totalCount);
    }, console.error);
    return () => {
      SocketService.unsubscribeToJoinEvent();
    };
  }, []);
  useEffect(() => {
    SocketService.subscribeToTotalCountEvent((totalCount) => {
      setTotalCount(totalCount);
    }, console.error);
    return () => {
      SocketService.unsubscribeTotalCountEvent();
    };
  }, []);
  useEffect(() => {
    SocketService.subscribeToPageUpdateEvent((users, meta) => {
      setUsers(users);
    }, console.error);
  }, []);
  return (
    <TableContainer>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Top</th>
            <th>Username</th>
            <th>Result</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((user) => (
            <tr key={user.id}>
              <td>{user.top}</td>
              <td>{user.username}</td>
              <td>{user.result}</td>
              <td>{moment(user.date).format("DD/MM/YY, hh:mm")}</td>
              <td>
                <Button onClick={() => editTime(user)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditUserTime
        user={user}
        show={showEditTime}
        handleClose={handleCloseEditTime}
        handleSubmit={handleCloseEditTime}
      />
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant="secondary" onClick={prevPage}>
            Prev
          </Button>
        </Col>
        <Col style={{verticalAlign: 'middle'}}>
          <h5 style={{verticalAlign: 'middle'}}>
            {`${page} of ${totalCount}`}
          </h5>
        </Col>
        <Col>
          <Button variant="secondary" onClick={nextPage}>
            Next
          </Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <br />
    </TableContainer>
  );
};
