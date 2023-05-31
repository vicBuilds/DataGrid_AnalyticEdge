import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px;
  height: 40px;
  background-color: #ff9800;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  align-self: center;
  margin-bottom: 0px;
  padding: 10px 0px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Header = ({ text }) => {
  return (
    <Container>
      <Title>{text}</Title>
    </Container>
  );
};

export default Header;
