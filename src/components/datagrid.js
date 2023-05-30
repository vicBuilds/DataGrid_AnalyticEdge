import React, { useState } from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
`;
const Col = styled.div`
  border: 1px solid black;
  padding: 4px;
  flex: 1;
  text-align: center;
  background-color: bisque;
  color: black;
`;
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const Datagrid = ({ rowsI, colsI, data }) => {
  const [numRows, setRows] = useState(rowsI);
  const [numCols, setCols] = useState(colsI);

  const createGrid = () => {
    const rows = [];
    for (let i = 0; i <= numRows; i++) {
      const cells = [];
      /* {
        
             {
                name: "Jane",
                age: 30,
                email: "jane@example.com",
            }
        The data inside the tempObjectWithParameters is something like this
      }*/
      let tempObjectWithParameters;
      //   As one row is extra for the headers
      i == numRows
        ? (tempObjectWithParameters = data[i - 1])
        : (tempObjectWithParameters = data[i]);

      //Populating the header of the table
      if (i == 0) {
        let colDataInArray = Object.keys(tempObjectWithParameters);
        for (let j = 0; j < numCols; j++) {
          cells.push(
            <Col key={j} style={{ backgroundColor: "orange", color: "white" }}>
              {colDataInArray[j].toUpperCase()}
            </Col>
          );
        }
      } else {
        /* {
        
        ["John", 25, "john@example.com"]

        The data inside the colDataInArray  is something like this
      }*/
        let colDataInArray = Object.values(tempObjectWithParameters);
        for (let j = 0; j < numCols; j++) {
          cells.push(<Col key={j}>{colDataInArray[j]}</Col>);
        }
      }

      rows.push(<Row key={i}>{cells}</Row>);
    }
    return <Grid>{rows}</Grid>;
  };

  return <>{createGrid()}</>;
};

export default Datagrid;
