import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoIosAirplane } from "react-icons/io";
import { IoBed, IoAirplane } from "react-icons/io5";
const Header = () => {
   return (
      <div className='w-full bg-white shadow-[0_0_10px_5px_#f1f1f1] py-4'>
         <div className="theme-container">
            <div className="flex justify-between items-center">
               <ul className='flex items-center gap-6'>
                  <li>
                     <Link href={`/flight`} className='flex flex-nowrap items-center gap-1 text-sm text-[#112211] font-semibold font-montserrat'><IoAirplane size={18} />Find Flight</Link>
                  </li>
                  <li>
                     <Link href={`/hotal`} className='flex flex-nowrap items-center gap-1 text-sm text-[#112211] font-semibold font-montserrat'><IoBed size={18} />Find Stays</Link>
                  </li>
               </ul>
               <div className="">
                  <Link href={`/`}><Image src={`/images/img-logo.png`} width={120} height={45} alt='' className='w-suto h-10' /></Link>
               </div>
               <ul className='flex items-center justify-center gap-5'>
                  <li className='text-sm text-[#112211] font-semibold font-montserrat'>Login</li>
                  <li>
                     <button className='bg-[#112211] text-sm text-white font-semibold font-montserrat rounded py-2 px-4'>Register</button>
                  </li>
               </ul>
            </div>
            {/* <div className=" absolute inset-0 w-[320px] z-[9999]  bg-green-400">
               <div className="md:flex justify-between items-center max-md:p-4">
                  <ul className='md:flex items-center gap-6 max-md:space-y-4'>
                     <li>
                        <Link href={`/flight`} className='flex flex-nowrap items-center gap-1 text-sm text-[#112211] font-semibold font-montserrat'><IoAirplane size={18} />Find Flight</Link>
                     </li>
                     <li>
                        <Link href={`/hotal`} className='flex flex-nowrap items-center gap-1 text-sm text-[#112211] font-semibold font-montserrat'><IoBed size={18} />Find Stays</Link>
                     </li>
                  </ul>
                  <div className="">
                     <Image src={`/images/img-logo.png`} width={120} height={45} alt='' className='w-suto h-10' />
                  </div>
                  <ul className='w-full flex items-center justify-center gap-5'>
                     <li className='text-sm text-[#112211] font-semibold font-montserrat'>Login</li>
                     <li>
                        <button className='bg-[#112211] text-sm text-white font-semibold font-montserrat rounded py-2 px-4'>Register</button>
                     </li>
                  </ul>
               </div>
            </div> */}
         </div>
      </div>
   )
}

export default Header