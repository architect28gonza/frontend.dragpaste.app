import { FC, useState } from "react";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import { translations } from "../../util/Translations";
import imgLoginRight from "../../assets/images/img-login.svg";
import "./Login.css";
import { useLogin } from "./useLogin";
import AlertUtil from "../../util/Alert.util";
import ModelChangePassword from "./components/ChangePassword";

const { Password } = Input;

const Login: FC = () => {
    const [showModel, setShowModel] = useState<boolean>(false);
    const {
        titleLoginLabel,
        usernameLoginLabel,
        passwordLoginLabel,
        resetPasswordLabel,
        initSessionLogin
    } = translations;
    
    const [dataLogin, handleLoginChange, handleLoginSubmit, showAlert] = useLogin();
    const handleShowModel = (isVisible: boolean) => setShowModel(isVisible);
    const renderEyeIcon = (visible: boolean) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

    const renderAlert = () => (
        <AlertUtil
            className="mt-2 w-100 text-secondary"
            message="NO permitido, Llenar campos"
            type="error"
            key={1}
        />
    );

    return (
        <div className="container-login">
            <Card className="container card-login p-0">
                <Row>
                    <Col className="p-1" span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 1 }}>
                        <div className="container-text-login w-100 text-center mt-3">
                            <span className="text-color-title-global h4">{titleLoginLabel}</span>
                        </div>
                        <hr />
                        <div className="container-input">
                            <div className="input-username">
                                <label htmlFor="username" className="text-color-global">{usernameLoginLabel}</label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={dataLogin.username}
                                    onChange={handleLoginChange}
                                    placeholder="Ingrese usuario"
                                    prefix={<UserOutlined />}
                                />
                            </div>
                            <br />
                            <div className="input-password">
                                <label htmlFor="password" className="text-color-global">{passwordLoginLabel}</label>
                                <Password
                                    id="password"
                                    name="password"
                                    value={dataLogin.password}
                                    onChange={handleLoginChange}
                                    placeholder="Ingrese contraseña"
                                    iconRender={renderEyeIcon}
                                />
                            </div>
                            <div className="link-reset-password mt-3">
                                <span className="text-primary reset-password" onClick={() => handleShowModel(true)}>
                                    <FormOutlined /> &nbsp;{resetPasswordLabel}
                                </span>
                            </div>
                            <div className="container-alert">
                                {showAlert && renderAlert()}
                            </div>
                            <div className="container-button-action mt-3">
                                <Button className="text-color-global" onClick={handleLoginSubmit}>{initSessionLogin}</Button>
                            </div>
                        </div>
                        {showModel && (
                            <ModelChangePassword
                                handleCancel={handleShowModel}
                                isModelOpen={showModel}
                            />
                        )}
                    </Col>
                    <Col className="container" span={16} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 2 }}>
                        <img src={imgLoginRight} className="img-fluid p-5" alt="img-login" />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Login;
