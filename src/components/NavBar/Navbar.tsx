import { IoLogOut, IoCloudUpload } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import './navbar.css';
import { UploadModal } from '../UploadModal/UploadModal';
import { useMeContext } from '../../contexts/meStore';
import { UploadButton } from './Buttons/UploadButton';
import { LoginOutButton } from './Buttons/LogoutButton';
import { useLogout } from '../../auth/useLogout';
import { useRedirectToLogin } from '../../router/redirects/useRedirectToLogin';
import { routePaths } from '../../router/routePaths';

export const Navbar = () => {
  const location = useLocation();
  const redirectToLogin = useRedirectToLogin();
  const logout = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn: boolean = useMeContext((state) => state.isLoggedIn);

  const showUploadButton = useMemo(
    () =>
      !!isLoggedIn &&
      !location.pathname.includes(routePaths.login) &&
      !location.pathname.includes(routePaths.register),
    [isLoggedIn, location.pathname],
  );

  const showLoginButton = useMemo(
    () => !location.pathname.includes(routePaths.login),
    [location.pathname],
  );

  const showUploadModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <header>
      <div className="nav-left">
        <a className="logo" href="/">
          <img src="WiJaMi Logo3.png" />
        </a>
      </div>
      <div className="nav-right">
        {showUploadButton && <UploadButton onClick={showUploadModal} />}

        {showLoginButton && (
          <LoginOutButton
            isLoggedIn={isLoggedIn}
            onLogin={redirectToLogin}
            onLogout={logout}
          />
        )}
      </div>
      <UploadModal isOpen={isModalOpen} onClose={handleModalClose} />
    </header>
  );
};

