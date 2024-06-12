import { DatePicker } from "antd";
import { inputStyle } from "../../../public/css/styles";
import InLabel from "./Label";

const InInputDate: React.FC = () => {
    return (
        <div className='container-in-datepicker'>
            <InLabel />
            <DatePicker style={inputStyle} placeholder="AÑO-MES-DIA" />
        </div>
    )
}

export default InInputDate;