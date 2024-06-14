import { ElementComponentType, PositionType } from "./types/types.export";

export const KEY_LOCALSTORAGE: string = 'elementsForm';


export const isEmptyLocalStorage = (): boolean => {
    const { localStorage } = window
    const localStorageObject = localStorage.getItem(KEY_LOCALSTORAGE);
    return (localStorageObject === null);
}

export const addlocalStorage = (
    lstElements: ElementComponentType[]
) => {
    const { localStorage } = window;
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements));
}

export const addUpdateLocalStorage = (object: PositionType, row: number, column: number): void => {
    if (!isEmptyLocalStorage()) {
        const { localStorage }: any = window;
        const lstElement = [...JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE))];
        lstElement[column].element.splice(row, 1, object); /*Actualizar entorno de localStorage */
        localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElement));

    } else console.log('No existe el objeto en localStorage');
}

export const updateLocalStorageObject = (object: PositionType, row: number, column: number): void => {
    const { localStorage } = window;
    const lstElement = localStorage.getItem(KEY_LOCALSTORAGE);

    if (lstElement !== null) {
        let lstElements: ElementComponentType[] = JSON.parse(lstElement);

        // Crear una copia del objeto que deseas actualizar
        const updatedElement = {
            ...lstElements[column].element[row],
            ...object
        };

        // Actualizar el elemento en lstElements
        lstElements = lstElements.map((item, idx) => {
            if (idx === column) {
                return {
                    ...item,
                    element: item.element.map((el, r) => (r === row ? updatedElement : el))
                };
            }
            return item;
        });
        localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements));
    }
};

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
