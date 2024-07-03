'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { toast } from 'sonner';
import { Offcanvas } from '@/ui-components'
import { adminInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
interface PropsType {
   isOpen: boolean;
   toggle: () => void;
   selectedAirplane: any;
}
type Inputs = {
   modelNumber: string
   manufacturer: string
   capacity: number
}
interface FormValues {
   modelNumber: string
   manufacturer: string
   capacity: number
}
const ManageAirplane: React.FC<PropsType> = ({ isOpen, toggle, selectedAirplane }) => {
   const defaultValues: Partial<FormValues> = { modelNumber: '', manufacturer: '', capacity: 100 }
   const schemaValidation = z.object({
      modelNumber: z.string().min(1, 'Field is required'),
      manufacturer: z.string().min(1, 'Field is required'),
      capacity: z.number().min(3, 'Field is required'),
   })
   const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Inputs>({
      defaultValues, mode: 'onSubmit', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      try {
         if (Object.keys(selectedAirplane).length > 0) {
            const res = await adminInstance.put(`/airplane/update-airplane/${selectedAirplane.id}`, data);
            if (res.data?.success) {
               toast.success('Update airplane successfully')
            }
         } else {
            const res = await adminInstance.post(`/airplane/create-airplane`, data);
            if (res.data?.success) {
               toast.success('Add airplane successfully')
            }
         }
         toggle()
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }
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
      <Offcanvas isOpen={isOpen} onOpen={handleOpen} direction='left' toggle={toggle}>
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
                     <label className='text-sm text-gray-500'>Airplane Mpdel Number</label>
                     <input {...register("manufacturer")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.manufacturer && <p className='text-xs text-red-500 mt-1'>{errors?.manufacturer?.message}</p>}
                  </fieldset>
                  {/* <fieldset>
                     <label className='text-sm text-gray-500'>Capacity</label>
                     <input {...register("capacity", {
                        valueAsNumber: true
                     })} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.capacity && <p className='text-xs text-red-500 mt-1'>{errors?.capacity?.message}</p>}
                  </fieldset> */}
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