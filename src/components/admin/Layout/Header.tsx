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
import { useTheme } from '@/ui-components/theme';

type ContextType = {
   login: boolean
   user: { [key: string]: any };
   updateSession: (value: { [key: string]: any }) => void;
}

const Header = ({ sidebarCollapse, setSidebarCollapse }: { sidebarCollapse: boolean, setSidebarCollapse: () => void }) => {
   const router = useRouter()
   const { user } = React.useContext<ContextType>(sessionContext);
   const { theme, setTheme } = useTheme()
   function handleLogout() {
      Cookies.remove('token')
      localStorage.removeItem('userDetails')
      router.push('/admin/login');
   }
   return (
      <div className='h-[60px] bg-white shadow-[0_0_10px_#bebebe] rounded px-5'>
         <div className="h-full flex items-center justify-between">
            <div className="flex items-center space-x-5">
               <button type='button' onClick={setSidebarCollapse}>
                  <span className='menu-open-icon'><IoIosMenu size={30} /></span>
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
            {/* <div className="">
               <select value={theme} onChange={e => setTheme(e.target.value)}>
                  <option value="system">System</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
               </select>
            </div> */}
            <div className="flex items-center space-x-5">
               <div className="relative">
                  <DropDown>
                     <DropDown.Header id='header-user' className='border-0'>
                        <div className="text-sm font-medium font-montserrat">
                           <div className="flex items-center gap-2">
                              <Image src='/images/user-placeholder.jpg' width={32} height={32} alt='' className='w-8  h-8' />
                              <ul>
                                 <li className='text-sm font-montserrat font-medium'>{user?.name}</li>
                                 <li className='text-sm capitalize leading-none opacity-80'>{user?.role}</li>
                              </ul>
                           </div>
                        </div>
                     </DropDown.Header>
                     <DropDown.Menu id='header-user' className='w-[200px] bg-white right-0 left-auto top-[52px] border border-slate-200 space-y-2 p-2'>
                        <li>
                           <Link href='/admin/profile' className='flex items-center gap-2'>
                              <AiOutlineUser size={20} />
                              <span className='text-base font-medium'>My Profile</span>
                           </Link>
                        </li>
                        <li role='button' className='flex items-center gap-2' onClick={handleLogout}><AiOutlineLogout size={20} /><span className='text-base font-medium'>Log out</span></li>
                     </DropDown.Menu>
                  </DropDown>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header