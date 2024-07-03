'use client'
import ManageAirplane from '@/components/admin/airplane/ManageAirplane'
import AirportTable from '@/components/admin/airport/AirportTable'
import BreadCrumbs from '@/components/common/BreadCrumbs'
import { adminInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoIosSearch } from "react-icons/io";
import { toast } from 'sonner'
import { handleApiError } from '@/utils'

const AirplanesList = () => {
   const [formOpen, setFormOpen] = useState(false)
   const [selectedAirplane, setSelectedAirplane] = useState({})
   const [airplanesList, setAirplanesList] = useState([])

   useLayoutEffect(() => {
      getAirplanesList()
   }, [formOpen])

   async function getAirplanesList() {
      try {
         const { data } = await adminInstance.get(`/airplane/all-airplanes`)
         console.log(data)
         if (data.success) {
            setAirplanesList(data.airplanes)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   async function deleteAirport(id: number) {
      try {
         const { data } = await adminInstance.delete(`/airplane/delete-airplane/${id}`)
         if (data.success) {
            getAirplanesList()
            toast.success('Airplane deleted successfully')
         }
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }

   const columns = [
      {
         title: 'Model Number',
         dataIndex: 'modelNumber',
         sortable: true,
         className: 'w-auto min-w-[300px]'
      },
      {
         title: 'Capacity',
         dataIndex: 'capacity',
         sortable: true,
         className: 'w-[300px]'
      },
      {
         title: 'Manufacturer',
         dataIndex: 'manufacturer',
         sortable: true,
         className: 'w-[300px]'
      },
      {
         title: 'Options',
         className: 'w-[200px]',
         dataIndex: '',
         render: (record: any) => (
            <div className='flex items-center justify-between gap-4'>
               <button onClick={() => { setSelectedAirplane(record); setFormOpen(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
               <div className="flex items-center gap-4">
                  {/* <button onClick={() => console.log('record', record)} className=''><IoEyeOutline size={20} /></button> */}
                  <button className='' onClick={() => deleteAirport(record.id)}><RiDeleteBinLine size={17} /></button>
               </div>
            </div>
         ),
      },
   ];

   return (
      <div className=''>
         <BreadCrumbs title='Airplanes List' data={[{ title: 'Airplanes List' }]} />
         <div className="bg-white rounded p-4">
            <div className="flex flex-wrap items-center mb-4">
               <div className="w-full lg:w-10/12 p-2">
                  <div className="flex items-center border-b-2 border-slate-200">
                     <IoIosSearch size={25} />
                     <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' />
                  </div>
               </div>
               <div className="w-full lg:w-2/12 p-2">
                  <button onClick={() => setFormOpen(prev => !prev)} className='text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4'>Add Aieplane</button>
               </div>
            </div>
            <AirportTable columns={columns} data={airplanesList} sort={(e: any) => null} />
         </div>
         <ManageAirplane isOpen={formOpen} toggle={() => setFormOpen(prev => !prev)} selectedAirplane={selectedAirplane} />
      </div>
   )
}

export default AirplanesList