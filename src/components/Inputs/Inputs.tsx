import { Input } from "antd";
import React, { ChangeEvent, useState } from "react";
import { inputStyle } from "../../../public/css/styles";
import { PropsIGeneric } from "../../types/types.export";
import InLabel from "./Label";
import { getColumnRowFromEvent, isValidColumn } from "../../position.element";
import { objectLocalStorage, updateLocalStorageObject } from "../../local.storage";


const InInputText: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const labelValue: string | any = propsComponent?.label?.value;
    const bodyValue: string | any = propsComponent?.body?.value;
    
    const [value, setValue] = useState<string>(bodyValue);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (event !== undefined) {
            const { column, row } = getColumnRowFromEvent(event);
            if (isValidColumn(column)) {
                const objectElement = objectLocalStorage(row, column);
                if (objectElement !== null) {
                    const value = e.target.value.toUpperCase();
                    objectElement.body = value;
                    updateLocalStorageObject(objectElement, row, column);
                    setValue(value);
                } else {
                    console.error("Error: No se pudo obtener el objeto de la lista.");
                }
            }
        } else console.log("El evento se encuentra vacio");
    };

    return (
        <div className='container-in-input'>
            <InLabel setEvent={setEvent} text={labelValue} />
            <Input
                value={value}
                onChange={e => handleInputChange(e)}
                style={inputStyle}
                placeholder="Digite campo de texto" />
        </div>
    );
}

export default InInputText;
