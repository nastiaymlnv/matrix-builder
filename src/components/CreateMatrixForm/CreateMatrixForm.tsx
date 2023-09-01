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
    const matrixValues = generateMatrixValues(+colsVal[1], +rowsVal[1]);
    const rowsIds = [];

    for (let i = 0; i < +rowsVal[1]; i++) {
      rowsIds.push(uuidv4());
    }

    dispatch(initColumnsAmount(+colsVal[1]));
    dispatch(initRowsAmount(+rowsVal[1]));
    dispatch(initCellsAmount(+cellsVal[1]));
    dispatch(initMatrixData(matrixValues));
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
