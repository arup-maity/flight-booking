'use client'
import ManageAirplane from '@/components/admin/airplane/ManageAirplane'
import AirportTable from '@/components/admin/airport/AirportTable'
import { adminInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const AirplanesList = () => {
   const [formOpen, setFormOpen] = useState(false)
   const [selectedAirplane, setSelectedAirplane] = useState({})
   const [airplanesList, setAirplanesList] = useState([])

   useLayoutEffect(() => {
      getAirplanesList()
   }, [])

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
   async function deleteAirport(id) {
      try {
         const { data } = await adminInstance.delete(`/airplane/delete-airplane/${id}`)
         if (data.success) {
            getAirplanesList()
         }
      } catch (error) {
         console.log('Error', error)
      }
   }

   const columns = [
      {
         title: 'Model Number',
         dataIndex: 'modelNumber',
         sortable: true,
         className: 'w-[20%] min-w-[300px]'
      },
      {
         title: 'Capacity',
         dataIndex: 'capacity',
         sortable: true,
         className: 'w-[25%] min-w-[300px]'
      },
      {
         title: 'Options',
         className: 'w-[200px]',
         dataIndex: '',
         render: (record) => (
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
      <div className='bg-white rounded p-4'>
         <div className="flex items-center justify-between mb-4">
            <div className="">Airplanes Lists</div>
            <button onClick={() => setFormOpen(prev => !prev)} className=' text-base border border-slate-400 rounded py-1 px-4'>Add Aieplane</button>
         </div>
         <AirportTable columns={columns} data={airplanesList} />
         <ManageAirplane isOpen={formOpen} toggle={() => setFormOpen(prev => !prev)} selectedAirplane={selectedAirplane} />
      </div>
   )
}

export default AirplanesList