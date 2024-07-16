'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { toast } from 'sonner'
import { decrypt, handleApiError } from '@/utils'
import { usePasswordStore } from './zustand'
import { authInstance } from '@/config/axios'
import { sessionContext } from '@/authentication/auth';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PropsType {
   setOpenForm: (value: string) => void;
   toggleModel: () => void;
}
interface IFormInput {
   email: string
   password: string
   rememberMe: boolean
}

const SignIn: React.FC<PropsType> = ({ setOpenForm, toggleModel }) => {
   const { rememberPassword, setRememberPassword } = usePasswordStore(state => state)
   const { toggle } = React.useContext<any>(sessionContext);
   const [showPassword, setShowPassword] = useState(false)
   const schemaValidation = z.object({
      email: z.string().email(),
      password: z
         .string()
         .min(8, { message: "Password is too short" })
         .max(20, { message: "Password is too long" })
         .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character." }),
   })
   const defaultValues: IFormInput = { email: '', password: '', rememberMe: false }
   const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>({ defaultValues, mode: 'onChange', resolver: zodResolver(schemaValidation) })
   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      try {
         const res = await authInstance.post('/user/login', data)
         if (res.data.success && res.data.login) {
            data?.rememberMe ? setRememberPassword(data) : ''
            toggle(res.data)
            toggleModel()
         }
         if (!res.data.success && !res.data.login) {
            toast.error(res.data.message)
         }
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }

   useEffect(() => {
      if (rememberPassword) {
         getLoginDetails(rememberPassword)
      }
   }, [rememberPassword])

   async function getLoginDetails(token: string) {
      const decrypted: any = await decrypt(token);
      const login: { email: string; password: string } = {
         email: decrypted.email || '',
         password: decrypted.password || '',
      };
      if (login.email && login.password) {
         setValue('email', login.email)
         setValue('password', login.password)
      }
      return ''
   }
   return (
      <div className="w-full">
         <div className="mb-4">
            <div className="text-2xl font-medium mb-1">Sign In</div>
            <p className='text-sm'>Login to access your Clound Wings account</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <fieldset>
               <label htmlFor="loginEmail" className='block text-sm text-theme-black mb-1'>Email</label>
               <input type="text" id='loginEmail' {...register("email")} className='w-full h-10 border border-slate-400 focus:border-theme-blue focus:outline-none rounded px-2' />
               {errors.email && <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>}
            </fieldset>
            <fieldset>
               <label htmlFor="loginPassword" className='block text-sm text-theme-black mb-1'>Password</label>
               <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} id='loginPassword' {...register("password")} className='w-full h-10 border border-slate-400 focus:border-theme-blue focus:outline-none rounded px-2' />
                  <div className="absolute top-3 right-2 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                     {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                  </div>
               </div>
               {errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>}
            </fieldset>
            <div className="flex flex-nowrap justify-between">
               <div className="">
                  <label htmlFor="loginRemember" className='text-sm flex items-center gap-1 cursor-pointer'>
                     <input type="checkbox" id="loginRemember"  {...register("rememberMe")} className='w-[14px] h-[14px]' />
                     <span>Remember me</span>
                  </label>
               </div>
               <div className="">
                  <Link href={`/`} className='text-sm text-[#FF8682] font-montserrat'>Forgot Password ?</Link>
               </div>
            </div>
            <div className="">
               <button type="submit" className='w-full h-10 bg-[#8DD3BB] text-theme-black text-base font-medium rounded'>Login</button>
            </div>
         </form>
         <div className="text-center text-sm mt-2">
            <p>Don’t have an account? <span className='text-[#FF8682]' onClick={() => setOpenForm('signup')}>Sign up</span></p>
         </div>
         <div className="my-4">
            <div className="text-center text-xs opacity-60 relative after:w-full after:border-t-2 after:border-slate-200 after:absolute after:left-0 after:top-2 after:-z-10">
               <span className='bg-white px-4'>Or Sign in with</span>
            </div>
         </div>
         <div className="">
            <div className="flex gap-3">
               <div className="basis-[50%] flex items-center justify-center gap-3 border rounded py-2 px-4">
                  <FaFacebookF size={18} color='#1877F2' />
                  <span>Facebook</span>
               </div>
               <div className="basis-[50%] flex items-center justify-center gap-3 border rounded py-2 px-4">
                  <FcGoogle size={18} />
                  <span>Google</span>
               </div>
            </div>
         </div>
         <div className="mt-10">
            <p className='text-xs text-center'>By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.</p>
         </div>
      </div>
   )
}

export default SignIn