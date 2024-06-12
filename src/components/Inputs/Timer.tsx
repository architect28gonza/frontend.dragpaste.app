import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { inputStyle } from '../../../public/css/styles';
import InLabel from './Label';

dayjs.extend(customParseFormat);

const InTimer: React.FC = () => {

    return (
        <div className='container-in-timer'>
            <InLabel />
            <TimePicker style={inputStyle}
                placeholder='seleccione hora'
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
        </div>

    )
}

export default InTimer;