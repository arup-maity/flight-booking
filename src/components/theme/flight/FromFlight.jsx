'use client'
import React, { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { axiosInstance } from '@/config/axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useQuery } from '@tanstack/react-query'

const FromFlight = ({ isOpen, toggle, setFromDetails }) => {
   const [filterAirports, setFilterAirports] = useState([])
   const [debouncedValue, setValue] = useDebounceValue('', 1000)

   useEffect(() => {
      handleSearch(debouncedValue)
   }, [debouncedValue])

   async function handleSearch(value) {
      try {
         if (!value) return
         const res = await axiosInstance.get(`/airport/search-airport`, { params: { search: value } })
         if (res.data.success) {
            setFilterAirports(res.data.airport)
         }
      } catch (error) {
         console.log('error:', error)
      }
   }

   async function handleFrom(item) {
      setFromDetails(item)
      toggle()
   }

   const { data, isLoading } = useQuery({
      queryKey: ['formAirports'],
      queryFn: () => axiosInstance.get(`airport/suggested-departure-airports`).then((response) => response.data)
   })

   return (
      <Dialog open={isOpen} onOpenChange={toggle}>
         <DialogContent className="w-11/12 lg:max-w-[1000px]">
            <DialogHeader>
               <DialogTitle>From</DialogTitle>
            </DialogHeader>
            <div className="flex flex-nowrap gap-2">
               <input className='w-full h-10 text-base border border-slate-300 focus:border-slate-400 focus:outline-none rounded p-3' placeholder='Search city' onChange={event => setValue(event.target.value)} />
            </div>
            <div className="border rounded mt-1 h-[300px]">
               {
                  filterAirports.length > 0 ?
                     <div className="h-full custom-scrollbar">
                        {filterAirports.map((item, index) => {
                           return (
                              <div key={index} className="p-2 hover:bg-gray-100" onClick={() => handleFrom(item)}>
                                 <div className="flex flex-nowrap justify-between">
                                    <div className="text-base font-medium"><span>{item?.city?.cityName}</span>, <span>{item?.city?.countryName}</span></div>
                                    <div className="text-base font-medium">{item?.iataCode}</div>
                                 </div>
                                 <div className="text-sm">{item?.airportName}</div>
                              </div>
                           )
                        })}
                     </div>
                     :
                     !isLoading && data?.airports.length === 0 ?
                        <div className="text-center text-sm text-gray-600 p-4">No airports found</div> :
                        <div className="h-full custom-scrollbar">
                           {
                              data?.airports?.map((item, index) => {
                                 return (
                                    <div key={index} className="p-2 hover:bg-gray-100" onClick={() => handleFrom(item?.departureAirport)}>
                                       <div className="flex flex-nowrap justify-between">
                                          <div className="text-base font-medium">
                                             <span>{item?.departureAirport?.city?.cityName}</span>
                                          </div>
                                          <div className="text-base font-medium">{item?.departureAirport?.iataCode}</div>
                                       </div>
                                       <div className="text-sm">{item?.departureAirport?.airportName}</div>
                                    </div>
                                 )
                              })
                           }
                        </div>
               }
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default FromFlight