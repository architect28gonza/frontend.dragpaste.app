import { FC } from "react";
import dayjs from 'dayjs';
import { Avatar, DatePicker, DatePickerProps, Space } from "antd";
import { PropsIGeneric } from "../../types/types.export";
import InLabel from "./Label";
import { buttonRemove, inputStyle } from "../../assets/styles/styles";
import { DeleteOutlined } from '@ant-design/icons';
import useEventHandling from "../../hooks/useEventHandling";
import { deleteFromLocalStorage } from "../../util/LocalStorage.util";

const dateFormat = 'YYYY-MM-DD';

const InInputDate: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);
    const handleDateChange: DatePickerProps['onChange'] = (_, dateString) => handleEventChange(dateString)

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
            <Space size={16} wrap>
                <Avatar style={buttonRemove}
                    onClick={() => deleteFromLocalStorage(position)}
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />} />
            </Space>
        </div>
    );
};

export default InInputDate;
