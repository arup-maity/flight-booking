'use client'
import React, { useLayoutEffect, useState } from 'react'
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

import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet"
import Offcanvas from '@/ui-components/offcanvas'

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
   const [submitLoading, setAubmitLoading] = useState(false)
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
      flightNumber: z.string().min(1, 'Enter filght number'),
      departureAirportId: z.number().min(1, 'Selected departure airport'),
      arrivalAirportId: z.number().min(1, 'Selected arrival airport'),
      departureTime: z.date(),
      arrivalTime: z.date(),
      airplaneId: z.number().min(1, 'Selected airplane model number'),
      price: z.number().min(1, 'Enter the flight price'),
      boardingGate: z.string().min(1, 'Enter the boarding pass gate'),
   }).refine((field) => field.departureAirportId !== field.arrivalAirportId, {
      path: ['arrivalAirportId'],
      message: 'Departure airport and arrival airport should not be the same.'
   }).refine((field) => field.departureTime.getTime() !== field.arrivalTime.getTime(), {
      path: ['arrivalTime'],
      message: 'Departure time and arrival time should not be the same.',
   });
   const { register, control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
      defaultValues, mode: 'onSubmit',
      resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      console.log('onSubmit', data)
      try {
         setAubmitLoading(true)
         // if (Object.keys(selectedFlight).length > 0) {
         //    const res = await adminInstance.put(`/flight/update-flight/${selectedFlight.id}`, data);
         //    if (res.data?.success) {
         //       toast.success('Flight updated successfully')
         //    }
         // } else {
            const res = await adminInstance.post(`/flight/create-flight`, data);
            if (res.data?.success) {
               toast.success('Flight created successfully')
            }
         // }
         // toggle()
      } catch (error) {
         toast.error(handleApiError(error))
      } finally {
         setAubmitLoading(false)
      }
   }

   useLayoutEffect(() => {
      getAirplanes()
      getAirports()

   }, [isOpen])

   async function getAirports() {
      const res = await adminInstance.get('/airport/all-airports')
      console.log('airports', res)
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

   function handleOpen() {
      getAirplanes()
      getAirports()
      console.log('selectedFlight', selectedFlight)
      if (Object.keys(selectedFlight).length > 0) {
         for (const key in defaultValues) {
            switch (key) {
               case 'departureTime':
                  setValue("departureTime", new Date(selectedFlight['departureTime']))
                  break;
               case 'arrivalTime':
                  setValue("arrivalTime", new Date(selectedFlight['arrivalTime']))
                  break;
               default:
                  setValue(key as keyof ValueType, selectedFlight[key])
                  break;
            }
         }
      } else {
         reset()
      }
   }
   const onOpen = () => {
      getAirplanes()
      getAirports()
      // console.log('selectedFlight', selectedFlight)
      // if (Object.keys(selectedFlight).length > 0) {
      //    for (const key in defaultValues) {
      //       switch (key) {
      //          case 'departureTime':
      //             setValue("departureTime", new Date(selectedFlight['departureTime']))
      //             break;
      //          case 'arrivalTime':
      //             setValue("arrivalTime", new Date(selectedFlight['arrivalTime']))
      //             break;
      //          default:
      //             setValue(key as keyof ValueType, selectedFlight[key])
      //             break;
      //       }
      //    }
      // } else {
      //    reset()
      // }
   }
   const onclose = () => {
      reset()
   }
   // if (!isOpen) return null;
   return (
      <Offcanvas>
         <Offcanvas.Content isOpen={true} toggle={() => { }} direction='end' className='w-5/12 rounded-l-2xl flex flex-col p-0'>
            <Offcanvas.Header>
               <div className="">
                  {
                     Object.keys(selectedFlight).length > 0 ? 'Edit Flight' : 'Add Flight'
                  }
               </div>
            </Offcanvas.Header>

            <form onSubmit={handleSubmit(onSubmit)} className='flex-grow flex flex-col p-1'>
               <div className="flex-grow custom-scrollbar px-4">
                  <div className="space-y-4">
                     <fieldset>
                        <label className='text-sm text-gray-500'>Flight Number</label>
                        <input {...register("flightNumber")} className='w-full h-10 border border-slate-300 rounded p-2' autoComplete='off' />
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
                        })} className='w-full h-10 border border-slate-300 rounded p-2' autoComplete='off' />
                        {errors.price && <p className='text-xs text-red-500 mt-1'>{errors.price.message}</p>}
                     </fieldset>
                     <fieldset>
                        <label className='text-sm text-gray-500'>Boarding Gate</label>
                        <input {...register("boardingGate")} className='w-full h-10 border border-slate-300 rounded p-2' autoComplete='off' />
                        {errors.boardingGate && <p className='text-xs text-red-500 mt-1'>{errors.boardingGate.message}</p>}
                     </fieldset>
                  </div>
               </div>
               <div className='flex gap-2 p-4'>
                  <button type='submit' className='px-8 py-1 text-base bg-blue-500 text-white rounded'>Save</button>
                  <button type='button' className='px-8 py-1 bg-gray-200 text-gray-500 rounded'>Cancel</button>
               </div>
            </form>
         </Offcanvas.Content>
      </Offcanvas>
   )
}

export default ManageFlight