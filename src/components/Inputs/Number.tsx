import InLabel from './Label';
import LOG from 'loglevel';

import React, { ChangeEvent, useState } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { inputStyle } from '../../../public/css/styles';
import { getProps } from '../../props';
import { PropsIGeneric } from '../../types/types.export';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';

const InNumber: React.FC<PropsIGeneric> = ({ propsComponent })  => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<any>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement> | any>(undefined);


    const onChangeNumber: InputNumberProps['onChange'] = (valueNumber) => {
        if ((event === undefined) && (!isPositionNegative())) {
            LOG.error('El evento está vacío o la posición es negativa - Number')
            return;
        }
    
        let indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        let indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;
    
        if (!isValidColumn(indexColumn)) {
            LOG.error("La columna no es válida - Number");
            return;
        }
    
        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = valueNumber;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else LOG.error("Error: No se pudo obtener el objeto de la lista - Number");
    };
    

    return (
        <div className='container-in-number'>
            <InLabel setEvent={setEvent} text={label} />
            <InputNumber 
                value={value}
                style={inputStyle} 
                placeholder="0123456789"
                onChange={onChangeNumber} />
        </div>
    )
}


export default InNumber;