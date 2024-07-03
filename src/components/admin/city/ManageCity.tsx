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
   selectedCity: any;
}
interface ValueType {
   cityName: string;
   countryName: string;
   countryCode: string;
}
const ManageCity: React.FC<PropsType> = ({ isOpen, toggle, selectedCity }) => {
   const defaultValues: Partial<ValueType> = { cityName: '', countryName: '', countryCode: '' }
   const schemaValidation = z.object({
      cityName: z.string().min(1, 'Field is required'),
      countryName: z.string().min(2, 'Field is required'),
      countryCode: z.string().min(2, 'Field is required'),
   })
   const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
      defaultValues, mode: 'onSubmit', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      try {
         if (Object.keys(selectedCity).length > 0) {
            const res = await adminInstance.put(`/city/update-city/${selectedCity.id}`, data);
            if (res.data?.success) {
               toast.success('Update city successfully')
            }
         } else {
            const res = await adminInstance.post(`/city/create-city`, data);
            if (res.data?.success) {
               toast.success('Add city successfully')
            }
         }
         toggle()
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }
   function handleOpen() {
      if (Object.keys(selectedCity).length > 0) {
         for (const key in defaultValues) {
            setValue(key as keyof ValueType, selectedCity[key])
         }
      } else {
         reset()
      }
   }

   if (!isOpen) return null;
   return (
      <Offcanvas isOpen={isOpen} onOpen={handleOpen} onClose={reset} direction='left' toggle={toggle}>
         <Offcanvas.Header toggle={toggle}>
            <h5 className='text-lg text-gray-600 font-medium mb-2'>
               {
                  Object.keys(selectedCity).length > 0 ? 'Edit City' : 'Add City'
               }
            </h5>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
               <div className="flex-grow  space-y-4">
                  <fieldset>
                     <label className='text-sm text-gray-500'>City Name</label>
                     <input {...register("cityName")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.cityName && <p className='text-xs text-red-500 mt-1'>{errors.cityName.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Country Name</label>
                     <input {...register("countryName")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.countryName && <p className='text-xs text-red-500 mt-1'>{errors.countryName.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Country Code</label>
                     <input {...register("countryCode")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.countryCode && <p className='text-xs text-red-500 mt-1'>{errors.countryCode.message}</p>}
                  </fieldset>
               </div>
               <fieldset className='flex items-center gap-2'>
                  <button type="submit" className='basis-[50%] text-base border border-slate-500 rounded py-1 px-4'>
                     {
                        Object.keys(selectedCity).length > 0 ? 'Update' : 'Add'
                     }
                  </button>
                  <button type="submit" className='basis-[50%] text-base bg-gray-200 border border-gray-200 rounded py-1 px-4'>Cancel</button>
               </fieldset>
            </form>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default ManageCity