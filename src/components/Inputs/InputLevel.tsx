import React, { ChangeEvent, useState } from 'react';
import InLabel from './Label';

import { Flex, Input } from 'antd';
import { PropsIGeneric } from '../../types/types.export';
import type { GetProp } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import { getProps } from '../../util/Props.util';
import { objectLocalStorage, updateLocalStorageObject } from '../../util/LocalStorage.util';
import { getColumnRowFromEvent, isValidColumn } from '../../util/Position.util';
import { openNotificationWithIcon } from '../../util/Message.util';
const { OTP: Otp } = Input

const InputLevel: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<string>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

    const onChange: GetProp<typeof Otp, 'onChange'> = (text) => {
        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }

        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - Input");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = text;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    return (
        <div className='container-in-input-otp'>
            <InLabel setEvent={setEvent} text={label} />
            <Flex gap="middle" align="flex-start" style={{ marginTop: 5, width: '90%' }} vertical>
                <Otp value={value} formatter={(str) => str.toUpperCase()} {...sharedProps} />
            </Flex>
        </div>
    );
};

export default InputLevel;