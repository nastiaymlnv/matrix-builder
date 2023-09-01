import React, { useState } from "react";

import { CreateMatrixForm, Matrix } from "./components";

import "./assets/reset.css";

interface RootState {
  matrixDimension: {
    rows: number;
    cols: number;
    cells: number;
  };
  matrixData: { id: number | string; amount: number }[][];
}

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <CreateMatrixForm setIsSubmitted={setIsSubmitted} />
      {isSubmitted === true && <Matrix />}
    </>
  );
}

export default App;
