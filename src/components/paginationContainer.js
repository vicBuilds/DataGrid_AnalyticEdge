import React from "react";
import styled from "styled-components";

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

const takeMeToPage = (pageNumber) => {};

const Pagination = ({ paginationArr, useCase }) => {
  console.log("Hello ", paginationArr);
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
