'use client'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { toast } from 'sonner';
import Select from 'react-select'
import { adminInstance } from '@/config/axios'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import { handleApiError } from '@/utils'

import { Offcanvas, OffcanvasContent, OffcanvasHeader, OffcanvasTitle } from "@/components/ui/offcanvas";


interface PropsType {
   isOpen: boolean;
   toggle: () => void;
   selectedFlight: any
}
interface ValueType {
   flightNumber: string;
   departureAirportId: number;
   arrivalAirportId: number;
   departureTime: Date;
   arrivalTime: Date;
   airplaneId: number;
   price: number;
   boardingGate: string;
}
const ManageFlight: React.FC<PropsType> = ({ isOpen, toggle, selectedFlight }) => {
   const [airportList, setAirportList] = useState([])
   const [airplaneList, setAirplaneList] = useState([])
   const defaultValues: Partial<ValueType> = {
      flightNumber: '',
      departureAirportId: 0,
      arrivalAirportId: 0,
      departureTime: new Date(),
      arrivalTime: new Date(),
      airplaneId: 0,
      price: 0,
      boardingGate: ''
   }
   const schemaValidation = z.object({
      flightNumber: z.string().min(1, 'Field is required'),
      departureAirportId: z.number().min(1, 'Field is required'),
      arrivalAirportId: z.number().min(1, 'Field is required'),
      departureTime: z.date(),
      arrivalTime: z.date(),
      airplaneId: z.number().min(1, 'Field is required'),
      price: z.number().min(1, 'Field is required'),
      boardingGate: z.string().min(1, 'Field is required'),
   }).refine((field) => field.departureAirportId !== field.arrivalAirportId, {
      path: ['arrivalAirportId'],
      message: 'Departure airport and arrival airport should not be the same.'
   })
   const { register, control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
      defaultValues, mode: 'onSubmit', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      // console.log('onSubmit', data)
      try {
         if (Object.keys(selectedFlight).length > 0) {
            const res = await adminInstance.put(`/flight/update-flight/${selectedFlight.id}`, data);
            if (res.data?.success) {
               toast.success('Flight updated successfully')
            }
         } else {
            const res = await adminInstance.post(`/flight/create-flight`, data);
            if (res.data?.success) {
               toast.success('Flight created successfully')
            }
         }
         toggle()
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }

   async function getAirports() {
      const res = await adminInstance.get('/airport/all-airports')
      const airportsOption = res.data.airports?.map((airport: any) => ({
         label: airport.airportName,
         value: airport.id,
      }))
      setAirportList(airportsOption)
   }
   async function getAirplanes() {
      const res = await adminInstance.get('/airplane/all-airplanes')
      const airplanesOption = res.data.airplanes?.map((airplanes: any) => ({
         label: airplanes.modelNumber,
         value: airplanes.id,
      }))
      setAirplaneList(airplanesOption)
   }

   const onOpen = () => {
      getAirplanes()
      getAirports()
      if (Object.keys(selectedFlight).length > 0) {
         for (const key in defaultValues) {
            setValue(key as keyof ValueType, selectedFlight[key])
         }
      } else {
         reset()
      }
   }

   return (
      <>
         <Offcanvas open={isOpen} onOpenChange={toggle}>
            <OffcanvasContent onOpenAutoFocus={onOpen} className="flex flex-col w-4/12 min-w-[400px] rounded-l-xl">
               <OffcanvasHeader className='p-4'>
                  <OffcanvasTitle>
                     {Object.keys(selectedFlight).length > 0 ? 'Edit Flight' : 'Add Flight'}
                  </OffcanvasTitle>
               </OffcanvasHeader>
               <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col">
                  <div className="flex-grow space-y-4 custom-scrollbar px-4">
                     <fieldset>
                        <label className='text-sm text-gray-500'>Flight Number</label>
                        <input {...register("flightNumber")} className='w-full h-10 border border-slate-300 rounded p-2' />
                        {errors.flightNumber && <p className='text-xs text-red-500 mt-1'>{errors.flightNumber.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>Departure Airport</label>
                        <Controller
                           name='departureAirportId'
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <Select
                                 options={airportList}
                                 value={airportList?.filter((obj: any) => value === obj.value)}
                                 onChange={(e: any) => onChange(e.value)}
                              />
                           )}
                        />
                        {errors.departureAirportId && <p className='text-xs text-red-500 mt-1'>{errors.departureAirportId.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>Arrival Airport</label>
                        <Controller
                           name='arrivalAirportId'
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <Select
                                 options={airportList}
                                 value={airportList?.filter((obj: any) => value === obj.value)}
                                 onChange={(e: any) => onChange(e.value)}
                              />
                           )}
                        />
                        {errors.arrivalAirportId && <p className='text-xs text-red-500 mt-1'>{errors.arrivalAirportId.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>Departure</label>
                        <Controller
                           name='departureTime'
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <Flatpickr
                                 data-enable-time
                                 value={value}
                                 className='w-full h-10 border border-slate-300 rounded p-2'
                                 onChange={(value: any) => onChange(value[0])}
                              />
                           )}
                        />
                        {errors.departureTime && <p className='text-xs text-red-500 mt-1'>{errors.departureTime.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>Arrival</label>
                        <Controller
                           name='arrivalTime'
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <Flatpickr
                                 data-enable-time
                                 value={value}
                                 className='w-full h-10 border border-slate-300 rounded p-2'
                                 onChange={(value: any) => onChange(value[0])}
                              />
                           )}
                        />
                        {errors.arrivalTime && <p className='text-xs text-red-500 mt-1'>{errors.arrivalTime.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>airplaneId</label>
                        <Controller
                           name='airplaneId'
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <Select
                                 options={airplaneList}
                                 value={airplaneList?.filter((obj: any) => value === obj.value)}
                                 onChange={(e: any) => onChange(e.value)}
                              />
                           )}
                        />
                        {errors.airplaneId && <p className='text-xs text-red-500 mt-1'>{errors.airplaneId.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>Price</label>
                        <input {...register("price", {
                           valueAsNumber: true
                        })} className='w-full h-10 border border-slate-300 rounded p-2' />
                        {errors.price && <p className='text-xs text-red-500 mt-1'>{errors.price.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>Boarding Gate</label>
                        <input {...register("boardingGate")} className='w-full h-10 border border-slate-300 rounded p-2' />
                        {errors.boardingGate && <p className='text-xs text-red-500 mt-1'>{errors.boardingGate.message}</p>}
                     </fieldset>
                  </div>
                  <div className='w-full flex items-center gap-2 p-4'>
                     <button type="submit" className=' text-base border border-slate-500 rounded py-1 px-8'>
                        {
                           Object.keys(selectedFlight).length > 0 ? 'Update' : 'Add'
                        }
                     </button>
                     <button type="button" className=' text-base bg-gray-200 border border-gray-200 rounded py-1 px-8'>Cancel</button>
                  </div>
               </form>
            </OffcanvasContent>
         </Offcanvas >

      </>
   )
}

export default ManageFlight