import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OfferMap = () => {
   return (
      <div className='w-full !py-20'>
         <div className="theme-container flex flex-wrap md:flex-nowrap gap-5 items-center justify-between mb-6">
            <div className="">
               <div className="text-2xl lg:text-3xl font-semibold">Let&apos;s go places together</div>
               <p className='text-base font-normal'>Discover the latest offers and news and start planning your next trip with us.</p>
            </div>
            <Link href='/' className='text-sm text-[#112211] whitespace-nowrap border border-[#8DD3BB] rounded py-2 px-4'>See All</Link>
         </div>
         <div className="">
            <div style={{ backgroundImage: `url('/images/img-13.jpg')` }} className="w-full aspect-[1440/486] flex items-center  bg-cover bg-center">

            </div>
         </div>
      </div>
   )
}

export default OfferMap