'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { boolean, z } from 'zod'
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authInstance } from '@/config/axios';
import Link from 'next/link';
import { toast } from 'sonner';
import { handleApiError } from '@/utils';
import { useLoginModel } from './zustand';
import { useRouter } from 'next/navigation';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PropsType {
   setOpenForm: (value: string) => void;
}
type Inputs = {
   fullName: string
   email: string
   password: string
   confirmPassword: string
   condition: boolean
}
const SignUp: React.FC<PropsType> = ({ setOpenForm }) => {
   const router = useRouter()
   const { toggleLoginModel } = useLoginModel(state => state)
   const [showPassword, setShowPassword] = useState<boolean>(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
   const [loading, setLoading] = useState(false)
   const schemaValidation = z
      .object({
         fullName: z.string().min(5, 'required'),
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
      mode: 'onSubmit',
      resolver: zodResolver(schemaValidation),
   })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         setLoading(true)
         const res = await authInstance.post('/user/register', data)
         if (res.data.success) {
            router.push('/')
            toggleLoginModel()
            toast.success('Account created successfully')
         }
      } catch (error) {
         toast.error(handleApiError(error))
      } finally {
         setLoading(false)
      }
   }
   return (
      <div className="w-full">
         <div className="mb-4">
            <div className="text-2xl font-medium mb-1">Sign Up</div>
            <p className='text-sm'>Login to access your Golobe account</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <fieldset>
               <div className="relative">
                  <input type="text" id="fullName"  {...register("fullName")} className="block px-2 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                  <label htmlFor="fullName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">fullName</label>
               </div>
               {
                  errors.email && (
                     <div className="text-xs text-red-500 dark:text-red-400">{errors.email.message}</div>
                  )
               }
            </fieldset>
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
                  <input type={showPassword ? 'text' : 'password'} id="password" {...register("password")} className="block px-1.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                  <div className="absolute top-3 right-2 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                     {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                  </div>
               </div>
               {
                  errors.password && (
                     <div className="text-xs text-red-500 dark:text-red-400">{errors.password.message}</div>
                  )
               }
            </fieldset>
            <fieldset>
               <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" {...register("confirmPassword")} className="block px-1.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="confirmPassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
                  <div className="absolute top-3 right-2 cursor-pointer" onClick={() => setShowConfirmPassword(prev => !prev)}>
                     {showConfirmPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                  </div>
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
               <button type="submit" disabled={loading} className='w-full h-10 flex justify-center bg-[#8DD3BB] text-base font-medium rounded'>
                  {
                     loading ?
                        <div className="flex items-center gap-4">
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           <span>Create Account</span>
                        </div>
                        : 'Create Account'
                  }
               </button>
            </div>
         </form>
         <div className="text-center text-sm mt-2">
            <p>Already have an account? <span className='text-[#FF8682] cursor-pointer' onClick={() => setOpenForm('signin')}>Sign In</span></p>
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