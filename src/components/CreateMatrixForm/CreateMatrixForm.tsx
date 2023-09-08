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
import calculateRowSum from "./calculateRowSum";
import calculateColAvg from "./calculateColAvg";

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

  const handleInput = (e: number | null, id: string) => {
    const value: number = e ? e : 0;

    switch (id) {
      case "columns":
        setIsSubmitted(false);
        setColsVal([id, value]);
        break;
      case "rows":
        setIsSubmitted(false);
        setRowsVal([id, value]);
        break;
      case "cells":
        dispatch(initCellsAmount(value));
        break;
    }
  };

  const submitCreateMatrix = () => {
    const cols = +colsVal[1];
    const rows = +rowsVal[1];
    const matrixValues = generateMatrixValues(cols, rows);
    const rowsSums = calculateRowSum(matrixValues);
    const [colsSums, colsAvg] = calculateColAvg(matrixValues, rows);
    const rowsIds = [];

    for (let i = 0; i < rows; i++) {
      rowsIds.push(uuidv4());
    }

    dispatch(initColumnsAmount(cols));
    dispatch(initRowsAmount(rows));
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
                min={item.cells ? 0 : 1}
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
