'use client'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { LiaAngleLeftSolid } from "react-icons/lia";
interface PropsType {
   setOpenForm: (value: string) => void;
}
interface IFormInput {
   code: string
}
const VerifyCode: React.FC<PropsType> = ({ setOpenForm }) => {
   const { register, handleSubmit } = useForm<IFormInput>()
   const onSubmit: SubmitHandler<IFormInput> = (data) => {

   }
   return (
      <div className="w-full">
         <div className='flex items-center gap-1 mb-5'>
            <LiaAngleLeftSolid />
            <p className='text-sm'>Back to login</p>
         </div>
         <div className="mb-5">
            <div className="text-2xl font-medium mb-1">Verify code</div>
            <p className='text-sm'>An authentication code has been sent to your email.</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <fieldset>
               <label htmlFor="" className='text-sm'>Enter Code</label>
               <input type="text" className='w-full h-10 border border-slate-400 rounded px-3' />
            </fieldset>
            {/* <div className="">
               <p className='text-sm'>Didn’t receive a code? <span className='text-[#FF8682]'>Resend</span></p>
            </div> */}
            <div className="">
               <button type="submit" className='w-full h-10 bg-[#8DD3BB] text-[#0c0c0c] text-base font-medium rounded'>Verify</button>
            </div>
         </form>
      </div>
   )
}

export default VerifyCode