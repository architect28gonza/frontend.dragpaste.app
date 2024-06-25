import { useState } from "react"
import { ColumnType, ElementComponentType } from "../../types/types.export";
import { api } from "../../assets";
import { listLocalStorage } from "../../util/LocalStorage.util";
import { v4 } from "uuid";

export const ContentLogic = () => {

    const [columnsElement, setColumnsElement] = useState<ColumnType[]>(api.columns);

    const NAME_BUTTON: string = 'Recuperar formulario';

    const onClickForm = () => {
        const elements: ElementComponentType[] = listLocalStorage();
        setUpdateElementView(elements);
    };

    const setUpdateElementView = (elements: ElementComponentType[]) => {
        const updateColumns = (prevColumns: ColumnType[]) => {
            const updatedColumns = [...prevColumns];
            elements.forEach(item => updateColumnsForItem(item, updatedColumns));
            return updatedColumns;
        };

        const updateColumnsForItem = (item: ElementComponentType, updatedColumns: ColumnType[]) => {
            const filas = item.element;
            if (filas.length !== 0) {
                filas.forEach(elementItem => {
                    if (elementItem !== null) {
                        updateColumnTasks(elementItem, updatedColumns);
                    }
                });
            }
        };

        const updatedContent = (props: any, propsComponent: any, element: any) => element.content({ ...props, propsComponent });

        const updateColumnTasks = (elementItem: any, updatedColumns: ColumnType[]) => {
            const { final_column, final_row, key, label, body } = elementItem;
            updatedColumns[0].tasks.forEach(element => {
                if (key === element.key) {
                    const propsComponent = {
                        label: { value: label },
                        body: { value: body },
                        row: final_row,
                        column: final_column
                    };
                    const updatedElement = {
                        ...element,
                        id: v4(),
                        content: (props: any) => updatedContent(props, propsComponent, element)
                    };
                    updatedColumns[final_column].tasks.splice(final_row, 0, updatedElement);
                }
            });
        };
        setColumnsElement(prevColumns => updateColumns(prevColumns));
    };

    return {
        onClickForm,
        nameButton : NAME_BUTTON,
        columnsElement
    }
}