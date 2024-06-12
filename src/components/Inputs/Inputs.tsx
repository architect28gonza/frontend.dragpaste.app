import { Input } from "antd";
import React  from "react";
import { inputStyle } from "../../../public/css/styles";
import InLabel from "./Label";

const InInputText: React.FC = () => {
    return (
        <div className='container-in-input'>
            <InLabel />
            <Input style={inputStyle} placeholder="Digite campo de texto" />
        </div>
    )
}

export default InInputText;