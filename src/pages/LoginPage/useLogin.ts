import { useState, ChangeEvent } from "react"

export function useLogin(): [
    ILogin,
    (e: ChangeEvent<HTMLInputElement>) => void,
    () => void,
    boolean
] {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [dataLogin, setDataLogin] = useState<ILogin>({
        username: "",
        password: ""
    });

    const handlerLogin = (e: ChangeEvent<HTMLInputElement>): void => {
        setShowAlert(false);
        const { name, value } = e.target;
        setDataLogin(inputs => ({
            ...inputs,
            [name]: value,
        }));
    };

    const isValidateInputs = (): boolean => dataLogin.username !== "" && dataLogin.password !== "";

    const handleLogin = () => setShowAlert(!isValidateInputs())
    
    return [dataLogin, handlerLogin, handleLogin, showAlert];
}