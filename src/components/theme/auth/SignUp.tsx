'use client'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface PropsType {
   setOpenForm: (value: string) => void;
}

const SignUp: React.FC<PropsType> = ({ setOpenForm }) => {
   return (
      <div className="w-full">
         <div className="mb-4">
            <div className="text-2xl font-medium mb-1">Sign Up</div>
            <p className='text-sm'>Login to access your Golobe account</p>
         </div>
         <form className='space-y-3'>
            <div className="relative">
               <input type="text" id="floating_outlined" className="block px-1.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
               <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
            </div>
            <div className="relative">
               <input type="text" id="floating_outlined" className="block px-1.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
               <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
            </div>
            <div className="relative">
               <input type="text" id="floating_outlined" className="block px-1.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
               <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
            </div>


            <div className="">
               <label htmlFor="loginRemember" className='text-sm flex items-center gap-1 cursor-pointer'>
                  <input type="checkbox" name="" id="loginRemember" className='w-[14px] h-[14px]' />
                  <span>I agree to all the <span className='text-[#FF8682]'>Terms</span> and <span className='text-[#FF8682]'>Privacy Policies</span></span>
               </label>
            </div>
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

export default SignUp