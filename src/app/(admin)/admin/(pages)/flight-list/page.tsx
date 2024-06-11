'use client'
import AirportTable from '@/components/admin/airport/AirportTable'
import ManageFlight from '@/components/admin/flight/ManageFlight'
import { adminInstance } from '@/config/axios'
import dayjs from 'dayjs'
import React, { useLayoutEffect, useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const FlightsList = () => {
   const [formOpen, setFormOpen] = useState(false)
   const [selectedFlight, setSelectedFlight] = useState({})
   const [flightsList, setFlightsList] = useState([])

   useLayoutEffect(() => {
      getFlightsList()
   }, [])

   async function getFlightsList() {
      try {
         const { data } = await adminInstance.get(`/flight/all-flights`)
         console.log(data)
         if (data.success) {
            setFlightsList(data.flights)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   async function deleteAirport(id) {
      try {
         const { data } = await adminInstance.delete(`/flight/delete-flight/${id}`)
         if (data.success) {
            getFlightsList()
         }
      } catch (error) {
         console.log('Error', error)
      }
   }

   const columns = [
      {
         title: 'Flight Number',
         dataIndex: 'flightNumber',
         sortable: true,
         className: 'w-[20%] min-w-[300px]'
      },
      {
         title: 'Departure Airport && DateTime',
         sortable: true,
         // className: 'w-[25%] min-w-[300px]',
         render: (record) => (
            <ul>
               <li>{record.departureAirport.iataCode}</li>
               <li>{dayjs(record?.departureTime).format('DD/MM/YYYY')}</li>
            </ul>
         )
      },
      {
         title: 'Arrival Airport && DateTime',
         sortable: true,
         // className: 'w-[25%] min-w-[300px]'
         render: (record) => (
            <ul>
               <li>{record.arrivalAirport.iataCode}</li>
               <li>{dayjs(record?.arrivalTime).format('DD/MM/YYYY')}</li>
            </ul>
         )
      },
      {
         title: 'Airplane',
         sortable: true,
         // className: 'w-[25%] min-w-[300px]'
         render: (record) => {
            return record.airplane.modelNumber
         }
      },
      {
         title: 'Price',
         dataIndex: 'price',
         sortable: true,
         // className: 'w-[25%] min-w-[300px]'
      },
      {
         title: 'Options',
         className: 'w-[200px]',
         render: (record) => (
            <div className='flex items-center justify-between gap-4'>
               <button onClick={() => { setSelectedFlight(record); setFormOpen(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
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
         <AirportTable columns={columns} data={flightsList} />
         <ManageFlight isOpen={formOpen} toggle={() => setFormOpen(prev => !prev)} selectedFlight={selectedFlight} />
      </div>
   )
}

export default FlightsList