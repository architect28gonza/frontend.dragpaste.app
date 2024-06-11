import { DatePickerProps, DatePicker } from "antd";
import { inputStyle } from "../../styles";
import { ILabel } from "./Label";

export const InputDate: React.FC = () => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => console.log(date, dateString);
    return (
        <div>
            <ILabel />
            <DatePicker style={inputStyle} placeholder="AÑO-MES-DIA" onChange={onChange} />
        </div>

    )
}