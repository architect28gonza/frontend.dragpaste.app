import { ChangeEvent, FC } from 'react';
import InLabel from './Label';
import { Avatar, Input, Space } from 'antd';
import { buttonRemove, inputStyle } from '../../assets/styles/styles';
import { PropsIGeneric } from '../../types/types.export';
import { DeleteOutlined } from '@ant-design/icons';
import useEventHandling from '../../hooks/useEventHandling';
import { deleteFromLocalStorage } from '../../util/LocalStorage.util';

const { TextArea } = Input;

const InTextArea: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value, position } = useEventHandling(propsComponent);
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>  handleEventChange(e.target.value);

    return (
        <div className='container-in-textarea'>
            <InLabel setEvent={setEvent} text={label} />
            <TextArea
                value={value}
                placeholder="Ingrese su descripcion"
                style={inputStyle} allowClear onChange={onChange} />
            <Space size={16} wrap>
                <Avatar style={buttonRemove}
                    onClick={() => deleteFromLocalStorage(position)}
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />} />
            </Space>
        </div>
    )
}

export default InTextArea;