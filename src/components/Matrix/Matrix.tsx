import React, { useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { Divider, Button, Row, Col } from "antd";

import generateMatrixValues from "../../helpers/generateMatrixValues";
import findNearestCellNumbers from "./findNearestCellNumbers";

import {
  decreaseRowAmount,
  increaseRowAmount,
} from "../../reducers/matrixDimension";
import {
  addNewRow,
  deleteRow,
  increaseCellAmount,
} from "../../reducers/matrixData";

import css from "./Matrix.module.css";

interface RootState {
  matrixDimension: {
    rows: number;
    cols: number;
    cells: number;
  };
  matrixData: {
    matrixValues: { id: string; amount: number }[][];
    matrixRowsIds: string[];
    matrixRowsSum: number[];
    matrixColsSum: number[];
    matrixColsAvg: number[];
  };
}

export const Matrix = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.matrixDimension.rows);
  const cells = useSelector((state: RootState) => state.matrixDimension.cells);
  const matrixData = useSelector(
    (state: RootState) => state.matrixData.matrixValues,
  );
  const matrixRowsIds = useSelector(
    (state: RootState) => state.matrixData.matrixRowsIds,
  );
  const matrixRowsSum = useSelector(
    (state: RootState) => state.matrixData.matrixRowsSum,
  );
  const matrixColsSum = useSelector(
    (state: RootState) => state.matrixData.matrixColsSum,
  );
  const matrixColsAvg = useSelector(
    (state: RootState) => state.matrixData.matrixColsAvg,
  );
  const [nearestValues, setNearestValues] = useState(
    [] as Array<{ id: string; amount: number }>,
  );
  const [sumPercentArray, setSumPercentArray] = useState<string[]>([
    "0%",
    "0%",
    "0%",
  ]);
  const [avgSumPercentArray, setAvgSumPercentArray] = useState<string[]>([
    "0%",
    "0%",
    "0%",
  ]);
  const [isHoveredCell, setIsHoveredCell] = useState(false);
  const [isHoveredRowId, setIsHoveredRowId] = useState("");
  const [isHoveredAvgSumCell, setIsHoveredAvgSumCell] = useState(false);

  const handleAddRow = () => {
    const newRow = generateMatrixValues(matrixData[0].length, 1);

    let rowSum = 0;
    const newColsSum = [];
    const newColsAvg = [];

    for (let i = 0; i < newRow[0].length; i++) {
      const colSum = matrixColsSum[i] + Number(newRow[0][i].amount);
      rowSum += newRow[0][i].amount;
      newColsSum.push(colSum);
      newColsAvg.push(Math.round(colSum / (rows + 1)));
    }

    const rowId = uuidv4();

    dispatch(addNewRow([newRow, rowId, rowSum, newColsSum, newColsAvg]));
    dispatch(increaseRowAmount(rows + 1));
  };

  const handleDeleteRow = (id: string, index: number) => {
    const deletedRow = [...matrixData].splice(index, 1)[0];

    const newColsSum = matrixColsSum.map((item, index) => {
      return (item -= deletedRow[index].amount);
    });

    const newColsAvg = newColsSum.map((item) => {
      return (item = Math.round(item / (rows - 1)));
    });

    dispatch(deleteRow({ id, index, newColsSum, newColsAvg }));
    dispatch(decreaseRowAmount(rows - 1));
  };

  const increaseCellNumber = (id: string) => {
    let rowNum = 0;
    let cellIndex = 0;

    for (let rows = 0; rows < matrixData.length; rows++) {
      for (let cell = 0; cell < matrixData[rows].length; cell++) {
        if (matrixData[rows][cell].id === id) {
          rowNum = rows;
          cellIndex = cell;
        }
      }
    }

    dispatch(increaseCellAmount({ rowNum, cellIndex }));
  };

  const handleCellMouseOver = (id: string, amount: number) =>
    setNearestValues(findNearestCellNumbers(id, amount, matrixData, cells));

  const handleCellMouseLeave = () => setNearestValues([]);

  const handleSumCellMouseOver = (
    rowSum: number,
    rowCells: { id: string; amount: number }[],
    rowId: string,
  ) => {
    setIsHoveredCell(true);
    setIsHoveredRowId(rowId);
    const sumPartPercents = rowCells.map(
      (cell) => ((cell.amount * 100) / rowSum).toFixed(2) + "%",
    );
    setSumPercentArray(sumPartPercents);
  };

  const handleSumCellMouseLeave = () => {
    setIsHoveredCell(false);
    setIsHoveredAvgSumCell(false);
    setIsHoveredRowId("");
  };

  const handleAvgSumCellMouseEnter = (matrixColsAvg: number[]) => {
    setIsHoveredAvgSumCell(true);
    const sum = matrixColsAvg.reduce((accum, curr) => (accum += curr), 0);
    const sumPartPercents = matrixColsAvg.map(
      (value) => ((value * 100) / sum).toFixed(2) + "%",
    );
    setAvgSumPercentArray(sumPartPercents);
  };

  const customStyle = (rowId: string, cellId: string, index: number) => {
    const hoveredCell = nearestValues.filter(
      (cell: { id: string; amount: number }) => cell.id === cellId,
    );

    const cellCustomStyles = {
      "--percent": isHoveredRowId === rowId ? sumPercentArray[index] : "0%",
    };

    if (hoveredCell.length === 1) {
      (cellCustomStyles as CSSProperties).backgroundColor =
        "rgb(255, 255, 0, 0.4)";
    }

    return cellCustomStyles as CSSProperties;
  };

  return (
    matrixData.length !== 0 && (
      <div className={css["Matrix"]}>
        <Divider />
        <Button
          type="primary"
          className={css["Matrix-btn"]}
          onClick={handleAddRow}
        >
          Add a row
        </Button>
        <section className={css["Matrix-table"]}>
          <Col className={css["Matrix-table__row-titles"]}>
            <span />
            {matrixData.map((_, index) => (
              <span key={index}> {index + 1} </span>
            ))}
            <span> Avg </span>
          </Col>
          <div>
            <Row className={css["Matrix-table__column-titles"]}>
              {matrixData[0].map((_, index) => (
                <span key={index}> {index + 1} </span>
              ))}
              <span> Sum </span>
            </Row>
            <Row className={css["Matrix-table__data"]}>
              {matrixRowsIds.map((rowId, index) => (
                <div key={rowId} className={css["Matrix-table__row"]}>
                  {matrixData[index].map((cell, i) => (
                    <div
                      key={cell.id}
                      className={cn(
                        css["Matrix-table__cell"],
                        css["Matrix-table__cell-data"],
                        isHoveredRowId === rowId &&
                          css["Matrix-table__cell-data_percentage"],
                      )}
                      style={customStyle(rowId, cell.id, i)}
                      onClick={() => increaseCellNumber(cell.id)}
                      onMouseOver={() =>
                        handleCellMouseOver(cell.id, cell.amount)
                      }
                      onMouseLeave={handleCellMouseLeave}
                    >
                      {isHoveredCell && isHoveredRowId === rowId
                        ? sumPercentArray[i]
                        : cell.amount}
                    </div>
                  ))}
                  <div
                    key={rowId}
                    className={cn(
                      css["Matrix-table__cell"],
                      css["Matrix-table__sum-cell"],
                    )}
                    onMouseOver={() =>
                      handleSumCellMouseOver(
                        matrixRowsSum[index],
                        matrixData[index],
                        rowId,
                      )
                    }
                    onMouseLeave={handleSumCellMouseLeave}
                  >
                    {matrixRowsSum[index]}
                  </div>
                </div>
              ))}
              <Row>
                {matrixColsAvg.map((item, index) => (
                  <span
                    key={index}
                    className={cn(
                      css["Matrix-table__cell"],
                      css["Matrix-table__avg-cell"],
                      isHoveredAvgSumCell && css["Matrix-table__cell-data"],
                      isHoveredAvgSumCell &&
                        css["Matrix-table__cell-data_percentage"],
                    )}
                    style={
                      {
                        "--percent": isHoveredAvgSumCell
                          ? avgSumPercentArray[index]
                          : "0%",
                      } as CSSProperties
                    }
                  >
                    {isHoveredAvgSumCell ? avgSumPercentArray[index] : item}
                  </span>
                ))}
                <span
                  className={cn(
                    css["Matrix-table__cell"],
                    css["Matrix-table__avg-cell"],
                  )}
                  onMouseEnter={() => handleAvgSumCellMouseEnter(matrixColsAvg)}
                  onMouseLeave={handleSumCellMouseLeave}
                >
                  {matrixColsAvg.reduce((accum, curr) => (accum += curr), 0)}
                </span>
              </Row>
            </Row>
          </div>
          <Col className={css["Matrix-table__delete-row-icons"]}>
            {matrixRowsIds.map((id, index) => (
              <span key={id} onClick={() => handleDeleteRow(id, index)}>
                &#10007;
              </span>
            ))}
            <span />
          </Col>
        </section>
      </div>
    )
  );
};
