'use client'
import React, { useLayoutEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

type ContextType = {
   open?: string;
   toggle?: (value: string) => void;
}

export const sessionContext = React.createContext<ContextType>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [session, setSession] = useState({ login: false, user: {} });
   const dropdownContext: any = useMemo(() => ({ session, toggle }), [session]);

   useLayoutEffect(() => {
      authByToken()
   }, [])

   function authByToken() {
      const token = Cookies.get('token') || ''
      if (!token) {
         return setSession({
            login: false,
            user: {}
         })
      }
      const decodedToken: any = jwtDecode(token) || {}
      const currentTime = Date.now() / 1000;
      // Check if the token has expired
      if (decodedToken?.exp > currentTime) {
         return setSession({
            login: true,
            user: decodedToken
         })
      }
   }

   function toggle(value: any) {
      setSession(value);
   }

   return (
      <sessionContext.Provider value={dropdownContext}>
         {children}
      </sessionContext.Provider>
   )
}

export default AuthProvider