const calculateColAvg = (
  matrixValues: { id: string | number; amount: number }[][],
  rows: number,
) => {
  const colsSums = [];
  const colsAvg = [];

  for (let i = 0; i < matrixValues[0].length; i++) {
    let colSum = 0;
    for (let j = 0; j < matrixValues.length; j++) {
      colSum += matrixValues[j][i].amount;
    }
    colsSums.push(colSum);
    colsAvg.push(Math.round(colSum / rows));
  }
  return [colsSums, colsAvg];
};

export default calculateColAvg;
