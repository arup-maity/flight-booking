import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
   return (
      <div className='w-full'>
         <div className="theme-container py-20">
            <div className="flex flex-wrap items-center -m-4">
               <div className="w-full lg:w-6/12 p-4">
                  <div className="w-full max-lg:text-center">
                     <p className='text-base font-medium uppercase tracking-[3px] opacity-60 mb-4'>About Us</p>
                     <h4 className='w-full lg:w-[90%] text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5'>Helping businesses deliver exceptional buyer experiences.</h4>
                     <p className='text-sm font-medium opacity-60 mb-5'>Vidyard is the leading video messaging and asynchronous communications platform for go-to-market teams. Millions of sales professionals and more than 250,000 go-to-market teams use Vidyard’s AI-powered video messaging, video hosting, and digital sales rooms to connect with more prospects and generate more revenue.</p>
                     <button className='bg-[#8DD3BB] font-medium rounded py-2 px-4'>Button for Free</button>
                  </div>
               </div>
               <div className="w-full lg:w-6/12 p-4">
                  <Image src='/images/about-01.png' width={500} height={500} alt='' className='w-full h-full' />
               </div>
            </div>
         </div>
         <div className="bg-gray-100 py-16">
            <div className="theme-container">
               <div className="flex flex-wrap -m-4 py-10">
                  <div className="w-full lg:w-6/12">
                     <h4 className='w-[90%] text-4xl max-lg:text-center font-semibold max-lg:mb-8'>Built for go-to-market teams, powered by AI</h4>
                  </div>
                  <div className="w-full lg:w-6/12">
                     <div className="w-full max-lg:text-center">
                        <p className='text-base font-medium opacity-60 mb-4'>We believe in the power of video to foster human connections and empower go-to-market professionals to deliver trusted and productive buyer experiences.</p>
                        <p className='text-base font-medium opacity-60 mb-4'>We also believe in the power of AI to help sales and marketing teams unlock their creativity and connect with more prospects than ever before.</p>
                        <p className='text-base font-medium opacity-60 mb-4'>We’re committed to helping our customers grow their revenue faster by unleashing the potential of video and AI.</p>
                     </div>
                  </div>
               </div>
               <div className="w-full h-0.5 bg-gray-300"></div>
               <div className="flex flex-wrap -m-4 py-10">
                  <div className="w-full md:w-6/12 lg:w-4/12 p-4">
                     <div className="w-full max-md:text-center">
                        <div className="text-4xl font-semibold mb-2">300+</div>
                        <p className='text-base font-medium opacity-60'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                     </div>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-4/12 p-4">
                     <div className="w-full max-md:text-center">
                        <div className="text-4xl font-semibold mb-2">300+</div>
                        <p className='text-base font-medium opacity-60'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                     </div>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-4/12 p-4">
                     <div className="w-full max-md:text-center">
                        <div className="text-4xl font-semibold mb-2">300+</div>
                        <p className='text-base font-medium opacity-60'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AboutUs