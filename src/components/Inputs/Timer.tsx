import { FC } from 'react';
import { Avatar, Space, TimePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { buttonRemove, inputStyle } from '../../assets/styles/styles';
import InLabel from './Label';
import { PropsIGeneric } from '../../types/types.export';
import { DeleteOutlined } from '@ant-design/icons';
import useEventHandling from '../../hooks/useEventHandling';
import { deleteFromLocalStorage } from '../../util/LocalStorage.util';

dayjs.extend(customParseFormat);

const InTimer: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);
    const onChangeTimer: TimePickerProps['onChange'] = (_, timeString) => handleEventChange(timeString);

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
                    onClick={() => deleteFromLocalStorage(position)}
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />} />
            </Space>
        </div>

    )
}

export default InTimer;