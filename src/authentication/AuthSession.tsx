'use client'
import { authInstance } from "@/config/axios"
import { useLayoutEffect, useState } from "react"

export const AuthSession = () => {
   const [authSession, setAuthSession] = useState({})
   useLayoutEffect(() => {
      getAuthSession()
   }, [])

   async function getAuthSession() {
      try {
         const { data } = await authInstance.get(`/check-auth`)
         if (data.success) {
            setAuthSession(data.payload)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }

   return authSession
}
