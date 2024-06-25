import React, { ChangeEvent, JSXElementConstructor, ReactElement, useRef, useState } from 'react';
import InLabel from './Label';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import { inputStyle } from '../../../public/css/styles';
import { PropsIGeneric } from '../../types/types.export';
import { getProps } from '../../props';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';
import { openNotificationWithIcon } from '../../util/Message.alert';
import type { InputRef } from 'antd';

const InSelect: React.FC<PropsIGeneric> = ({ propsComponent }) => {
    const { label, body, row, column, isPositionNegative }: any = getProps(propsComponent);

    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();
    const [items, setItems] = useState<string[]>((body?.lstItems) ?? []);
    const [name, setName] = useState('');
    const [valueSelect, setValueSelect] = useState<string>(body?.value);
    const inputRef = useRef<InputRef>(null);

    const getIndexColumn = (column: number, event: ChangeEvent<HTMLInputElement>) => isPositionNegative() ? column : getColumnRowFromEvent(event).column;
    const getIndexRow = (row: number, event: ChangeEvent<HTMLInputElement>) => isPositionNegative() ? row : getColumnRowFromEvent(event).row;

    const handleChangeSelect = (value: string) => {
        
        if (!event) return;
        
        if ((!event) && !isPositionNegative()) {
            openNotificationWithIcon();
            return;
        }

        const indexColumn = getIndexColumn(column, event);
        const indexRow = getIndexRow(row, event);

        if (!isValidColumn(indexColumn)) {
            console.error('La columna no es válida - Select');
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            setValueSelect(value);
            object.body.value = value;
            setItems((prevItems) => {
                const updatedItems = [...prevItems];
                object.body.lstItems = updatedItems;
                updateLocalStorageObject(object, indexRow, indexColumn);
                return updatedItems;
            });
        } else {
            console.error('Error: No se pudo obtener el objeto de la lista - Select');
        }
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();

        if (!event) return;

        const indexColumn = getIndexColumn(column, event);
        const indexRow = getIndexRow(row, event);

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newItem = name || 'Elemento vacío';
            setItems((prevItems) => [...prevItems, newItem]);
            setName('');
            setTimeout(() => inputRef.current?.focus(), 0);
            setItems((prevItems) => {
                const updatedItems = [...prevItems];
                object.body = { value: valueSelect, lstItems: updatedItems };
                updateLocalStorageObject(object, indexRow, indexColumn);
                return updatedItems;
            });
        } else {
            console.error('Error: No se pudo obtener el objeto de la lista - Select');
        }
    };

    const getDropdownRender = (menu: ReactElement<any, string | JSXElementConstructor<any>>) => {
        return <>
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
        </>;
    }

    return (
        <div className='container-in-select'>
            <InLabel setEvent={setEvent} text={label} />
            <Select
                value={valueSelect}
                onChange={handleChangeSelect}
                style={inputStyle}
                placeholder="Seleccionar ítem"
                dropdownRender={(menu) => getDropdownRender(menu)}
                options={items.map((item, index) => ({ label: item, value: index }))}
            />
        </div>
    );
};

export default InSelect;
