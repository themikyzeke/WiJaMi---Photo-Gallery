import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const setUserInfo = useMeContext((state) => state.setUserInfo);
  const queryClient = useQueryClient();

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
      return (await axiosInstance.get<GetMeDto>('users/me')).data;
    },
    retry: 2,
    onSuccess: (meData) => {
      setUserInfo({
        id: meData.id,
        username: meData.login,
      });
    },
    onError: () => {
      setUserInfo(undefined);
    },
  });

  const setToken = useCallback(
    (tokenToSet?: string) => {
      if (tokenToSet === token) {
        return;
      }
      if (tokenToSet) {
        localStorage.setItem('token', tokenToSet);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + tokenToSet;
        queryClient.invalidateQueries();
      } else {
        axiosInstance.defaults.headers.common['Authorization'] = undefined;
        localStorage.removeItem('token');
      }

      setLocalToken(tokenToSet);
    },
    [
      setLocalToken,
      axiosInstance,
      token,
      meData,
    ],
  );

  useEffect(() => {
    setToken(localStorage.getItem('token') ?? undefined);
  }, []);
  return (
    <apiClientContext.Provider value={[axiosInstance, setToken, token]}>
      {children}
    </apiClientContext.Provider>
  );
};

export const useAxios = () => useContext(apiClientContext);

