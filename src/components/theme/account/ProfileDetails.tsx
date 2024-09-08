'use client'
import dayjs from 'dayjs'
import React from 'react'

const ProfileDetails = ({ profileDetails, handleTab }: { profileDetails: { [key: string]: any }, handleTab: (id: string) => void }) => {
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
            {
               profileDetails?.mobileNumber ?
                  <p className='text-lg font-medium font-montserrat'>{profileDetails?.mobileNumber}</p> :
                  <p className='text-sm text-theme-blue' onClick={() => handleTab('settings')}>Add Phone Number</p>
            }
         </div>
         <div className="">
            <label htmlFor="" className='block text-sm text-gray-500'>Address</label>
            {
               profileDetails?.address ?
                  <p className='text-lg font-medium font-montserrat'>{profileDetails?.address?.address + ', ' + profileDetails?.address?.state + ', ' + profileDetails?.address?.country}</p> :
                  <p className='text-sm text-theme-blue' onClick={() => handleTab('settings')}>Address</p>
            }
         </div>
         <div className="">
            <label htmlFor="" className='block text-sm text-gray-500'>Date of Birth</label>
            {
               profileDetails?.dob ?
                  <p className='text-lg font-medium font-montserrat'>{dayjs(profileDetails.dob).format('DD/MM/YYYY')}</p> :
                  <p className='text-sm text-theme-blue' onClick={() => handleTab('settings')}>Add DOB</p>
            }
         </div>
      </div>
   )
}

export default ProfileDetails