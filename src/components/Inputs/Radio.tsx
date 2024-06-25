import React, { ChangeEvent, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { PropsIGeneric } from '../../types/types.export';
import { getProps } from '../../props';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';

import InLabel from './Label';
import { openNotificationWithIcon } from '../../util/Message.alert';

const InRadio: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<boolean>((typeof body !== 'string') ? body : false);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

    const onChangeRadio = (e: RadioChangeEvent) => {
        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }

        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - Switch");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue: any = e.target.value;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
    };

    return (

        <div className='container-in-radio'>
            <InLabel setEvent={setEvent} text={label} />
            <Radio.Group onChange={onChangeRadio} value={value}>
                <Radio value={true}>SI</Radio>
                <Radio value={false}>NO</Radio>
            </Radio.Group>
        </div>
    )
}

export default InRadio;
