import React, { ChangeEvent, useState } from 'react';
import { Avatar, Space, Switch } from 'antd';
import { getProps } from '../../util/Props.util';
import { PropsIGeneric } from '../../types/types.export';
import { getColumnRowFromEvent, isValidColumn } from '../../util/Position.util';
import InLabel from './Label';

import { objectLocalStorage, updateLocalStorageObject } from '../../util/LocalStorage.util';
import { openNotificationWithIcon } from '../../util/Message.util';
import { buttonRemove } from '../../assets/styles/styles';
import { UnorderedListOutlined } from '@ant-design/icons';

const InSwitch: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<boolean>((typeof body === 'boolean') ? body : false);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

    const onChangeSwitch = (checked: boolean) => {
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
            const newValue: any = checked;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else openNotificationWithIcon();
    };

    return (
        <div className='container-in-switchs'>
            <Space direction="vertical">
                <InLabel setEvent={setEvent} text={label} />
                <Switch
                    value={value}
                    onChange={onChangeSwitch}
                    checkedChildren="activo"
                    unCheckedChildren="desactivo" defaultChecked />
            </Space>
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

export default InSwitch;