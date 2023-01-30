import { FC } from 'react';
import { IoCloudUpload, IoLogIn, IoLogOut } from 'react-icons/io5';

export interface LogoutButtonProps {
  onLogin: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export const LoginOutButton: FC<LogoutButtonProps> = ({
  onLogin,
  onLogout,
  isLoggedIn,
}) => (
  <button className="nav-btn" onClick={!isLoggedIn ? onLogin : onLogout}>
    <a>{isLoggedIn ? <IoLogOut /> : <IoLogIn />}</a>
  </button>
);

