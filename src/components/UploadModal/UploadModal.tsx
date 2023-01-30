import React, { FC } from 'react';
import { Button, message, Modal, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { useAxios } from '../../contexts/apiClientContext';

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadModal: FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [_, __, token] = useAxios();
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: `${process.env.REACT_APP_API_URL}/upload`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title="Wgraj nowe zdjęcie"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Aby przesłać plik przeciągnij go lub kliknij tutaj!
        </p>
        <p className="ant-upload-hint">
          Obsługiwane rozszerzenia zdjęć to .jpg i .png
        </p>
      </Dragger>
    </Modal>
  );
};

