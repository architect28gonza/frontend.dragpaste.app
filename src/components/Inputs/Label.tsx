import { ChangeEvent, useState } from "react";
import { labelTextStyle } from "../../../public/css/styles";
import { objectLocalStorage, updateLocalStorageObject } from "../../local.storage";

interface ColumnRow {
    column: number;
    row: number;
}

const InLabel: React.FC = () => {
    const [label, setLabel] = useState<string>("Texto label");
    const [position, setPosition] = useState<string>("X");

    const handlerLabel = (e: ChangeEvent<HTMLInputElement>): ColumnRow => {
        let column = -1;
        let row = -1;
        try {
            const elementColumn = e.target.closest('[id^="column_"]');
            if (elementColumn) {
                column = parseInt(elementColumn.id.split('_')[1], 10);
                const closestRow = e.target.closest('[id^="row_"]');
                if (closestRow) {
                    row = parseInt(closestRow.id.split('_')[1], 10);
                }
            }
        } catch (error) {
            console.error("No se puede obtener la columna o la fila del componente", error);
        }
        return { column, row };
    };

    const isValidPosition = (column: number): boolean => column > 0;

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { column, row } = handlerLabel(e);
        if (isValidPosition(column)) {
            const objectElement = objectLocalStorage(row, column);
            if (objectElement !== null) {
                objectElement.label = e.target.value.toUpperCase();
                updateLocalStorageObject(objectElement, row, column)
                setLabel(objectElement.label)
                setPosition(`M:${column}:${row}`)
            } else console.error("Error, NO se puede obtener el objecto de la lista");
        }
    }

    return (
        <div className="container-label">
            <input
                data-position={position}
                className="label-text-global"
                name="label"
                type="text"
                style={labelTextStyle}
                value={label}
                onClick={() => setLabel("")}
                onChange={(e) => handlerChange(e)}
            />
        </div>
    );
};

export default InLabel;
