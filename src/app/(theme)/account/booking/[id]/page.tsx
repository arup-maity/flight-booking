'use client'
import React, { useLayoutEffect, useState } from 'react'
import { axiosInstance } from '@/config/axios'
import dayjs from 'dayjs'
import { convertMinutesToHoursMinutes } from '@/utils'

const BookingStatus = () => {
   const id = 14
   const [bookingDetails, setBookingDetails] = useState<any>({})

   useLayoutEffect(() => {
      getBookingDetails(id)
   }, [])

   async function getBookingDetails(id: number | string) {
      try {
         const res = await axiosInstance.get(`/bookings/success-booking/${id}`)
         console.log('Bookings', res)
         if (res.data.success) {
            setBookingDetails(res.data.booking)
         }
      } catch (error) {
         console.log(error)
      }
   }
   function timeDifferent(departDateTime: string, arrivalDateTime: string) {
      const diff = dayjs(arrivalDateTime).diff(departDateTime, 'minute')
      const time = convertMinutesToHoursMinutes(diff)
      return `${time.hours}h ${time.minutes}m`
   }

   return (
      <div className='w-full theme-container !py-5'>
         <ul className='flex flex-wrap gap-1 *:text-sm mb-8'>
            <li>Account</li>
            <li>/</li>
            <li>Booking Flight</li>
            <li>/</li>
            <li>Mumbai - Kolkata</li>
         </ul>
         <div className="flex flex-nowrap items-center justify-between mb-10">
            <div>
               {/* <p className="text-lg text-[#112211] font-medium mb-2">
                  Emirates {bookingDetails?.flight?.airplane?.manufacturer + ' ' + bookingDetails?.flight?.airplane?.modelNumber}
               </p> */}
               <p><span className='text-base font-medium'>Flight No: </span>Emirates {bookingDetails?.flight?.airplane?.manufacturer + ' ' + bookingDetails?.flight?.airplane?.modelNumber}</p>
               <p><span className='text-base font-medium'>Booking Date: </span>{dayjs(bookingDetails?.bookingDate).format('DD-MMM-YYYY HH:MM')}</p>
               {/* <p className="text-sm text-[#112211] text-opacity-70 font-medium">Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p> */}
            </div>
            <div>
               {/* <div className="text-xl text-[#112211] text-right font-bold mb-2">$204</div> */}
               <button type="button" className='bg-[#8DD3BB] text-base font-montserrat rounded py-2 px-4'>Download</button>
            </div>
         </div>
         <div className="flex items-center justify-between gap-10">
            <div className="whitespace-nowrap">
               <p className='mb-2'>From</p>
               <p className="text-lg text-[#112211] font-medium font-montserrat">
                  {bookingDetails?.flight?.departureAirport?.city?.cityName + ' (' + bookingDetails?.flight?.departureAirport?.iataCode + ')'}
               </p>
               <p className='text-base' >{dayjs(bookingDetails?.flight?.departureTime).format('DD-MMM-YYYY HH:MM')}</p>
            </div>
            {/* <div className="relative w-full flex justify-center flex-grow before:absolute before:w-full before:border before:top-11-/">
               <div className="my-4">
                  {
                     timeDifferent(bookingDetails?.flight?.departureTime, bookingDetails?.flight?.arrivalTime)
                  }
                  12h 45m
               </div>
            </div> */}
            <div className="whitespace-nowrap">
               <p className='mb-2'>To</p>
               <p className="text-lg text-[#112211] font-medium font-montserrat">
                  {bookingDetails?.flight?.arrivalAirport?.city?.cityName + ' (' + bookingDetails?.flight?.arrivalAirport?.iataCode + ')'}
               </p>
               <p className='text-base'>{dayjs(bookingDetails?.flight?.arrivalTime).format('DD-MMM-YYYY HH:MM')}</p>
            </div>
         </div>
         <hr className='my-4' />
         <div className="mb-8">
            <div className="text-xl font-medium font-montserrat mb-4">Passengers Details</div>
            {
               bookingDetails?.passengers?.map((passenger: any, index: number) => {
                  return (
                     <div key={index} className="flex">
                        <p className="text-lg text-[#112211] font-medium font-montserrat me-1">
                           {index + 1}&#10089;
                        </p>
                        <div className="">
                           <p className="text-lg text-[#112211] font-medium font-montserrat">
                              {passenger.firstName + ' ' + passenger.lastName}
                           </p>
                           <p className="text-sm text-[#112211] text-opacity-70 font-medium">{passenger.gender}</p>
                        </div>
                     </div>
                  )
               })
            }
         </div>
         <hr className='my-4' />
         <div className="">
            <div className="text-xl text-[#112211] font-semibold mb-4">Terms and Conditions</div>
            <div className="text-lg text-[#112211] font-medium mb-2">Payments</div>
            <ul className='*:text-sm list-disc space-y-2 mb-8 ps-4'>
               <li>If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.</li>
               <li>If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is declined for any reason or if you have supplied incorrect card information. If we become aware of, or is notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be cancelled and you will be liable for all costs and expenses arising from such cancellation, without prejudice to any action that may be taken against us.</li>
            </ul>
            <div className="text-lg text-[#112211] font-medium mb-2">Contact Us</div>
            <ul className='*:text-sm space-y-2'>
               <li>If you have any questions about our Website or our Terms of Use, please contact:</li>
               <li>Golobe Group Q.C.S.C</li>
               <li>Golobe Tower</li>
               <li>P.O. Box: 22550</li>
               <li>Doha, State of Qatar</li>
               <li>Further contact details can be found at golobe.com/help</li>
            </ul>
         </div>
      </div>
   )
}

export default BookingStatus