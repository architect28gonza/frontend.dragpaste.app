import React from 'react';
import { Input } from 'antd';
import { inputStyle } from '../../styles';
import { ILabel } from './Label';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e);
};

const InTextArea: React.FC = () => {
    return (
        <>
            <ILabel />
            <TextArea placeholder="Ingrese su descripcion" style={inputStyle} allowClear onChange={onChange} />
        </>
    )
}

export default InTextArea;