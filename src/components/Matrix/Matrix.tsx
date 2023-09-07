import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import cn from "classnames";
import { v4 as uuidv4 } from "uuid";

import { Divider, Button, Row, Col } from "antd";

import generateMatrixValues from "../../helpers/generateMatrixValues";

import { decreaseRowAmount, increaseRowAmount } from "../../reducers/matrixDimension";
import { addNewRow, deleteRow, increaseCellAmount } from "../../reducers/matrixData";

import css from "./Matrix.module.css";

interface RootState {
    matrixDimension: {
        rows: number;
        cols: number;
        cells: number;
    };
    matrixData: {
        matrixValues: { id: number | string; amount: number }[][];
        matrixRowsIds: string[];
        matrixRowsSum: number[];
        matrixColsSum: number[];
        matrixColsAvg: number[];
    };
}

export const Matrix = () => {
    const dispatch = useDispatch();
    const rows = useSelector(
        (state: RootState) => state.matrixDimension.rows,
    );
    const cells = useSelector(
        (state: RootState) => state.matrixDimension.cells,
    );
    const matrixData = useSelector(
        (state: RootState) => state.matrixData.matrixValues,
    );
    const matrixRowsIds = useSelector(
        (state: RootState) => state.matrixData.matrixRowsIds,
    );
    const matrixRowsSum = useSelector(
        (state: RootState) => state.matrixData.matrixRowsSum,
    );
    const matrixColsSum = useSelector(
        (state: RootState) => state.matrixData.matrixColsSum,
    );
    const matrixColsAvg = useSelector(
        (state: RootState) => state.matrixData.matrixColsAvg,
    );
    const [nearestValues, setNearestValues] = useState([]);

    const handleAddRow = () => {
        const newRow = generateMatrixValues(matrixData[0].length, 1);
        
        let rowSum = 0
        const newColsSum = [];
        const newColsAvg = [];

        for (let i = 0; i < newRow[0].length; i++) {
            const colSum = matrixColsSum[i] + Number(newRow[0][i].amount);
            rowSum += newRow[0][i].amount;
            newColsSum.push(colSum);
            newColsAvg.push(Math.round(colSum / (rows + 1)))
        }

        const rowId = uuidv4();

        dispatch(addNewRow([newRow, rowId, rowSum, newColsSum, newColsAvg]));
        dispatch(increaseRowAmount(rows + 1));
    };

    const handleDeleteRow = (id: string, index: number) => {
        const deletedRow = [...matrixData].splice(index, 1)[0];

        const newColsSum = matrixColsSum.map((item, index) => {
            return item -= deletedRow[index].amount
        })

        const newColsAvg = newColsSum.map(item => {
            return item = Math.round(item / (rows - 1))
        })

        dispatch(deleteRow({ id, index, newColsSum, newColsAvg }));
        dispatch(decreaseRowAmount(rows - 1));
    }; 

    const increaseCellNumber = (id: string) => {
        let rowNum = 0;
        let currCell = null;
        let cellIndex = 0;
        
        for (let rows = 0; rows < matrixData.length; rows++) {
            for (let cell = 0; cell < matrixData[rows].length; cell++) {
                if (matrixData[rows][cell].id === id) {
                    rowNum = rows;
                    currCell = matrixData[rows][cell];
                    cellIndex = cell;
                }
            }
        }

        dispatch(increaseCellAmount([rowNum, cellIndex]));
    }

    const findNearestCellNumbers = (id: string, amount: number) => {
        const currValue = amount;
        const cellsValues = [].concat(...matrixData).filter(cell => cell.id !== id);

        cellsValues.sort((a, b) => {
            return Math.abs(currValue - a.amount) - Math.abs(currValue - b.amount);
        })

        return cellsValues.slice(0, cells);
    }

    const handleMouseEnter = (id: string, amount: number) => setNearestValues(findNearestCellNumbers(id, amount));

    const handleMouseLeave = () => setNearestValues([]);

    return (
        matrixData.length !== 0 && (
            <div className={css["Matrix"]}>
                <Divider />
                <Button
                    type="primary"
                    className={css["Matrix-btn"]}
                    onClick={handleAddRow}
                >
                    Add a row
                </Button>
                <section className={css["Matrix-table"]}>
                    <Col className={css["Matrix-table__row-titles"]}>
                        <span />
                        {matrixData.map((_, index) => (
                            <MatrixRowNumber key={index} row={index} />
                        ))}
                        <span> Avg </span>
                    </Col>
                    <div>
                        <Row className={css["Matrix-table__column-titles"]}>
                            {matrixData[0].map((_, index) => (
                                <MatrixColumnNumber key={index} col={index} />
                            ))}
                            <span> Sum </span>
                        </Row>
                        <Row className={css["Matrix-table__data"]}>
                            {matrixRowsIds.map((rowId, index) => (
                                <div key={rowId} className={css["Matrix-table__row"]}>
                                    { matrixData[index].map((item) => (
                                        <div 
                                            key={item.id} 
                                            className={cn(css["Matrix-table__cell"], css["Matrix-table__cell-data"])} 
                                            style={
                                                nearestValues.filter(cell => cell.id === item.id).length === 1 ? 
                                                {backgroundColor: 'rgb(255, 255, 0, 0.4)'} 
                                                : {}
                                            }
                                            onClick={() => increaseCellNumber(item.id)}
                                            onMouseEnter={() => handleMouseEnter(item.id, item.amount)}
                                            onMouseLeave={handleMouseLeave}>
                                            {item.amount}
                                        </div>
                                    ))}
                                    <div key={rowId} className={cn(css["Matrix-table__cell"], css["Matrix-table__sum-cell"])}>
                                        {matrixRowsSum[index]} 
                                    </div>
                                </div>
                            ))}
                            <Row>
                                {matrixColsAvg.map(item => (
                                    <span className={cn(css["Matrix-table__cell"], css["Matrix-table__avg-cell"])}>                                
                                        {item}
                                    </span>
                                ))} 
                                <span className={cn(css["Matrix-table__cell"], css["Matrix-table__avg-cell"])}> 
                                    { matrixColsAvg.reduce((accum, curr) => accum += curr, 0) }
                                </span>
                            </Row>
                        </Row>
                    </div>
                    <Col className={css["Matrix-table__delete-row-icons"]}>
                        {matrixRowsIds.map((id, index) => (
                            <span key={id} onClick={() => handleDeleteRow(id, index)}>                                
                                &#10007;
                            </span>
                        ))}
                        <span /> 
                    </Col>
                </section>
            </div>
        )
    );
};

const MatrixRowNumber: FC<{ row: number }> = ({ row }) => (
    <div> {row + 1} </div>
);

const MatrixColumnNumber: FC<{ col: number }> = ({ col }) => (
    <div> {col + 1} </div>
);
