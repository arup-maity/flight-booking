import FlightHero from '@/components/theme/flight/FlightHero'
import OfferMap from '@/components/theme/flight/OfferMap'
import Link from 'next/link'
import React from 'react'

const flightOffers = [
   {
      image: '/images/img-17.jpg',
      location: 'Melbourne',
      description: 'An amazing journey',
      price: 700,
      link: '/'
   },
   {
      image: '/images/img-16.jpg',
      location: 'Melbourne',
      description: 'An amazing journey',
      price: 700,
      link: '/'
   },
   {
      image: '/images/img-15.jpg',
      location: 'Melbourne',
      description: 'An amazing journey',
      price: 700,
      link: '/'
   },
   {
      image: '/images/img-14.jpg',
      location: 'Melbourne',
      description: 'An amazing journey',
      price: 700,
      link: '/'
   },
]

const Flight = () => {
   return (
      <div className='w-full mb-10'>
         <FlightHero />
         <OfferMap />
         <div className="w-full theme-container !py-10">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 mb-10">
               <div className="">
                  <div className="text-2xl lg:text-3xl font-semibold">Fall into travel</div>
                  <p className='w-full lg:w-[80%] text-base font-normal'>Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.</p>
               </div>
               <Link href='/' className='text-sm text-[#112211] whitespace-nowrap border border-[#8DD3BB] rounded py-2 px-4'>See All</Link>
            </div>
            <div className="flex flex-wrap -m-2">
               {
                  flightOffers?.map((offer, index) =>
                     <div key={index} className="w-full md:w-6/12 lg:w-3/12 p-2">
                        <div style={{ backgroundImage: `url('${offer?.image}')` }} className="w-full relative aspect-[300/450] bg-cover bg-center rounded-xl">
                           <div className="absolute left-0 right-0 bottom-0 w-full p-6">
                              <div className="w-full flex flex-nowrap justify-between gap-4 mb-4">
                                 <ul>
                                    <li className="text-2xl font-medium text-white">{offer?.location}</li>
                                    <li className='text-base text-white font-normal'>{offer?.description}</li>
                                 </ul>
                                 <div className="text-2xl font-medium text-white">${offer?.price}</div>
                              </div>
                              <Link href={offer?.link} className='w-full inline-flex justify-center text-sm text-[#112211] font-medium bg-[#8DD3BB] rounded py-2 px-4'>Book Flight</Link>
                           </div>
                        </div>
                     </div>
                  )
               }

            </div>
         </div>
         <div className="w-full theme-container !py-10">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 mb-10">
               <div className="">
                  <div className="text-2xl lg:text-3xl font-semibold">Fall into travel</div>
                  <p className='w-full lg:w-[80%] text-base font-normal'>Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.</p>
               </div>
               <Link href='/' className='text-sm text-[#112211] whitespace-nowrap border border-[#8DD3BB] rounded py-2 px-4'>See All</Link>
            </div>
            <div className="flex flex-wrap -m-3">
               <div className="w-full  lg:w-6/12 p-3">
                  <div className="bg-[#8DD3BB] flex flex-col aspect-[652/424] rounded-2xl p-6">
                     <div className="flex flex-wrap justify-between gap-4 mb-2">
                        <div className='w-full md:w-6/12 text-[40px] font-bold text-[#112211]'>Backpacking Sri Lanka</div>
                        <div className="">
                           <div className="bg-white text-center rounded-md p-2">
                              <p className='text-sm font-normal'>From</p>
                              <p className='text-xl font-semibold font-montserrat'>$700</p>
                           </div>
                        </div>
                     </div>
                     <div className="min-h-44 flex-grow">
                        <p className='text-sm font-normal text-[#112211]'>Traveling is a unique experience as it&apos;s the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.</p>
                     </div>
                     <Link href='/' className='w-full inline-flex justify-center text-sm text-[#112211] font-medium bg-white rounded py-2 px-4'>Book Flight</Link>
                  </div>
               </div>
               <div className="w-full lg:w-6/12 p-3">
                  <div className="flex flex-wrap -m-2">
                     {
                        flightOffers?.map((offer, index) =>
                           <div key={index} className="w-full md:w-6/12 p-2">
                              <div style={{ backgroundImage: `url('${offer?.image}')` }} className="w-full relative aspect-[318/200] bg-cover bg-center border-2 border-[#8DD3BB] rounded-xl">
                              </div>
                           </div>
                        )
                     }
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Flight