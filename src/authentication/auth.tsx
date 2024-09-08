'use client'
import React, { useLayoutEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

type ContextType = {
   login: boolean
   user: { [key: string]: any };
   updateSession: (value: { [key: string]: any }) => void;
}

export const sessionContext = React.createContext<ContextType>({ login: false, user: {}, updateSession: () => { } });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter()
   const [session, setSession] = useState<{ [key: string]: any }>({ login: false, user: {} });
   // const contextValue: any = useMemo(() => ({ session, updateSession }), [session]);

   useLayoutEffect(() => {
      authByToken()
   }, [router])

   function authByToken() {
      // const token = Cookies.get('token') || ''
      const userDetails = localStorage.getItem('userDetails') || ''
      if (userDetails) {
         const userDetailsObj = JSON.parse(userDetails)
         const currentTime = Date.now() / 1000;
         if (userDetailsObj?.exp > currentTime) {
            setSession({
               login: true,
               user: userDetailsObj
            })
         } else {
            decodeToken()
         }
      } else {
         decodeToken()
      }
   }

   function decodeToken() {
      const token = Cookies.get('token') || ''
      if (token) {
         const decodedToken: { [key: string]: any } = jwtDecode(token) || {}
         const currentTime = Date.now() / 1000;
         // Check if the token has expired
         if (decodedToken?.exp > currentTime) {
            localStorage.setItem('userDetails', JSON.stringify(decodedToken))
            setSession({
               login: true,
               user: decodedToken
            })
         }
      }
   }

   function updateSession(value: { [key: string]: any }) {
      setSession(value);
   }

   return (
      <sessionContext.Provider value={{ login: session.login, user: session.user, updateSession }}>
         {children}
      </sessionContext.Provider>
   )
}

export default AuthProvider