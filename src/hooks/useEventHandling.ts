import { ChangeEvent, useState } from 'react';
import { getProps } from '../util/Props.util';
import { openNotificationWithIcon } from '../util/Message.util';
import { getColumnRowFromEvent, isValidColumn } from '../util/Position.util';
import { objectLocalStorage, updateLocalStorageObject } from '../util/LocalStorage.util';
import { IColumnRow } from '../types/types.export';

const useEventHandling = (propsComponent: any) => {
    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<any>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();
    const [position, setPosition] = useState<IColumnRow>({ row, column });

    const handleEventChange = (data: any) => {
        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }
        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;
        setPosition({ row: indexRow, column: indexColumn })

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida");
            return;
        }
        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = data;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
    };

    return { label, value, setEvent, handleEventChange, position };
};

export default useEventHandling;
