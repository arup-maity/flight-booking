'use client'
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import Select from 'react-select';
import { toast } from 'sonner';
import { Offcanvas } from '@/ui-components'
import { adminInstance } from '@/config/axios'

interface PropsType {
   isOpen: boolean;
   toggle: () => void;
   selectedUser: any
}
interface ValueType {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   role: string;
}
const roleOptions = [
   { value: 'administrator', label: 'Administrator' },
   { value: 'admin', label: 'Admin' },
   { value: 'customerSupport', label: 'Customer Support' },
   { value: 'technicalSupport', label: 'Technical Support' },
   { value: 'salesAgent', label: 'Sales Agent' },
];
const EditUser: React.FC<PropsType> = ({ isOpen, toggle, selectedUser }) => {
   const defaultValues: Partial<ValueType> = { firstName: '', lastName: '', email: '', password: '', role: 'admin' }
   const schemaValidation = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      role: z.string().min(3, 'Field is required'),
   })
   const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
      defaultValues, mode: 'onChange', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      try {
         await adminInstance.put(`/user/update-user-role`, { id: selectedUser.id, role: data.role });
         toast('User role updated successfully')
         toggle()
      } catch (error) {
         console.log('error', error)
      }
   }
   function handleOpen() {
      if (Object.keys(selectedUser).length > 0) {
         for (const key in defaultValues) {
            setValue(key as keyof ValueType, selectedUser[key])
         }
      } else {
         reset()
      }
   }

   if (!isOpen) return null;
   return (
      <Offcanvas isOpen={isOpen} onOpen={handleOpen} direction='left' toggle={toggle}>
         <Offcanvas.Header toggle={toggle}>
            <h5 className='text-lg text-gray-600 font-medium mb-2'>Update User Role</h5>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
               <div className="flex-grow  space-y-4">
                  <fieldset>
                     <label className='text-sm text-gray-500'>FirstName</label>
                     <input {...register("firstName")} className='w-full h-10 border border-slate-300 focus:outline-none rounded p-2' readOnly />
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>LastName</label>
                     <input {...register("lastName")} className='w-full h-10 border border-slate-300 focus:outline-none rounded p-2' readOnly />
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Email</label>
                     <input {...register("email")} className='w-full h-10 border border-slate-300 focus:outline-none rounded p-2' readOnly />
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Role</label>
                     <Controller name='role' control={control} render={({ field: { value, onChange, ...rest } }) =>
                        <Select
                           value={roleOptions?.filter((obj) => value === obj.value)}
                           onChange={(e: any) => onChange(e.value)}
                           options={roleOptions}
                        />
                     } />
                  </fieldset>
               </div>
               <fieldset className='flex items-center gap-2'>
                  <button type="submit" className='basis-[50%] text-base border border-slate-500 rounded py-1 px-4'>
                     Update Role
                  </button>
                  <button type="submit" className='basis-[50%] text-base bg-gray-200 border border-gray-200 rounded py-1 px-4'>Cancel</button>
               </fieldset>
            </form>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default EditUser