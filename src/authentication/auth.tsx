'use client'
import React, { useLayoutEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

type ContextType = {
   session: { [key: string]: any };
   updateSession: (value: { [key: string]: any }) => void;
}

export const sessionContext = React.createContext<ContextType>({ session: {}, updateSession: () => { } });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [session, setSession] = useState<{ [key: string]: any }>({ login: false, user: {} });
   const contextValue: any = useMemo(() => ({ session, updateSession }), [session]);

   useLayoutEffect(() => {
      authByToken()
   }, [])

   function authByToken() {
      const token = Cookies.get('token') || ''
      if (token) {
         const decodedToken: any = jwtDecode(token) || {}
         return setSession({
            login: true,
            user: decodedToken
         })
         // const currentTime = Date.now() / 1000;
         // // Check if the token has expired
         // if (decodedToken?.exp > currentTime) {
         //    return setSession({
         //       login: true,
         //       user: decodedToken
         //    })
         // }
      }
   }

   function updateSession(value: { [key: string]: any }) {
      setSession(value);
   }

   return (
      <sessionContext.Provider value={contextValue}>
         {children}
      </sessionContext.Provider>
   )
}

export default AuthProvider