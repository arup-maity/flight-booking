'use client'
import React from 'react'
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { DropDown } from '@/ui-components';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import { sessionContext } from '@/authentication/auth';
import Image from 'next/image';
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation';

type ContextType = {
   session: { [key: string]: any };
   updateSession: (value: { [key: string]: any }) => void;
}

const Header = () => {
   const router = useRouter()
   const { session } = React.useContext<ContextType>(sessionContext);
   function handleLogout() {
      Cookies.remove('token')
      router.push('/admin/login');
   }
   return (
      <div className='h-[60px] bg-white border-b'>
         <div className="h-full flex items-center justify-between">
            <div className="flex items-center space-x-5">
               <button type='button'>
                  <span className='menu-open-icon'><IoIosMenu size={30} /></span>
                  <span className='menu-close-icon'><IoCloseOutline size={30} /></span>
               </button>
               <form>
                  <div className="flex items-center border border-gray-300 rounded p-[1px]">
                     <input type="text" name="" id="" className='w-[300px] border-0 h-8 text-base font-montserrat focus:outline-none rounded px-2' placeholder='Search ...' />
                     <button type="submit" className='h-8 text-sm border border-gray-300 rounded px-2'>Submit</button>
                  </div>
               </form>
               <div>
               </div>
            </div>
            <div className="flex items-center space-x-5">
               <div className="relative">
                  <DropDown>
                     <DropDown.Header id='header-user' className='border-0'>
                        <div className="text-sm font-medium font-montserrat">
                           <div className="flex items-center gap-2">
                              <Image src='/images/user-placeholder.jpg' width={32} height={32} alt='' className='w-8  h-8' />
                              <ul>
                                 <li className='text-sm font-montserrat font-medium'>{session?.user?.name}</li>
                                 <li className='text-sm capitalize leading-none opacity-80'>{session?.user?.role}</li>
                              </ul>
                           </div>
                        </div>
                     </DropDown.Header>
                     <DropDown.Menu id='header-user' className='w-[200px] bg-white right-0 left-auto top-11 border-0 shadow-[0_1px_10px_0_#00000033] space-y-2 p-2'>
                        <li>
                           <Link href='/admin/profile' className='flex items-center gap-2'>
                              <AiOutlineUser size={20} />
                              <span className='text-base font-medium'>My Profile</span>
                           </Link>
                        </li>
                        <li className='flex items-center gap-2' onClick={handleLogout}><AiOutlineLogout size={20} /><span className='text-base font-medium'>Log out</span></li>
                     </DropDown.Menu>
                  </DropDown>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header