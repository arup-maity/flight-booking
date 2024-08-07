'use client'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { toast } from 'sonner';
import Select from 'react-select';
import { Offcanvas } from '@/ui-components'
import { adminInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
interface PropsType {
   isOpen: boolean;
   toggle: () => void;
   selectedAirport: any
}
interface ValueType {
   airportName: string;
   iataCode: string;
   address: string;
   cityId: string | number;
}
const ManageAirport: React.FC<PropsType> = ({ isOpen, toggle, selectedAirport }) => {
   const [cityList, setCityList] = useState([])
   const defaultValues: Partial<ValueType> = { airportName: '', iataCode: '', address: '', cityId: '' }
   const schemaValidation = z.object({
      airportName: z.string().min(1, 'Field is required'),
      iataCode: z.string().min(3, 'Field is required'),
      address: z.string().min(2, 'Field is required'),
      cityId: z.number().min(1, 'Field is required'),
   })
   const { register, control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
      defaultValues, mode: 'onSubmit', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      try {
         if (Object.keys(selectedAirport).length > 0) {
            const res = await adminInstance.put(`/airport/update-airport/${selectedAirport.id}`, data);
            if (res.data?.success) {
               toast.success('Update airport successfully')
            }
         } else {
            const res = await adminInstance.post(`/airport/create-airport`, data);
            if (res.data?.success) {
               toast.success('Add airport successfully')
            }
         }
         toggle()
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }
   useEffect(() => {
      getCityList()
   }, [isOpen, selectedAirport])

   async function getCityList() {
      try {
         const res = await adminInstance.get(`/city/all-cities`);
         if (res.data?.success) {
            const cityOptions = res.data.cities?.map((city: any) => ({
               label: `${city.cityName + ', ' + city.countryCode}`,
               value: city.id,
            }));
            setCityList(cityOptions);
         }
      } catch (error) {
         console.error("Error fetching city list:", error);
      }
   }
   function handleOpen() {
      if (Object.keys(selectedAirport).length > 0) {
         for (const key in defaultValues) {
            setValue(key as keyof ValueType, selectedAirport[key])
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
                  Object.keys(selectedAirport).length > 0 ? 'Edit Airport' : 'Add Airport'
               }
            </h5>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
               <div className="flex-grow  space-y-4">
                  <fieldset>
                     <label className='text-sm text-gray-500'>Airport Name</label>
                     <input {...register("airportName")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.airportName && <p className='text-xs text-red-500 mt-1'>{errors.airportName.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>IATA Code</label>
                     <input {...register("iataCode")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.iataCode && <p className='text-xs text-red-500 mt-1'>{errors.iataCode.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Address</label>
                     <input {...register("address")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.address && <p className='text-xs text-red-500 mt-1'>{errors.address.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>City</label>
                     <Controller
                        name='cityId'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <Select
                              options={cityList}
                              value={cityList?.filter((obj: any) => value === obj.value)}
                              onChange={(e: any) => onChange(e.value)}
                           />
                        )}
                     />
                     {errors.cityId && <p className='text-xs text-red-500 mt-1'>{errors.cityId.message}</p>}
                  </fieldset>
               </div>
               <fieldset className='flex items-center gap-2'>
                  <button type="submit" className='basis-[50%] text-base border border-slate-500 rounded py-1 px-4'>
                     {
                        Object.keys(selectedAirport).length > 0 ? 'Update' : 'Add'
                     }
                  </button>
                  <button type="submit" className='basis-[50%] text-base bg-gray-200 border border-gray-200 rounded py-1 px-4'>Cancel</button>
               </fieldset>
            </form>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default ManageAirport