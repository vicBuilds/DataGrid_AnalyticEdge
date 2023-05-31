import React, { useState, useEffect } from "react";
import Datagrid from "../components/datagrid";
import styled from "styled-components";
import { getUsers } from "../api";
import { calculatePaginationandReturnArray, cleanUpUsers } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/paginationContainer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { storeData } from "../redux/users/userSlice";

// CSS For Styled Components
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

const PageInfoContainer = styled.div`
  width: 90vw;
  align-self: center;
  background-color: #ff9800;
  padding: 20px;
  box-sizing: border-box;
  z-index: 2;
  position: sticky;
  top: 0px;
`;
const Search = styled.div``;

const Input = styled.input``;

const Button = styled.button``;

const Users = () => {
  // Data from Redux
  const userArraySize = useSelector((state) => state.user.size);
  const userArray = useSelector((state) => state.user.userArray);

  const [user, setUser] = useState([]);

  // Initially nine rows
  const [rowsForUsers, setRowsForUsers] = useState(9);

  // State for Label
  const [searchBy, setSearchBy] = useState("id");

  // State for input value
  const [searchValue, setSearchValue] = useState("");

  // State to store the filtered data. If the Filtered data is null means no search match
  const [filteredData, setFilteredData] = useState(null);

  const colsForUsers = 8;
  // Header for the Search Dropdown
  let headerArray = ["id", "name", "username", "email", "phone", "website"];
  let paginationArr = calculatePaginationandReturnArray(10, 10);

  const dispatch = useDispatch();

  // Only to be called once and then cached
  const getUsersforAPI = async () => {
    let users = await getUsers();
    users = await cleanUpUsers(users);
    dispatch(storeData(users));
    setUser(users);
  };

  // Change in Dropdown
  const handlechangeinSearchHeader = (e) => {
    e.preventDefault();
    setSearchBy(e.target.value);
  };

  // Change in input value
  const handleChangeinInputValue = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  // Hit the search button
  const handleSearch = (e) => {
    e.preventDefault();
    let filteredData = user.filter((item) => {
      if (searchBy == "id") {
        console.log("Hello Testing");
        return item[searchBy] == searchValue;
      } else {
        const itemValue = String(item[searchBy]).toLowerCase();
        const searchValueLower = searchValue.toLowerCase();
        return itemValue == searchValueLower;
      }
    });

    // If search matches

    if (filteredData.length > 0) {
      setFilteredData(filteredData);
    } else {
      setFilteredData(null);
    }
  };

  const resetData = (e) => {
    e.preventDefault();
    setFilteredData(null);
  };

  useEffect(() => {
    if (userArraySize === 0) {
      getUsersforAPI();
    } else {
      setUser(userArray);
    }
  }, []);

  return (
    <Container>
      <Navbar />
      <Header text={"USERS"} />
      <PageInfoContainer>
        <h4>Current Page: {1}</h4>
        <h4>Total No. of Available Pages: {1}</h4>
        <Search>
          <label htmlFor="header-select">Select Header:</label>
          <select
            id="header-select"
            onChange={(e) => {
              handlechangeinSearchHeader(e);
            }}
          >
            {headerArray.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Input
            placeholder="Enter Value to Search"
            onChange={(e) => handleChangeinInputValue(e)}
          />
          <Button
            onClick={(e) => {
              handleSearch(e);
            }}
          >
            Search
          </Button>
          <Button
            onClick={(e) => {
              resetData(e);
            }}
          >
            Reset
          </Button>
        </Search>
      </PageInfoContainer>
      {/* Dynamic Data Grid Container which takes user, coloums and rows */}
      <DatGridContainer>
        {user.length > 0 && (
          <Datagrid
            rowsI={rowsForUsers}
            colsI={colsForUsers}
            data={user}
            filteredData={filteredData}
            isUsers={true}
          />
        )}
      </DatGridContainer>
      <Pagination paginationArr={paginationArr} useCase={"Users"} />
    </Container>
  );
};

export default Users;
