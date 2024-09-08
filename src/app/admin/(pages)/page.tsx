'use client'
import BreadCrumbs from '@/components/common/BreadCrumbs'
import { adminInstance } from '@/config/axios';
import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react'
import { FaTreeCity } from "react-icons/fa6";
import { MdConnectingAirports } from "react-icons/md";
import { MdLocalAirport } from "react-icons/md";
const Admin = () => {
   const [totalServices, setTotalServices] = useState({ totalCity: 0, totalAirport: 0, totalAirplane: 0 })
   useLayoutEffect(() => {
      getTotalService()
   }, [])

   async function getTotalService() {
      try {
         // const res = await adminInstance.get(`/city/total-city-services`)
         // console.log(res)

         Promise.all([
            (adminInstance.get(`/city/total-city-services`)),
            (adminInstance.get(`/airport/total-airport-services`)),
            (adminInstance.get(`/airplane/total-airplane-services`)),
         ])
            .then(
               axios.spread((city, airport, airplane) => {
                  setTotalServices({
                     totalCity: city.data.totalCity,
                     totalAirport: airport.data.totalAirport,
                     totalAirplane: airplane.data.totalAirplane
                  })
               })
            )

      } catch (error) {
         console.error(error)
      }
   }

   return (
      <div className='w-full'>
         <BreadCrumbs title='Dashboard' data={[{ title: 'Dashboard' }]} />
         <div className="flex flex-wrap -m-2">
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
               <div className="bg-white rounded p-4">
                  <div className="flex items-center gap-4 mb-4">
                     <FaTreeCity size={20} />
                     <span>Total City Service</span>
                  </div>
                  <div className="text-xl font-semibold ms-9">
                     {totalServices.totalCity}
                  </div>
               </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
               <div className="bg-white rounded p-4">
                  <div className="flex items-center gap-4 mb-4">
                     <MdConnectingAirports size={20} />
                     <span>Total Airport Service</span>
                  </div>
                  <div className="text-xl font-semibold ms-9">
                     {totalServices.totalAirport}
                  </div>
               </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
               <div className="bg-white rounded p-4">
                  <div className="flex items-center gap-4 mb-4">
                     <MdLocalAirport size={20} />
                     <span>Total Airplane Service</span>
                  </div>
                  <div className="text-xl font-semibold ms-9">
                     {totalServices.totalAirplane}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Admin