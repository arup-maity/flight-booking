'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { FcGoogle } from "react-icons/fc";
import { authInstance } from '@/config/axios';
import { toast } from 'sonner';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface ValueType {
   email: string;
   password: string;
}

const Login = () => {
   const router = useRouter()
   const [showPassword, setShowPassword] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(false)
   const defaultValues: Partial<ValueType> = { email: '', password: '' }
   const schemaValidation = z.object({
      email: z.string().email().min(5, 'Field is required'),
      password: z.string()
         .min(8, { message: 'Password must be at least 8 characters long' })
         .max(20, { message: 'Password must be at most 20 characters long' })
         .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
         .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
         .regex(/[0-9]/, { message: 'Password must contain at least one number' })
         .regex(/[@#$&]/, { message: 'Password must contain at least one special character: @, #, $, &' })
         .regex(/^\S*$/, { message: 'Password must not contain any whitespace characters' })
         .regex(/^[a-zA-Z0-9@#$&]*$/, { message: 'Password can only contain letters, numbers, and special characters: @, #, $, &' }),
   })
   const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues, mode: 'onChange', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      try {
         const res = await authInstance.post(`/admin/login`, data);
         if (res.data?.success && res.data?.login) {
            toast('Login successfully')
            router.push('/admin')
         }
      } catch (error) {
         console.log('error', error)
      }
   }

   return (
      <div className='w-full min-h-screen bg-no-repeat bg-cover flex items-center justify-center p-2' style={{ backgroundImage: "url('/images/plane-01.jpg')" }} >
         <div className="w-full lg:w-5/12 flex items-center bg-black bg-opacity-70 rounded p-10">
            <div className="w-full md:w-[80%] mx-auto">
               <div className="mb-10">
                  <div className="text-2xl text-white font-medium mb-2">Login</div>
                  <p className='text-sm text-white opacity-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, dolor!</p>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset className="relative z-0 mb-6">
                     <input type="text" id="email" {...register("email")} className="block py-1.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 peer" placeholder="" autoComplete='off' />
                     <label htmlFor="email" className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-5 top-2 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-sm peer-focus:-translate-y-5 ">Email</label>
                     {errors?.email && <p className='text-sm text-red-500 mt-1'>{errors?.email?.message}</p>}
                  </fieldset>
                  <fieldset className="relative z-0 mb-4">
                     <input type={showPassword ? 'text' : 'password'} id="password" {...register("password")} className="block py-1.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 peer" placeholder="" autoComplete='off' />
                     <label htmlFor="password" className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-5 top-2 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-sm peer-focus:-translate-y-5 ">Password</label>
                     <div className="absolute top-2 right-2">
                        {
                           showPassword ? <IoEyeOutline size={20} className='cursor-pointer text-white' onClick={() => setShowPassword(false)} /> : <IoEyeOffOutline size={20} className='cursor-pointer text-white' onClick={() => setShowPassword(true)} />
                        }
                     </div>
                     {errors?.password && <p className='text-sm text-red-500 mt-1'>{errors?.password?.message}</p>}
                  </fieldset>
                  <button type="submit" disabled={loading} className='w-full bg-[#8DD3BB] text-base font-medium rounded py-2 px-4 '>
                     Login
                  </button>
               </form>
               <div className="relative w-full py-4">
                  <span className='absolute flex justify-center text-sm text-white w-full'>Or login with</span>
               </div>
               <div className="mt-5">
                  <Link href={`/`} className='flex items-center justify-center text-sm text-white border border-[#8DD3BB] rounded py-2 px-4'><FcGoogle size={20} className='me-2' /> Login with google</Link>
               </div>
            </div>
         </div>
      </div >
   )
}

export default Login