import { FC } from 'react';
import { Avatar, Space, Switch } from 'antd';
import { PropsIGeneric } from '../../types/types.export';
import InLabel from './Label';
import { buttonRemove } from '../../assets/styles/styles';
import { DeleteOutlined } from '@ant-design/icons';
import useEventHandling from '../../hooks/useEventHandling';
import { deleteFromLocalStorage } from '../../util/LocalStorage.util';

const InSwitch: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);
    const onChangeSwitch = (checked: boolean) => handleEventChange(checked);

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
                    onClick={() => deleteFromLocalStorage(position)}
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />} />
            </Space>
        </div>
    )
}

export default InSwitch;