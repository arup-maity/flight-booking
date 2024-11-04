'use client'
import LoadingView from '@/components/common/LoadingView';
import { axiosInstance } from '@/config/axios';
import dayjs from 'dayjs';
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react'
import { AiOutlineRight } from "react-icons/ai";
const OrderDetails = () => {
   const searchParams = useSearchParams()
   const currentStatus = searchParams.get('status') || 'all'
   const [bookingsDetails, setBookingsDetails] = useState<any>([])
   const [loading, setLoading] = useState(true)

   useLayoutEffect(() => {
      getOrderDetails(currentStatus)
   }, [currentStatus])

   async function getOrderDetails(status: string) {
      try {
         setLoading(true)
         const response = await axiosInstance.get(`/user/bookings-list/${status}`)
         if (response.data?.success) {
            setBookingsDetails(response.data.bookings)
         }
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }
   return (
      <div className="">
         <div className="text-3xl text-[#000] font-semibold mb-3">Tickets/Bookings</div>
         <ul className='flex flex-wrap items-center gap-2 mb-4'>
            <li>
               <Link
                  href={{
                     pathname: '/account',
                     query: { tab: 'order-details', status: 'all' },
                  }}
                  className={`${currentStatus === 'all' ? 'bg-theme-blue' : 'bg-gray-200'} text-sm rounded-sm py-1.5 px-4`}
               >
                  All
               </Link>
            </li>
            <li>
               <Link
                  href={{
                     pathname: '/account',
                     query: { tab: 'order-details', status: 'complete' },
                  }}
                  className={`${currentStatus === 'complete' ? 'bg-theme-blue' : 'bg-gray-200'} text-sm rounded-sm py-1.5 px-4`}
               >
                  Complete
               </Link>
            </li>
            <li>
               <Link
                  href={{
                     pathname: '/account',
                     query: { tab: 'order-details', status: 'cancelled' },
                  }}
                  className={`${currentStatus === 'cancelled' ? 'bg-theme-blue' : 'bg-gray-200'} text-sm rounded-sm py-1.5 px-4`}
               >
                  Cancelled
               </Link>
            </li>
            <li>
               <Link
                  href={{
                     pathname: '/account',
                     query: { tab: 'order-details', status: 'failed' },
                  }}
                  className={`${currentStatus === 'failed' ? 'bg-theme-blue' : 'bg-gray-200'} text-sm rounded-sm py-1.5 px-4`}
               >
                  Failed
               </Link>
            </li>
         </ul>
         <div className="space-y-4">
            {
               loading ? <div className="w-full flex items-center justify-center"><LoadingView /></div> :
                  bookingsDetails?.length === 0 ?
                     <div className="text-center">
                        <Image src='/images/search-svg.svg' width={300} height={300} alt='' className='mx-auto' />
                        <p className='text-xl text-[#666] font-medium mt-5'>No tickets/bookings found.</p>
                     </div>
                     :
                     bookingsDetails?.map((booking: { [key: string]: any }, index: number) =>
                        <div key={index} className="p-4 border rounded-md">
                           <p className='text-sm font-medium mb-1'>{booking?.status}</p>
                           <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-4">
                                 <div className="border border-theme-blue rounded-lg p-2">
                                    <Image src="/images/img-25.jpg" width={64} height={30} alt="" className='w-16 h-auto' />
                                 </div>
                                 <div className="">
                                    <ul className='flex flex-nowrap items-center text-base text-[#666] font-medium gap-2 mb-1'>
                                       <li>From:</li>
                                       <li>{booking?.flight.departureAirport?.city?.cityName}</li>
                                       <li>({booking?.flight.departureAirport?.iataCode}),</li>
                                       <li>{dayjs(booking?.flight.departureTime).format("DD MMM, YYYY")}</li>
                                    </ul>
                                    <ul className='flex flex-nowrap items-center text-base text-[#666] font-medium gap-2 mb-1'>
                                       <li>To:</li>
                                       <li>{booking?.flight.arrivalAirport?.city?.cityName}</li>
                                       <li>({booking?.flight.arrivalAirport?.iataCode}),</li>
                                       <li>{dayjs(booking?.flight.arrivalTime).format("DD MMM, YYYY")}</li>
                                    </ul>
                                 </div>
                              </div>
                              <div className="flex items-center whitespace-nowrap gap-2">
                                 <button type="button" className='h-9 flex items-center gap-1 whitespace-nowrap bg-theme-blue text-sm text-[#112211] font-medium font-montserrat rounded py-2 px-4'>Download Ticket</button>
                                 <Link href={`/account/booking/${booking?.id}`} className='inline-flex items-center justify-center w-9 h-9 border border-theme-blue rounded'><AiOutlineRight /></Link>
                              </div>
                           </div>
                        </div>
                     )
            }
         </div>
      </div>
   )
}

export default OrderDetails