import { FC } from "react";
import { Modal } from "antd";
import BodyModalPassword from "./BodyModalPassword";
import { translations } from "../../../util/Translations";

interface IShowModel {
    isModelOpen: boolean;
    handleCancel: (entrada: boolean) => void;
}

const ModelChangePassword: FC<IShowModel> = ({ isModelOpen, handleCancel }) => {
    return (
        <div className="container-model-change-password">
            <Modal
                title={translations.modelChangePassword.title}
                width={650}
                centered
                open={isModelOpen}
                onCancel={() => handleCancel(false)}
                okButtonProps={{ style: { display: "none" } }}
                cancelText={translations.modelChangePassword.buttonCancel}
            >
                <BodyModalPassword />
            </Modal>
        </div>
    );
};

export default ModelChangePassword;
