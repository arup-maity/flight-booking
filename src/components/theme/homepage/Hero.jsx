import React from 'react'

const Hero = () => {
   return (
      <div className='w-full h-screen p-7'>
         <div style={{ backgroundImage: `url('/images/img-0.jpg')` }} className="w-full h-[600px] bg-cover bg-center rounded-3xl">
            <div className="text-white text-[45px] font-bold">Helping Others</div>
            <div className="text-white text-[80px] font-bold">Live & Travel</div>
         </div>
         <div className="theme-container h-48">
            <div className="bg-gray-500 h-full rounded-2xl -mt-11"></div>
         </div>
      </div>
   )
}

export default Hero