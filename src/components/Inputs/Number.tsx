import InLabel from './Label';
import { FC } from 'react';
import type { InputNumberProps } from 'antd';
import { Avatar, InputNumber, Space } from 'antd';
import { buttonRemove, inputStyle } from '../../assets/styles/styles';
import { PropsIGeneric } from '../../types/types.export';
import { DeleteOutlined } from '@ant-design/icons';
import useEventHandling from '../../hooks/useEventHandling';
import { deleteFromLocalStorage } from '../../util/LocalStorage.util';

const InNumber: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);
    const onChangeNumber: InputNumberProps['onChange'] = (valueNumber) => handleEventChange(valueNumber);

    return (
        <div className='container-in-number'>
            <InLabel setEvent={setEvent} text={label} />
            <InputNumber
                value={value}
                style={inputStyle}
                placeholder="0123456789"
                onChange={onChangeNumber} />
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


export default InNumber;