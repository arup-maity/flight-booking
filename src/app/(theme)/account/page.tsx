'use client'
import React, { useLayoutEffect, useState } from 'react'
import Image from 'next/image';
import ProfileDetails from '@/components/theme/account/ProfileDetails';
import OrderDetails from '@/components/theme/account/OrderDetails';
import Settings from '@/components/theme/account/Settings';
import { axiosInstance } from '@/config/axios';
import { IoCameraOutline } from "react-icons/io5";

const Account = () => {
   const [currentTab, setCurrentTab] = useState('profile-details')
   const [profileDetails, setProfileDetails] = useState<any>({})
   const [updateProfile, setUpdateProfile] = useState(false)
   const [loading, setLoading] = useState(true)

   useLayoutEffect(() => {
      getProfileDetails()
   }, [updateProfile])

   async function getProfileDetails() {
      try {
         const res = await axiosInstance.get(`/user/profile-details`)
         console.log('profile', res)
         if (res.data.success) {
            setProfileDetails(res.data.profile)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   if (loading) {
      // return <div className="flex justify-center items-center h-screen">Loading...</div>
      return (
         <div className="flex justify-center items-center h-screen">
            <Image src='/images/loading-svg.svg' width={500} height={500} alt="" />
         </div>
      )
   }
   return (
      <div className='w-full theme-container mb-10'>
         <div className="py-5">
            <div style={{ backgroundImage: 'url("/images/img-36.jpg")', }} className='relative w-full aspect-[1440/300] bg-cover bg-center'>
               {/* <div className="absolute right-0 bottom-0 p-6">
                  <button type="button" className='flex items-center gap-1 whitespace-nowrap bg-theme-blue text-sm text-[#112211] font-medium font-montserrat rounded py-2 px-4'><IoCloudUploadOutline /> <span>Upload new cover</span></button>
               </div> */}
            </div>
            <div className="relative -mt-20 z-10">
               <div className="text-center">
                  <div className="relative w-36 h-36 mx-auto rounded-full">
                     <Image src={'/images/user-1.png'} width={160} height={160} alt='' className='w-36 h-36' />
                     <div className="absolute -right-3 top-[60%] w-7 h-7 bg-gray-100 rounded-full p-1">
                        <button className='text-[#666]'><IoCameraOutline /></button>
                     </div>
                  </div>
                  <p className='text-2xl text-theme-black font-semibold font-montserrat mb-2'>{profileDetails?.fullName}</p>
                  <p className='text-base text-theme-black font-montserrat text-opacity-75 mb-2'>{profileDetails?.email}</p>
               </div>
            </div>
         </div>
         <div className="flex flex-wrap -m-4">
            <div className="w-3/12 p-4">
               <div className="">
                  <ul className='*:text-base space-y-1'>
                     <li className={`${currentTab === 'profile-details' ? 'bg-theme-blue font-medium' : 'bg-gray-100'} rounded py-1.5 px-4`} onClick={() => setCurrentTab('profile-details')}>Account Details</li>
                     <li className={`${currentTab === 'order-details' ? 'bg-theme-blue font-medium' : 'bg-gray-100'} rounded py-1.5 px-4`} onClick={() => setCurrentTab('order-details')}>Order Details</li>
                     <li className={`${currentTab === 'settings' ? 'bg-theme-blue font-medium' : 'bg-gray-100'} rounded py-1.5 px-4`} onClick={() => setCurrentTab('settings')}>Settings</li>
                  </ul>
               </div>
            </div>
            <div className="w-9/12 p-4">
               {
                  currentTab === 'profile-details' ? <ProfileDetails profileDetails={profileDetails} /> : currentTab === 'order-details' ? <OrderDetails /> : <Settings profileDetails={profileDetails} setUpdateProfile={() => setUpdateProfile(prev => !prev)} />
               }
            </div>
         </div>
      </div>
   )
}

export default Account