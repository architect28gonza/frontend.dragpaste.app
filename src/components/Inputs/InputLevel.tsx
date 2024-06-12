import React from 'react';
import { Flex, Input } from 'antd';
import type { GetProp } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import InLabel from './Label';

const InputLevel: React.FC = () => {
	const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
		console.log('onChange:', text);
	};

	const sharedProps: OTPProps = {
		onChange,
	};

	return (
		<div className='container-in-input-otp'>
			<InLabel />
			<Flex gap="middle" align="flex-start" style={{ marginTop: 5 }} vertical>
				<Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
			</Flex>
		</div>
	);
};

export default InputLevel;