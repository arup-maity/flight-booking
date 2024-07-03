'use client'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '@/config/axios'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { handleApiError } from '@/utils'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface profileType {
   fullName: string;
   dob: string | Date;
   gender: string;
   mobileNumber: string;
   address: string;
   country: string;
   state: string;
}

const Settings = ({ profileDetails, setUpdateProfile }: { profileDetails: any; setUpdateProfile: () => void }) => {
   const [profileLoading, setProfileLoading] = useState(false)
   const [passwordChangeLoading, setPasswordChangeLoading] = useState<boolean>(false)
   const [oldPasswordShow, setOldPasswordShow] = useState(false)
   const [newPasswordShow, setNewPasswordShow] = useState(false)
   const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)
   // react hook form
   const defaultValues: Partial<profileType> = { fullName: '', dob: new Date(), gender: '', mobileNumber: '', address: '', country: '', state: '' }
   const passwordDefaultValues = { oldPassword: '', newPassword: '', confirmNewPassword: '', }
   const schemaValidation = z.object({
      fullName: z.string().min(1, 'The name must be at least 2 characters long'),
      dob: z.string().min(1, 'The date of birth must be valid'),
      gender: z.string().min(1, 'The gender must be selected'),
      mobileNumber: z.string().min(10, 'The mobile number must be at least 10 characters long').regex(/^\d+$/, 'The mobile number must be numeric'),
      address: z.string().min(1, 'The address must be at least 2 characters long'),
      country: z.string().min(1, 'The country must be selected'),
      state: z.string().min(1, 'The state must be selected')
   })
   const passwordSchemaValidation = z.object({
      oldPassword: z.string().min(1, 'The password must be at least 8 characters long'),
      newPassword: z
         .string()
         .min(8, 'The password must be at least 8 characters long')
         .max(32, 'The password must be a maximun 32 characters')
         .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/),
      confirmNewPassword: z.string()
   }).refine((fields) => fields.oldPassword !== fields.newPassword, {
      path: ['newPassword'],
      message: "New password cannot be same as old password"
   }).refine((fields) => fields.newPassword === fields.confirmNewPassword, {
      path: ['confirmNewPassword'],
      message: "Passwords don't match"
   });
   const { register, control, handleSubmit, setValue, formState: { errors }, } = useForm({ defaultValues, mode: 'onSubmit', resolver: zodResolver(schemaValidation) })
   const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm({ defaultValues: passwordDefaultValues, mode: 'onSubmit', resolver: zodResolver(passwordSchemaValidation) });

   useEffect(() => {
      for (const key in defaultValues) {
         switch (key) {
            case 'address':
               setValue("address", profileDetails?.address?.address)
               break;
            case 'country':
               setValue("country", profileDetails?.address?.country)
               break;
            case 'state':
               setValue("state", profileDetails?.address?.state)
               break;
            default:
               setValue(key as keyof profileType, profileDetails[key as keyof profileType])
               break;
         }
      }
   }, [profileDetails])

   const onSubmit = async (data: any) => {
      try {
         setProfileLoading(true)
         const address = { address: data.address, country: data.country, state: data.state }
         const res = await axiosInstance.put("/user/profile-update", { ...data, address })
         if (res.data?.success) {
            toast.success('Profile updated successfully')
         }
         setUpdateProfile()
      } catch (error) {
         console.log(error)
      } finally {
         setProfileLoading(false)
      }
   }
   const passwordOnSubmit = async (data: any) => {
      try {
         setPasswordChangeLoading(true)
         const res = await axiosInstance.put("/user/change-password", data)
         if (res.data?.success) {
            toast.success('Password changed successfully')
         }
      } catch (error) {
         toast.error(handleApiError(error))
      } finally {
         setPasswordChangeLoading(false)
      }
   }
   return (
      <div className="">
         <div className="mb-10">
            <div className="text-lg font-medium font-montserrat mb-4">Edit Profile Details</div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="flex flex-wrap -m-2">
                  <div className="w-6/12 p-2">
                     <label htmlFor="" className='block text-base text-gray-500 mb-1'>Full Name</label>
                     <input {...register("fullName")} className='w-full h-10 px-3 text-base border border-slate-300 rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='' />
                     {errors.fullName && <span className='text-red-500'>{errors.fullName.message}</span>}
                  </div>
                  <div className="w-6/12 p-2">
                     <label htmlFor="" className='block text-base text-gray-500 mb-1'>Date of birth</label>
                     <Controller
                        control={control}
                        name="dob"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                           <Flatpickr
                              value={value}
                              options={{ dateFormat: "d-M-Y" }}
                              onChange={([date]) => onChange(date)}
                              className='w-full h-10 text-base border rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue px-3'
                           />
                        )}
                     />
                     {errors.dob && <span className='text-red-500'>{errors.dob.message}</span>}
                  </div>
                  <div className="w-6/12 p-2">
                     <label htmlFor="" className='block text-base text-gray-500 mb-1'>Gender</label>
                     <select {...register("gender")} className='w-full h-10 px-3 text-base border border-slate-300 rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue'>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                     </select>
                     {errors.gender && <span className='text-red-500'>{errors.gender.message}</span>}
                  </div>
                  <div className="w-6/12 p-2">
                     <label htmlFor="" className='block text-base text-gray-500 mb-1'>Phone number</label>
                     <input {...register("mobileNumber")} className='w-full h-10 px-3 text-base border border-slate-300 rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='' />
                     {errors.mobileNumber && <span className='text-red-500'>{errors.mobileNumber.message}</span>}
                  </div>
                  <div className="w-6/12 p-2">
                     <label htmlFor="" className='block text-base text-gray-500 mb-1'>Address</label>
                     <input {...register("address")} className='w-full h-10 px-3 text-base border border-slate-300 rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='' />
                     {errors.address && <span className='text-red-500'>{errors.address.message}</span>}
                  </div>
                  <div className="w-6/12 p-2">
                     <label htmlFor="" className='block text-base text-gray-500 mb-1'>Country</label>
                     <input {...register("country")} className='w-full h-10 px-3 text-base border border-slate-300 rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='' />
                     {errors.country && <span className='text-red-500'>{errors.country.message}</span>}
                  </div>
                  <div className="w-6/12 p-2">
                     <label htmlFor="" className='block text-base text-gray-500 mb-1'>State</label>
                     <input {...register("state")} className='w-full h-10 px-3 text-base border border-slate-300 rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='' />
                     {errors.state && <span className='text-red-500'>{errors.state.message}</span>}
                  </div>
               </div>
               <div className="mt-4">
                  <button type="submit" disabled={profileLoading} className=' px-6 py-2 text-sm font-medium text-white bg-theme-blue rounded-md hover:bg-theme-blue-dark'>
                     {
                        profileLoading ? 'Updating...' : 'Save Changes'
                     }
                  </button>
               </div>
            </form>
         </div>
         <div className="">
            <div className="text-lg font-medium font-montserrat mb-4">Change Password</div>
            <div className="">
               <form onSubmit={handleSubmit2(passwordOnSubmit)}>
                  <div className="flex flex-wrap -m-2">
                     <div className="w-6/12 p-2">
                        <label htmlFor="" className='block text-base text-gray-500 mb-1'>Old Password</label>
                        <div className="relative">
                           <input type={oldPasswordShow ? 'text' : "password"} {...register2("oldPassword")} className='w-full px-3 py-2 text-base text-gray-600 border border-theme-gray rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='Enter Old Password' autoComplete='off' />
                           <div className="absolute top-3 right-2 cursor-pointer" onClick={() => setOldPasswordShow(prev => !prev)}>
                              {oldPasswordShow ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                           </div>
                        </div>
                        {errors2.oldPassword && <p className="text-sm text-red-500">{errors2?.oldPassword?.message}</p>}
                     </div>
                     <div className="w-6/12 p-2">
                        <label htmlFor="" className='block text-base text-gray-500 mb-1'>New Password</label>
                        <div className=" relative">
                           <input type={newPasswordShow ? 'text' : "password"} {...register2("newPassword")} className='w-full px-3 py-2 text-base text-gray-600 border border-theme-gray rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='Enter New Password' autoComplete='off' />
                           <div className="absolute top-3 right-2 cursor-pointer" onClick={() => setNewPasswordShow(prev => !prev)}>
                              {newPasswordShow ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                           </div>
                        </div>
                        {errors2.newPassword && <p className="text-sm text-red-500">{errors2?.newPassword?.message}</p>}
                     </div>
                     <div className="w-6/12 p-2">
                        <label htmlFor="" className='block text-base text-gray-500 mb-1'>Confirm New Password</label>
                        <div className=" relative">
                           <input type={confirmPasswordShow ? 'text' : "password"} {...register2("confirmNewPassword")} className='w-full px-3 py-2 text-base text-gray-600 border border-theme-gray rounded-md focus:outline-none focus:ring-theme-blue focus:border-theme-blue' placeholder='Confirm New Password' autoComplete='off' />
                           <div className="absolute top-3 right-2 cursor-pointer" onClick={() => setConfirmPasswordShow(prev => !prev)}>
                              {confirmPasswordShow ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                           </div>
                        </div>
                        {errors2.confirmNewPassword && <p className="text-sm text-red-500">{errors2?.confirmNewPassword?.message}</p>}
                     </div>
                  </div>
                  <div className="mt-4">
                     <button type="submit" disabled={passwordChangeLoading} className=' px-6 py-2 text-sm font-medium text-white bg-theme-blue rounded-md hover:bg-theme-blue-dark'>
                        {
                           passwordChangeLoading ? 'Updating...' : 'Change Password'
                        }
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Settings