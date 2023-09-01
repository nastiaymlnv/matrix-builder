import { v4 as uuidv4 } from "uuid";

const generateMatrixValues = (cols: number, rows: number) => {
  const randomArray = Array.from(
    { length: cols * rows },
    () => Math.floor(Math.random() * 899) + 100,
  );
  const refactoredArray = modifyArrayData(randomArray);
  const matrix = listToMatrix(refactoredArray, cols, rows);

  return matrix;
};

const modifyArrayData = (Array: number[]) => {
  const newArray = [];

  for (let i = 0; i < Array.length; i++) {
    newArray.push({
      id: uuidv4(),
      amount: Array[i],
    });
  }

  return newArray;
};

const listToMatrix = (
  array: { id: number | string; amount: number }[],
  cols: number,
  rows: number,
) => {
  const matrix = [];

  if (rows * cols === array.length) {
    for (let i = 0; i < array.length; i += cols) {
      matrix.push(array.slice(i, cols + i));
    }
  }

  return matrix;
};

export default generateMatrixValues;
