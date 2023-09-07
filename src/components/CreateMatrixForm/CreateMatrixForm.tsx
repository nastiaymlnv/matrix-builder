import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { Typography, Space, List, InputNumber, Button } from "antd";

import {
  initColumnsAmount,
  initRowsAmount,
  initCellsAmount,
} from "../../reducers/matrixDimension";

import { initMatrixData, initMatrixRowsIds } from "../../reducers/matrixData";

import generateMatrixValues from "../../helpers/generateMatrixValues";

import { listData } from "./listData";

import css from "./CreateMatrixForm.module.css";

const { Title } = Typography;

interface Props {
  setIsSubmitted: (value: boolean) => void;
}

export const CreateMatrixForm = ({ setIsSubmitted }: Props) => {
  const dispatch = useDispatch();

  const [colsVal, setColsVal] = useState<(string | number)[]>([]);
  const [rowsVal, setRowsVal] = useState<(string | number)[]>([]);
  const [cellsVal, setCellsVal] = useState<(string | number)[]>([]);

  const handleInput = (e: number | null, id: string) => {
    const value: number = e ? e : 1;
    setIsSubmitted(false);

    switch (id) {
      case "columns":
        setColsVal([id, value]);
        break;
      case "rows":
        setRowsVal([id, value]);
        break;
      case "cells":
        setCellsVal([id, value]);
        break;
    }
  };

  const submitCreateMatrix = () => {
    const cols = +colsVal[1];
    const rows = +rowsVal[1];
    const cells = +cellsVal[1];
    const matrixValues = generateMatrixValues(cols, rows);
    const rowsIds = [];
    const rowsSums = [];
    const colsSums = [];
    const colsAvg = [];

    for (let i = 0; i < rows; i++) {
      rowsIds.push(uuidv4());
    }

    for (let i = 0; i < matrixValues.length; i++) {
      let rowSum = 0;
      for (let j = 0; j < matrixValues[0].length; j++) {
        rowSum += matrixValues[i][j].amount;
      }
      rowsSums.push(rowSum);
    } 

    for (let i = 0; i < matrixValues[0].length; i++) {
      let colSum = 0;
      for (let j = 0; j < matrixValues.length; j++) {
        colSum += matrixValues[j][i].amount;
      }
      colsSums.push(colSum);
      colsAvg.push(Math.round(colSum / rows));
    } 

    dispatch(initColumnsAmount(cols));
    dispatch(initRowsAmount(rows));
    dispatch(initCellsAmount(cells));
    dispatch(initMatrixData([matrixValues, rowsSums, colsSums, colsAvg]));
    dispatch(initMatrixRowsIds(rowsIds));

    setIsSubmitted(true);
  };

  return (
    <Space className={css["CreateMatrixForm"]}>
      <Title>Matrix Builder</Title>
      <Space className={css["CreateMatrixForm-container"]}>
        <List
          bordered
          dataSource={listData}
          renderItem={(item) => (
            <List.Item>
              <Typography>{Object.values(item)}</Typography>
              <InputNumber
                min={1}
                max={100}
                onChange={(e) => handleInput(e, Object.keys(item)[0])}
                className={css["CreateMatrixForm-list__item-input"]}
              />
            </List.Item>
          )}
        />
        <Button
          type="primary"
          onClick={submitCreateMatrix}
          className={css["CreateMatrixForm-btn"]}
        >
          Create matrix
        </Button>
      </Space>
    </Space>
  );
};
