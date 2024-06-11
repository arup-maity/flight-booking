'use client'
import React from 'react'
import Image from 'next/image'
import { IoIosAirplane, IoIosWifi } from "react-icons/io";
import { IoStopwatch, IoFastFood } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineExtra, MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { CiCirclePlus } from "react-icons/ci";

const Checkout = () => {
   return (
      <div className='w-full theme-container !py-5'>
         <ul className='flex flex-wrap gap-1 *:text-sm mb-8'>
            <li>Turkey</li>
            <li>/</li>
            <li>Istanbul</li>
            <li>/</li>
            <li>CVK Park Bosphorus Hotel Istanbul</li>
         </ul>
         <div className="flex flex-wrap -m-2">
            <div className="w-full lg:w-8/12 p-2">
               <div className="bg-white shadow-[0_0_15px_1px_#e7e7e7] rounded p-4 mb-4">
                  <div className="flex flex-nowrap items-center justify-between mb-4">
                     <div>
                        <p className="text-xl text-[#112211] font-bold mb-2">Emirates A380 Airbus</p>
                        <p className="text-base text-[#112211] font-medium">Return Wed, Dec 8</p>
                     </div>
                     <div>
                        <div className="text-xl text-[#112211] font-bold mb-2">$204</div>
                        <p className="text-lg text-[#112211] font-medium">2h 28m</p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4 border border-[#8DD3BB] rounded-md p-2">
                        <Image src={`/images/img-24.jpg`} width={65} height={50} alt='' className='w-auto h-12' />
                        <div className="">
                           <p className='text-xl text-[#112211] font-medium'>Emirates</p>
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
               </div>
               <div className="bg-white shadow-[0_0_15px_1px_#e7e7e7] rounded p-4 mb-4">
                  <div className="hover:bg-[#8DD3BB] flex items-center gap-4 rounded p-4">
                     <div className="">
                        <input type="radio" name="" id="" />
                     </div>
                     <div className="">
                        <div className="text-base font-bold">Pay in full</div>
                        <p>Pay the total and you are all set</p>
                     </div>
                  </div>
                  <div className="hover:bg-[#8DD3BB] flex items-center gap-4 rounded p-4">
                     <div className="">
                        <input type="radio" name="" id="" />
                     </div>
                     <div className="">
                        <div className="text-base font-bold">Pay part now, part later</div>
                        <p>Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.</p>
                     </div>
                  </div>
               </div>
               {/* <div className="bg-white shadow-[0_0_15px_1px_#e7e7e7] rounded p-4 mb-4">
                  <div className="text-xl text-[#112211] font-bold mb-2">Login or Sign up to book</div>
                  <div className="flex items-center justify-center gap-4 border border-[#8DD3BB] rounded py-2.5 px-4 mb-4">
                     <FcGoogle size={24} />
                     <span>Login with google</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 border border-[#8DD3BB] rounded py-2.5 px-4">
                     <MdEmail size={24} />
                     <span>Continue with email</span>
                  </div>
               </div> */}
               <div className="bg-white shadow-[0_0_15px_1px_#e7e7e7] rounded p-4 mb-4">
                  <div className="bg-[#8DD3BB] flex flex-nowrap items-center gap-4 rounded p-4 mb-4">
                     <div className="">
                        <input type="radio" name="" id="" />
                     </div>
                     <div className="">
                        <div className="text-base font-bold">VISA</div>
                        <div><span className='text-base font-medium me-5'>**** 4321</span><span>02/27</span></div>
                     </div>
                  </div>
                  <div className="w-full h-28 flex flex-col items-center justify-center border border-dashed border-[#8DD3BB] rounded">
                     <CiCirclePlus size={35}  color='#8DD3BB' />
                     <p>Add a new card</p>
                  </div>
               </div>
            </div>
            <div className="w-full lg:w-4/12 p-2">
               <div className="bg-white shadow-[0_0_15px_1px_#e7e7e7] rounded p-4 mb-4">
                  <div className="flex items-center gap-3 border-b pb-2">
                     <div style={{ backgroundImage: `url('/images/img-26.jpg')` }} className="w-24 h-24 aspect-square flex items-center bg-cover bg-center rounded-md"></div>
                     <div className="">
                        <p className='text-base text-[#112211]'>Economy </p>
                        <p className="text-lg text-[#112211] font-bold">Emirates A380 Airbus</p>
                        <p className='text-sm'>Very Good 54 reviews</p>
                     </div>
                  </div>
                  <div className="border-b py-2">
                     <p className='text-base'>Your booking is protected by golobe</p>
                  </div>
                  <div className="py-2">
                     <p className='text-base text-[#112211] font-bold mb-1'>Price Details</p>
                     <ul>
                        <li className='w-full flex justify-between'><span>Base Fare</span><span>$400</span></li>
                        <li className='w-full flex justify-between'><span>Base Fare</span><span>$400</span></li>
                        <li className='w-full flex justify-between'><span>Base Fare</span><span>$400</span></li>
                        <li className='w-full border-b pt-2 mb-2'></li>
                        <li className='w-full flex justify-between'><span>Total</span><span>$400</span></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Checkout