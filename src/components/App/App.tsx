import React from "react";
import logo from "../../logo.svg";
import "./App.css";
import UsersList from "../UsersList";
import MenuBar from "../Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
const MainContainer = styled.div`
  margin: auto;
  width: 80%;
`;

function App() {
  return (
    <>
      <MenuBar />
      <MainContainer>
        <UsersList />
      </MainContainer>
    </>
  );
}

export default App;
