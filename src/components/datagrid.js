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
`;

const Datagrid = ({ rowsI, colsI, data, filteredData, isUsers }) => {
  const [numCols, setCols] = useState(colsI);
  let numRows;
  filteredData ? (numRows = filteredData.length + 1) : (numRows = rowsI);

  const createGrid = () => {
    const rows = [];
    const dataArray = filteredData ? filteredData : data; // Use filteredData if available, otherwise use data
    for (let i = 0; i <= numRows; i++) {
      const cells = [];
      let tempObjectWithParameters;

      // Just for Putting the headers
      i === 0
        ? (tempObjectWithParameters = dataArray[i])
        : (tempObjectWithParameters = dataArray[i - 1]);

      // Please ahve a look here we have used object.keys to takes the keys for headers
      if (i === 0) {
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
        // Otherwise taking the Object.values
        let colDataInArray = tempObjectWithParameters
          ? Object.values(tempObjectWithParameters)
          : [];

        for (let j = 0; j < numCols; j++) {
          cells.push(<Col key={j}>{colDataInArray[j]}</Col>);
        }
      }
      //Pushing a cell into the row
      rows.push(<Row key={i}>{cells}</Row>);
    }
    return <Grid>{rows}</Grid>;
  };
  //Calling the Create Grid for the Grid
  return <>{createGrid()}</>;
};

export default Datagrid;
