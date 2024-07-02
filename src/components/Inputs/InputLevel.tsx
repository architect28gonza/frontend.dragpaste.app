import { FC } from 'react';
import InLabel from './Label';

import { Flex, Input } from 'antd';
import { PropsIGeneric } from '../../types/types.export';
import type { GetProp } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import useEventHandling from '../../hooks/useEventHandling';
const { OTP: Otp } = Input

const InputLevel: FC<PropsIGeneric> = ({ propsComponent }) => {

    const { handleEventChange, setEvent, label, value } = useEventHandling(propsComponent);
    const onChange: GetProp<typeof Otp, 'onChange'> = (text) => handleEventChange(text);

    const sharedProps: OTPProps = {
        onChange,
    };

    return (
        <div className='container-in-input-otp'>
            <InLabel setEvent={setEvent} text={label} />
            <Flex gap="middle" align="flex-start" style={{ marginTop: 5, width: '90%' }} vertical>
                <Otp value={value} formatter={(str) => str.toUpperCase()} {...sharedProps} />
            </Flex>
        </div>
    );
};

export default InputLevel;