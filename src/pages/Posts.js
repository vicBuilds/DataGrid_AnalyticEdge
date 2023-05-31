import React, { useState, useEffect } from "react";
import Datagrid from "../components/datagrid";
import styled from "styled-components";
import { getPosts } from "../api";
import { calculatePaginationandReturnArray } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/paginationContainer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { storeDataInPost } from "../redux/posts/postSlice";

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
  padding: 20px;
  box-sizing: border-box;
  background-color: #ff9800;
  z-index: 2;
  position: sticky;
  top: 0px;
`;

const Input = styled.input``;

const Posts = () => {
  const postArraySize = useSelector((state) => state.posts.size);
  const postArray = useSelector((state) => state.posts.postArray);
  let si = useSelector((state) => state.posts.startingIndexForDataToBeShown);
  let ei = useSelector((state) => state.posts.endingIndexForDataToBeShown);
  let pageNumber = useSelector((state) => state.posts.currentPage);

  const [posts, setPosts] = useState([]);
  const [searchBy, setSearchBy] = useState("userId");
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const headerArray = ["userId", "id", "title", "body"];

  const dispatch = useDispatch();

  const getPostsForAPI = async () => {
    let posts = await getPosts(0, 10);
    dispatch(storeDataInPost(posts));
    setPosts(posts);
  };

  useEffect(() => {
    if (postArraySize === 0) {
      getPostsForAPI();
    }
  }, []);

  useEffect(() => {
    let dataSlice = postArray.slice(si, ei + 1);
    setPosts(dataSlice);
  }, [si, ei, postArray]);

  const paginationArr = calculatePaginationandReturnArray(100, 10);

  const handlechangeinSearchHeader = (e) => {
    setSearchBy(e.target.value);
  };

  const handleChangeinInputValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredData = postArray.filter((item) => {
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

  const colsForPosts = 4;
  const rowsForPosts = 10;

  return (
    <Container>
      <Navbar />
      <Header text={"POSTS"} />
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
        {posts.length > 0 && (
          <Datagrid
            rowsI={rowsForPosts}
            colsI={colsForPosts}
            data={posts}
            filteredData={filteredData}
            isUsers={false}
          />
        )}
      </DatGridContainer>
      <Pagination paginationArr={paginationArr} useCase={"Posts"} />
    </Container>
  );
};

export default Posts;
