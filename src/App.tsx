import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateMatrixForm } from "./components";

import {
  setColumnsAmount,
  setRowsAmount,
  setCellsAmount,
} from "./reducers/matrixDimension";

import "./assets/reset.css";
// import css from "./App.module.css";

interface RootState {
  matrixDimension: {
    rows: number;
    cols: number;
    cells: number;
  };
}

function App() {
  const dispatch = useDispatch();
  const {cols, rows, cells} = useSelector((state: RootState) => state.matrixDimension);

  const [inputValue, setInputValue] = useState<number>(1);
  const [inputValueId, setInputValueId] = useState<string | null>("");

  const handleInput = (e: number | null, id: string) => {
    const value: number = e ? e : 1;
    setInputValue(value);
    setInputValueId(id);

    switch (id) {
      case "columns":
        dispatch(setColumnsAmount(value));
        break;
      case "rows":
        dispatch(setRowsAmount(value));
        break;
      case "cells":
        dispatch(setCellsAmount(value));
        break;
    }
  };

  const submitCreateMatrix = () => {
    console.log(cols, rows, cells);
  }

  return (
    <>
      <CreateMatrixForm 
        defaultValue={inputValue} 
        handleInput={handleInput} 
        submitCreateMatrix={submitCreateMatrix}
      />
    </>
  );
}

export default App;
