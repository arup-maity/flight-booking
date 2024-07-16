'use client'
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authInstance } from '@/config/axios';
import Link from 'next/link';
import { toast } from 'sonner';
import { handleApiError } from '@/utils';
import { useLoginModel } from './zustand';
import { useRouter } from 'next/navigation';

interface PropsType {
   setOpenForm: (value: string) => void;
}
type Inputs = {
   email: string
   password: string
   confirmPassword: string
   condition: boolean
}
const SignUp: React.FC<PropsType> = ({ setOpenForm }) => {
   const router = useRouter()
   const { toggleLoginModel } = useLoginModel(state => state)
   const schemaValidation = z
      .object({
         email: z.string().email(),
         password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" })
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character." }),
         confirmPassword: z.string(),
         condition: z.boolean(),
      })
      .refine(
         (data) => data.password === data.confirmPassword, {
         message: "Passwords do not match",
         path: ["confirmPassword"]
      })
      .refine(
         (data) => data.condition === true, {
         message: "Accepted Terms and Privacy Policies",
         path: ["condition"]
      })
   const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({
      mode: 'onChange',
      resolver: zodResolver(schemaValidation),
   })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         const res = await authInstance.post('/user/register', data)
         if (res.data.success) {
            router.push('/account')
            toggleLoginModel()
            toast.success('Account created successfully')
         }
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }
   return (
      <div className="w-full">
         <div className="mb-4">
            <div className="text-2xl font-medium mb-1">Sign Up</div>
            <p className='text-sm'>Login to access your Golobe account</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <fieldset>
               <div className="relative">
                  <input type="text" id="email"  {...register("email")} className="block px-2 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                  <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
               </div>
               {
                  errors.email && (
                     <div className="text-xs text-red-500 dark:text-red-400">{errors.email.message}</div>
                  )
               }
            </fieldset>
            <fieldset>
               <div className="relative">
                  <input type="text" id="password" {...register("password")} className="block px-1.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
               </div>
               {
                  errors.password && (
                     <div className="text-xs text-red-500 dark:text-red-400">{errors.password.message}</div>
                  )
               }
            </fieldset>
            <fieldset>
               <div className="relative">
                  <input type="text" id="confirmPassword" {...register("confirmPassword")} className="block px-1.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="confirmPassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
               </div>
               {
                  errors.confirmPassword && (
                     <div className="text-xs text-red-500 dark:text-red-400">
                        {errors.confirmPassword.message}
                     </div>
                  )
               }
            </fieldset>
            <div className="">
               <label htmlFor="condition" className='text-sm flex items-center gap-1 cursor-pointer'>
                  <input type="checkbox" id="condition" {...register("condition")} className='w-[14px] h-[14px]' />
                  <span>I agree to all the <Link href='page/terms' className='text-[#FF8682]'>Terms</Link> and <span className='text-[#FF8682]'>Privacy Policies</span></span>
               </label>
            </div>
            {
               errors.condition && (
                  <div className="text-xs text-red-500 dark:text-red-400">{errors.condition.message}</div>
               )
            }
            <div className="">
               <button type="submit" className='w-full h-10 bg-[#8DD3BB] text-base font-medium rounded'>Create Account</button>
            </div>
         </form>
         <div className="text-center text-sm mt-2">
            <p>Already have an account? <span className='text-[#FF8682]' onClick={() => setOpenForm('signin')}>Sign In</span></p>
         </div>
         <div className="my-4">
            <div className="text-center text-xs opacity-60 relative after:w-full after:border-t-2 after:border-slate-200 after:absolute after:left-0 after:top-2 after:-z-10"><span className='bg-white px-4'>Or Sign up with</span></div>
         </div>
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
         <div className="mt-8">
            <p className='text-xs text-center'>By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.</p>
         </div>
      </div>
   )
}

export default SignUp