import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaYoutube, FaLocationDot } from "react-icons/fa6";
import { IoMdCall, IoMdMail } from "react-icons/io";
const Footer = () => {
   const currentYear = new Date().getFullYear();
   return (
      <footer className='theme-container bg-[#8DD3BB]'>
         <div className="p-4"></div>
         <div className="flex flex-wrap -m-2">
            <div className="w-full lg:w-3/12 flex max-lg:justify-center p-2">
               <div className="mb-5">
                  <Image src='/images/img-logo-02.png' width={120} height={40} alt='footer logo' className='w-auto h-12' />
                  <ul className='flex flex-nowrap items-center gap-4 mt-5'>
                     <li><FaFacebook size={20} /></li>
                     <li><FaXTwitter size={20} /></li>
                     <li><FaYoutube size={20} /></li>
                     <li><FaInstagram size={20} /></li>
                  </ul>
               </div>
            </div>
            <div className="w-full lg:w-9/12 p-2">
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
                  <div className="w-full md:w-6/12 lg:w-4/12 p-2">
                     <ul>
                        <li className='text-base text-[#112211] font-bold font-montserrat mb-4'>About Us</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Our Story</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 mb-2'>Work with us</li>
                     </ul>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-5/12 p-2">
                     <ul className='space-y-3'>
                        <li className='text-base text-[#112211] font-bold font-montserrat mb-4'>Contact Us</li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 flex flex-nowrap gap-3'>
                           <span className='mt-1'><FaLocationDot size={18} /></span>
                           <span>Mansoura, Suez Canal Street, Green Plaza Tower, Entrance 2, third floor</span>
                        </li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 flex flex-nowrap items-center gap-3'>
                           <IoMdCall size={20} />
                           <span>00201553968753</span>
                        </li>
                        <li className='text-sm text-[#112211] font-medium font-montserrat opacity-70 flex flex-nowrap items-center gap-3'>
                           <IoMdMail size={20} />
                           <span>info@example.info</span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full h-0.5 bg-gray-700 bg-opacity-25 mt-5"></div>
         <div className="flex flex-wrap items-center justify-between gap-2 py-4">
            <p className='text-xs font-medium opacity-75'>&copy; {currentYear} Cloud Wings. Design by Cloud Wings</p>
            <ul className='flex flex-wrap gap-4 items-center *:text-xs *:font-medium *:opacity-85'>
               <li>Terms of services</li>
               <li>Privacy Policies</li>
               <li>Cookies</li>
            </ul>
         </div>
      </footer>
   )
}

export default Footer