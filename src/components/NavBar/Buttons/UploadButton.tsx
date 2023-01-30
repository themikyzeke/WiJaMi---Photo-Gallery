import { FC } from 'react';
import { IoCloudUpload } from 'react-icons/io5';

export interface UploadButtonProps {
  onClick: () => void;
}

export const UploadButton: FC<UploadButtonProps> = ({ onClick }) => (
  <button className="nav-btn" onClick={onClick}>
    <a>
      <IoCloudUpload />
    </a>
  </button>
);

