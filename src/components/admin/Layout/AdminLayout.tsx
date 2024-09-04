'use client'
import React, { useState } from 'react'
import Header from "@/components/admin/Layout/Header";
import Sidebar from './sidebar';
import '@/style/style.scss'


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
   const [sidebarCollapse, setSidebarCollapse] = useState(false)

   return (
      <div className={`webx-admin-panel ${sidebarCollapse ? 'sidebar-collapse' : ''} relative w-full h-full bg-gray-100 dark:bg-[#101011] dark:bg-dark-skin`}>
         <Sidebar sidebarCollapse={sidebarCollapse} setSidebarCollapse={() => setSidebarCollapse(prev => !prev)} />
         <div className={`webx-content-wapper relative flex flex-col transition-all duration-400 ease-in-out ps-0 ${sidebarCollapse ? 'ps-0' : 'lg:ps-[250px]'}`}>
            <div className="admin-header sticky top-0 z-[40]">
               <Header sidebarCollapse={sidebarCollapse} setSidebarCollapse={() => setSidebarCollapse(prev => !prev)} />
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