const findNearestCellNumbers = (
  id: string,
  amount: number,
  matrixData: { id: string; amount: number }[][],
  cells: number,
) => {
  const currValue = amount;
  const cellsValues = ([] as Array<{ id: string; amount: number }>)
    .concat(...matrixData)
    .filter((cell: { id: string; amount: number }) => cell.id !== id);

  cellsValues.sort(
    (a: { id: string; amount: number }, b: { id: string; amount: number }) => {
      return Math.abs(currValue - a.amount) - Math.abs(currValue - b.amount);
    },
  );

  return cellsValues.slice(0, cells);
};

export default findNearestCellNumbers;
