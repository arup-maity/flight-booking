'use client'
import React, { useState } from 'react'
import { Offcanvas } from '@/ui-components'
import { adminInstance } from '@/config/axios';

interface PropsType {
   isOpen: boolean;
   toggle: () => void;
   selectedCity: any
}

const CityDetails: React.FC<PropsType> = ({ isOpen, toggle, selectedCity }) => {
   const [cityDetails, setCityDetails] = useState<any>({})
   const handleOpen = async () => {
      if (selectedCity?.id) {
         try {
            const { data } = await adminInstance.get(`/city/read-city/${selectedCity.id}`)
            console.log('read-city', data)
            if (data.success) {
               setCityDetails(data.city)
            }
         } catch (error) {
            console.log(error)
         }
      }
   }
   return (
      <Offcanvas isOpen={isOpen} onOpen={handleOpen} direction='left' toggle={toggle}>
         <Offcanvas.Header toggle={toggle}>
            <h5 className='text-lg text-gray-600 font-medium mb-2'>City Details</h5>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <div className="space-y-4">
               <div className="">
                  <p className='text-sm font-medium'>City Name</p>
                  <p>{cityDetails?.cityName}</p>
               </div>
               <div className="">
                  <p className='text-sm font-medium'>Country Name</p>
                  <p>{cityDetails?.countryName}, {cityDetails?.countryCode}</p>
               </div>
               <div className="">
                  <p className='text-sm font-medium'>Airport Name</p>
                  <p>{cityDetails?.airports?.airportName} ({cityDetails?.airports?.iataCode})</p>
               </div>
            </div>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default CityDetails