import React from 'react';
import { Space, Switch } from 'antd';

const InSwitch: React.FC = () => {
    return (
        <div className='container-in-switchs'>
            <Space direction="vertical">
                <Switch style={{ marginTop: 5 }} checkedChildren="activo" unCheckedChildren="desactivo" defaultChecked />
            </Space>
        </div>
    )
}

export default InSwitch;