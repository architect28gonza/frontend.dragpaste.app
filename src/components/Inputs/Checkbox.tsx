import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { ILabel } from './Label';

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const InCheckbox: React.FC = () => {
  return (
    <div>
      <Checkbox onChange={onChange}>
        <ILabel />
      </Checkbox>
    </div>
  )
}

export default InCheckbox;