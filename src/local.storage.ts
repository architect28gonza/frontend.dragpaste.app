
import { ElementComponentType, PositionType } from "./types/types.export";

export const KEY_LOCALSTORAGE = 'elementsForm';

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
            if (lstElements[column]?.element[row]){
                return lstElements[column].element[row];
            }
        } catch (error) {
            console.error("Error al parsear los elementos del localStorage", error);
        }
    }
    return null;
}
