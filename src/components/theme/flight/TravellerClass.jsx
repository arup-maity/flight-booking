'use client'
import React, { useState } from 'react'
import { Model } from '@/ui-components'

const TravellerClass = ({ isOpen, toggle, setClassPassenger }) => {
   const [classType, setClassType] = useState('E')
   const [passengerCount, setPassengerCount] = useState(1)
   function handleApply() {
      setClassPassenger({
         count: passengerCount,
         class: classType
      })
      toggle()
   }

   const passengerNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9]

   return (
      <div>
         <Model isOpen={isOpen} toggle={toggle} className="h-screen flex items-center">
            <Model.Body className="min-h-60">
               <Model.Header toggle={toggle}>
                  <div className=""></div>
               </Model.Header>
               <div className="mb-4">
                  <div className="text-base font-medium mb-2">CHOOSE TRAVEL CLASS</div>
                  <ul className='flex flex-wrap items-center gap-2'>
                     <li onClick={() => setClassType('E')} className={`border rounded py-1 px-4 ${classType === 'E' ? 'text-[#8DD3BB] font-medium border-[#8DD3BB]' : 'text-black'}`}>Economy/Premium Economy</li>
                     <li onClick={() => setClassType('P')} className={`border rounded py-1 px-4 ${classType === 'P' ? 'text-[#8DD3BB] font-medium border-[#8DD3BB]' : 'text-black'}`}>Premium Economy</li>
                     <li onClick={() => setClassType('B')} className={`border rounded py-1 px-4 ${classType === 'B' ? 'text-[#8DD3BB] font-medium border-[#8DD3BB]' : 'text-black'}`}>Business</li>
                  </ul>
               </div>
               <div className="mb-4">
                  <div className="text-base font-medium mb-2">ADULTS (12y +)</div>
                  <ul className='flex flex-wrap gap-2 *:border *:rounded *:w-8 *:h-8 *:flex *:items-center *:justify-center *:text-base'>
                     {
                        passengerNumber.map((item, index) => {
                           return (
                              <li role='button' key={index} onClick={() => setPassengerCount(item)} className={`${passengerCount === item ? 'text-[#8DD3BB] font-medium border-[#8DD3BB]' : 'text-black'}`}>{item}</li>
                           )
                        })
                     }
                  </ul>
               </div>
               {/* <div className="">
                  <div className="text-base font-medium mb-2">CHILDREN (2y - 12y )</div>
                  <ul className='flex flex-nowrap gap-4'>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>1</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>2</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>3</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>4</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>5</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>6</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>7</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>8</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>9</span></label></li>
                     <li><label htmlFor="" className='flex items-center text-sm gap-1'><input type="radio" name="" id="" /><span>10</span></label></li>
                  </ul>
               </div> */}
               <div className="flex justify-end">
                  <button className='border rounded py-1 px-4' onClick={handleApply}>Apply</button>
               </div>
            </Model.Body>
         </Model>
      </div>
   )
}

export default TravellerClass