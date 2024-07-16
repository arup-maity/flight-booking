import { create } from 'zustand'
import { persist } from "zustand/middleware"
import { encrypt } from '@/utils'
interface ModelState {
   loginModel: boolean
   toggleLoginModel: () => void
}

export const useLoginModel = create<ModelState>(set => ({
   loginModel: false,
   toggleLoginModel: () => set((state: any) => ({ loginModel: !state.loginModel })),
}))


interface rememberPasswordType {
   rememberPassword: string,
   setRememberPassword: (data: { email: string, password: string }) => void,
}
export const usePasswordStore = create(persist<rememberPasswordType>(
   (set, get) => ({
      rememberPassword: '',
      setRememberPassword: async (data: { email: string, password: string }) => {
         const storageDate: string = await encrypt({ email: data?.email, password: data?.password })
         set({ rememberPassword: storageDate })
      }
   }),
   {
      name: "cw_rememberPassword",
      getStorage: () => localStorage
   }
))