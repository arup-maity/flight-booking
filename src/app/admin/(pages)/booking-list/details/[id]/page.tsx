'use client'
import LoadingView from '@/components/common/LoadingView'
import { adminInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'

const BookingDetails = ({ params }: { params: { id: string } }) => {
   const id = params.id || ''
   const [bookingDetails, setBookingDetails] = useState<{ [key: string]: any }>({})
   const [loading, setLoading] = useState(true)
   useLayoutEffect(() => {
      getBookingDetails(id)
   }, [id])

   async function getBookingDetails(id: string) {
      try {
         setLoading(true)
         const { data } = await adminInstance.get(`/bookings/details/${id}`,)
         console.log('data ==>', data)
         if (data.success) {
            setBookingDetails(data.booking)
         }
      } catch (error) {
         console.log('Error', error)
      } finally {
         setLoading(false)
      }
   }
   if (loading) {
      return (
         <div className="w-full flex items-center justify-center">
            <LoadingView />
         </div>
      )
   }
   return (
      <div className='w-full'>
         <div className="flex items-center gap-5">
            <p>Booking Number :</p>
            <p>{bookingDetails?.id}</p>
         </div>
         <div className="flex items-center gap-5">
            <p>Flight Number :</p>
            <p>{bookingDetails?.flight?.id}</p>
         </div>
         <div className="">
            <p>{bookingDetails?.flight?.arrivalAirport?.airportName}</p>
            <p>{bookingDetails?.flight?.departureAirport?.airportName}</p>
         </div>
         <div className="flex items-center gap-5">
            <p>Payment Amount :</p>
            <p>{bookingDetails?.totalCost}</p>
         </div>
         <div className="flex items-center gap-5">
            <p>Payment Status :</p>
            <p>{bookingDetails?.payments?.status}</p>
         </div>
         <div className="flex items-center gap-5">
            <p>Booking Status :</p>
            <p>{bookingDetails?.status}</p>
         </div>

      </div>
   )
}

export default BookingDetails