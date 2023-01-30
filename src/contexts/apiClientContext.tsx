import { useQuery } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';
import {
  createContext,
  useEffect,
  useMemo,
  useContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import { GetMeDto } from '../dtos/GetMe.dto';
import { useMeContext } from './meStore';

export const baseURL = process.env.REACT_APP_API_URL;

export type SetToken = (token?: string) => void;
export type ApiClientContext = [AxiosInstance, SetToken, string | undefined];

export const apiClientContext = createContext<ApiClientContext>({} as any);

export const ApiClientProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setUserInfo] = useMeContext((state) => [
    state.isLoggedIn,
    state.setUserInfo,
  ]);

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL,
      }),
    [],
  );

  const [token, setLocalToken] = useState<string | undefined>();
  const [authInterceptor, setAuthInterceptor] = useState<number | undefined>(
    undefined,
  );

  const { data: meData } = useQuery({
    queryKey: ['me', token],
    queryFn: async () => {
      console.log(token);
      return (await axiosInstance.get<GetMeDto>('users/me')).data;
    },
  });

  useEffect(() => {
    setToken(localStorage.getItem('token') ?? undefined);
  }, []);

  useEffect(() => {
    if (!meData || !token) {
      setUserInfo(undefined);
      return;
    }

    setUserInfo({
      id: meData.id,
      username: meData.login,
    });
  }, [meData, token]);

  const setToken = (tokenToSet?: string) => {
    if (tokenToSet === token) {
      return;
    }

    if (authInterceptor) {
      axiosInstance.interceptors.request.eject(authInterceptor);
    }

    if (tokenToSet) {
      localStorage.setItem('token', tokenToSet);

      const newAuthInterceptor = axiosInstance.interceptors.request.use(
        function (config) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${tokenToSet}`;

          return config;
        },
      );

      setAuthInterceptor(newAuthInterceptor);
    } else {
      localStorage.removeItem('token');
    }

    setLocalToken(tokenToSet);
  };

  return (
    <apiClientContext.Provider value={[axiosInstance, setToken, token]}>
      {children}
    </apiClientContext.Provider>
  );
};

export const useAxios = () => useContext(apiClientContext);

