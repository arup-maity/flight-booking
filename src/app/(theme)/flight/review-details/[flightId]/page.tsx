'use client'
import React, { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import dayjs from 'dayjs';
import { convertMinutesToHoursMinutes } from '@/utils';
import { AiOutlineUser } from "react-icons/ai";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { axiosInstance, flightInstance } from '@/config/axios';
import { sessionContext } from '@/authentication/auth';
import { useRouter } from 'next/navigation';
import { useLoginModel } from '@/components/theme/auth/zustand';

type FormValues = {
   passengers: {
      firstName: string;
      lastName: string;
      gender: string;
      mobileNumber: string;
      email: string;
   }[];
};
type ContextType = {
   login: boolean
   user: { [key: string]: any };
   updateSession: (value: { [key: string]: any }) => void;
}
const ReviewDetails = ({ params }: { params: { flightId: string } }) => {
   const flightId = params.flightId
   //
   const {login, user } = React.useContext<ContextType>(sessionContext);
   const { push } = useRouter()
   //
   const { loginModel, toggleLoginModel } = useLoginModel(state => state)
   //
   const [flightDetails, setFlightDetails] = React.useState<any>(null)
   const [loading, setLoading] = React.useState<boolean>(true)
   const [notFound, setNotFound] = React.useState<boolean>(false)
   const [flightPrice, setFlightPrice] = useState({
      basePrice: 0,
      tax: 0,
      servicesCharge: 0,
      total: 0,
      discount: 0
   })
   //
   const button1Ref = useRef<HTMLButtonElement | null>(null);
   const button2Ref = useRef<HTMLButtonElement | null>(null);

   const handleClickButton1 = (): void => {
      if (button2Ref.current) {
         button2Ref.current.click();
      }
   };
   const passengerSchema = z.object({
      firstName: z.string().min(2, "First name is required"),
      lastName: z.string().min(2, "Last name is required"),
      gender: z.string(),
      mobileNumber: z.string().min(10, "Mobile number is required").regex(/^\d+$/, "Mobile number must be numeric"),
      email: z.string().min(5, "Email is required").email("Invalid email address"),
   });

   const schemaValidation = z.object({
      passengers: z.array(passengerSchema)
   });
   const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
      defaultValues: {
         passengers: [{ firstName: "", lastName: '', gender: 'male', mobileNumber: '', email: '' }]
      },
      mode: "onChange",
      resolver: zodResolver(schemaValidation)
   });
   const { fields, append, remove } = useFieldArray({ name: "passengers", control });

   useLayoutEffect(() => {
      getFlightDetails(flightId)
   }, [flightId])

   async function getFlightDetails(id: string) {
      try {
         const res = await flightInstance.get(`/flight-details/${id}`)
         // console.log(res)
         if (res.data.success) {
            setFlightDetails(res.data.flight)
            calculatePrice(res.data.flight)
         }
      } catch (error) {
         console.log(error)
         setNotFound(true)
      }
      finally {
         setLoading(false)
      }
   }

   const onSubmit = async (data: FormValues) => {
      try {
         console.log('=====', data);
         if (login && user?.id) {
            const res = await axiosInstance.post(`/bookings/create-booking`, { ...data, flightDetails, flightPrice })
            console.log('===========update==============>', res)
            if (res.data.success) {
               push(`/checkout?bid=${res.data?.booking?.id}`)
            }
         } else {
            console.log('not login')
            toggleLoginModel()
         }
      } catch (error) {
         console.log(error)
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
   if (notFound || flightDetails === null || Object.keys(flightDetails).length === 0) {
      return (
         <div className="">Not Founded</div>
      )
   }
   return (
      <div className='w-full theme-container !py-5'>
         <ul className='flex flex-wrap gap-1 *:text-sm mb-4'>
            <li>Flight</li>
            <li>/</li>
            <li>Details</li>
         </ul>
         <div className="flex flex-wrap -m-2">
            <div className="w-full lg:w-8/12 p-2">
               <div className="bg-white shadow-[0_0_20px_5px_#efefef] rounded p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="text-xl text-[#112211] font-semibold font-montserrat">{flightDetails?.departureAirport?.city?.cityName}</div>
                     <div className=""><HiOutlineArrowLongRight size={25} /></div>
                     <div className="text-xl text-[#112211] font-semibold font-montserrat">{flightDetails?.arrivalAirport?.city?.cityName}</div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                     <div className="inline-block text-sm md:text-base font-medium bg-[#8DD3BB] bg-opacity-50 rounded-sm py-1 px-4">
                        {dayjs(flightDetails?.departureTime).format('dddd, MMMM DD')}
                     </div>
                     <div className="flex items-center gap-1 *:text-base *:font-montserrat">
                        <p>Non Stop</p>
                        <p>&bull;</p>
                        <p>{timeDifferent(flightDetails?.departureTime, flightDetails?.arrivalTime)}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                     <Image src={`/images/img-24.jpg`} width={65} height={32} alt='' className='w-auto h-8' />
                     <div className="flex items-center gap-2">
                        <p className='text-base text-[#112211] font-medium'>Emirates</p>
                        <p>&bull;</p>
                        <p className='text-sm text-[#112211] font-medium'>{flightDetails?.airplane?.manufacturer}</p>
                     </div>
                  </div>
                  <div className="bg-gray-100 p-4">
                     <div className="flex items-center gap-4">
                        <div className='w-14 text-lg text-[#112211] font-medium'>{dayjs(flightDetails?.departureTime).format('HH:mm')}</div>
                        <div className="border-2 border-slate-400 w-3 h-3 rounded-3xl flex-[0_0_auto]"></div>
                        <div className="flex flex-wrap items-center gap-1">
                           <div className='text-base text-[#112211] font-medium'>{flightDetails?.departureAirport?.city?.cityName}</div>
                           <div className='hidden md:block'>&bull;</div>
                           <div className="text-base text-[#112211] line-clamp-1">{flightDetails?.departureAirport?.airportName}</div>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="w-[67px] lg:w-[76px]"></div>
                        <div className="h-20 lg:h-10 border-l-2 border-dashed border-slate-400"></div>
                        <div className="text-sm ms-5">{timeDifferent(flightDetails?.departureTime, flightDetails?.arrivalTime)}</div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className='w-14 text-lg text-[#112211] font-medium'>{dayjs(flightDetails?.arrivalTime).format('HH:mm')}</div>
                        <div className="border-2 border-slate-400 w-3 h-3 rounded-3xl flex-[0_0_auto]"></div>
                        <div className="flex max-md:flex-wrap items-center gap-1">
                           <div className='text-base text-[#112211] font-medium'>{flightDetails?.arrivalAirport?.city?.cityName}</div>
                           <div className='hidden md:block'>&bull;</div>
                           <div className="text-base text-[#112211] line-clamp-1">{flightDetails?.arrivalAirport?.airportName}</div>
                        </div>
                     </div>
                  </div>
                  {/* <div className="p-4">
                     <div className="flex items-center">
                        <div className="w-[76px]"></div>
                        <div className="h-10 border-l-2 border-dashed border-slate-400"></div>
                        <div className=" ms-5 space-y-1">
                           <div className="text-sm">Change of planes</div>
                           <div className="text-sm">2h 30m Layover in New Delhi</div>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                     <Image src={`/images/img-24.jpg`} width={65} height={32} alt='' className='w-auto h-8' />
                     <div className="flex items-center gap-2">
                        <p className='text-base text-[#112211] font-medium'>Emirates</p>
                        <p>&bull;</p>
                        <p className='text-sm text-[#112211] font-medium'>Airbus A320</p>
                     </div>
                  </div>
                  <div className="bg-gray-100 p-4">
                     <div className="flex items-center gap-4">
                        <div className='w-14 text-lg text-[#112211] font-medium'>12:00</div>
                        <div className="border-2 border-slate-400 w-3 h-3 rounded-3xl"></div>
                        <div className="flex items-center gap-1">
                           <div className='text-base text-[#112211] font-medium'>Newark</div>
                           <div>&bull;</div>
                           <div className="text-base text-[#112211]">Devi Ahilyabai Holkar International Airport</div>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="w-[76px]"></div>
                        <div className="h-10 border-l-2 border-dashed border-slate-400"></div>
                        <div className="text-sm ms-5">12h 10m</div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className='w-14 text-lg text-[#112211] font-medium'>12:00</div>
                        <div className="border-2 border-slate-400 w-3 h-3 rounded-3xl"></div>
                        <div className="flex items-center gap-1">
                           <div className='text-base text-[#112211] font-medium'>Newark</div>
                           <div>&bull;</div>
                           <div className="text-base text-[#112211]">Devi Ahilyabai Holkar International Airport</div>
                        </div>
                     </div>
                  </div> */}
               </div>
               <div className="bg-white shadow-[0_0_20px_5px_#efefef] rounded p-4 mb-6">
                  <div className="text-xl font-bold font-montserrat mb-2">Important Information</div>
                  <div className="mb-4">
                     <div className="text-base font-medium mb-2">Travellers arriving in India must follow these guidelines:</div>
                     <ul className='space-y-2 list-disc ps-4'>
                        <li className='text-xs'><b>Who can travel?</b> All travellers are advised to be fully vaccinated.</li>
                        <li className='text-xs'><b>Test on Arrival:</b> A sub-section (2% of the total passengers in the flight), with the exception of children below 12 years, could be subject to random post arrival testing at the airport. All travellers may undergo random thermal screening upon arrival.</li>
                        <li className='text-xs'><b>Please Note:</b> All travellers arriving from international destinations and connecting to a domestic destination must recheck-in their bags at the first port of entry, regardless of through check-in done till the final destination.</li>
                     </ul>
                  </div>
                  <div className="mb-4">
                     <div className="text-base font-medium mb-2">Travellers arriving in India must follow these guidelines:</div>
                     <ul className='space-y-2 list-disc ps-4'>
                        <li className='text-xs'><b>Who can travel?</b> All travellers are advised to be fully vaccinated.</li>
                        <li className='text-xs'><b>Test on Arrival:</b> A sub-section (2% of the total passengers in the flight), with the exception of children below 12 years, could be subject to random post arrival testing at the airport. All travellers may undergo random thermal screening upon arrival.</li>
                        <li className='text-xs'><b>Please Note:</b> All travellers arriving from international destinations and connecting to a domestic destination must recheck-in their bags at the first port of entry, regardless of through check-in done till the final destination.</li>
                     </ul>
                  </div>
                  <div className="mb-4">
                     <div className="text-base font-medium mb-2">Travellers arriving in India must follow these guidelines:</div>
                     <ul className='space-y-2 list-disc ps-4'>
                        <li className='text-xs'><b>Who can travel?</b> All travellers are advised to be fully vaccinated.</li>
                        <li className='text-xs'><b>Test on Arrival:</b> A sub-section (2% of the total passengers in the flight), with the exception of children below 12 years, could be subject to random post arrival testing at the airport. All travellers may undergo random thermal screening upon arrival.</li>
                        <li className='text-xs'><b>Please Note:</b> All travellers arriving from international destinations and connecting to a domestic destination must recheck-in their bags at the first port of entry, regardless of through check-in done till the final destination.</li>
                     </ul>
                  </div>
               </div>
               <div className="bg-white shadow-[0_0_5px_5px_#efefef] rounded p-4 mb-4">
                  <div className="text-xl font-semibold font-montserrat mb-2">Traveller Details</div>
                  <div className="flex justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <span className='inline-flex bg-gray-200 rounded-3xl p-1'><AiOutlineUser size={20} /></span>
                        <span className='text-base font-medium font-montserrat'>ADULT (12 yrs+)</span>
                     </div>
                     <div className="">
                        <span className='text-base font-medium'>0/1</span>
                     </div>
                  </div>
                  <div className="">
                     <form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field, index) => {
                           return (
                              <div key={field.id}>
                                 <section className='border rounded p-4 mb-2' key={field.id}>
                                    <div className="flex flex-nowrap items-center justify-between mb-4">
                                       <div className='text-base font-medium'>Passanger {index + 1}</div>
                                       <div className="">
                                          {
                                             index !== 0 &&
                                             <button type="button" className='text-sm text-red-500' onClick={() => remove(index)}>
                                                REMOVE
                                             </button>
                                          }
                                       </div>
                                    </div>
                                    <div className="flex flex-wrap -m-2">
                                       <div className="w-full md:w-4/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>First Name</label>
                                          <input type="text" {...register(`passengers.${index}.firstName` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
                                          {errors.passengers?.[index]?.firstName && <span className='text-sm text-red-500'>{errors.passengers?.[index]?.firstName?.message}</span>}
                                       </div>
                                       <div className="w-full md:w-4/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Last Name</label>
                                          <input type="text" {...register(`passengers.${index}.lastName` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
                                          {errors.passengers?.[index]?.lastName && <span className='text-sm text-red-500'>{errors.passengers?.[index]?.lastName?.message}</span>}
                                       </div>
                                       <div className="w-full md:w-4/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Gender</label>
                                          <select    {...register(`passengers.${index}.gender` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2'>
                                             <option value="male">Male</option>
                                             <option value="female">Female</option>
                                          </select>
                                       </div>
                                       <div className="w-full md:w-6/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Mobile No.</label>
                                          <input type="text" {...register(`passengers.${index}.mobileNumber` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
                                          {errors.passengers?.[index]?.mobileNumber && <span className='text-sm text-red-500'>{errors.passengers?.[index]?.mobileNumber?.message}</span>}
                                       </div>
                                       <div className="w-full md:w-6/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Email</label>
                                          <input type="text" {...register(`passengers.${index}.email` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
                                          {errors.passengers?.[index]?.email && <span className='text-sm text-red-500'>{errors.passengers?.[index]?.email?.message}</span>}
                                       </div>
                                    </div>
                                 </section>
                              </div>
                           );
                        })}


                        <button
                           type="button"
                           className='text-sm'
                           onClick={() =>
                              append({ firstName: "", lastName: '', gender: '', mobileNumber: '', email: '' })
                           }
                        >
                           + Add Passenger
                        </button>
                        <button type='submit' ref={button2Ref} className='hidden'>submit</button>
                     </form>
                  </div>
               </div>
               <div className="">
                  <button type='button' className='border rounded py-2 px-5' ref={button1Ref} onClick={handleClickButton1}>Continue</button>
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
               </div>
            </div>
         </div>
      </div>
   )
}

export default ReviewDetails