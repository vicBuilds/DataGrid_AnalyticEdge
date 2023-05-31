import React from "react";
import Datagrid from "../components/datagrid";
import { useState, useEffect } from "react";
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

const Comments = () => {
  const commentArraySize = useSelector((state) => state.comments.size);
  const commentArray = useSelector((state) => state.comments.commentArray);
  let si = useSelector((state) => state.comments.startingIndexForDataToBeShown);
  let ei = useSelector((state) => state.comments.endingIndexForDataToBeShown);

  let [comments, setComments] = useState([]);

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
    //console.log("Comemnts Array is", commentArray);

    let dataSlice = commentArray.slice(si, ei + 1);
    //console.log("DAta SLice is ", dataSlice);
    setComments(dataSlice);
  }, [si, ei, commentArray]);

  const paginationArr = calculatePaginationandReturnArray(500, 10);

  // This is constant given the type of Comments data
  const colsForComments = 5;
  const rowsForComments = 10;

  return (
    <Container>
      <Navbar />
      <Header text={"COMMENTS"} />
      <DatGridContainer>
        {comments.length > 0 && (
          <Datagrid
            rowsI={rowsForComments}
            colsI={colsForComments}
            data={comments}
            isUsers={false}
          />
        )}
      </DatGridContainer>
      <Pagination paginationArr={paginationArr} useCase={"Comments"} />
    </Container>
  );
};

export default Comments;
