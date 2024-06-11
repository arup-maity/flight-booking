'use client'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { toast } from 'sonner';
import { Offcanvas } from '@/ui-components'
import { adminInstance } from '@/config/axios'
interface PropsType {
   isOpen: boolean;
   toggle: () => void;
   selectedAirplane: any;
}
type Inputs = {
   modelNumber: string
   capacity: number
}
interface FormValues {
   modelNumber: string
   capacity: number
}
const ManageAirplane: React.FC<PropsType> = ({ isOpen, toggle, selectedAirplane }) => {
   const defaultValues: Partial<FormValues> = { modelNumber: '', capacity: 0 }
   const schemaValidation = z.object({
      modelNumber: z.string().min(1, 'Field is required'),
      capacity: z.number().min(3, 'Field is required'),
   })
   const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Inputs>({
      defaultValues, mode: 'onSubmit', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      console.log('onSubmit', data)
      try {
         if (Object.keys(selectedAirplane).length > 0) {
            await adminInstance.put(`/airplane/update-airplane/${selectedAirplane.id}`, data);
            toast('Update category successfully')
         } else {
            const res = await adminInstance.post(`/airplane/create-airplane`, data);
            console.log('Airplane created successfully', res)
            toast('Add category successfully')
         }
         toggle()
      } catch (error) {
         console.log('error', error)
      }
   }
   useEffect(() => {
      handleOpen()
   }, [isOpen, selectedAirplane])

   function handleOpen() {
      if (Object.keys(selectedAirplane).length > 0) {
         for (const key in defaultValues) {
            setValue(key as keyof FormValues, selectedAirplane[key as keyof FormValues])
         }
      } else {
         reset()
      }
   }

   if (!isOpen) return null;
   return (
      <Offcanvas isOpen={isOpen} direction='left' toggle={toggle}>
         <Offcanvas.Header toggle={toggle}>
            <h5 className='text-lg text-gray-600 font-medium mb-2'>
               {
                  Object.keys(selectedAirplane).length > 0 ? 'Edit Airplane' : 'Add Airplane'
               }
            </h5>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
               <div className="flex-grow  space-y-4">
                  <fieldset>
                     <label className='text-sm text-gray-500'>Airplane Mpdel Number</label>
                     <input {...register("modelNumber")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.modelNumber && <p className='text-xs text-red-500 mt-1'>{errors?.modelNumber?.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Capacity</label>
                     <input {...register("capacity", {
                        valueAsNumber: true
                     })} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.capacity && <p className='text-xs text-red-500 mt-1'>{errors?.capacity?.message}</p>}
                  </fieldset>
               </div>
               <fieldset className='flex items-center gap-2'>
                  <button type="submit" className='basis-[50%] text-base border border-slate-500 rounded py-1 px-4'>
                     {
                        Object.keys(selectedAirplane).length > 0 ? 'Update' : 'Add'
                     }
                  </button>
                  <button type="submit" className='basis-[50%] text-base bg-gray-200 border border-gray-200 rounded py-1 px-4'>Cancel</button>
               </fieldset>
            </form>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default ManageAirplane