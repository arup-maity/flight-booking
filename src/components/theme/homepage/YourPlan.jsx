import Image from 'next/image'
import React from 'react'

const plans = [
   {
      image: 'img-1.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-2.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-3.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-4.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-5.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-6.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-7.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-8.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   },
   {
      image: 'img-9.jpg',
      location: { city: 'Istanbul', country: 'Turkey' },
      travelBy: ['Flights', 'Hotels', 'Resorts']
   }
]

const YourPlan = () => {
   return (
      <div className='theme-container'>
         <div className="flex items-center justify-between gap-4 mb-10">
            <div className="">
               <div className="text-[32px] text-[#000] font-semibold mb-4">Plan your perfect trip</div>
               <p className='text-base text-[#112211] opacity-75 font-normal'>Search Flights & Places Hire to our most popular destinations</p>
            </div>
            <div className="">
               <button type="button" className='text-sm text-[#112211] font-medium border border-[#8DD3BB] rounded py-2 px-4'>See more places</button>
            </div>
         </div>
         <div className="flex flex-wrap -m-4">
            {
               plans?.map((plan, index) => (
                  <div key={index} className="w-full md:w-6/12 lg:w-4/12 p-4">
                     <div className="bg-white flex flex-nowrap items-center gap-2 p-4 shadow-[0_1px_2px_0_#1122110D] rounded-2xl">
                        <div className="w-[90px] h-[90px]">
                           <Image src={`/images/${plan?.image}`} width={90} height={90} alt='' />
                        </div>
                        <div className="">
                           <ul className='flex items-center *:text-base *:font-semibold *:text-[#112211] mb-2'>
                              <li>{plan?.location?.city}, </li>
                              <li>{plan?.location?.country}</li>
                           </ul>
                           <ul className='flex items-center *:text-sm *:font-medium *:text-[#112211]'>
                              {
                                 plan?.travelBy?.map((travel, index) => (
                                    <li key={index}>{travel}</li>
                                 ))
                              }
                           </ul>
                        </div>
                     </div>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default YourPlan