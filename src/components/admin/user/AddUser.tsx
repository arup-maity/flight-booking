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
const AddUser: React.FC<PropsType> = ({ isOpen, toggle }) => {
   const defaultValues: Partial<ValueType> = { firstName: '', lastName: '', email: '', password: '', role: 'admin' }
   const schemaValidation = z.object({
      firstName: z.string().min(3, 'Field is required'),
      lastName: z.string().min(3, 'Field is required'),
      email: z.string().email().min(5, 'Field is required'),
      password: z.string()
         .min(8, { message: 'Password must be at least 8 characters long' })
         .max(20, { message: 'Password must be at most 20 characters long' })
         .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
         .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
         .regex(/[0-9]/, { message: 'Password must contain at least one number' })
         .regex(/[@#$&]/, { message: 'Password must contain at least one special character: @, #, $, &' })
         .regex(/^\S*$/, { message: 'Password must not contain any whitespace characters' })
         .regex(/^[a-zA-Z0-9@#$&]*$/, { message: 'Password can only contain letters, numbers, and special characters: @, #, $, &' }),
      role: z.string().min(3, 'Field is required'),
   })
   const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
      defaultValues, mode: 'onChange', resolver: zodResolver(schemaValidation)
   })
   const onSubmit = async (data: any) => {
      try {
         await adminInstance.post(`/user/create-user`, data);
         toast('Add user successfully')
         toggle()
      } catch (error) {
         console.log('error', error)
      }
   }

   if (!isOpen) return null;
   return (
      <Offcanvas isOpen={isOpen} onOpen={reset} direction='left' toggle={toggle}>
         <Offcanvas.Header toggle={toggle}>
            <h5 className='text-lg text-gray-600 font-medium mb-2'>Add User</h5>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col'>
               <div className="flex-grow  space-y-4">
                  <fieldset>
                     <label className='text-sm text-gray-500'>FirstName</label>
                     <input {...register("firstName")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.firstName && <p className='text-xs text-red-500 mt-1'>{errors.firstName.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>LastName</label>
                     <input {...register("lastName")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.lastName && <p className='text-xs text-red-500 mt-1'>{errors.lastName.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Email</label>
                     <input {...register("email")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.email && <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Password</label>
                     <input {...register("password")} className='w-full h-10 border border-slate-300 rounded p-2' />
                     {errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>}
                  </fieldset>
                  <fieldset>
                     <label className='text-sm text-gray-500'>Role</label>
                     <Controller name='role' control={control} render={({ field: { value, onChange, ...rest } }) =>
                        <Select
                           value={roleOptions?.filter((obj) => value === obj.value)}
                           onChange={(e:any) => onChange(e.value)}
                           options={roleOptions}
                        />
                     } />
                  </fieldset>
               </div>
               <fieldset className='flex items-center gap-2'>
                  <button type="submit" className='basis-[50%] text-base border border-slate-500 rounded py-1 px-4'>
                     Add User
                  </button>
                  <button type="submit" className='basis-[50%] text-base bg-gray-200 border border-gray-200 rounded py-1 px-4'>Cancel</button>
               </fieldset>
            </form>
         </Offcanvas.Body>
      </Offcanvas>
   )
}

export default AddUser