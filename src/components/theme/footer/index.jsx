import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
const Footer = () => {
   return (
      <footer className='theme-container bg-[#8DD3BB]'>
         <div className="p-4"></div>
         <div className="flex flex-wrap -m-2">
            <div className="w-full lg:w-4/12 flex max-lg:justify-center p-2">
               <div className="mb-5">
                  <Image src='/images/img-logo-02.png' width={120} height={40} alt='footer logo' className='w-auto h-12' />
                  <ul className='flex flex-nowrap items-center gap-3 mt-5'>
                     <li><FaFacebook size={20}/></li>
                     <li><FaXTwitter size={20}/></li>
                     <li><FaYoutube size={20}/></li>
                     <li><FaInstagram size={20}/></li>
                  </ul>
               </div>
            </div>
            <div className="w-full lg:w-8/12 p-2">
               <div className="flex flex-wrap -m-2">
                  <div className="w-full md:w-6/12 lg:w-3/12 p-2">
                     <ul>
                        <li className='text-base text-[#112211] font-bold font-montserrat mb-4'>Our Destinations</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Canada</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Alaksa</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>France</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Iceland</li>
                     </ul>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-3/12 p-2">
                     <ul>
                        <li className='text-base text-[#112211] font-bold font-montserrat mb-4'>Travel Blogs</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Bali Travel Guide</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Sri Lanks Travel Guide</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Peru Travel Guide</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Bali Travel Guide</li>
                     </ul>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-3/12 p-2">
                     <ul>
                        <li className='text-base text-[#112211] font-bold font-montserrat mb-4'>About Us</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Our Story</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Work with us</li>
                     </ul>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-3/12 p-2">
                     <ul>
                        <li className='text-base text-[#112211] font-bold font-montserrat mb-4'>Contact Us</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Our Story</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Work with us</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div className="p-4"></div>
      </footer>
   )
}

export default Footer