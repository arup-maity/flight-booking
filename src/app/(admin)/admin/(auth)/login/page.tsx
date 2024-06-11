'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { FcGoogle } from "react-icons/fc";
import { authInstance } from '@/config/axios';
import { toast } from 'sonner';
interface ValueType {
   email: string;
   password: string;
}

const Login = () => {
   const router = useRouter()
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
      console.log(data)
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
      <div className='w-full h-full p-2' >
         <div className="flex flex-wrap -m-2">
            <div className="w-full lg:w-7/12 hidden lg:block p-2">
               <Image src={`/images/svg-02.jpg`} width={200} height={200} alt='' className='w-auto h-full' />
            </div>
            <div className="w-full lg:w-5/12 min-h-screen flex items-center p-2">
               <div className="w-full md:w-[80%] mx-auto">
                  <div className="text-2xl font-medium mb-5">Login</div>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                     <fieldset>
                        {/* <label htmlFor="" className=" relative">
                           <input type="text" {...register("email")} className='peer w-full h-10 text-base border border-[#79747E] rounded p-3' />
                           <span className='bg-white absolute -top-0.5 left-2 peer-focus:-top-[22px] text-base  peer-focus:text-sm transition-all duration-500 z-10 px-2'>Email</span>
                        </label> */}
                        <input type="text" {...register("email")} className='peer w-full h-10 text-base border border-[#79747E] rounded p-3' />
                        {errors.email && <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>}
                     </fieldset>
                     <fieldset>
                        {/* <label htmlFor="" className=" relative">
                           <input type='password' {...register("password")} className='peer w-full h-10 text-base border border-[#79747E] rounded p-3' />
                           <span className='bg-white absolute -top-0.5 left-2 peer-focus:-top-[22px] text-base  peer-focus:text-sm transition-all duration-500 z-10 px-2'>Password</span>
                        </label> */}
                        <input type='password' {...register("password")} className='peer w-full h-10 text-base border border-[#79747E] rounded p-3' />
                        {errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>}
                     </fieldset>
                     <button type="submit" className='w-full bg-[#8DD3BB] text-sm font-normal rounded py-2 px-4 '>
                        Login
                     </button>
                  </form>
                  <div className="relative w-full py-4">
                     <span className='absolute flex justify-center text-sm w-full'>Or login with</span>
                  </div>
                  <div className="mt-5">
                     <Link href={`/`} className='flex items-center justify-center text-sm border border-[#8DD3BB] rounded py-2 px-4'><FcGoogle size={20} className='me-2' /> Login with google</Link>
                  </div>
               </div>
            </div>
         </div>
      </div >
   )
}

export default Login