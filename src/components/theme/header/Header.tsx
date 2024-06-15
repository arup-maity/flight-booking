'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { IoBed, IoAirplane, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import 'react-perfect-scrollbar/dist/css/styles.css';
import clsx from 'clsx';
import { useLoginModel } from '../auth/zustand';


const Header = () => {
   const { toggleModel } = useLoginModel(state => state)
   const [openMobileMenu, setOpenMobileMenu] = useState(false)
   return (
      <>
         <div className='w-full bg-white shadow-[0_0_10px_5px_#f1f1f1] py-4'>
            <div className="theme-container">
               <div className="flex justify-between items-center">
                  <div className="flex flex-nowrap items-center">
                     <div className="flex items-center gap-2">
                        <button className="block lg:hidden" onClick={() => setOpenMobileMenu(prev => !prev)}>
                           <IoMenuOutline size={35} />
                        </button>
                        <div className="">
                           <Link href={`/`}><Image src={`/images/img-logo.png`} width={120} height={45} alt='' className='w-suto h-10' /></Link>
                        </div>
                     </div>
                     <ul className='hidden lg:flex items-center gap-6 ms-28'>
                        <li>
                           <Link href='/' className='text-sm text-[#112211] font-semibold font-montserrat'>Home</Link>
                        </li>
                        <li>
                           <Link href='/' className='text-sm text-[#112211] font-semibold font-montserrat'>Offers</Link>
                        </li>
                        <li>
                           <Link href='/' className='text-sm text-[#112211] font-semibold font-montserrat'>Contact Us</Link>
                        </li>
                        <li>
                           <Link href='/' className='text-sm text-[#112211] font-semibold font-montserrat'>About Us</Link>
                        </li>
                     </ul>
                  </div>
                  <ul className='flex items-center justify-center gap-5'>
                     <li role='button' className='text-sm text-[#112211] font-semibold font-montserrat' onClick={toggleModel}>Login</li>
                     <li className='hidden lg:block'>
                        <button className='bg-[#112211] text-sm text-white font-semibold font-montserrat rounded py-2 px-4' onClick={toggleModel}>Register</button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className={clsx(`mobile-menu fixed top-0 z-[9999] bg-white -translate-x-full transition-all duration-400 ease-in-out`, {
            'translate-x-0': openMobileMenu
         })}>
            <div className="flex flex-col border w-full h-full">
               <div className="flex flex-nowrap justify-between items-center p-4">
                  <Link href={`/`}><Image src={`/images/img-logo.png`} width={120} height={45} alt='' className='w-suto h-10' /></Link>
                  <button onClick={() => setOpenMobileMenu(prev => !prev)}><IoCloseOutline size={30} /></button>
               </div>
               <PerfectScrollbar className='grow p-4'>
                  <ul className='space-y-4'>
                     <li>
                        <Link href={`/flight`} className='flex flex-nowrap items-center gap-3 text-base text-[#112211] font-semibold font-montserrat'><IoAirplane size={18} />Find Flight</Link>
                     </li>
                     <li>
                        <Link href={`/hotal`} className='flex flex-nowrap items-center gap-3 text-base text-[#112211] font-semibold font-montserrat'><IoBed size={18} />Find Stays</Link>
                     </li>
                  </ul>
               </PerfectScrollbar>
               <ul className='w-full flex items-center justify-center gap-2 p-4'>
                  <li className='basis-[50%] bg-gray-200 text-sm text-[#112211] text-center font-semibold font-montserrat py-2 px-4 rounded'>Login</li>
                  <li className='basis-[50%]'>
                     <button className='bg-[#112211] w-full text-sm text-white font-semibold font-montserrat rounded py-2 px-4'>Register</button>
                  </li>
               </ul>
            </div>
         </div>
      </>
   )
}

export default Header