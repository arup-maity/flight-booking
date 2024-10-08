'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import clsx from 'clsx';
import { useLoginModel } from '../auth/zustand';
import { sessionContext } from '@/authentication/auth';
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { DropDown } from '@/ui-components';
import Cookies from "js-cookie"
import 'react-perfect-scrollbar/dist/css/styles.css';

type ContextType = {
   login: boolean
   user: { [key: string]: any };
   updateSession: (value: { [key: string]: any }) => void;
}

const Header = () => {
   const currentURL = usePathname();
   const router = useRouter()
   const { toggleLoginModel } = useLoginModel(state => state)
   const [openMobileMenu, setOpenMobileMenu] = useState(false)
   const session = React.useContext<ContextType>(sessionContext);
   const [current, setCurrent] = useState('/')

   useEffect(() => {
      if (openMobileMenu) {
         document.body.style.position = "fixed"
         document.body.style.overflowY = "scroll";
      } else {
         document.body.style.position = "static"
         document.body.style.overflow = "auto";
      }
   }, [openMobileMenu])

   useEffect(() => {
      setCurrent(currentURL);
   }, [currentURL])

   function processText(text: string) {
      if (!text) return ''
      const words = text.split(' ');
      const firstWord = words[0];
      if (firstWord.length > 8) {
         return firstWord.substring(0, 8) + '...';
      }
      return firstWord;
   }

   function handleLogout() {
      Cookies.remove('token')
      // toggle({ login: false, user: {} })
      router.push('/')
   }

   return (
      <>
         <div className='w-full bg-white shadow-[0_0_10px_5px_#f1f1f1] py-4'>
            <div className="theme-container">
               <div className="h-10 flex justify-between items-center">
                  <div className="flex flex-nowrap items-center">
                     <div className="flex items-center gap-2">
                        <button className="block lg:hidden" onClick={() => setOpenMobileMenu(prev => !prev)}>
                           <IoMenuOutline size={35} />
                        </button>
                        <div className="">
                           <Link href='/'><Image src='/images/logo01.png' width={158} height={32} alt='' className='!w-auto h-8' /></Link>
                        </div>
                     </div>
                     <ul className='hidden lg:flex items-center gap-10 ms-28'>
                        <li>
                           <Link href='/' className={`text-base ${current === '/' ? 'text-theme-blue' : 'text-theme-black'} font-medium font-montserrat`}>Home</Link>
                        </li>
                        <li>
                           <Link href='/offers' className={`text-base ${current === '/offers' ? 'text-theme-blue' : 'text-theme-black'} font-medium font-montserrat`}>Offers</Link>
                        </li>
                        <li>
                           <Link href='/contact-us' className={`text-base ${current === '/contact-us' ? 'text-theme-blue' : 'text-theme-black'} font-medium font-montserrat`}>Contact Us</Link>
                        </li>
                        <li>
                           <Link href='/about-us' className={`text-base ${current === '/about-us' ? 'text-theme-blue' : 'text-theme-black'} font-medium font-montserrat`}>About Us</Link>
                        </li>
                     </ul>
                  </div>
                  {
                     session?.login ?
                        <div className="relative">
                           <DropDown>
                              <DropDown.Header id='header-user' className='border-0'>
                                 <div className="text-sm font-medium font-montserrat">
                                    <div className="flex items-center gap-2">
                                       <AiOutlineUser size={20} />
                                       <span>Hi</span>
                                       {session?.user?.name ? processText(session?.user?.name) : 'Traveller'}
                                    </div>
                                 </div>
                              </DropDown.Header>
                              <DropDown.Menu id='header-user' className='w-[200px] bg-white right-0 left-auto top-12 border-0 shadow-[0_1px_10px_0_#00000033] space-y-2 p-2'>
                                 <li>
                                    <Link href='/account' className='flex items-center gap-2'><AiOutlineUser size={20} /><span className='text-base font-medium'>My Profile</span></Link>
                                 </li>
                                 <li role='button' className='flex items-center gap-2' onClick={handleLogout}><AiOutlineLogout size={20} /><span className='text-base font-medium'>Log out</span></li>
                              </DropDown.Menu>
                           </DropDown>
                        </div>
                        :
                        <ul className='flex items-center justify-center gap-5'>
                           <li role='button' className='text-sm text-[#112211] font-semibold font-montserrat' onClick={toggleLoginModel}>Login</li>
                           <li className='hidden lg:block'>
                              <button className='bg-[#112211] text-sm text-white font-semibold font-montserrat rounded py-2 px-4' onClick={toggleLoginModel}>Register</button>
                           </li>
                        </ul>
                  }

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
                        <Link href={`/offers`} className='flex flex-nowrap items-center gap-3 text-base text-[#112211] font-semibold font-montserrat'>
                           Offers
                        </Link>
                     </li>
                     <li>
                        <Link href={`/contact-us`} className='flex flex-nowrap items-center gap-3 text-base text-[#112211] font-semibold font-montserrat'>
                           Contact Us
                        </Link>
                     </li>
                     <li>
                        <Link href={`/about-us`} className='flex flex-nowrap items-center gap-3 text-base text-[#112211] font-semibold font-montserrat'>
                           About Us
                        </Link>
                     </li>
                  </ul>
               </PerfectScrollbar>
               {
                  session.login ?
                     <div className="p-2">
                        <div className="border border-theme-blue flex flex-nowrap items-center gap-4 rounded py-2 px-4 mb-3"><AiOutlineLogout size={20} />Logout </div>
                        <div className="bg-theme-blue flex flex-nowrap items-center gap-4 rounded py-2 px-4"><AiOutlineLogout size={20} />Logout </div>
                     </div>
                     :
                     <ul className='w-full flex items-center justify-center gap-2 p-4'>
                        <li className='basis-[50%] bg-gray-200 text-sm text-[#112211] text-center font-semibold font-montserrat py-2 px-4 rounded'>Login</li>
                        <li className='basis-[50%]'>
                           <button className='bg-[#112211] w-full text-sm text-white font-semibold font-montserrat rounded py-2 px-4'>Register</button>
                        </li>
                     </ul>
               }
            </div>
         </div>
      </>
   )
}

export default Header