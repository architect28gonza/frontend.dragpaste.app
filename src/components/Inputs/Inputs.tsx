import { Input } from "antd";
import React  from "react";
import { inputStyle } from "../../styles";
import { ILabel } from "./Label";

export const InputText: React.FC = () => {
    return (
        <div>
            <ILabel />
            <Input style={inputStyle} placeholder="Digite campo de texto" />
        </div>
    )
}