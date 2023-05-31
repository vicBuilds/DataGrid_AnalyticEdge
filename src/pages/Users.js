import React from "react";
import Datagrid from "../components/datagrid";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getUsers } from "../api";
import { calculatePaginationandReturnArray, cleanUpUsers } from "../utils";
import Pagination from "../components/paginationContainer";
import Header from "../components/header";
import Navbar from "../components/navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DatGridContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

let paginationArr = calculatePaginationandReturnArray(10, 10);

// This is constant given the type of Users data
const colsForUsers = 8;
const rowsForUsers = 9;

const Users = () => {
  const [user, setUser] = useState(null);

  const getUsersforAPI = async () => {
    let users = await getUsers();
    users = cleanUpUsers(users);
    setUser(users);
  };

  useEffect(() => {
    getUsersforAPI();
  }, []);
  return (
    <Container>
      <Navbar />
      <Header text={"USERS"} />
      <DatGridContainer>
        {user && (
          <Datagrid
            rowsI={rowsForUsers}
            colsI={colsForUsers}
            data={user}
            isUsers={true}
          />
        )}
      </DatGridContainer>
      <Pagination paginationArr={paginationArr} useCase={"Users"} />
    </Container>
  );
};

export default Users;
