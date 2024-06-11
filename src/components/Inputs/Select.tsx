import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef } from 'antd';
import { inputStyle } from '../../styles';
import { ILabel } from './Label';

let index = 0;

const InSelect: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <div>
            <ILabel />
            <Select
                style={inputStyle}
                placeholder="seleccionar item"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                                placeholder="Ingrese nuevo valor"
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                Agregar
                            </Button>
                        </Space>
                    </>
                )}
                options={items.map((item) => ({ label: item, value: item }))}
            />
        </div>
    );
};

export default InSelect;