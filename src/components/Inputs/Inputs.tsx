import { Input } from "antd";
import React, { ChangeEvent, useState } from "react";
import { inputStyle } from "../../../public/css/styles";
import { PropsIGeneric } from "../../types/types.export";
import InLabel from "./Label";
import { getColumnRowFromEvent, isValidColumn } from "../../position.element";
import { objectLocalStorage, updateLocalStorageObject } from "../../local.storage";

import { getProps } from "../../props";
import { openNotificationWithIcon } from "../../util/Message.alert";

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
        </div>
    );
};

export default InInputText;
