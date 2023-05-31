import React from "react";
import Datagrid from "../components/datagrid";
import { useState, useEffect } from "react";
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

const Posts = () => {
  const postArraySize = useSelector((state) => state.posts.size);
  const postArray = useSelector((state) => state.posts.postArray);
  let si = useSelector((state) => state.posts.startingIndexForDataToBeShown);
  let ei = useSelector((state) => state.posts.endingIndexForDataToBeShown);

  let [posts, setPosts] = useState([]);

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
    // console.log("SI Now is ", si);
    // console.log("POst Array Size is", postArray);

    let dataSlice = postArray.slice(si, ei + 1);
    //console.log("Hello Data Slice", dataSlice);
    setPosts(dataSlice);
  }, [si, ei, postArray]);

  const paginationArr = calculatePaginationandReturnArray(100, 10);

  // This is constant given the type of Posts data
  const colsForPosts = 4;
  const rowsForPosts = 10;

  return (
    <Container>
      <Navbar />
      <Header text={"POSTS"} />
      <DatGridContainer>
        {posts.length > 0 && (
          <Datagrid
            rowsI={rowsForPosts}
            colsI={colsForPosts}
            data={posts}
            isUsers={false}
          />
        )}
      </DatGridContainer>
      <Pagination paginationArr={paginationArr} useCase={"Posts"} />
    </Container>
  );
};

export default Posts;
