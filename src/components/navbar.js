import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px;
  height: 40px;
  background-color: #ff9800;
  display: flex;
  align-items: space-between;
  justify-content: center;
  width: 90vw;
  align-self: center;
  padding: 10px 0px;
`;
const LinkContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

const Navbar = () => {
  return (
    <Container>
      <LinkContainer>
        <Link to={"/users"}>Users</Link>
        <Link to={"/posts"}>Posts</Link>
        <Link to={"/comments"}>Comments</Link>
      </LinkContainer>
    </Container>
  );
};

export default Navbar;
