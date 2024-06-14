import React, { Suspense } from 'react'
import Link from 'next/link'
import FlightHero from '@/components/theme/flight/FlightHero'
import { flightOffers } from '@/components/theme/homepage/FlightOfferData'

const Flight = () => {
   return (
      <Suspense>
         <div className='w-full mb-10'>
            <FlightHero />
            <div className='w-full !py-16'>
               <div className="theme-container flex flex-wrap md:flex-nowrap gap-5 items-center justify-between mb-6">
                  <div className="w-full md:w-auto">
                     <div className="text-2xl lg:text-3xl font-semibold mb-2">Let&apos;s go places together</div>
                     <p className='text-sm md:text-base font-normal'>Discover the latest offers and news and start planning your next trip with us.</p>
                  </div>
                  <div className="w-full md:w-auto flex justify-end">
                     <Link href='/' className='text-sm text-[#112211] whitespace-nowrap border border-[#8DD3BB] rounded py-1 md:py-2 px-4'>See All</Link>
                  </div>
               </div>
               <div className="">
                  <div style={{ backgroundImage: `url('/images/img-13.jpg')` }} className="w-full aspect-[1440/600] md:aspect-[1440/486] flex items-center  bg-cover bg-center">
                  </div>
               </div>
            </div>
            <div className="w-full theme-container !pb-10">
               <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 mb-6">
                  <div className="">
                     <div className="text-2xl lg:text-3xl font-semibold mb-2">Fall into travel</div>
                     <p className='w-full lg:w-[80%] text-sm md:text-base font-normal'>Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.</p>
                  </div>
                  <div className="w-full md:w-auto flex justify-end">
                     <Link href='/' className='text-sm text-[#112211] whitespace-nowrap border border-[#8DD3BB] rounded py-1 md:py-2 px-4'>See All</Link>
                  </div>
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
               <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 mb-6">
                  <div className="">
                     <div className="text-2xl lg:text-3xl font-semibold mb-2">Fall into travel</div>
                     <p className='w-full lg:w-[80%] text-sm md:text-base font-normal'>Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.</p>
                  </div>
                  <div className="w-full md:w-auto flex justify-end">
                     <Link href='/' className='text-sm text-[#112211] whitespace-nowrap border border-[#8DD3BB] rounded py-1 md:py-2 px-4'>See All</Link>
                  </div>
               </div>
               <div className="flex flex-wrap -m-3">
                  <div className="w-full lg:w-6/12 p-3">
                     <div className="bg-[#8DD3BB] lg:aspect-[652/424] flex flex-col rounded-2xl p-6">
                        <div className="flex flex-wrap mb-5">
                           <div className='w-full md:w-6/12 text-3xl md:text-[40px] font-bold text-[#112211]'>Backpacking Sri Lanka</div>
                           <div className="w-full md:w-6/12 flex justify-end">
                              <div className="bg-white w-32 text-center rounded-md p-2">
                                 <p className='text-sm font-normal'>From</p>
                                 <p className='text-xl font-semibold font-montserrat'>$700</p>
                              </div>
                           </div>
                        </div>
                        <div className="min-h-36 lg:grow mb-5">
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
                                 <div style={{ backgroundImage: `url('${offer?.image}')` }} className="w-full relative aspect-[318/200] bg-cover bg-center rounded-xl">
                                 </div>
                              </div>
                           )
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Suspense>
   )
}

export default Flight
