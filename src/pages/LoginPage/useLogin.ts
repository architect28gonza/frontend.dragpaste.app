import { useState, ChangeEvent } from "react"

export function useLogin(): [
    ILogin,
    (e: ChangeEvent<HTMLInputElement>) => void,
    (e: ILogin) => boolean,
] {
    const [dataLogin, setDataLogin] = useState<ILogin>({
        username: "",
        password: ""
    });

    const handlerLogin = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setDataLogin(inputs => ({
            ...inputs,
            [name]: value,
        }));
    };

    const isValidateInputs = (e: ILogin): boolean => {
        return e.username !== "" && e.password !== "";
    }

    return [dataLogin, handlerLogin, isValidateInputs];
}