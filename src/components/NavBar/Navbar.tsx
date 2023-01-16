import { IoLogOut, IoCloudUpload } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import "./navbar.css"

export const Navbar = () => {
    const location = useLocation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Dragger } = Upload;

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
 
    return (
        <header>
            <div className="nav-left">
                <a className="logo" href="/"><img  src="WiJaMi Logo3.png"/></a> 
            </div>

            <div className="nav-right">
                <button className="nav-btn" onClick={showModal}>
                    {!location.pathname.includes("/login") && !location.pathname.includes("/register") && <a><IoCloudUpload/></a>} 
                </button>

                <button className="nav-btn">
                     {!location.pathname.includes("/login") && !location.pathname.includes("/register") && <a href="/login"><IoLogOut/></a>} 
                </button>
            </div>
            
      <Modal title="Wgraj nowe zdjęcie" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">Aby przesłać plik przeciągnij go lub kliknij tutaj!</p>
            <p className="ant-upload-hint">Obsługiwane rozszerzenia zdjęć to .jpg i .png</p>
        </Dragger>
      </Modal>
        </header>
    )
}