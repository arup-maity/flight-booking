"use client";
import React, { useLayoutEffect, useState } from "react";
import { Elements, EmbeddedCheckoutProvider, EmbeddedCheckout, CustomCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/stripe/PaymentForm";
import { axiosInstance } from "@/config/axios";
import Image from "next/image";
import { IoIosAirplane, IoIosWifi } from "react-icons/io";
import { IoStopwatch, IoFastFood, IoLocationSharp } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import dayjs from "dayjs";
import { convertMinutesToHoursMinutes } from "@/utils";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "@/components/stripe/CustomForm";

const Checkout = () => {
   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);
   const query = useSearchParams()
   const bookingId = query.get('bid') || ''
   const [bookingDetails, setBookings] = useState<any>({})
   const [flightPrice, setFlightPrice] = useState({
      basePrice: 0,
      tax: 0,
      servicesCharge: 0,
      total: 0,
      discount: 0
   })
   const [loading, setLoading] = useState(true)
   const [notFound, setNotFound] = useState(false)

   useLayoutEffect(() => {
      getBookingdetails(bookingId)
   }, [bookingId]);

   async function getBookingdetails(bookingId: string | number) {
      try {
         const res = await axiosInstance.get(`/bookings/read-booking/${bookingId}`);
         console.log('====>', res)
         if (res.data.success) {
            setBookings(res.data.booking)
            calculatePrice(res.data.booking.flight)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }
   function calculatePrice(flight: any) {
      const taxRate = 0.18;
      const servicesChargeRate = 0.05;
      const basePrice = flight?.price
      const tax = (basePrice * taxRate).toFixed(2)
      const servicesCharge = (basePrice * servicesChargeRate).toFixed(2)
      const total = (parseFloat(basePrice) + parseFloat(tax) + parseFloat(servicesCharge)).toFixed(2);
      setFlightPrice({
         basePrice: basePrice,
         tax: parseFloat(tax),
         servicesCharge: parseFloat(servicesCharge),
         total: parseFloat(total),
         discount: 0
      });
   }
   function timeDifferent(departDateTime: string, arrivalDateTime: string) {
      const diff = dayjs(arrivalDateTime).diff(departDateTime, 'minute')
      const time = convertMinutesToHoursMinutes(diff)
      if (time.minutes === 0) {
         return `${time.hours}h`;
      } else {
         return `${time.hours}h ${time.minutes}m`;
      }
   }

   if (loading) {
      return (
         <div className='flex justify-center items-center w-full min-h-screen'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200'></div>
         </div>
      )
   }
   if (notFound || bookingDetails === null || Object.keys(bookingDetails).length === 0) {
      return (
         <div className="">Not Founded</div>
      )
   }
   return (
      <div className="w-full theme-container !py-10">
         <div className="flex flex-wrap -m-2">
            <div className="w-full lg:w-8/12 p-2">
               <div className="">
                  <div className="bg-white shadow-[0_0_10px_5px_#f1f1f1] rounded p-4 mb-4">
                     <div className="flex justify-between mb-4">
                        <div className="">
                           <div className="text-xl text-[#112211] font-semibold flex flex-nowrap gap-3">
                              <span>Emirates</span>
                              <span>{bookingDetails?.flight?.airplane?.modelNumber}</span>
                              <span>{bookingDetails?.flight?.airplane?.manufacturer}</span>
                           </div>
                           <div className="text-base text-[#112211] font-medium">
                              {dayjs("12/05/2024").format("dddd, DD MMMM")}
                           </div>
                        </div>
                        <div className="">
                           <div className="text-xl text-[#FF8682] font-medium">${bookingDetails?.flight?.price}</div>
                           <div className="text-base text-[#112211] font-medium">
                              {
                                 timeDifferent(bookingDetails?.flight?.departureTime, bookingDetails?.flight?.arrivalTime)
                              }
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 border border-[#8DD3BB] rounded-md p-2 px-4">
                           <Image
                              src={`/images/img-24.jpg`}
                              width={65}
                              height={50}
                              alt=""
                              className="w-auto h-12"
                           />
                           <div className="">
                              <p className="text-xl text-[#112211] font-medium">
                                 Emirates
                              </p>
                              <p className="text-sm text-[#112211] font-medium flex flex-nowrap gap-3">
                                 <span>{bookingDetails?.flight?.airplane?.manufacturer}</span>
                                 <span>{bookingDetails?.flight?.airplane?.modelNumber}</span>
                              </p>
                           </div>
                        </div>
                        <ul className="flex items-center gap-4">
                           <li>
                              <IoIosAirplane />
                           </li>
                           <li className="text-[#D7E2EE] text-2xl">|</li>
                           <li>
                              <IoIosWifi />
                           </li>
                           <li className="text-[#D7E2EE] text-2xl">|</li>
                           <li>
                              <IoStopwatch />
                           </li>
                           <li className="text-[#D7E2EE] text-2xl">|</li>
                           <li>
                              <IoFastFood />
                           </li>
                           <li className="text-[#D7E2EE] text-2xl">|</li>
                           <li>
                              <MdOutlineAirlineSeatReclineExtra />
                           </li>
                        </ul>
                     </div>
                     <div className="flex items-center justify-center flex-nowrap gap-10">
                        <div className="flex flex-wrap items-center">
                           <span className="text-2xl text-[#112211] font-semibold me-2">
                              {dayjs(bookingDetails.flight?.departureTime).format("HH:mm")}
                           </span>
                           <span className="text-base text-[#112211] font-medium">
                              {bookingDetails?.flight?.departureAirport?.city?.cityName}
                           </span>
                        </div>
                        <div className="relative w-40 border-b-2 border-[#949494]">
                           <div className="absolute -top-[14px] left-[35%] bg-white px-2">
                              <IoIosAirplane size={30} color="#949494" />
                           </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                           <span className="text-2xl text-[#112211] font-semibold me-2">
                              {dayjs(bookingDetails.flight?.arrivalTime).format("HH:mm")}
                           </span>
                           <span className="text-base text-[#112211] font-medium">
                              {bookingDetails?.flight?.arrivalAirport?.city?.cityName}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-white shadow-[0_0_20px_5px_#efefef] p-4">
                  <div className="text-base font-medium font-montserrat mb-4">
                     Cradit / Debit / ATM Card
                  </div>
                  {/* <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: bookingDetails?.payments?.clientSecret }}> */}
                  {/* <PaymentForm /> */}
                  {/* <EmbeddedCheckout /> */}
                  {/* </EmbeddedCheckoutProvider> */}
               </div>
               <div className="">
                  <CustomCheckoutProvider
                     stripe={stripePromise}
                     options={{ clientSecret: bookingDetails?.payments?.clientSecret }}
                  >
                     <CheckoutForm />
                  </CustomCheckoutProvider>
               </div>
            </div>
            <div className="w-full lg:w-4/12 p-2">
               <div className="bg-white shadow-[0_0_5px_5px_#efefef] rounded p-4 mb-4 sticky top-2">
                  <div className="text-xl font-bold font-montserrat mb-2">Fare Summary</div>
                  <div className="">
                     <div className="border-b pb-2 mb-2">
                        <div className="flex items-center justify-between">
                           <p className='text-base font-medium font-montserrat'>Base Fare</p>
                           <p className='text-base'>&#8377; {flightPrice?.basePrice}</p>
                        </div>
                     </div>
                     <div className="border-b pb-2 mb-2">
                        <div className="flex items-center justify-between">
                           <p className='text-base font-medium font-montserrat'>Taxes</p>
                           <p className='text-base'>&#8377; {flightPrice?.tax}</p>
                        </div>
                     </div>
                     <div className="border-b border-black pb-2 mb-2">
                        <div className="flex items-center justify-between">
                           <p className='text-base font-medium font-montserrat'>Other Services</p>
                           <p className='text-base'>&#8377; {flightPrice?.servicesCharge}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between">
                        <p className='text-base font-medium font-montserrat'>Total Amount</p>
                        <p className='text-base'>&#8377; {flightPrice?.total}</p>
                     </div>
                  </div>
               </div></div>
         </div>
      </div >
   );
};

export default Checkout;
