import React from "react";
import styled from "styled-components";
import { storeDataInPost, changeIndexInPost } from "../redux/posts/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getComments, getPosts } from "../api";
import {
  changeIndexInComment,
  storeDataInComment,
} from "../redux/comments/commentSlice";

const Container = styled.div``;

const Input = styled.input``;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0px 0px;
  width: 90vw;
  background-color: #f9ed7d;
  flex-wrap: wrap;
  align-self: center;
`;

const LinkToPage = styled.div`
  cursor: pointer;
  margin: 10px;
  color: blue;
  font-size: 15px;
  text-decoration: underline;
`;

const Pagination = ({ paginationArr, useCase }) => {
  const [page, setPage] = useState();
  const dispatch = useDispatch();

  //User Array from Redux
  const userArraysize = useSelector((state) => state.user.size);
  const userArray = useSelector((state) => state.user.userArray);

  //Post Array from Redux
  const postArraySize = useSelector((state) => state.posts.size);
  const postArray = useSelector((state) => state.posts.postArray);

  //Comment Array from Redux
  const commentArraySize = useSelector((state) => state.comments.size);
  const commentArray = useSelector((state) => state.comments.commentArray);

  //console.log("Size is ", userArraysize);
  //console.log("Array ", userArray);

  const takeMeToPage = async (pageNumber) => {
    //console.log("postArraySize is", postArraySize);
    let value = pageNumber * 10;
    let si = value - 10;
    let ei = value - 1;

    if (useCase == "Posts") {
      if (postArraySize < pageNumber * 10) {
        let postFromAPi = await getPosts(0, pageNumber * 10);
        //Log this to prove if API is called or not
        //console.log("API IS CALLED");
        //console.log("Helllo Data ", postFromAPi);
        dispatch(storeDataInPost(postFromAPi));
      }
      dispatch(changeIndexInPost({ si, ei }));
    } else if (useCase == "Comments") {
      if (commentArraySize < pageNumber * 10) {
        let commentsFromAPi = await getComments(0, pageNumber * 10);
        dispatch(storeDataInComment(commentsFromAPi));
      }
      dispatch(changeIndexInComment({ si, ei }));
    }
  };

  return (
    <PaginationContainer>
      {paginationArr.map((pageNumber) => {
        return (
          <LinkToPage
            onClick={() => {
              takeMeToPage(pageNumber);
            }}
            key={pageNumber}
          >
            {pageNumber}
          </LinkToPage>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
