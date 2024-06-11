'use client'
import { useMenu } from '@/ui-components/sidebar';
import { useTheme } from '@/ui-components/theme';
import React, { useEffect, useState } from 'react'
import { IoIosMenu } from "react-icons/io";

const Header = () => {

   // const { theme, setTheme } = useTheme()
   const { theme, setTheme } = useMenu()
   // const [themeColor, setThemeColor] = useState('light')

   // useEffect(() => {
   //    setThemeColor(theme)
   // }, [theme])

   return (
      <div className='bg-white shadow-[0_0_15px_5px_#C7C8CC] rounded p-4'>
         <div className="flex items-center space-x-5">
            <button type='button' onClick={setTheme(true)}><IoIosMenu size={30} /></button>
            <ul className='flex ic gap-5'>
               <li>Home</li>
               <li>Home</li>
               <li>Home</li>
            </ul>
            <div>
               {/* <div className="">The current theme is: {theme}</div> */}
               {/* <div className="">{themeColor === 'light' ? 'light' : 'dark'}</div> */}
               {/* <select value={theme} onChange={e => setTheme(e.target.value)} className='border bg-white'>
                  <option value="system">System</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
               </select> */}
            </div>
         </div>
      </div>
   )
}

export default Header