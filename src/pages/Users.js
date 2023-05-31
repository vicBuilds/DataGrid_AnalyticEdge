import React from "react";
import Datagrid from "../components/datagrid";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getUsers } from "../api";
import { calculatePaginationandReturnArray, cleanUpUsers } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/paginationContainer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { storeData } from "../redux/users/userSlice";

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
  const userArraysize = useSelector((state) => state.user.size);
  const userArray = useSelector((state) => state.user.userArray);
  //console.log("User Array is*/*/*/*/*/* ", userArray);

  const [user, setUser] = useState([]);

  const dispatch = useDispatch();

  const getUsersforAPI = async () => {
    let users = await getUsers();
    users = await cleanUpUsers(users);
    dispatch(storeData(users));
    setUser(users);
  };

  // As the User are only 10 so the API is being called once and cached in redux
  // Data is being fetched from Redux from Next time onwards(No Need of Calling API multiple times)
  useEffect(() => {
    if (userArraysize == 0) {
      getUsersforAPI();
    } else {
      setUser(userArray);
      // console.log("What to do now???", userArray);
    }
  }, []);

  return (
    <Container>
      <Navbar />
      <Header text={"USERS"} />
      <DatGridContainer>
        {user.length > 0 && (
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
