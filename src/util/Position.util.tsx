import { ChangeEvent } from "react";
import { IColumnRow } from "../types/types.export";

export const getColumnRowFromEvent = (event: ChangeEvent<HTMLInputElement>): IColumnRow => {
    let column = -1;
    let row = -1;    
    if (event) {
        try {
            const closestRow = event.target.closest('[id^="row_"]');
            if (closestRow) {
                row = parseInt(closestRow.id.split('_')[1], 10);
            }
    
            const elementColumn = event.target.closest('[id^="column_"]');
            if (elementColumn) {
                column = parseInt(elementColumn.id.split('_')[1], 10);
            }
        } catch (error) {
            console.error("Error al obtener la columna o fila del componente", error);
        }
    }
    return { column, row };
};



export const isValidColumn = (column: number): boolean => column > 0;