import { FC } from 'react';
import { Alert } from 'antd';

interface IPropsAlert {
    message: string;
    type: "success" | "info" | "warning" | "error";
    className: string;
}

const AlertUtil: FC<IPropsAlert> = (props) => (<Alert {...props} showIcon />);

export default AlertUtil;