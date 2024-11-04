'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
      <Dialog open={isOpen} onOpenChange={toggle}>
         <DialogContent className="lg:max-w-[1000px]">
            <DialogHeader>
               <DialogTitle></DialogTitle>
            </DialogHeader>
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
            <div className="flex justify-end">
               <button className='border rounded py-1 px-4' onClick={handleApply}>Apply</button>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default TravellerClass