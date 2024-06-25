import { Avatar, Input, Space } from "antd";
import React, { ChangeEvent, useState } from "react";
import { buttonRemove, inputStyle } from "../../assets/styles/styles";
import { PropsIGeneric } from "../../types/types.export";
import InLabel from "./Label";
import { getColumnRowFromEvent, isValidColumn } from "../../util/Position.util";
import { objectLocalStorage, updateLocalStorageObject } from "../../util/LocalStorage.util";

import { getProps } from "../../util/Props.util";
import { openNotificationWithIcon } from "../../util/Message.util";

import { UnorderedListOutlined } from '@ant-design/icons';

const InInputText: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<string>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

    /**
     * Maneja el cambio de entrada en un campo de texto.
     * 
     * @param {ChangeEvent<HTMLInputElement>} e - Evento de cambio que contiene el nuevo valor del campo de entrada.
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }

        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - Input");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = e.target.value;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
    };

    return (
        <div className="container-in-input">
            <InLabel setEvent={setEvent} text={label} />
            <Input
                value={value}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Digite campo de texto"
            />
            <Space size={16} wrap>
                <Avatar style={buttonRemove} 
                    onClick={() => alert("asdadasdasdasd")}
                    shape="circle" 
                    size="small" 
                    icon={<UnorderedListOutlined />} />
            </Space>
        </div>
    );
};

export default InInputText;
