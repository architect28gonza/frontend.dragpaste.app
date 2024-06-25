import React, { ChangeEvent, useState } from 'react';
import { Avatar, Space, TimePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { buttonRemove, inputStyle } from '../../assets/styles/styles';
import InLabel from './Label';
import { PropsIGeneric } from '../../types/types.export';
import { getProps } from '../../util/Props.util';

import { getColumnRowFromEvent, isValidColumn } from '../../util/Position.util';
import { objectLocalStorage, updateLocalStorageObject } from '../../util/LocalStorage.util';
import { openNotificationWithIcon } from '../../util/Message.util';
import { UnorderedListOutlined } from '@ant-design/icons';

dayjs.extend(customParseFormat);

const InTimer: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<any>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

    const onChangeTimer: TimePickerProps['onChange'] = (_, timeString) => {
        if ((!event) || (event === undefined) && (!isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }

        const indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        const indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - Date");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = timeString;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
    };

    return (
        <div className='container-in-timer'>
            <InLabel setEvent={setEvent} text={label} />
            <TimePicker style={inputStyle}
                onChange={onChangeTimer}
                value={dayjs(value, 'HH:mm:ss')}
                placeholder='HH:mm:ss'
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            <Space size={16} wrap>
                <Avatar style={buttonRemove}
                    onClick={() => alert("asdadasdasdasd")}
                    shape="circle"
                    size="small"
                    icon={<UnorderedListOutlined />} />
            </Space>
        </div>

    )
}

export default InTimer;