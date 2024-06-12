import { ElementComponentType } from "./types/types.export";

export const KEY_LOCALSTORAGE: string = 'elementsForm';

export const addlocalStorage = (lstElements: ElementComponentType[]) => {
    window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(lstElements))
}

export const listLocalStorage = (): ElementComponentType[] => {
    const { localStorage } = window
    const lstElement = localStorage.getItem(KEY_LOCALSTORAGE);
    if (lstElement !== null) {
        return JSON.parse(lstElement);
    }
    return [];
}