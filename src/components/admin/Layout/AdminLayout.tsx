'use client'
import React, { useLayoutEffect, useState } from 'react'
import Header from "@/components/admin/Layout/Header";
import Sidebar from "@/components/admin/Layout/Sidebar";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";


import '@/style/style.scss'
import { useTheme } from '@/ui-components/sidebar';


const AdminLayout = ({ children }: { children: React.ReactNode }) => {

   // ** Menu Hover State
   const [menuHover, setMenuHover] = useState(false)

   return (
      <div className={`webx-admin-panel relative w-full h-full bg-gray-100 dark:bg-dark-skin`}>

         <div className={clsx(`webx-admin-sidebar fixed bg-white flex flex-col start-0 transition-all duration-400 ease-in-out z-50`,
            {
               'expanded': menuHover
            }
         )}
            onMouseEnter={() => setMenuHover(true)}
            onMouseLeave={() => setMenuHover(false)}
         >
            <div className="h-full">
               <div className="w-full h-[60px] flex flex-nowrap items-center gap-1 overflow-hidden shadow-[0_3px_5px_-1px_#f1f1f1] px-2 mb-0.5">
                  <Link href="/webx-admin" className="inline-flex w-11 items-center flex-shrink-0">
                     <Image src="/images/logo-1.png" alt="" width={30} height={25} className="w-full h-auto" />
                  </Link>
                  <Link href="/webx-admin" className="w-full flex items-center flex-grow">
                     <Image src="/images/logo01.png" alt="" width={186} height={38} className="!w-full !h-auto" />
                  </Link>
                  <div className="collapese-icon block lg:hidden">
                     <button className="flex items-center justify-center">
                        <IoCloseOutline size="30" />
                     </button>
                  </div>
               </div>
               <Sidebar />
            </div>
         </div>

         <div className="webx-content-wapper relative flex flex-col transition-all duration-400 ease-in-out ps-0 lg:ps-[250px]">
            <div className="webx-admin-header sticky top-0 z-50">
               <Header />
            </div>
            <div className="layout-page-content flex-grow">{children}</div>
            <div className="webx-admin-footer p-2">
               <p className="text-sm opacity-65">&copy; {new Date().getFullYear()} Webx. All rights reserved.</p>
            </div>
         </div>
      </div>
   )
}

export default AdminLayout