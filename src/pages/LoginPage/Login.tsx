import { translations } from "../../util/Translations";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row } from 'antd';
import { FC } from 'react';
import imgLoginRight from '../../assets/images/img-login.svg';
import './Login.css';

const { Password } = Input;

const Login: FC = () => {

    const renderEyeIcon = (visible: boolean) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;
    const { titleLoginLabel, usernameLoginLabel, passwordLoginLabel, resetPasswordLabel, initSessionLogin } = translations;

    return (
        <div className='container-login'>
            <Card className='container card-login p-0'>
                <Row>
                    <Col className='p-1' span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 1 }}>
                        <div className="container-text-login w-100 text-center mt-3">
                            <span className='text-color-title-global h4'>{titleLoginLabel}</span>
                        </div>
                        <hr />
                        <div className="container-input">
                            <div className="input-username">
                                <label htmlFor="username"
                                    className='text-color-global'>
                                    {usernameLoginLabel}</label>
                                <Input
                                    id='username'
                                    placeholder="Ingrese usuario"
                                    prefix={<UserOutlined />}
                                />
                            </div>
                            <br />
                            <div className="input-password">
                                <label htmlFor="password"
                                    className='text-color-global'>
                                    {passwordLoginLabel}</label>
                                <Password
                                    id='password'
                                    placeholder="Ingrese contraseña"
                                    iconRender={renderEyeIcon}
                                />
                            </div>
                            <div className='link-reset-password mt-3'>
                                <span className='text-primary reset-password'>
                                    {resetPasswordLabel}</span>
                            </div>
                            <div className="container-button-action mt-5">
                                <Button className='text-color-global'>
                                    {initSessionLogin}</Button>
                            </div>
                        </div>
                    </Col>
                    <Col className='container' span={16} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 2 }}>
                        <img src={imgLoginRight} className='img-fluid p-5' alt="img-login" />
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Login;
