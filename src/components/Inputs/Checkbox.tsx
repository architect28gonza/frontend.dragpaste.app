import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import InLabel from './Label';

const InCheckbox: React.FC = () => {

	const onChange: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	return (
		<div className='container-in-checkbox'>
			<Checkbox onChange={onChange}>
				<InLabel />
			</Checkbox>
		</div>
	)
}

export default InCheckbox;