'use client'

import React, { useEffect, useState } from 'react'
import { IoIosMenu } from "react-icons/io";

const Header = () => {

   return (
      <div className='bg-white shadow-[0_0_15px_5px_#C7C8CC] rounded p-4'>
         <div className="flex items-center space-x-5">
            {/* <button type='button' onClick={setTheme(true)}><IoIosMenu size={30} /></button> */}
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