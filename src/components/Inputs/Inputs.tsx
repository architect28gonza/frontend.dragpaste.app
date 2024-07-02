import { Avatar, Input, Space } from "antd";
import { FC } from "react";
import { buttonRemove, inputStyle } from "../../assets/styles/styles";
import { PropsIGeneric } from "../../types/types.export";
import InLabel from "./Label";
import { DeleteOutlined } from '@ant-design/icons';
import useEventHandling from "../../hooks/useEventHandling";
import { deleteFromLocalStorage } from "../../util/LocalStorage.util";

const InInputText: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);
    const handlerEvent = (data: string) => handleEventChange(data);

    return (
        <div className="container-in-input">
            <InLabel setEvent={setEvent} text={label} />
            <Input
                value={value}
                onChange={e => handlerEvent(e.target.value)}
                style={inputStyle}
                placeholder="Digite campo de texto"
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

export default InInputText;
