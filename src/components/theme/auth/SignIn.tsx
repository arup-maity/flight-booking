'use client'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface PropsType {
   setOpenForm: (value: string) => void;
}

const SignIn: React.FC<PropsType> = ({ setOpenForm }) => {
   return (
      <div className="w-full">
         <div className="mb-4">
            <div className="text-2xl font-medium mb-1">Login</div>
            <p className='text-sm'>Login to access your Golobe account</p>
         </div>
         <form className='space-y-3'>
            <fieldset>
               <label htmlFor="" className='text-sm'>Email</label>
               <input type="text" className='w-full h-10 border border-slate-400 rounded' />
            </fieldset>
            <fieldset>
               <label htmlFor="" className='text-sm'>Password</label>
               <input type="text" className='w-full h-10 border border-slate-400 rounded' />
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