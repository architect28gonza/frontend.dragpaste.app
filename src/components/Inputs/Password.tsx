import { ChangeEvent, FC } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Input, Space } from 'antd';
import InLabel from './Label';

import { PropsIGeneric } from '../../types/types.export';
import { buttonRemove } from '../../assets/styles/styles';
import useEventHandling from '../../hooks/useEventHandling';
import { deleteFromLocalStorage } from '../../util/LocalStorage.util';

const InPassword: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => handleEventChange(e.target.value);
    const showEye = (visible: boolean) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />

    return (
        <div className='container-in-password'>
            <InLabel setEvent={setEvent} text={label} />
            <Input.Password
                value={value}
                onChange={handlePasswordChange}
                style={{ marginTop: 5, width: '90%' }}
                placeholder="*************"
                iconRender={(visible) => showEye(visible)}
            />
            <Space size={16} wrap>
                <Avatar style={buttonRemove}
                    onClick={() => deleteFromLocalStorage(position)}
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />} />
            </Space>
        </div>
    );
};

export default InPassword;