import React, { ChangeEvent, useState } from 'react';
import InLabel from './Label';

import { Avatar, Input, Space } from 'antd';
import { buttonRemove, inputStyle } from '../../assets/styles/styles';
import { getProps } from '../../util/Props.util';
import { PropsIGeneric } from '../../types/types.export';
import { getColumnRowFromEvent, isValidColumn } from '../../util/Position.util';
import { objectLocalStorage, updateLocalStorageObject } from '../../util/LocalStorage.util';
import { openNotificationWithIcon } from '../../util/Message.util';
import { UnorderedListOutlined } from '@ant-design/icons';

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

export default InTextArea;