import React, { ChangeEvent, useState } from 'react';
import InLabel from './Label';

import { Input } from 'antd';
import { inputStyle } from '../../../public/css/styles';
import { getProps } from '../../props';
import { PropsIGeneric } from '../../types/types.export';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';
import { openNotificationWithIcon } from '../../util/Message.alert';
const { TextArea } = Input;

const InTextArea: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<string>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }

        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - TextArea");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = e.target.value;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
    };

    return (
        <div className='container-in-textarea'>
            <InLabel setEvent={setEvent} text={label} />
            <TextArea
                value={value}
                placeholder="Ingrese su descripcion"
                style={inputStyle} allowClear onChange={onChange} />
        </div>
    )
}

export default InTextArea;