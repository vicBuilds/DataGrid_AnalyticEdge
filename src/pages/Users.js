import React from "react";
import Datagrid from "../components/datagrid";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getUsers } from "../api";
import { calculatePaginationandReturnArray, cleanUpUsers } from "../utils";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0px;
  width: 90vw;
  background-color: #f9ed7d;
  align-self: center;
`;
const LinkToPage = styled.div`
  cursor: pointer;
  color: blue;
  font-size: 15px;
  text-decoration: underline;
`;
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

  const takeMeToPage = (pageNumber) => {};

  useEffect(() => {
    getUsersforAPI();
  }, []);
  return (
    <Container>
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
      <PaginationContainer>
        {paginationArr.map((pageNumber) => {
          return (
            <LinkToPage
              onClick={(pageNumber) => {
                takeMeToPage(pageNumber);
              }}
              key={pageNumber}
            >
              {pageNumber}
            </LinkToPage>
          );
        })}
      </PaginationContainer>
    </Container>
  );
};

export default Users;
