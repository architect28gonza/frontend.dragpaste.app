import React, { ChangeEvent, useState } from 'react';
import { TimePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { inputStyle } from '../../../public/css/styles';
import InLabel from './Label';
import { PropsIGeneric } from '../../types/types.export';
import { getProps } from '../../props';
import LOG from 'loglevel';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';

dayjs.extend(customParseFormat);

const InTimer: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<any>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement> | any>(undefined);

    const onChangeTimer: TimePickerProps['onChange'] = (_, timeString) => {
        if ((event === undefined) && (!isPositionNegative())) {
            LOG.error('El evento está vacío o la posición es negativa - Date')
            return;
        }

        let indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        let indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            LOG.error("La columna no es válida - Date");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = timeString;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else LOG.error("Error: No se pudo obtener el objeto de la lista - Date");
    };

    return (
        <div className='container-in-timer'>
            <InLabel setEvent={setEvent} text={label} />
            <TimePicker style={inputStyle}
                onChange={onChangeTimer}
                value={dayjs(value, 'HH:mm:ss')}
                placeholder='HH:mm:ss'
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
        </div>

    )
}

export default InTimer;