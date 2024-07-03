'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { IoCloseOutline } from "react-icons/io5";
import { useLoginModel } from './zustand'
import VerifyCode from './VerifyCode'

const Login = () => {
   const { open, toggleModel } = useLoginModel(state => state)
   const [openForm, setOpenForm] = useState('signin')
   useEffect(() => {
      if (open) {
         document.body.style.position = "fixed"
         document.body.style.overflowY = "scroll";
      } else {
         document.body.style.position = "static"
         document.body.style.overflow = "auto";
      }
   }, [open])
   if (!open) {
      return null;
   }
   return (
      <div className={`fixed w-full h-full bg-[#000] bg-opacity-50 flex justify-center items-center overflow-hidden overflow-y-auto top-0 left-0 z-[1048] opacity-100 transition-opacity duration-200 ease-in-out`}>
         <div className="w-[1000px] max-w-full relative flex flex-col bg-white rounded-md p-10 m-2">
            <div role='button' className="absolute top-3 right-3" onClick={toggleModel}><IoCloseOutline size={25} /></div>
            <div className="flex flex-wrap items-center -m-4">
               <div className="w-full h-full lg:w-6/12 p-4">
                  {openForm === 'signin' ? <SignIn setOpenForm={setOpenForm} toggleModel={toggleModel} /> :
                     openForm === 'signup' ? <SignUp setOpenForm={setOpenForm} /> :
                        <VerifyCode setOpenForm={setOpenForm} />
                  }
               </div>
               <div className="w-full lg:w-6/12 hidden lg:block p-4">
                  <Image src={'/images/img-35.jpg'} width={600} height={800} alt='' className='w-full h-full' />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login