import { FC } from 'react';
import { Avatar, Radio, RadioChangeEvent, Space } from 'antd';
import { PropsIGeneric } from '../../types/types.export';

import InLabel from './Label';
import { buttonRemove } from '../../assets/styles/styles';
import { DeleteOutlined } from '@ant-design/icons';
import useEventHandling from '../../hooks/useEventHandling';
import { deleteFromLocalStorage } from '../../util/LocalStorage.util';

const InRadio: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);

    const onChangeRadio = (e: RadioChangeEvent) => handleEventChange(e.target.value);

    return (

        <div className='container-in-radio'>
            <InLabel setEvent={setEvent} text={label} />
            <Radio.Group onChange={onChangeRadio} value={value}>
                <Radio value={true}>SI</Radio>
                <Radio value={false}>NO</Radio>
            </Radio.Group>
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

export default InRadio;
