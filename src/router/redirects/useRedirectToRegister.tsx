import { useNavigate } from 'react-router-dom';
import { routePaths } from '../routePaths';

export const useRedirectToRegister = () => {
  const navigate = useNavigate();
  return () => navigate(routePaths.register);
};

