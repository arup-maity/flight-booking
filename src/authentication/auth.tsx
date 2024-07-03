'use client'
import React, { useLayoutEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

type ContextType = {
   open?: string;
   toggle?: (value: string) => void;
}

export const DropdownContext = React.createContext<ContextType>({});


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [open, setOpen] = useState({ login: false, user: {} });
   const dropdownContext: any = useMemo(() => ({ open, toggle }), [open]);

   useLayoutEffect(() => {
      authByToken()
   }, [])

   function authByToken() {
      const token = Cookies.get('token') || ''
      if (!token) {
         return setOpen({
            login: false,
            user: {}
         }) // Token is still valid
      }
      const decodedToken: any = jwtDecode(token) || {}
      const currentTime = Date.now() / 1000;
      // Check if the token has expired
      if (decodedToken?.exp > currentTime) {
         return setOpen({
            login: true,
            user: decodedToken
         }) // Token is still valid
      }
   }

   function toggle(value: any) {
      setOpen(value);
   }

   return (
      <DropdownContext.Provider value={dropdownContext}>
         {children}
      </DropdownContext.Provider>
   )
}

export default AuthProvider