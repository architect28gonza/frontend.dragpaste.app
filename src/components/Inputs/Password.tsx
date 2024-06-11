import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { ILabel } from './Label';

const InPassword: React.FC = () => {
    return (
        <div>
            <ILabel />
            <Input.Password
                style={{marginTop: 5}}
                placeholder="ingrese valor"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </div>
    );
};

export default InPassword;