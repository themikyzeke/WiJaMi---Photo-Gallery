import { useNavigate } from 'react-router-dom';
import { routePaths } from '../routePaths';

export const useRedirectToLogin = () => {
  const navigate = useNavigate();

  return () => {
    console.log('red to login');
    navigate(routePaths.login);
  };
};

