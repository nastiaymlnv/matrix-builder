const calculateRowSum = (
  matrixValues: { id: string | number; amount: number }[][],
) => {
  const rowsSums = [];

  for (let i = 0; i < matrixValues.length; i++) {
    let rowSum = 0;
    for (let j = 0; j < matrixValues[0].length; j++) {
      rowSum += matrixValues[i][j].amount;
    }
    rowsSums.push(rowSum);
  }
  return rowsSums;
};

export default calculateRowSum;
