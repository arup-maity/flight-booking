'use client'
import React from 'react'
import { useTheme } from '@/ui-components/sidebar';
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Header = () => {

   const { theme, setTheme, collapse } = useTheme()
   return (
      <div className='h-[60px] bg-white border-b p-4'>
         <div className="flex items-center space-x-5">
            <button type='button'>
               <span className='menu-open-icon'><IoIosMenu size={30} /></span>
               <span className='menu-close-icon'><IoCloseOutline size={30} /></span>
            </button>
            <ul className='flex ic gap-5'>
               <li>Home</li>
               <li>Home</li>
               <li>Home</li>
            </ul>
            <div>
            </div>
         </div>
      </div>
   )
}

export default Header