import React  from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { inputStyle } from '../../styles';
import { ILabel } from './Label';

const onChange: InputNumberProps['onChange'] = (value) => console.log('changed', value);

const InNumber: React.FC = () => {
    return (
        <div>
            <ILabel />
            <InputNumber style={inputStyle} placeholder="Digite valor numerico" min={1} max={1000000} onChange={onChange} />
        </div>
    )
}


export default InNumber;