import React from 'react'
import { CiMobile3, CiMail } from "react-icons/ci";

const ContactUs = () => {
   return (
      <div className='w-full theme-container !py-10'>
         <div className="shadow-[0_1px_10px_0_#00000033] rounded overflow-hidden">
            <div className="flex flex-wrap -m-2 ">
               <div className="w-full lg:w-6/12 bg-[#8DD3BB] p-2">
                  <div className="p-10">
                     <h1 className='text-2xl font-medium mb-5'>Get in Touch</h1>
                     <p className='text-base font-medium opacity-80 mb-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste unde autem sapiente inventore cupiditate ex tempore sit est provident. Dicta accusantium placeat neque aliquam ipsum.</p>
                     <div className="flex flex-nowrap items-center gap-2 mb-2"><CiMobile3 size={20} /><span>+91 7908078976</span></div>
                     <div className="flex flex-nowrap items-center gap-2 mb-2"><CiMail size={20} /><span>me@arupmaity.in</span></div>
                  </div>
               </div>
               <div className="w-full lg:w-6/12 p-2 flex items-center">
                  <div className="w-full px-4 py-14">
                     <div className="space-y-4">
                        <div className="relative">
                           <input type="text" id="email" className="block px-2 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                           <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">FullName</label>
                        </div>
                        <div className="relative">
                           <input type="text" id="email" className="block px-2 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                           <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                        </div>
                        <div className="relative">
                           <input type="text" id="email" className="block px-2 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                           <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Subject</label>
                        </div>
                        <div className="relative">
                           <textarea rows={5} className="block px-2 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                           <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Message</label>
                        </div>
                        <button type="submit" className='bg-[#8DD3BB] font-medium rounded py-1 px-4'>Submit</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactUs