import React, { useState, useEffect } from "react";
import Datagrid from "../components/datagrid";
import styled from "styled-components";
import { getComments } from "../api";
import { calculatePaginationandReturnArray } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/paginationContainer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import {
  storeDataInComment,
  changeIndexInComment,
} from "../redux/comments/commentSlice";

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

const Comments = () => {
  const commentArraySize = useSelector((state) => state.comments.size);
  const commentArray = useSelector((state) => state.comments.commentArray);
  let si = useSelector((state) => state.comments.startingIndexForDataToBeShown);
  let ei = useSelector((state) => state.comments.endingIndexForDataToBeShown);
  let pageNumber = useSelector((state) => state.comments.currentPage);

  const [comments, setComments] = useState([]);
  const [searchBy, setSearchBy] = useState("postId");
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const headerArray = ["postId", "id", "name", "email", "body"];

  const dispatch = useDispatch();

  const getCommentsForAPI = async () => {
    let comments = await getComments(0, 10);
    dispatch(storeDataInComment(comments));
    setComments(comments);
  };

  useEffect(() => {
    if (commentArraySize === 0) {
      getCommentsForAPI();
    }
  }, []);

  useEffect(() => {
    let dataSlice = commentArray.slice(si, ei + 1);
    setComments(dataSlice);
  }, [si, ei, commentArray]);

  const paginationArr = calculatePaginationandReturnArray(500, 10);

  const handlechangeinSearchHeader = (e) => {
    e.preventDefault();
    setSearchBy(e.target.value);
  };

  const handleChangeinInputValue = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredData = commentArray.filter((item) => {
      const itemValue = String(item[searchBy]).toLowerCase();
      const searchValueLower = searchValue.toLowerCase();
      return itemValue === searchValueLower;
    });

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

  const colsForComments = 5;
  const rowsForComments = 10;

  return (
    <Container>
      <Navbar />
      <Header text={"COMMENTS"} />
      <PageInfoContainer>
        <h4>Current Page: {pageNumber}</h4>
        <h4>Total No. of Available Pages: {paginationArr.length}</h4>
        <div>
          <label htmlFor="header-select">Select Header:</label>
          <select
            id="header-select"
            onChange={(e) => handlechangeinSearchHeader(e)}
          >
            {headerArray.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            placeholder="Enter Value to Search"
            onChange={(e) => handleChangeinInputValue(e)}
          />
          <button onClick={(e) => handleSearch(e)}>Search</button>
          <button onClick={(e) => resetData(e)}>Reset</button>
        </div>
      </PageInfoContainer>
      <DatGridContainer>
        {comments.length > 0 && (
          <Datagrid
            rowsI={rowsForComments}
            colsI={colsForComments}
            data={comments}
            filteredData={filteredData}
            isUsers={false}
          />
        )}
      </DatGridContainer>
      <Pagination paginationArr={paginationArr} useCase={"Comments"} />
    </Container>
  );
};

export default Comments;
