import React, { ChangeEvent, useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import InLabel from './Label';

import { PropsIGeneric } from '../../types/types.export';
import { getProps } from '../../props';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';
import { openNotificationWithIcon } from '../../util/Message.alert';

const InPassword: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<string>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {

        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }

        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - Password");
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

    const showEye = (visible: boolean) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />

    return (
        <div className='container-in-password'>
            <InLabel setEvent={setEvent} text={label} />
            <Input.Password
                value={value}
                onChange={handlePasswordChange}
                style={{ marginTop: 5, width: '95%' }}
                placeholder="*************"
                iconRender={(visible) => showEye(visible)}
            />
        </div>
    );
};

export default InPassword;