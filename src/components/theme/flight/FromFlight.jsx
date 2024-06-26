'use client'
import React, { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Model } from '@/ui-components'
import { axiosInstance } from '@/config/axios'
import 'react-perfect-scrollbar/dist/css/styles.css';

const FromFlight = ({ isOpen, toggle, setFromDetails }) => {
   const [suggestList, setSuggestList] = useState([])
   const [debouncedValue, setValue] = useDebounceValue('', 1000)

   useEffect(() => {
      if (debouncedValue) {
         handleSearch(debouncedValue)
      }
   }, [debouncedValue])

   async function handleSearch(value) {
      try {
         const res = await axiosInstance.get(`/airport/search-airport`, { params: { search: value } })
         console.log('Search', res)
         if (res.data.success) {
            setSuggestList(res.data.airport)
         }
      } catch (error) {
         console.log('error:', error)
      }
   }

   async function handleFrom(item) {
      setFromDetails(item)
      toggle()
   }

   return (
      <div>
         <Model isOpen={isOpen} toggle={toggle} className="h-screen flex items-center">
            <Model.Body className="">
               <Model.Header toggle={toggle}>
                  <div className="text-lg font-medium mb-2">From</div>
               </Model.Header>
               <div className="flex flex-nowrap gap-2">
                  <input className='w-full h-10 text-base border border-slate-300 focus:border-slate-400 focus:outline-none rounded p-3' placeholder='Search city' onChange={event => setValue(event.target.value)} />
               </div>
               <div className="border rounded mt-1 h-[300px]">
                  {
                     suggestList.length > 0 ?
                        <PerfectScrollbar className='pe-2'>
                           {suggestList.map((item, index) => {
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
                        </PerfectScrollbar>
                        :
                        <div className="w-full text-center text-sm text-gray-500 p-4">No result found</div>
                  }
               </div>
            </Model.Body>
         </Model>
      </div>
   )
}

export default FromFlight