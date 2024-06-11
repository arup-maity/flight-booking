import BoardingPassCanvas from '@/components/common/CreateCanvas'
import React from 'react'

const BookingStatus = () => {
   return (
      <div className='w-full theme-container !py-5'>
         <ul className='flex flex-wrap gap-1 *:text-sm mb-8'>
            <li>Turkey</li>
            <li>/</li>
            <li>Istanbul</li>
            <li>/</li>
            <li>CVK Park Bosphorus Hotel Istanbul</li>
         </ul>
         <div className="flex flex-nowrap items-center justify-between mb-4">
            <div>
               <p className="text-lg text-[#112211] font-bold mb-2">Emirates A380 Airbus</p>
               <p className="text-sm text-[#112211] text-opacity-70 font-medium">Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
            </div>
            <div>
               <div className="text-xl text-[#112211] text-right font-bold mb-2">$204</div>
               <button type="button" className='bg-[#8DD3BB] rounded py-2 px-4'>Download</button>
            </div>
         </div>
         <div className="  mb-8">
            <BoardingPassCanvas />
         </div>

         <div className="">
            <div className="text-2xl text-[#112211] font-semibold mb-8">Terms and Conditions</div>
            <div className="text-xl text-[#112211] font-medium mb-4">Payments</div>
            <ul className='*:text-sm space-y-2 mb-8'>
               <li>If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.</li>
               <li>If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is declined for any reason or if you have supplied incorrect card information. If we become aware of, or is notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be cancelled and you will be liable for all costs and expenses arising from such cancellation, without prejudice to any action that may be taken against us.</li>
            </ul>
            <div className="text-xl text-[#112211] font-medium mb-4">Payments</div>
            <ul className='*:text-sm space-y-2'>
               <li>If you have any questions about our Website or our Terms of Use, please contact:</li>
               <li>Golobe Group Q.C.S.C</li>
               <li>Golobe Tower</li>
               <li>P.O. Box: 22550</li>
               <li>Doha, State of Qatar</li>
               <li>Further contact details can be found at golobe.com/help</li>
            </ul>
         </div>
      </div>
   )
}

export default BookingStatus