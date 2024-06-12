import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import InLabel from './Label';

const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const InUploadOut: React.FC = () => {
    return (
        <div className='container-in-upload'>
            <Upload {...props}>
                <InLabel />
                <Button style={{ width: '100%', color: '#444444' }} icon={<UploadOutlined />}>Click para subir archivo</Button>
            </Upload>
        </div>
    )
}

export default InUploadOut;