import React, { ChangeEvent, useState } from "react";
import { labelTextStyle } from "../../../public/css/styles";
import { objectLocalStorage, updateLocalStorageObject } from "../../local.storage";
import { getColumnRowFromEvent, isValidColumn } from "../../position.element";
import LOG from 'loglevel';

interface InLabelProps {
    text: string;
    setEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InLabel: React.FC<InLabelProps> = ({ text, setEvent }) => {

    const defaultLabelText = "Texto label";
    const [label, setLabel] = useState<string>(text || defaultLabelText);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { column, row } = getColumnRowFromEvent(e);

        if (!isValidColumn(column)) return;

        const objectElement = objectLocalStorage(row, column);
        if (!objectElement) {
            LOG.error("Error label: No se pudo obtener el objeto de la lista.");
            return;
        }

        const updatedLabel = e.target.value.toUpperCase();
        objectElement.label = updatedLabel;
        updateLocalStorageObject(objectElement, row, column);
        setLabel(updatedLabel);
        setEvent(e);
    };

    const handleClick = (): void => {
        setLabel("");
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
