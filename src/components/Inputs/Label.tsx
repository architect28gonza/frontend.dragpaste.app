import React, { ChangeEvent, useState } from "react";
import { labelTextStyle } from "../../../public/css/styles";
import { objectLocalStorage, updateLocalStorageObject } from "../../local.storage";
import { getColumnRowFromEvent, isValidColumn } from "../../position.element";

interface InLabelProps {
    text: string;
    setEvent: (e: ChangeEvent<HTMLInputElement>) => void
}

const InLabel: React.FC<InLabelProps> = ({ text, setEvent }) => {
    const defaultLabelText = "Texto label";
    const [label, setLabel] = useState<string>(text ?? defaultLabelText);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {        
        const { column, row } = getColumnRowFromEvent(e);

        if (isValidColumn(column)) {
            const objectElement = objectLocalStorage(row, column);
            if (objectElement !== null) {
                const updatedLabel = e.target.value.toUpperCase();
                objectElement.label = updatedLabel;
                updateLocalStorageObject(objectElement, row, column);
                setLabel(updatedLabel);
                setEvent(e)                
            } else {
                console.error("Error label: No se pudo obtener el objeto de la lista.");
            }
        }
    };

    const handleClick = () => {
        setLabel(""); // Para limpiar el campo de texto al hacer clic
    };

    return (
        <div className="container-label">
            <input
                type="text"
                style={labelTextStyle}
                value={label}
                onClick={handleClick}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default InLabel;
