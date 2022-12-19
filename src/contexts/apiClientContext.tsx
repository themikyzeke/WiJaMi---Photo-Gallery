import axios, {  AxiosInstance } from "axios";
import { createContext, useEffect, useMemo, useContext, FunctionComponent, PropsWithChildren } from "react";
import { useToken } from "./authTokenContext";

export const baseURL = "http://localhost:3000";


export type ApiClientContext = AxiosInstance

export const apiClientContext = createContext<ApiClientContext>({} as any);

export const ApiClientProvider:FunctionComponent<PropsWithChildren> = ({children}) => {
  const [token] = useToken();

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL,
      }),
    []
  );

  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = token;
  }, [token, axiosInstance]);

  return <apiClientContext.Provider value={axiosInstance}>
    {
        children
    }</apiClientContext.Provider>
};

export const useAxios = () => useContext(apiClientContext)
