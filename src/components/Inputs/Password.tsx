import React, { ChangeEvent, useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import InLabel from './Label';
import LOG from 'loglevel';
import { PropsIGeneric } from '../../types/types.export';
import { getProps } from '../../props';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';

const InPassword: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<string>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement> | any>(undefined);

    /**
     * Maneja el cambio de entrada en un campo de texto.
     * 
     * @param {ChangeEvent<HTMLInputElement>} e - Evento de cambio que contiene el nuevo valor del campo de entrada.
     */
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {

        if ((event === undefined) && (!isPositionNegative())) {
            LOG.error('El evento está vacío o la posición es negativa - Password')
            return;
        }

        let indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        let indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            LOG.error("La columna no es válida - Password");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = e.target.value;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(newValue);
        } else LOG.error("Error: No se pudo obtener el objeto de la lista - Password");
    };

    return (
        <div className='container-in-password'>
            <InLabel setEvent={setEvent} text={label} />
            <Input.Password
                value={value}
                onChange={handlePasswordChange}
                style={{ marginTop: 5 }}
                placeholder="*************"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </div>
    );
};

export default InPassword;