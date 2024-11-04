'use client'
import React, { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { axiosInstance } from '@/config/axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const ToFlight = ({ isOpen, toggle, setToDetails }) => {
   const [filterAirports, setFilterAirports] = useState([])
   const [airportSuggestList, setAirportSuggestList] = useState([])
   const [debouncedValue, setValue] = useDebounceValue('', 500)

   useEffect(() => {
      if (debouncedValue) {
         handleSearch(debouncedValue)
      }
   }, [debouncedValue])

   async function handleSearch(value) {
      try {
         const res = await axiosInstance.get(`/airport/search-airport`, { params: { search: value } })
         if (res.data.success) {
            setFilterAirports(res.data.airport)
         }
      } catch (error) {
         console.log('error:', error)
      }
   }
   async function handleTo(item) {
      setToDetails(item)
      toggle()
   }
   const onOpen = async () => {
      try {
         const res = await axiosInstance.get(`/airport/suggested-arrival-airports`)
         console.log(res)
         if (res.data.success) {
            setAirportSuggestList(res.data.airports)
         }

      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div>
         <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent onOpenAutoFocus={onOpen} className="lg:max-w-[1000px]">
               <DialogHeader>
                  <DialogTitle>To</DialogTitle>
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
                                 <div key={index} className="p-2 hover:bg-gray-100" onClick={() => handleTo(item)}>
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
                        <div className="h-full custom-scrollbar">
                           {airportSuggestList.map((item, index) => {
                              return (
                                 <div key={index} className="p-2 hover:bg-gray-100" onClick={() => handleTo(item?.arrivalAirport)}>
                                    <div className="flex flex-nowrap justify-between">
                                       <div className="text-base font-medium">
                                          <span>{item?.arrivalAirport?.city?.cityName}</span>
                                       </div>
                                       <div className="text-base font-medium">{item?.arrivalAirport?.iataCode}</div>
                                    </div>
                                    <div className="text-sm">{item?.arrivalAirport?.airportName}</div>
                                 </div>
                              )
                           })}
                        </div>
                  }
               </div>
            </DialogContent>
         </Dialog>
      </div>
   )
}

export default ToFlight