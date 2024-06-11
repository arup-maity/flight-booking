'use client'

import React, { ElementRef, useEffect, useRef, useState } from "react"
import flatpickr from 'flatpickr'
import './calendar.scss'
import { Instance as Flatpickr } from "flatpickr/dist/types/instance"
// import "flatpickr/dist/flatpickr.min.css"

interface DatePickerProps {
   onChange: (date: Date[]) => void;
   mode: 'range' | 'single'
}
const DatePicker: React.FC<DatePickerProps> = ({ onChange, mode }) => {
   const [flatpickrInstance, setFlatpickrInstance] = useState<Flatpickr>()
   const datePickerRef = useRef<ElementRef<"input">>(null)
   const dates = useRef<Date[]>([])

   useEffect(() => {
      if (datePickerRef.current) {
         const flatpickrInstance = flatpickr(datePickerRef.current, {
            static: true,
            inline: true,
            mode: mode,
            closeOnSelect: false,
            onChange: (selectedDates) => {
               if (selectedDates.length === 0) {
                  onChange([])
                  dates.current = []
               }
               onChange(selectedDates)
            },
         })
         setFlatpickrInstance(flatpickrInstance)
      }

      return () => flatpickrInstance?.destroy()
   }, [])

   return (
      <div className="w-full">
         <input ref={datePickerRef} type="text" placeholder="Select date..." className="hidden" />
      </div>
   )
}

export default DatePicker

