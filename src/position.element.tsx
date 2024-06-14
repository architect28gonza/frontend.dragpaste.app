import { ChangeEvent } from "react";

interface ColumnRow {
    column: number;
    row: number;
}

export const getColumnRowFromEvent = (e: ChangeEvent<HTMLInputElement>): ColumnRow => {
    let column = -1;
    let row = -1;    
    try {
        const closestRow = e.target.closest('[id^="row_"]');
        if (closestRow) {
            row = parseInt(closestRow.id.split('_')[1], 10);
        }

        const elementColumn = e.target.closest('[id^="column_"]');
        if (elementColumn) {
            column = parseInt(elementColumn.id.split('_')[1], 10);
        }
    } catch (error) {
        console.error("Error al obtener la columna o fila del componente", error);
    }
    return { column, row };
};



export const isValidColumn = (column: number): boolean => column > 0;