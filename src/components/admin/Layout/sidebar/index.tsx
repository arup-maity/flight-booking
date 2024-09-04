import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import SidebarMenu from './SidebarMenu'

const Sidebar = ({ sidebarCollapse, setSidebarCollapse }: { sidebarCollapse: boolean, setSidebarCollapse: () => void }) => {
   return (
      <div className={`webx-admin-sidebar fixed bg-white dark:bg-[#1A1A1B] shadow-xl start-0 transition-all duration-400 ease-in-out z-50 ${sidebarCollapse ? 'lg:-translate-x-full' : 'max-lg:-translate-x-full'}`}>
         <div className="h-full">
            <div className="w-full h-[60px] flex flex-nowrap items-center gap-1 overflow-hidden px-2 mb-0.5">
               <Link href="/webx-admin" className="inline-flex w-11 items-center flex-shrink-0">
                  <Image src="/images/logo-1.png" alt="" width={30} height={25} className="w-full h-auto" />
               </Link>
               <Link href="/webx-admin" className="w-full flex items-center flex-grow">
                  <div className="text-xl font-montserrat font-semibold">Cloud Wings</div>
                  {/* <Image src="/images/logo01.png" alt="" width={186} height={38} className="!w-auto h-8" /> */}
               </Link>
               <div className="collapese-icon block lg:hidden">
                  <button className="flex items-center justify-center" onClick={setSidebarCollapse}>
                     <IoCloseOutline size="30" />
                  </button>
               </div>
            </div>
            <SidebarMenu />
         </div>
      </div>
   )
}

export default Sidebar