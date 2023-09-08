import React, { useState } from "react";

import { CreateMatrixForm, Matrix } from "./components";

import "./assets/reset.css";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <CreateMatrixForm setIsSubmitted={setIsSubmitted} />
      {isSubmitted && <Matrix />}
    </>
  );
}

export default App;
