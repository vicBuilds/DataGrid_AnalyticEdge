import React, { useState } from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Col = styled.div`
  border: 1px solid black;
  padding: 2px;
  flex: 1;
  word-break: break-all;
  padding: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: center;
  background-color: bisque;
  color: black;
  display: flex;
  flex-wrap: wrap;
`;
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  justify-content: center;
  /* position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px; */
`;

const Datagrid = ({ rowsI, colsI, data, isUsers }) => {
  console.log("THe value of data is  ", data);
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
      i == 0
        ? (tempObjectWithParameters = data[i])
        : (tempObjectWithParameters = data[i - 1]);

      //Populating the header of the table
      if (i == 0) {
        let colDataInArray = Object.keys(tempObjectWithParameters);
        for (let j = 0; j < numCols; j++) {
          cells.push(
            <Col
              key={j}
              style={{
                backgroundColor: "orange",
                color: "white",
                fontWeight: "bold",
              }}
            >
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
