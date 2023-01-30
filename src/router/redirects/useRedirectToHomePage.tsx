import { useNavigate } from 'react-router-dom';
import { routePaths } from '../routePaths';

export const useRedirectToHomePage = () => {
  const navigate = useNavigate();
  return () => navigate(routePaths.home);
};

