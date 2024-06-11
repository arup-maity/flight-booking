import { axiosInstance } from '@/config/axios'
import dayjs from 'dayjs'
import React, { useLayoutEffect, useState } from 'react'
import FromFlight from '../flight/FromFlight'
import ToFlight from '../flight/ToFlight'
import TravellerClass from '../flight/TravellerClass'
import DatePicker from '@/components/common/DatePicker'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const SearchForm = () => {
   const searchParams = useSearchParams();
   const { replace } = useRouter()
   const pathname = usePathname();
   // trip type
   const [tripType, setTripType] = useState('O')
   // from
   const [fromDetails, setFromDetails] = useState<any>({})
   const [fromIataCode, setFromIataCode] = useState<string>(searchParams.get('from') || '')
   const [fromModel, setFromModel] = useState(false)
   // to
   const [toDetails, setToDetails] = useState<any>({})
   const [toIataCode, setToIataCode] = useState<string>(searchParams.get('to') || '')
   const [toModel, setToModel] = useState(false)
   // date
   const [departDate, setDepartDate] = useState(new Date())
   const [returnDate, setReturnDate] = useState(new Date())
   const [openCalendar, setOpenCalendar] = useState(false)
   // traveler & class
   const [classPassenger, setClassPassenger] = useState({
      count: '1',
      class: 'E'
   })
   const [classModel, setClassModel] = useState(false)
   // 
   useLayoutEffect(() => {
      fatchFromDetails(fromIataCode)
      fatchToDetails(toIataCode)
   }, [])

   function handleSearch() {
      const params = new URLSearchParams(searchParams);
      params.set('from', fromDetails.iataCode);
      params.set('to', toDetails.iataCode);
      params.set('tripType', tripType);
      params.set('class', classPassenger.class);
      params.set('count', classPassenger.count);
      params.set('depart', dayjs(departDate).format("YYYY-MM-DD"));
      if (tripType === 'R') {
         params.set('return', dayjs(returnDate).format("YYYY-MM-DD"));
      } else {
         params.delete('return')
      }
      replace(`${pathname}?${params.toString()}`);
   }
   async function fatchFromDetails(code: string) {
      try {
         const res = await axiosInstance.get(`/airport/read-airport/${code}`)
         if (res.data.success) {
            setFromDetails(res.data.airport)
         }
      } catch (error) {
         console.log(error)
      }
   }
   async function fatchToDetails(code: string) {
      try {
         const res = await axiosInstance.get(`/airport/read-airport/${code}`)
         if (res.data.success) {
            setToDetails(res.data.airport)
         }
      } catch (error) {
         console.log(error)
      }
   }
   function handleDate(date: any) {
      setDepartDate(date.departureDate)
      if (date.returnDate) {
         setReturnDate(date.returnDate)
      }
   }
   return (
      <Suspense>
         <div className="bg-white h-full sticky top-0 z-10 shadow-[0_0_10px_5px_#f1f1f1] rounded p-4 mb-5">
            <div className="flex justify-between mb-2">
               <ul className='flex flex-nowrap gap-4 mb-2'>
                  <li>
                     <label htmlFor='oneWay' className='flex flex-nowrap items-center gap-2'>
                        <input type="radio" value='O' name="type" id="oneWay" checked={tripType === 'O'} onChange={(e) => setTripType(e.target.value)} />
                        <span className='text-base'>One Way</span>
                     </label>
                  </li>
                  <li>
                     <label htmlFor='roundTrip' className='flex flex-nowrap items-center gap-2'>
                        <input type="radio" value='R' name="type" id="roundTrip" checked={tripType === 'R'} onChange={(e) => setTripType(e.target.value)} />
                        <span className='text-base'>Round Trip</span>
                     </label>
                  </li>
               </ul>
               <p className='text-sm opacity-50'>Book International and Domestic Flights</p>
            </div>
            <div className="flex flex-wrap">
               <div className="relative w-3/12 border p-2" >
                  <div className="absolute -top-3 bg-white text-sm px-2">From</div>
                  <div role='button' onClick={() => setFromModel(prev => !prev)}>
                     {
                        fromDetails?.iataCode &&
                        <div className='text-base font-medium'>{fromDetails?.city?.cityName}, {fromDetails?.city?.countryName}</div>
                     }
                  </div>
               </div>
               <div className="relative w-3/12 border p-2" >
                  <div className="absolute -top-3 bg-white text-sm px-2">To</div>
                  <div role='button' onClick={() => setToModel(prev => !prev)}>
                     {
                        toDetails?.iataCode &&
                        <div className='text-base font-medium'>{toDetails?.city?.cityName}, {toDetails?.city?.countryName}</div>
                     }
                  </div>
               </div>
               <div className="relative w-2/12 border p-2" >
                  <div className="absolute -top-3 bg-white text-sm px-2">Depart- Return</div>
                  <div role='button' onClick={() => setOpenCalendar(prev => !prev)}>
                     <ul className='flex flex-wrap gap-2'>
                        <li>{dayjs(departDate).format("DD/MM/YY")}</li>
                        <li>-</li>
                        <li>{dayjs(returnDate).format("DD/MM/YY")}</li>
                     </ul>
                  </div>
               </div>
               <div className="relative w-3/12 border p-2">
                  <div className="absolute -top-3 bg-white text-sm px-2">Passenger - Class</div>
                  <div role='button' onClick={() => setClassModel(prev => !prev)}>
                     <ul className='flex flex-warp gap-2'>
                        <li className='text-base whitespace-nowrap'>{classPassenger?.count} passenger,</li>
                        <li className='text-base'>{classPassenger?.class === 'E' ? 'Economy' : classPassenger.class === 'P' ? 'Premium Economy' : 'Business'}</li>
                     </ul>
                  </div>
               </div>
               <div className="w-1/12 ps-2">
                  <button className="w-full bg-[#8DD3BB] text-[#0c0c0c] text-base font-medium py-3 px-4 rounded-lg" onClick={handleSearch}>Search</button>
               </div>
            </div>
         </div>
         <FromFlight isOpen={fromModel} toggle={() => setFromModel(prev => !prev)} setFromDetails={setFromDetails} />
         <ToFlight isOpen={toModel} toggle={() => setToModel(prev => !prev)} setToDetails={setToDetails} />
         <DatePicker isOpen={openCalendar} toggle={() => setOpenCalendar(prev => !prev)} onChange={handleDate} tripType={tripType} />
         <TravellerClass isOpen={classModel} toggle={() => setClassModel(prev => !prev)} setClassPassenger={setClassPassenger} />
      </Suspense>
   )
}

export default SearchForm