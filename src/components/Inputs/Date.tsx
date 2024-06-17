import InLabel from "./Label";
import LOG from 'loglevel';
import dayjs from 'dayjs';

import { DatePicker, DatePickerProps } from "antd";
import { inputStyle } from "../../../public/css/styles";
import { ChangeEvent, useState } from "react";
import { PropsIGeneric } from "../../types/types.export";
import { getProps } from "../../props";
import { getColumnRowFromEvent, isValidColumn } from "../../position.element";
import { objectLocalStorage, updateLocalStorageObject } from "../../local.storage";

const dateFormat = 'YYYY-MM-DD';

const InInputDate: React.FC<PropsIGeneric> = ({ propsComponent }) => {

    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<any>(body);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement> | any>(undefined);


    const handleDateChange: DatePickerProps['onChange'] = (_, dateString) => {
        if ((event === undefined) && (!isPositionNegative())) {
            LOG.error('El evento está vacío o la posición es negativa - Date')
            return;
        }

        let indexColumn = isPositionNegative() ? column : getColumnRowFromEvent(event).column;
        let indexRow = isPositionNegative() ? row : getColumnRowFromEvent(event).row;

        if (!isValidColumn(indexColumn)) {
            LOG.error("La columna no es válida - Date");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = dateString;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(dateString);
        } else LOG.error("Error: No se pudo obtener el objeto de la lista - Date");
    };


    return (
        <div className='container-in-datepicker'>
            <InLabel setEvent={setEvent} text={label} />
            <DatePicker
                needConfirm
                value={dayjs(value, dateFormat)}
                onChange={handleDateChange}
                style={inputStyle} placeholder="AÑO-MES-DIA" />
        </div>
    )
}

export default InInputDate;