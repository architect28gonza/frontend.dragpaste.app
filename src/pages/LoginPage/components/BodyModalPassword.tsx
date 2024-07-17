import { useState, FC } from 'react';
import { Button, message, Steps } from 'antd';
import RecoveryOptionsMenu from './RecoveryOptionsMenu';
import { translations } from '../../../util/Translations';
import VerifyCode from './VerifyCode';

const steps = [
    { title: 'Validar datos', content: <RecoveryOptionsMenu />},
    { title: 'Verificar código', content: <VerifyCode /> },
    { title: 'Cambiar contraseña', content: 'Last-content' }
];

const BodyModalPassword: FC = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        const formInput = document.getElementById('formInput') as HTMLInputElement | null;
        if (formInput !== null && formInput.value === "") {
            message.error(translations.modelChangePassword.modalErrorBody);
            return;
        }
        setCurrent(current + 1);
    };



    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <>
            <Steps current={current} items={items} />
            <div>{steps[current].content}</div>
            <div>
                {current < steps.length - 1 && (
                    <Button className='mt-4' type="primary" onClick={() => next()}>
                        Continuar
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button className='mt-4' type="primary" onClick={() => message.success(translations.modelChangePassword.success)}>
                        Completar
                    </Button>
                )}
                {current > 0 && (
                    <Button className='mt-4' style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Intentar de otra forma
                    </Button>
                )}
            </div>
        </>
    );
};

export default BodyModalPassword;