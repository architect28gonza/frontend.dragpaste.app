import React, { useState } from "react";
import dayjs from 'dayjs';
import { DatePicker, DatePickerProps } from "antd";
import { PropsIGeneric } from "../../types/types.export";
import { getProps } from "../../props";
import { getColumnRowFromEvent, isValidColumn } from "../../position.element";
import { objectLocalStorage, updateLocalStorageObject } from "../../local.storage";
import { openNotificationWithIcon } from "../../util/Message.alert";
import InLabel from "./Label";
import { inputStyle } from "../../../public/css/styles";

const dateFormat = 'YYYY-MM-DD';

const InInputDate: React.FC<PropsIGeneric> = ({ propsComponent }) => {
    const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
    const [value, setValue] = useState<any>(body);
    const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

    const handleDateChange: DatePickerProps['onChange'] = (_, dateString) => {
        if ((!event) || (!event && !isPositionNegative())) {
            openNotificationWithIcon();
            return;
        }

        const { column: indexColumn, row: indexRow } = isPositionNegative()
            ? { column, row }
            : getColumnRowFromEvent(event);

        if (!isValidColumn(indexColumn)) {
            console.error("La columna no es válida - Date");
            return;
        }

        const object = objectLocalStorage(indexRow, indexColumn);
        if (object) {
            const newValue = dateString;
            object.body = newValue;
            updateLocalStorageObject(object, indexRow, indexColumn);
            setValue(dateString);
        } else {
            openNotificationWithIcon();
        }
    };

    return (
        <div className='container-in-datepicker'>
            <InLabel setEvent={setEvent} text={label} />
            <DatePicker
                needConfirm
                value={dayjs(value, dateFormat)}
                onChange={handleDateChange}
                style={inputStyle}
                placeholder="AÑO-MES-DIA"
            />
        </div>
    );
};

export default InInputDate;
