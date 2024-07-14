'use client'
import React from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { sessionContext } from '@/authentication/auth';
import { authInstance } from '@/config/axios'

interface PropsType {
   setOpenForm: (value: string) => void;
   toggleModel: () => void;
}
interface IFormInput {
   email: string
   password: string
}
const SignIn: React.FC<PropsType> = ({ setOpenForm, toggleModel }) => {
   const { toggle } = React.useContext<any>(sessionContext);
   const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      try {
         const res = await authInstance.post('/user/login', data)
         console.log('======>', res)
         if (res.data.success && res.data.login) {
            toggle(res.data)
            toggleModel()
         }
      } catch (error) {

      }
   }
   return (
      <div className="w-full">
         <div className="mb-4">
            <div className="text-2xl font-medium mb-1">Login</div>
            <p className='text-sm'>Login to access your Golobe account</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <fieldset>
               <label htmlFor="" className='text-sm'>Email</label>
               <input type="text" {...register("email")} className='w-full h-10 border border-slate-400 rounded' />
               {
                  errors.email && <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>
               }
            </fieldset>
            <fieldset>
               <label htmlFor="" className='text-sm'>Password</label>
               <input type="text" {...register("password")} className='w-full h-10 border border-slate-400 rounded' />
               {
                  errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>
               }
            </fieldset>
            <div className="flex flex-nowrap justify-between">
               <div className="">
                  <label htmlFor="loginRemember" className='text-sm flex items-center gap-1 cursor-pointer'>
                     <input type="checkbox" name="" id="loginRemember" className='w-[14px] h-[14px]' />
                     <span>Remember me</span>
                  </label>
               </div>
               <div className="">
                  <Link href={`/`} className='text-sm text-[#FF8682]'>Forgot Password</Link>
               </div>
            </div>
            <div className="">
               <button type="submit" className='w-full h-10 bg-[#8DD3BB] text-white text-base font-medium rounded'>Login</button>
            </div>
         </form>
         <div className="text-center text-sm mt-2">
            <p>Don’t have an account? <span className='text-[#FF8682]' onClick={() => setOpenForm('signup')}>Sign up</span></p>
         </div>
         <div className="my-4">
            <div className="text-center text-xs opacity-60 relative after:w-full after:border-t-2 after:border-slate-200 after:absolute after:left-0 after:top-2 after:-z-10"><span className='bg-white px-4'>Or Sign in with</span></div>
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