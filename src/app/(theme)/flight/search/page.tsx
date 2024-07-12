'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { adminInstance } from '@/config/axios';
import { convertMinutesToHoursMinutes } from '@/utils';
import { useIntersectionObserver } from 'usehooks-ts'
import SearchForm from '@/components/theme/search-flight/SearchForm';
import { PiSunHorizonLight, PiSunLight, PiCloudSunLight, PiCloudMoonLight } from "react-icons/pi";
const FlightSearch = () => {
   const searchParams = useSearchParams();
   const { push } = useRouter()
   const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5, })
   // flight list
   const [flightList, setFlightList] = useState([])
   const [selectedFlight, setSelectedFlight] = useState<any>({})
   //
   const [notFound, setNotFound] = useState(true)
   useEffect(() => {
      hasAllRequiredParams()
      getFlights({
         from: searchParams.get('from'),
         to: searchParams.get('to'),
         class: searchParams.get('class'),
         count: searchParams.get('count'),
         departure: searchParams.get('depart'),
         return: searchParams.get('return') || ''
      })
   }, [searchParams])

   async function getFlights(params: object) {
      try {
         const { data } = await adminInstance.get(`/flight/search-flights`, { params })
         console.log('Flight======>', data)
         if (data.success) {
            setFlightList(data.flights)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   function timeDifferent(departDateTime: string, returnDateTime: string) {
      const diff = dayjs(returnDateTime).diff(departDateTime, 'minute')
      const time = convertMinutesToHoursMinutes(diff)
      return `${time.hours}h ${time.minutes}m`
   }
   function dayDifference(departDateTime: string, returnDateTime: string) {
      const diff = dayjs(returnDateTime).diff(departDateTime, 'day')
      if (Math.abs(diff) > 0) {
         return `+${diff}d`
      } else {
         return ''
      }
   }
   function handleBook() {
      push(`/flight/review-details/${selectedFlight.id}`)
   }
   function hasAllRequiredParams(): boolean {
      const url: string = typeof window !== 'undefined' ? window.location.href : '';
      const params = new URLSearchParams(url.split("?")[1]);
      // Define required parameters based on tripType
      const requiredParams: { [key: string]: string[] } = {
         'O': ["from", "to", "tripType", "class", "count", "depart"],
         'R': ["from", "to", "tripType", "class", "count", "depart", "return"]
      };
      // Get tripType parameter
      const tripType: string | null = params.get('tripType');
      // Validate tripType and required parameters
      if (!tripType || !requiredParams[tripType]) {
         console.error("Invalid or missing tripType parameter.");
         return false;
      }
      // Check if all required parameters exist and have a truthy value
      const status: boolean = requiredParams[tripType].every(param => !!params.get(param));
      // Call setNotFound or handle the status as needed
      setNotFound(status);
      return status;
   }

   if (!notFound) {
      return <></>
   }
   return (
      <div className='theme-container w-full bg-[#FAFBFC] !py-10'>
         <SearchForm />
         <div className="w-full relative mb-4">
            <div className="flex flex-wrap -m-2">
               <div className="absolute hidden lg:block lg:relative w-full lg:w-3/12 bg-white p-2">
                  <div className="border space-y-5 p-4">
                     <div className="">
                        <h5 className='text-lg font-medium mb-2'>Popular Filters</h5>
                        <ul className='*:text-sm'>
                           <li><input type="checkbox" name="" id="" /> Non Stop</li>
                           <li><input type="checkbox" name="" id="" /> 1 Stop</li>
                           <li><input type="checkbox" name="" id="" /> Late Departures</li>
                           <li><input type="checkbox" name="" id="" /> AfterNoon Departure</li>
                        </ul>
                     </div>
                     <div className="">
                        <h5 className='text-lg font-medium mb-2'>Price</h5>

                     </div>
                     <div className="">
                        <h5 className='text-lg font-medium mb-2'>Departure From Hyderabad</h5>
                        <div className="flex flex-nowrap -m-1">
                           <div className="w-3/12 p-1">
                              <div className="border text-center rounded p-1">
                                 <div className="flex justify-center mb-1"><PiSunHorizonLight size={25} /></div>
                                 <p className='text-xs'>Before 6 AM</p>
                              </div>
                           </div>
                           <div className="w-3/12 p-1">
                              <div className="border text-center rounded p-1">
                                 <div className="flex justify-center mb-1"><PiSunLight size={25} /></div>
                                 <p className='text-xs'>6 AM - 12 PM</p>
                              </div>
                           </div>
                           <div className="w-3/12 p-1">
                              <div className="border text-center rounded p-1">
                                 <div className="flex justify-center mb-1"><PiCloudSunLight size={25} /></div>
                                 <p className='text-xs'>12 PM - 6 PM</p>
                              </div>
                           </div>
                           <div className="w-3/12 p-1">
                              <div className="border text-center p-1">
                                 <div className="flex justify-center mb-1"><PiCloudMoonLight size={25} /></div>
                                 <p className='text-xs'>After 6 PM</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="">
                        <h5 className='text-lg font-medium mb-2'>Departure From Hyderabad</h5>
                        <div className="flex flex-nowrap -m-1">
                           <div className="w-3/12 p-1">
                              <div className="border text-center rounded p-1">
                                 <div className="flex justify-center mb-1"><PiSunHorizonLight size={25} /></div>
                                 <p className='text-xs'>Before 6 AM</p>
                              </div>
                           </div>
                           <div className="w-3/12 p-1">
                              <div className="border text-center rounded p-1">
                                 <div className="flex justify-center mb-1"><PiSunLight size={25} /></div>
                                 <p className='text-xs'>6 AM - 12 PM</p>
                              </div>
                           </div>
                           <div className="w-3/12 p-1">
                              <div className="border text-center rounded p-1">
                                 <div className="flex justify-center mb-1"><PiCloudSunLight size={25} /></div>
                                 <p className='text-xs'>12 PM - 6 PM</p>
                              </div>
                           </div>
                           <div className="w-3/12 p-1">
                              <div className="border text-center p-1">
                                 <div className="flex justify-center mb-1"><PiCloudMoonLight size={25} /></div>
                                 <p className='text-xs'>After 6 PM</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="">
                        <h5 className='text-lg font-medium mb-2'>Airlines</h5>
                        <ul className='*:text-sm'>
                           <li><input type="checkbox" name="" id="" /> Emirated</li>
                           <li><input type="checkbox" name="" id="" /> Fly Dubai</li>
                           <li><input type="checkbox" name="" id="" /> Qatar</li>
                           <li><input type="checkbox" name="" id="" /> Etihad</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="w-full lg:w-9/12 p-2">
                  <div className="">

                     {
                        flightList?.map((flight: any) =>
                           <div key={flight?.id} className="border rounded p-2 mb-4">
                              <div className="w-full flex flex-nowrap items-center">
                                 <div className="w-3/12 p-4">
                                    <Image src={`/images/img-24.jpg`} width={150} height={100} alt='' className='w-full h-auto' />
                                 </div>
                                 <div className="w-6/12 py-4">
                                    <div className="flex flex-nowrap items-center">
                                       <div className="w-4/12 text-center">
                                          <div className="">{dayjs(flight?.departureTime).format('HH:mm')}</div>
                                          <div className="">{flight?.departureAirport?.city?.cityName}</div>
                                       </div>
                                       <div className="w-4/12 text-center">
                                          <div className="">{timeDifferent(flight?.departureTime, flight?.arrivalTime)}</div>
                                          <div className="">Non stop</div>
                                       </div>
                                       <div className="w-4/12 text-center">
                                          <div className="">
                                             {dayjs(flight?.arrivalTime).format('HH:mm')}
                                             <span className='text-sm text-[#8DD3BB] ms-2'>{dayDifference(flight?.departureTime, flight?.arrivalTime)}</span>
                                          </div>
                                          <div className="">{flight?.arrivalAirport?.city?.cityName}</div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="w-3/12 text-center py-4">
                                    <p>starting from</p>
                                    <div className="">$104</div>
                                 </div>
                              </div>
                              <div className="w-full flex flex-wrap">
                                 <div className="w-full lg:w-3/12"></div>
                                 <div className="w-full lg:w-9/12">
                                    <div className="w-full flex flex-nowarp gap-3">
                                       <div className="w-full">
                                          <Link href={`/flight/${flight?.id}`} className='inline-block w-full bg-[#8DD3BB] text-sm font-medium text-center rounded py-2 px-4'>View Deals</Link>
                                       </div>
                                       <div className="w-[150px]">
                                          <button className='inline-block w-full bg-[#8DD3BB] text-sm font-medium text-center rounded py-2 px-4' onClick={() => setSelectedFlight(flight)}>Select</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     }
                  </div>
               </div>
            </div>
         </div>
         <div ref={ref} className="">
            {
               selectedFlight !== null && Object.values(selectedFlight).length > 0 &&
               <div className={`w-full z-50 ${isIntersecting ? 'relative' : 'fixed left-0 bottom-0 theme-container'}`}>
                  <div className={`w-full h-full bg-[#8DD3BB] shadow-[0_0_10px_5px_#f1f1f1] rounded p-4`}>
                     <div className="flex items-center justify-between gap-4">
                        <div className="">
                           <div className="flex items-center gap-2 *:text-sm">
                              <p>Departure</p>
                              <span>&bull;</span>
                              <p>{selectedFlight?.airplane?.modelNumber}</p>
                              <p>{selectedFlight?.airplane?.manufacturer}</p>
                           </div>
                           <div className="flex items-center gap-2">
                              <p>{selectedFlight?.departureAirport?.iataCode}</p>
                              <span>-</span>
                              <p>{selectedFlight?.arrivalAirport?.iataCode}</p>
                           </div>
                        </div>

                        <div className="">
                           <button className='text-sm bg-[#FF8682] text-white border border-[#FF8682] rounded py-1 px-2' onClick={handleBook}>BOOK NOW</button>
                        </div>
                     </div>
                  </div>
               </div>
            }
         </div>
      </div>
   )
}

export default FlightSearch