'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import dayjs from 'dayjs';
import { convertMinutesToHoursMinutes } from '@/utils';
import { AiOutlineUser } from "react-icons/ai";
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {

   passenger: {
      firstName: string;
      lastName: string;
      gender: string;
      mobileNumber: string;
      email: string;
   }[];
};
const ReviewDetails = () => {
   const button1Ref = useRef(null);
   const button2Ref = useRef(null);

   const handleClickButton1 = () => {
      button2Ref.current.click();
   };

   const {
      register,
      control,
      handleSubmit,
      formState: { errors }
   } = useForm<FormValues>({
      defaultValues: {
         passenger: [{ firstName: "", lastName: '', gender: '', mobileNumber: '', email: '' }]
      },
      mode: "onBlur"
   });
   const { fields, append, remove } = useFieldArray({
      name: "passenger",
      control
   });
   const onSubmit = (data: FormValues) => console.log(data);


   function timeDifferent(departDateTime: string, returnDateTime: string) {
      const diff = dayjs(returnDateTime).diff(departDateTime, 'minute')
      const time = convertMinutesToHoursMinutes(diff)
      return `${time.hours}h ${time.minutes}m`
   }
   return (
      <div className='w-full theme-container !py-5'>
         <ul className='flex flex-wrap gap-1 *:text-sm mb-4'>
            <li>Flight</li>
            <li>/</li>
            <li>Details</li>
         </ul>
         <div className="flex flex-warp -m-2">
            <div className="w-full lg:w-8/12 p-2">
               <div className="bg-white shadow-[0_0_5px_5px_#efefef] rounded p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="text-xl text-[#112211] font-semibold font-montserrat">Indore</div>
                     <div className=""><HiOutlineArrowLongRight size={25} /></div>
                     <div className="text-xl text-[#112211] font-semibold font-montserrat">Tokyo</div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                     <div className="inline-block font-medium bg-[#8DD3BB] bg-opacity-50 rounded-sm py-0.5 px-4">
                        {dayjs('07/06/2024').format('dddd, MMMM DD')}
                     </div>
                     <div className="flex items-center gap-1 *:text-base *:font-montserrat">
                        <p>Non Stop</p>
                        <p>&bull;</p>
                        <p>12h 20m</p>
                        {/* <p>{timeDifferent('07/06/24', '28/06/24')}</p> */}
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
                  </div>
                  <div className="p-4">
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
                  </div>
               </div>
               <div className="bg-white shadow-[0_0_5px_5px_#efefef] rounded p-4 mb-6">
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
                                          <button type="button" className='text-sm text-red-500' onClick={() => remove(index)}>
                                             REMOVE
                                          </button>
                                       </div>
                                    </div>
                                    <div className="flex flex-wrap -m-2">
                                       <div className="w-full md:w-4/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>First Name</label>
                                          <input type="text" {...register(`passenger.${index}.firstName` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
                                       </div>
                                       <div className="w-full md:w-4/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Last Name</label>
                                          <input type="text" {...register(`passenger.${index}.lastName` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
                                       </div>
                                       <div className="w-full md:w-4/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Gender</label>
                                          <select    {...register(`passenger.${index}.gender` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2'>
                                             <option value="Male">Male</option>
                                             <option value="">Female</option>
                                          </select>
                                       </div>
                                       <div className="w-full md:w-6/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Mobile No.</label>
                                          <input type="text" {...register(`passenger.${index}.mobileNumber` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
                                       </div>
                                       <div className="w-full md:w-6/12 p-2">
                                          <label htmlFor="" className='text-sm opacity-75 mb-2'>Email</label>
                                          <input type="text" {...register(`passenger.${index}.email` as const)} className='w-full h-9 text-base border border-slate-300 focus:outline-none focus:border-r-slate-500 rounded px-2' />
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
                           <p className='text-base'>$45,235</p>
                        </div>
                     </div>
                     <div className="border-b border-black pb-2 mb-2">
                        <div className="flex items-center justify-between">
                           <p className='text-base font-medium font-montserrat'>Base Fare</p>
                           <p className='text-base'>$45,235</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between">
                        <p className='text-base font-medium font-montserrat'>Total Amount</p>
                        <p className='text-base'>$45,235</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ReviewDetails