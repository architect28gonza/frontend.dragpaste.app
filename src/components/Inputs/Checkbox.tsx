import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import InLabel from './Label';

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const InCheckbox: React.FC = () => {
  return (
    <div>
      <Checkbox onChange={onChange}>
        <InLabel />
      </Checkbox>
    </div>
  )
}

export default InCheckbox;