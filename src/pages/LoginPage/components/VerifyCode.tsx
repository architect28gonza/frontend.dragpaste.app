import { FC, useState } from 'react';
import { Input } from 'antd';
import { translations } from '../../../util/Translations';
import type { GetProps } from 'antd';
type OTPProps = GetProps<typeof Input.OTP>;
const { OTP } = Input

const VerifyCode: FC = () => {

    const [valueCode, setValueCode] = useState<string>("");

    const onChange: OTPProps['onChange'] = (text) => setValueCode(text);

    return (
        <div className="container-verity-code-component mt-3">
            <div className='container-input-label-code'>
                <label className='text-color-global'
                    htmlFor="formCode">{translations.verifyCode.label}</label>
            </div>
            <div className="container-input-code mt-1">
                <OTP
                    id='formCode'
                    value={valueCode}
                    onChange={onChange}
                    length={5} />
            </div>
            <small className='text-color-global'>
                <i>{translations.verifyCode.small}</i>
            </small>
        </div>
    );
}

export default VerifyCode;
