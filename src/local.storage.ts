import { ElementComponentType, PositionType } from "./types/types.export";

export const KEY_LOCALSTORAGE: string = 'elementsForm';

export const addlocalStorage = (lstElements: ElementComponentType[]) => {
    window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements))
}

export const updateLocalStorageObject = (object: PositionType, row: number, column: number): void => {
    const { localStorage } = window;
    const lstElement = localStorage.getItem(KEY_LOCALSTORAGE);
    if (lstElement !== null) {
        const lstElements: ElementComponentType[] = JSON.parse(lstElement);
        lstElements[column].element[row] = object;
        window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements))
    }
}

export const listLocalStorage = (): ElementComponentType[] => {
    const { localStorage } = window
    const lstElement = localStorage.getItem(KEY_LOCALSTORAGE);
    if (lstElement !== null) {
        return JSON.parse(lstElement);
    }
    return [];
}

export const objectLocalStorage = (row: number, column: number): PositionType | null => {
    const { localStorage } = window;
    const lstElement = localStorage.getItem(KEY_LOCALSTORAGE);
    if (lstElement !== null) {
        try {
            const lstElements: ElementComponentType[] = JSON.parse(lstElement);
            if (lstElements[column] && lstElements[column].element[row]) {
                return lstElements[column].element[row];
            }
        } catch (error) {
            console.error("Error al parsear los elementos del localStorage", error);
        }
    }
    return null;
};
