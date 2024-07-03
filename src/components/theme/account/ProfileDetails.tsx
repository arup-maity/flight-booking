'use client'
import dayjs from 'dayjs'
import React from 'react'

const ProfileDetails = ({ profileDetails }: { profileDetails: any }) => {

   return (
      <div className="space-y-5">
         <div className="">
            <label htmlFor="" className='block text-sm text-gray-500'>Full Name</label>
            <p className='text-lg font-medium font-montserrat'>{profileDetails?.fullName}</p>
         </div>
         <div className="">
            <label htmlFor="" className='block text-sm text-gray-500'>Email</label>
            <p className='text-lg font-medium font-montserrat'>{profileDetails?.email}</p>
         </div>
         <div className="">
            <label htmlFor="" className='block text-sm text-gray-500'>Phone Number</label>
            <p className='text-lg font-medium font-montserrat'>{profileDetails?.mobileNumber}</p>
         </div>
         <div className="">
            <label htmlFor="" className='block text-sm text-gray-500'>Address</label>
            <p className='text-lg font-medium font-montserrat'>{profileDetails?.address?.address + ', ' + profileDetails?.address?.state + ', ' + profileDetails?.address?.country}</p>
         </div>
         <div className="">
            <label htmlFor="" className='block text-sm text-gray-500'>Date of Birth</label>
            <p className='text-lg font-medium font-montserrat'>{profileDetails?.dob && dayjs(profileDetails.dob).format('DD/MM/YYYY')}</p>
         </div>
      </div>
   )
}

export default ProfileDetails