'use client'
import { flightInstance } from '@/config/axios';
import { convertMinutesToHoursMinutes } from '@/utils';
import dayjs from 'dayjs';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react'
import { IoIosAirplane, IoIosWifi } from "react-icons/io";
import { IoStopwatch, IoFastFood, IoLocationSharp } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";

const FlightDetails = ({ params }: { params: { id: string } }) => {
   const id = params.id
   const [flightDetails, setFlightDetails] = useState<any>({})
   const [loading, setLoading] = useState(true)
   const [notFound, setNotFound] = useState(false)
   useLayoutEffect(() => {
      getFlightDetails(id)
   }, [id])
   async function getFlightDetails(id: string) {
      try {
         const res = await flightInstance.get(`/flight-details/${id}`)
         console.log(res)
         if (res.data.success) {
            setFlightDetails(res.data.flight)
         }
      } catch (error) {
         console.log(error)
         setNotFound(true)
      }
      finally {
         setLoading(false)
      }
   }
   function timeDifferent(departDateTime: string, returnDateTime: string) {
      const diff = dayjs(returnDateTime).diff(departDateTime, 'minute')
      const time = convertMinutesToHoursMinutes(diff)
      return `${time.hours}h ${time.minutes}m`
   }
   if (loading) {
      return (
         <div className='flex justify-center items-center w-full min-h-screen'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200'></div>
         </div>
      )
   }
   if (notFound || flightDetails === null || Object.keys(flightDetails).length === 0) {
      return (
         <div className="">Not Founded</div>
      )
   }
   return (
      <div className='w-full theme-container !py-5'>
         <ul className='flex flex-wrap gap-1 *:text-sm *:text-[#112211] *:opacity-75 mb-8'>
            <li>Flight</li>
            <li>/</li>
            <li>Search</li>
            <li>/</li>
            <li>{flightDetails?.departureAirport?.city?.cityName} - {flightDetails?.arrivalAirport?.city?.cityName}</li>
         </ul>
         <div className="flex justify-between mb-8">
            <div className="">
               <h2 className='text-2xl text-[#112211] font-bold mb-4'>Emirates {flightDetails?.airplane?.modelNumber} {flightDetails?.airplane?.manufacturer
               }</h2>
               <div className='flex items-center gap-1  mb-1'>
                  <IoLocationSharp size={18} />
                  <span className='text-sm text-[#112211] font-medium mb-1'>Gumussuyu Mah. Inonu Cad. No:8, Istanbul 34437</span>
               </div>
               <div className='flex items-center gap-2'>
                  <span className='inline-block border border-[#8DD3BB] rounded px-2'>4.2</span>
                  <span className='text-sm text-[#112211] font-bold'>Very Good</span>
                  <span className='text-sm text-[#112211] font-medium'>54 reviews</span>
               </div>
            </div>
            <div className="">
               <div className="text-3xl font-bold mb-4">&#8377; {flightDetails?.price}</div>
               <div className="">
                  <Link href={`/flight/review-details/${id}`} className='text-sm text-[#112211] font-medium border border-[#8DD3BB] rounded py-2 px-4'>Book Now</Link>
               </div>
            </div>
         </div>
         <div style={{ backgroundImage: `url('/images/img-26.jpg')` }} className="w-full aspect-[1232/395] bg-cover bg-center rounded-md mb-6">
         </div>
         <div className="mb-6">
            <h5 className='text-2xl font-bold mb-4'>Basic Economy Features</h5>
            <div className="flex flex-wrap -m-2">
               <div className="w-1/12 p-2">
                  <Image src={`/images/img-27.jpg`} width={120} height={120} alt='' className='w-full aspect-square' />
               </div>
               <div className="w-1/12 p-2">
                  <Image src={`/images/img-27.jpg`} width={120} height={120} alt='' className='w-full aspect-square' />
               </div>
               <div className="w-1/12 p-2">
                  <Image src={`/images/img-27.jpg`} width={120} height={120} alt='' className='w-full aspect-square' />
               </div>
               <div className="w-1/12 p-2">
                  <Image src={`/images/img-27.jpg`} width={120} height={120} alt='' className='w-full aspect-square' />
               </div>
            </div>
         </div>
         <div className="bg-[#8DD3BB] bg-opacity-60 rounded p-4 mb-6">
            <div className='text-2xl text-[#112211] font-bold mb-4'>Emirates Airlines Policies</div>
            <div className="flex flex-wrap">
               <div className="w-6/12">
                  <p className='text-sm text-[#112211] font-medium'>Pre-flight cleaning, installation of cabin HEPA filters.</p>
               </div>
               <div className="w-6/12">
                  <p className='text-sm text-[#112211] font-medium'>Pre-flight cleaning, installation of cabin HEPA filters.</p>
               </div>
            </div>
         </div>
         <div className="bg-white shadow-[0_0_10px_5px_#f1f1f1] rounded p-4 mb-4">
            <div className="flex flex-nowrap items-center justify-between mb-4">
               <div className="text-xl text-[#112211] font-semibold">{dayjs(flightDetails.departureTime).format('dddd, DD MMMM')}</div>
               <p className="text-xl text-[#112211] font-medium">{timeDifferent(flightDetails.departureTime, flightDetails.arrivalTime)}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 border border-[#8DD3BB] rounded-md p-2">
                  <Image src={`/images/img-24.jpg`} width={65} height={50} alt='' className='w-auto h-12' />
                  <div className="">
                     <p className='text-2xl text-[#112211] font-medium'>Emirates</p>
                     <p className='text-sm text-[#112211] font-medium'>{flightDetails?.airplane?.manufacturer
                     } {flightDetails?.airplane?.modelNumber}</p>
                  </div>
               </div>
               <ul className='flex items-center gap-4'>
                  <li><IoIosAirplane /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><IoIosWifi /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><IoStopwatch /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><IoFastFood /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><MdOutlineAirlineSeatReclineExtra /></li>
               </ul>
            </div>
            <div className="flex items-center justify-center flex-nowrap gap-10">
               <div className="flex flex-wrap items-center">
                  <span className='text-2xl text-[#112211] font-semibold me-2'>{dayjs(flightDetails?.departureTime).format('HH:mm')}</span>
                  <span className='text-base text-[#112211] font-medium'>{flightDetails?.departureAirport?.city?.cityName} ({flightDetails?.departureAirport?.iataCode})</span>
               </div>
               <div className="relative w-40 border-b-2 border-[#949494]">
                  <div className="absolute -top-[14px] left-[35%] bg-white px-2">
                     <IoIosAirplane size={30} color='#949494' />
                  </div>
               </div>
               <div className="flex flex-wrap items-center">
                  <span className='text-2xl text-[#112211] font-semibold me-2'>{dayjs(flightDetails?.arrivalTime).format('HH:mm')}</span>
                  <span className='text-base text-[#112211] font-medium'>{flightDetails?.arrivalAirport?.city?.cityName} ({flightDetails?.arrivalAirport?.iataCode})</span>
               </div>
            </div>
         </div>
         {/* <div className="bg-white shadow-md rounded p-4 mb-4">
            <div className="flex flex-nowrap items-center justify-between mb-4">
               <div className="text-xl text-[#112211] font-bold">Return Wed, Dec 8</div>
               <p className="text-xl text-[#112211] font-medium">2h 28m</p>
            </div>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 border border-[#8DD3BB] rounded-md p-2">
                  <Image src={`/images/img-24.jpg`} width={65} height={50} alt='' className='w-auto h-12' />
                  <div className="">
                     <p className='text-2xl text-[#112211] font-medium'>Emirates</p>
                     <p className='text-sm text-[#112211] font-medium'>Airbus A320</p>
                  </div>
               </div>
               <ul className='flex items-center gap-4'>
                  <li><IoIosAirplane /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><IoIosWifi /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><IoStopwatch /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><IoFastFood /></li>
                  <li className='text-[#D7E2EE] text-2xl'>|</li>
                  <li><MdOutlineAirlineSeatReclineExtra /></li>
               </ul>
            </div>
            <div className="flex items-center justify-center flex-nowrap gap-10">
               <div className="">
                  <span className='text-2xl text-[#112211] font-semibold me-2'>12:00 pm</span>
                  <span className='text-base text-[#112211] font-medium'>Newark(EWR)</span>
               </div>
               <div className="relative w-40 border-b-2 border-[#949494]">
                  <div className="absolute -top-[14px] left-[35%] bg-white px-2">
                     <IoIosAirplane size={30} color='#949494' />
                  </div>
               </div>
               <div className="">
                  <span className='text-2xl text-[#112211] font-semibold me-2'>12:00 pm</span>
                  <span className='text-base text-[#112211] font-medium'>Newark(EWR)</span>
               </div>
            </div>
         </div> */}
      </div>
   )
}

export default FlightDetails