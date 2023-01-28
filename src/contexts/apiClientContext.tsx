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

export const baseURL = 'http://localhost:3000';

export type SetToken = (token?: string) => void;
export type ApiClientContext = [AxiosInstance, SetToken];

export const apiClientContext = createContext<ApiClientContext>({} as any);

export const ApiClientProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [token, setLocalToken] = useState<string | undefined>(undefined);
  const [authInterceptor, setAuthInterceptor] = useState<number | undefined>(
    undefined,
  );

  const setToken = (tokenToSet?: string) => {
    if (tokenToSet === token) {
      return;
    }

    if (authInterceptor) {
      axiosInstance.interceptors.request.eject(authInterceptor);
    }
    setLocalToken(tokenToSet);
    const newAuthInterceptor = axiosInstance.interceptors.request.use(function (
      config,
    ) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${tokenToSet}`;

      return config;
    });
    setAuthInterceptor(newAuthInterceptor);
  };

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL,
      }),
    [],
  );

  return (
    <apiClientContext.Provider value={[axiosInstance, setToken]}>
      {children}
    </apiClientContext.Provider>
  );
};

export const useAxios = () => useContext(apiClientContext);

