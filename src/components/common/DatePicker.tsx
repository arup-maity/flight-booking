'use client'
import React, { useState } from "react"
import { Calendar } from '@/ui-components'
import dayjs from "dayjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PropsType {
   isOpen: boolean;
   toggle: () => void;
   onChange: (value: any | null) => void;
   tripType: string;
}
const DatePicker: React.FC<PropsType> = ({ isOpen, toggle, onChange, tripType }) => {
   const [departureDate, setDepartureDate] = useState('')
   const [returnDate, setReturnDate] = useState('')
   const [error, setError] = useState('')

   function handleDate(e: any) {
      setDepartureDate(e[0])
      setReturnDate(e[1])
   }
   function handleApply() {
      if (departureDate === '' || !isDateStringValid(departureDate)) {
         setError('Select a date')
      } else if (tripType === 'R' && (returnDate === '' || !isDateStringValid(returnDate))) {
         setError('Select a Return date')
      } else {
         onChange({
            departureDate,
            returnDate,
         })
         toggle()
      }
   }

   function isDateStringValid(str: string) {
      const date = new Date(str);
      return !isNaN(date.getTime());
   }

   return (
      <Dialog open={isOpen} onOpenChange={toggle}>
         <DialogContent className="lg:max-w-[1000px]">
            <DialogHeader>
               <DialogTitle>Select Date</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-4">
               <div className="text-base font-medium">
                  {
                     departureDate !== '' && departureDate !== undefined &&
                     dayjs(departureDate).format('DD MMM YYYY')
                  }
               </div>
               {
                  tripType === 'R' &&
                  <>
                     <div className="text-base font-medium"> - </div>
                     <div className="text-base font-medium">
                        {
                           returnDate !== '' && returnDate !== undefined &&
                           dayjs(returnDate).format('DD MMM YYYY')
                        }
                     </div>
                  </>
               }
            </div>
            <Calendar onChange={handleDate} mode={tripType === 'O' ? 'single' : 'range'} />
            <div className="flex flex-wrap justify-between gap-4 mt-4">
               <div className="text-base text-red-500">{error}</div>
               <button className="text-base border border-green-500 rounded py-1 px-4" onClick={handleApply}>Apply</button>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default DatePicker