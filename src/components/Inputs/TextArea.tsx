import React from 'react';
import { Input } from 'antd';
import { inputStyle } from '../../../public/css/styles';
import InLabel from './Label';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e);
};

const InTextArea: React.FC = () => {
    return (
        <div className='container-in-textarea'>
            <InLabel />
            <TextArea placeholder="Ingrese su descripcion" style={inputStyle} allowClear onChange={onChange} />
        </div>
    )
}

export default InTextArea;