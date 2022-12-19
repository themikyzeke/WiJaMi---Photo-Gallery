import { createContext, useState, FunctionComponent, useContext, PropsWithChildren } from "react";

export type AuthTokenContext = [string| undefined, (token:string)=>void]

export const authTokenContext = createContext<AuthTokenContext>([undefined, ()=>{}]);

export const AuthTokenProvider:FunctionComponent<PropsWithChildren> = 
({children}) =>
{
    const [token, setToken] = useState<string | undefined>()

     return (
    <authTokenContext.Provider
      value={[token, setToken]}
    >
      {children}
    </authTokenContext.Provider>
     )
}

export const useToken = () => useContext(authTokenContext)