import { ChangeEvent, FC, useState } from "react";
import { Radio, RadioChangeEvent, Space, Input } from "antd";
import { translations } from "../../../util/Translations";

const RecoveryOptionsMenu: FC = () => {
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>("");

    const handleOptionChange = ({ target: { value } }: RadioChangeEvent) => {
        setSelectedOption(value);
        setInputValue("");
    };

    const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        const filteredValue = (selectedOption === 1)
            ? filterNumeric(value)
            : filterAlphanumeric(value);
        setInputValue(filteredValue);
    };

    const filterNumeric = (input: string) => input.replace(/[^0-9]/g, '');
    const filterAlphanumeric = (input: string) => {
        const regex = /^[a-zA-Z0-9]*$/;
        return regex.test(input) ? input : '';
    };


    const inputProps = selectedOption === 1
        ? { addonBefore: "+57", placeholder: "xxxxxxxxxx" }
        : { addonAfter: "@gmail.com", placeholder: "ejemplo123" };

    return (
        <div className="account-recovery-options mt-4">
            <span className="text-color-global">{translations.changePassword.title}</span>
            <hr />
            <Radio.Group onChange={handleOptionChange} value={selectedOption}>
                <Radio value={1} defaultChecked>{translations.changePassword.textSms}</Radio>
                <Radio value={2}>{translations.changePassword.textSms}</Radio>
            </Radio.Group>
            <div className="container-input-account-recovery-options mt-4">
                <div className="container-input">
                    <label htmlFor="formInput" className="text-color-global w-100">
                        {selectedOption === 1
                            ? translations.changePassword.labelPhone
                            : translations.changePassword.labelEmail}
                    </label>
                    <Space.Compact>
                        <Input
                            name="formInput"
                            id="formInput"
                            className="w-100 mt-1"
                            onChange={handleInputChange}
                            value={inputValue}
                            {...inputProps}
                        />
                    </Space.Compact>
                </div>
            </div>
        </div>
    );
};

export default RecoveryOptionsMenu;
