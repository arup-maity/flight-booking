'use client'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { toast } from 'sonner';
import Select from 'react-select'
import { Offcanvas } from '@/ui-components'
import { adminInstance } from '@/config/axios'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";

const ManageFlight = ({ isOpen, toggle, selectedFlight }) => {
   const [airportList, setAirportList] = useState([])
   const [airplaneList, setAirplaneList] = useState([])
   const defaultValues = {
      flightNumber: '',
      departureAirportId: '',
      arrivalAirportId: '',
      departureTime: new Date(),
      arrivalTime: new Date(),
      airplaneId: '',
      price: '',
      boardingGate: ''
   }
   const schemaValidation = z.object({
      flightNumber: z.string().min(1, 'Field is required'),
      departureAirportId: z.string().min(1, 'Field is required'),
      arrivalAirportId: z.string().min(1, 'Field is required'),
      departureTime: z.string().min(1, 'Field is required'),
      arrivalTime: z.string().min(1, 'Field is required'),
      airplaneId: z.string().min(1, 'Field is required'),
      price: z.string().min(1, 'Field is required'),
      boardingGate: z.string().min(1, 'Field is required'),
   })
   const { register, control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
      defaultValues, mode: 'onSubmit'
   })
   const onSubmit = async (data) => {
      console.log('onSubmit', data)
      try {
         if (Object.keys(selectedFlight).length > 0) {
            await adminInstance.put(`/flight/update-flight/${selectedFlight.id}`, data);
            toast('Update category successfully')
         } else {
            const res = await adminInstance.post(`/flight/create-flight`, data);
            console.log('onSubmit ==>', res)
            toast('Add category successfully')
         }
         toggle()
      } catch (error) {
         console.log('error', error)
      }
   }
   useEffect(() => {
      getAirplanes()
      getAirports()
      if (Object.keys(selectedFlight).length > 0) {
         for (const key in defaultValues) {
            setValue(key, selectedFlight[key])
         }
      } else {
         reset()
      }
   }, [isOpen, selectedFlight])

   async function getAirports() {
      const res = await adminInstance.get('/airport/all-airports')
      const airportsOption = res.data.airports?.map((airport) => ({
         label: airport.airportName,
         value: airport.id,
      }))
      setAirportList(airportsOption)
   }
   async function getAirplanes() {
      const res = await adminInstance.get('/airplane/all-airplanes')
      const airplanesOption = res.data.airplanes?.map((airplanes) => ({
         label: airplanes.modelNumber,
         value: airplanes.id,
      }))
      setAirplaneList(airplanesOption)
   }

   if (!isOpen) return null;
   return (
      <Offcanvas isOpen={isOpen} direction='left' toggle={toggle}>
         <Offcanvas.Header toggle={toggle}>
            <h5 className='text-lg text-gray-600 font-medium mb-2'>
               {
                  Object.keys(selectedFlight).length > 0 ? 'Edit Flight' : 'Add Flight'
               }
            </h5>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
               <div className="flex-grow  space-y-4">
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
                              value={airportList?.filter((obj) => value === obj.value)}
                              onChange={(e) => onChange(e.value)}
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
                              value={airportList?.filter((obj) => value === obj.value)}
                              onChange={(e) => onChange(e.value)}
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
                              onChange={(value) => onChange(value[0])}
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
                              onChange={(value) => onChange(value[0])}
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
                              value={airplaneList?.filter((obj) => value === obj.value)}
                              onChange={(e) => onChange(e.value)}
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
               <fieldset className='flex items-center gap-2'>
                  <button type="submit" className='basis-[50%] text-base border border-slate-500 rounded py-1 px-4'>
                     {
                        Object.keys(selectedFlight).length > 0 ? 'Update' : 'Add'
                     }
                  </button>
                  <button type="submit" className='basis-[50%] text-base bg-gray-200 border border-gray-200 rounded py-1 px-4'>Cancel</button>
               </fieldset>
            </form>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default ManageFlight