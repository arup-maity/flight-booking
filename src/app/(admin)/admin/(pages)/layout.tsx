
import Header from "@/components/admin/Layout/Header";
import Sidebar from "@/components/admin/Layout/Sidebar";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FiGrid } from "react-icons/fi";

interface PropsType {
   children: React.ReactNode;
}
export default function AdminLayout({ children }: PropsType) {
   return (
      <div className={clsx(`webx-admin-panel relative w-full h-full bg-gray-100 dark:bg-dark-skin vertical-menu-modern`)}>

         <div className="webx-admin-sidebar fixed bg-white dark:bg-dark-section flex flex-col start-0 transition-all duration-400 ease-in-out z-50 max-lg:-translate-x-full">
            <div className="h-full">
               <div className="w-full h-[70px] flex flex-nowrap items-center gap-1 overflow-hidden py-3 px-2">
                  {/* <Link href="/webx-admin" className="inline-flex w-10 items-center flex-shrink-0">
                     <Image src="/images/logo-1.png" alt="" width={30} height={30} className="w-full h-auto" />
                  </Link>
                  <Link href="/webx-admin" className="w-full flex items-center flex-grow">
                     <Image src="/images/logo.png" alt="" width={150} height={40} className="w-full h-auto" />
                  </Link> */}
                  {/* <div className="collapese-icon">
                     <button className="flex items-center justify-center">
                        <FiGrid size="20" />
                     </button>
                  </div> */}
               </div>
               <Sidebar />
            </div>
         </div>

         <div className="webx-content-wapper relative flex flex-col transition-all duration-400 ease-in-out max-lg:!ps-0">
            <div className="webx-admin-header sticky z-50">
               <Header />
            </div>
            <div className="layout-page-content flex-grow">{children}</div>
            <div className="webx-admin-footer">footer</div>
         </div>
      </div>
   )
}
