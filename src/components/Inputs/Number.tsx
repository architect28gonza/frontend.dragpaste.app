import InLabel from './Label';


import React, { ChangeEvent, useState } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { inputStyle } from '../../../public/css/styles';
import { getProps } from '../../props';
import { PropsIGeneric } from '../../types/types.export';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';
import { openNotificationWithIcon } from '../../util/Message.alert';

const InNumber: React.FC<PropsIGeneric> = ({ propsComponent })  => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<any>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();


    const onChangeNumber: InputNumberProps['onChange'] = (valueNumber) => {
        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }
    
        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;
    
        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - Number");
            return;
        }
    
        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = valueNumber;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
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