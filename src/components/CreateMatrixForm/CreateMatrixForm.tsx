import React from "react";

import { 
    Typography, 
    Space, 
    List, 
    InputNumber, 
    Button 
} from "antd";

import { listData } from "./listData";

import css from "./CreateMatrixForm.module.css";

const { Title } = Typography;

interface Props {
    defaultValue: number;
    handleInput: (e: number | null, id: string) => void;
    submitCreateMatrix: () => void
}

export const CreateMatrixForm = ({ defaultValue, handleInput, submitCreateMatrix }: Props) => {
    return (
        <Space className={css["CreateMatrixForm"]}>
            <Title>
                Matrix Builder
            </Title>
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
                            defaultValue={defaultValue}
                            onChange={(e) => handleInput(e, Object.keys(item)[0])}
                            className={css["CreateMatrixForm-list__item-input"]}
                        />
                    </List.Item>
                )}
                />
                <Button type="primary" onClick={submitCreateMatrix} className={css["CreateMatrixForm-btn"]}>
                    Create matrix
                </Button>
            </Space>
        </Space>
    );
};
