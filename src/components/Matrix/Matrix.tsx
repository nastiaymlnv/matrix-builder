import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { Divider, Button, Row, Col } from "antd";

import generateMatrixValues from "../../helpers/generateMatrixValues";

import { addNewRow, deleteRow } from "../../reducers/matrixData";

import css from "./Matrix.module.css";

interface RootState {
  matrixDimension: {
    rows: number;
    cols: number;
    cells: number;
  };
  matrixData: {
    matrixValues: { id: number | string; amount: number }[][];
    matrixRowsIds: string[];
  };
}

export const Matrix = () => {
  const dispatch = useDispatch();
  const matrixData = useSelector(
    (state: RootState) => state.matrixData.matrixValues,
  );
  const matrixRowsIds = useSelector(
    (state: RootState) => state.matrixData.matrixRowsIds,
  );

  const handleAddRow = () => {
    const newRow = generateMatrixValues(matrixData[0].length, 1);
    dispatch(addNewRow([newRow, uuidv4()]));
  };

  const handleDeleteRow = (id: string, index: number) => {
    dispatch(deleteRow({ id, index }));
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
              <MatrixRowNumber key={index} row={index} />
            ))}
          </Col>
          <div>
            <Row className={css["Matrix-table__column-titles"]}>
              {matrixData[0].map((_, index) => (
                <MatrixColumnNumber key={index} col={index} />
              ))}
            </Row>
            <Row className={css["Matrix-table__data"]}>
              {matrixRowsIds.map((rowId, index) => (
                <div key={rowId} className={css["Matrix-table__row"]}>
                  {matrixData[index].map((item) => (
                    <div key={item.id} className={css["Matrix-table__column"]}>
                      {item.amount}
                    </div>
                  ))}
                </div>
              ))}
            </Row>
          </div>
          <Col className={css["Matrix-table__delete-row-icons"]}>
            <span />
            {matrixRowsIds.map((id, index) => (
              <span key={id} onClick={() => handleDeleteRow(id, index)}>
                {" "}
                &#10007;{" "}
              </span>
            ))}
          </Col>
        </section>
      </div>
    )
  );
};

const MatrixRowNumber: FC<{ row: number }> = ({ row }) => (
  <div> {row + 1} </div>
);

const MatrixColumnNumber: FC<{ col: number }> = ({ col }) => (
  <div> {col + 1} </div>
);
