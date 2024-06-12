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
                  <p className='text-sm font-medium opacity-50'>City Name</p>
                  <p className='text-base'>{cityDetails?.cityName}</p>
               </div>
               <div className="">
                  <p className='text-sm font-medium opacity-50'>Country Name</p>
                  <p className='text-base'>{cityDetails?.countryName}, {cityDetails?.countryCode}</p>
               </div>
               <div className="">
                  <p className='text-sm font-medium opacity-50'>Airport Name</p>
                  {
                     cityDetails?.airports?.airportName ?
                     <p className='text-base'>{cityDetails?.airports?.airportName} ({cityDetails?.airports?.iataCode})</p>
                     :
                     'Not avaliable airport'
                  }
               </div>
            </div>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default CityDetails