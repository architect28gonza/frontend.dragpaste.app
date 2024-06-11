import React from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { inputStyle } from '../../styles';
import { ILabel } from './Label';

dayjs.extend(customParseFormat);

const InTimer: React.FC = () => {
    const onChange: TimePickerProps['onChange'] = (time, timeString) => console.log(time, timeString);

    return (
        <div>
            <ILabel />
            <TimePicker style={inputStyle} onChange={onChange}
                placeholder='seleccione hora'
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
        </div>

    )
}

export default InTimer;