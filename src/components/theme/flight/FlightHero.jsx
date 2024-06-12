'use client'
import React, { useLayoutEffect, useState } from 'react'
import FromFlight from './FromFlight'
import ToFlight from './ToFlight'
import TravellerClass from './TravellerClass'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation';
import DatePicker from '@/components/common/DatePicker'
import { Suspense } from 'react'

const FlightHero = () => {
   const searchParams = useSearchParams();
   const { push } = useRouter();

   const [fromFlight, setFromFlight] = useState(false)
   const [toFlight, setToFlight] = useState(false)
   const [openCalendar, setOpenCalendar] = useState(false)
   const [travellerClass, setTravellerClass] = useState(false)

   const [tripType, setTripType] = useState('R')
   const [fromDetails, setFromDetails] = useState({
      airportName: "Netaji Subhas Chandra Bose International Airport",
      iataCode: "CCU",
      city: {
         cityName: "Kolkata",
         countryName: "India",
         countryCode: "IN",
      }
   })
   const [toDetails, setToDetails] = useState({
      airportName: "Indira Gandhi International Airport",
      iataCode: "DEL",
      city: {
         cityName: "Delhi",
         countryName: "India",
         countryCode: "IN",
      }
   })
   const [departDate, setDepartDate] = useState(new Date())
   const [returnDate, setReturnDate] = useState(new Date())
   const [classPassenger, setClassPassenger] = useState({
      count: 1,
      class: 'E'
   })
   const [error, setError] = useState('')

   useLayoutEffect(() => {
      handleReturnDateChange()
   }, [])

   function handleSearch() {
      const params = new URLSearchParams(searchParams);

      if (fromDetails.iataCode === toDetails.iataCode) {
         setError('From & To airports cannot be the same')
      } else {
         params.set('from', fromDetails.iataCode);
         params.set('to', toDetails.iataCode);
         params.set('tripType', tripType);
         params.set('class', classPassenger.class);
         params.set('count', classPassenger.count);
         params.set('depart', dayjs(departDate).format("YYYY-MM-DD"));
         if (tripType === 'R') {
            params.set('return', dayjs(returnDate).format("YYYY-MM-DD"));
         }
         push(`/flight/search?${params.toString()}`);
      }
   }
   function handleDate(value) {
      setDepartDate(value.departureDate);
      setReturnDate(value.returnDate);
   }

   const handleReturnDateChange = () => {
      const today = new Date();
      const threeDaysFromToday = new Date(today.getTime()); // Create a copy of today's date
      threeDaysFromToday.setDate(today.getDate() + 3);
      setReturnDate(threeDaysFromToday);
   }

   return (
      <Suspense>
         <div className='w-full'>
            <div style={{ backgroundImage: `url('/images/img-12.jpg')` }} className="w-full aspect-[1440/800] md:aspect-[1440/535] flex items-center  bg-cover bg-center">
               <div className="theme-container">
                  <div className="w-[300px] md:w-[500px]">
                     <div className="text-white text-xl md:text-4xl lg:text-[45px] font-bold font-montserrat mb-4">Make your travel whishlist, we’ll do the rest</div>
                     <div className="text-white text-base md:text-xl font-medium font-montserrat">Special offers to suit your plan</div>
                  </div>
               </div>
            </div>
            <div className="theme-container">
               <div className="bg-white h-full shadow-[0_0_5px_5px_#1122110D] rounded-xl -mt-5 md:-mt-14 p-4">
                  <div className="flex flex-wrap justify-between gap-4 mb-5">
                     <ul className='flex flex-nowrap gap-5'>
                        <li>
                           <label htmlFor='oneWay' className='flex flex-nowrap items-center gap-2 cursor-pointer'>
                              <input type="radio" value='O' name="type" id="oneWay" checked={tripType === 'O'} onChange={(e) => setTripType(e.target.value)} />
                              <span className='text-base font-medium'>One Way</span>
                           </label>
                        </li>
                        <li>
                           <label htmlFor='roundTrip' className='flex flex-nowrap items-center gap-2 cursor-pointer'>
                              <input type="radio" value='R' name="type" id="roundTrip" checked={tripType === 'R'} onChange={(e) => setTripType(e.target.value)} />
                              <span className='text-base font-medium'>Round Trip</span>
                           </label>
                        </li>
                     </ul>
                     <p className='text-sm  opacity-50'>Book International and Domestic Flights</p>
                  </div>
                  <div className="flex flex-wrap -m-3">
                     <div className="w-full md:w-6/12 lg:w-3/12 p-3 max-lg:mb-3" onClick={() => setFromFlight(prev => !prev)}>
                        <div className="relative border rounded p-2">
                           <div className="text-sm absolute -top-[10px] bg-white px-2">From</div>
                           <ul>
                              <li className='text-base md:text-2xl font-bold'>{fromDetails?.city?.cityName}</li>
                              <li className='text-sm line-clamp-1'>{fromDetails?.iataCode}, {fromDetails?.airportName}</li>
                           </ul>
                        </div>
                     </div>
                     <div className="w-full md:w-6/12 lg:w-3/12 p-3 max-lg:mb-3" onClick={() => setToFlight(prev => !prev)}>
                        <div className="relative border rounded p-2">
                           <div className="text-sm absolute -top-[10px] bg-white px-2">To</div>
                           <ul>
                              <li className='text-base md:text-2xl font-bold'>{toDetails?.city?.cityName}</li>
                              <li className='text-sm line-clamp-1'>{toDetails?.iataCode}, {toDetails?.airportName}</li>
                           </ul>
                        </div>
                     </div>
                     <div className="w-full md:w-6/12 lg:w-3/12 p-3 max-md:mb-3">
                        <div className="relative h-full min-h-16 border rounded p-2">
                           <div className="text-sm absolute -top-[10px] bg-white px-2">
                              {
                                 tripType === 'R' ? 'Depart- Return' : 'Depart'
                              }
                           </div>
                           <div className="flex items-center gap-4">
                              <div className='flex gap-4 items-center cursor-pointer' onClick={() => setOpenCalendar(prev => !prev)}>
                                 <div className="">
                                    <div className="">
                                       <span className='text-base md:text-2xl font-bold me-2'>{dayjs(departDate).format("DD")}</span>
                                       <span className='text-base font-medium'>{dayjs(departDate).format("MMM'YY")}</span>
                                    </div>
                                    <div className="text-sm">
                                       {dayjs(departDate).format("dddd")}
                                    </div>
                                 </div>
                                 <div>-</div>
                                 <div className={`${tripType === 'R' ? 'opacity-100' : 'opacity-20'}`}>
                                    <div className="">
                                       <span className='text-base md:text-2xl font-bold me-2'>{dayjs(returnDate).format("DD")}</span>
                                       <span className='text-base font-medium'>{dayjs(returnDate).format("MMM'YY")}</span>
                                    </div>
                                    <div className="text-sm">
                                       {dayjs(returnDate).format("dddd")}
                                    </div>
                                 </div>

                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="w-full md:w-6/12 lg:w-3/12 p-3" onClick={() => setTravellerClass(prev => !prev)}>
                        <div className="relative border rounded p-2">
                           <div className="text-sm absolute -top-[10px] bg-white px-2">Passenger - Class</div>
                           <ul>
                              <li className='text-sm'><span className='text-base md:text-2xl font-bold'>{classPassenger?.count}</span> Traveller</li>
                              <li className='text-sm'>{classPassenger?.class === 'E' ? 'Economy/Premium Economy' : classPassenger.class === 'P' ? 'Premium Economy' : 'Business'}</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-4 mt-2">
                     <p className='text-sm text-red-500'>{error}</p>
                     <button className="bg-[#8DD3BB] text-white text-sm font-medium py-2 px-4 rounded-lg" onClick={handleSearch}>Search Flights</button>
                  </div>
               </div>
            </div>
            <FromFlight isOpen={fromFlight} toggle={() => setFromFlight(prev => !prev)} setFromDetails={setFromDetails} />
            <ToFlight isOpen={toFlight} toggle={() => setToFlight(prev => !prev)} setToDetails={setToDetails} />
            <TravellerClass isOpen={travellerClass} toggle={() => setTravellerClass(prev => !prev)} setClassPassenger={setClassPassenger} />
            <DatePicker isOpen={openCalendar} toggle={() => setOpenCalendar(prev => !prev)} onChange={handleDate} tripType={tripType} />
         </div >
      </Suspense>
   )
}

export default FlightHero

// "Mukta", "Lato", sans-serif