import React from 'react'

const Review = () => {
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
      </div>
   )
}

export default Review