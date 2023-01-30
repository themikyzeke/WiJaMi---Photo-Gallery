import { useAxios } from '../contexts/apiClientContext';
import { useMeContext } from '../contexts/meStore';
import { useRedirectToHomePage } from '../router/redirects/useRedirectToHomePage';

export const useLogout = () => {
  const redirectToHomePage = useRedirectToHomePage();
  const setUserInfo = useMeContext((state) => state.setUserInfo);
  const [_, setToken] = useAxios();

  return () => {
    setToken(undefined);
    setUserInfo(undefined);

    redirectToHomePage();
  };
};

