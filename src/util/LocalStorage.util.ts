
import { ElementComponentType, IColumnRow, PositionType } from "../types/types.export";

export const KEY_LOCALSTORAGE: string = 'elementsForm';
export const KEY_POSITION: string = 'position'

const getLocalStorage = (): Storage => window.localStorage;

export const isEmptyLocalStorage = (): boolean => {
    return getLocalStorage().getItem(KEY_LOCALSTORAGE) === null;
}

export const addLocalStorage = (lstElements: ElementComponentType[]): void => {
    getLocalStorage().setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements));
}

export const addUpdateLocalStorage = (object: PositionType, row: number, column: number): void => {
    if (!isEmptyLocalStorage()) {
        const localStorage = getLocalStorage();
        const lstElements: ElementComponentType[] = JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE)!);

        if (lstElements[column]) {
            lstElements[column].element[row] = object;
            localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements));

        } else console.error('El índice especificado está fuera de los límites del array');
    } else console.error('No existe el objeto en localStorage');
}

export const updateLocalStorageObject = (object: PositionType, row: number, column: number): void => {
    const localStorage = getLocalStorage();
    const lstElement = localStorage.getItem(KEY_LOCALSTORAGE);

    if (lstElement !== null) {
        const lstElements: ElementComponentType[] = JSON.parse(lstElement);

        if (lstElements[column]) {
            const updatedElement = {
                ...lstElements[column].element[row],
                ...object
            };
            lstElements[column].element[row] = updatedElement;
            localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements));

        } else console.error('El índice especificado está fuera de los límites del array');
    }
}

export const listLocalStorage = (): ElementComponentType[] => {
    const lstElement = getLocalStorage().getItem(KEY_LOCALSTORAGE);
    return lstElement ? JSON.parse(lstElement) : [];
}

export const objectLocalStorage = (row: number, column: number): PositionType | null => {
    const lstElement = getLocalStorage().getItem(KEY_LOCALSTORAGE);

    if (lstElement) {
        try {
            const lstElements: ElementComponentType[] = JSON.parse(lstElement);
            if (lstElements[column]?.element[row]) {
                return lstElements[column].element[row];
            }
        } catch (error) {
            console.error("Error al parsear los elementos del localStorage", error);
        }
    }
    return null;
}


// localStorageUtils.js
const setItemWithEvent = (key: any, value: any) => {
    localStorage.setItem(key, value);
    const event = new CustomEvent('localStorageModified', {
        detail: {
            key,
            value
        }
    });
    window.dispatchEvent(event);
};


export const deleteFromLocalStorage = ({ row, column }: IColumnRow): void => {
    if (isEmptyLocalStorage()) {
        console.error('No existe el objeto en localStorage');
        return;
    }

    const localStorage = getLocalStorage();
    const lstElements: ElementComponentType[] = JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE)!);

    if (!lstElements[column]) {
        console.error('El índice de columna especificado está fuera de los límites del array');
        return;
    }

    if (!lstElements[column].element[row]) {
        console.error('El índice de fila especificado está fuera de los límites del array');
        return;
    }

    // Elimina el elemento en la fila especificada
    lstElements[column].element.splice(row, 1);

    // Elimina la columna si ya no tiene elementos
    if (lstElements[column].element.length === 0) {
        lstElements.splice(column, 1);
    }

    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements));
    // localStorage.setItem(KEY_POSITION, JSON.stringify({ row, column }));
    setItemWithEvent(KEY_POSITION, JSON.stringify({ row, column }))
    console.log('Elemento eliminado correctamente');
}
