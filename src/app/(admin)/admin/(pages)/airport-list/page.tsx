'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AirportTable from '@/components/admin/airport/AirportTable'
import ManageAirport from '@/components/admin/airport/ManageAirport'
import Pagination from '@/components/common/Pagination'
import { adminInstance } from '@/config/axios'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoEyeOutline } from 'react-icons/io5'
import { IoIosSearch } from "react-icons/io";
import { AuthSession } from '@/authentication/AuthSession'
import { Ability } from '@/authentication/AccessControl'

const AirportList = () => {
   const auth = AuthSession()
   console.log('===>', auth)
   const [formOpen, setFormOpen] = useState(false)
   const [showDetails, setShowDetails] = useState(false)
   const [selectedAirport, setSelectedAirport] = useState({})
   const [airportList, setAirportList] = useState([])
   const [totalItems, setTotalItems] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemsPerPage] = useState(25)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   const [debouncedValue, setValue] = useDebounceValue('', 1000)

   useLayoutEffect(() => {
      getAirportList({
         page: currentPage,
         limit: itemsPerPage,
         search: debouncedValue,
         orderColumn: sort.column,
         order: sort.sortOrder
      })
   }, [currentPage, itemsPerPage, debouncedValue, sort])

   async function getAirportList(params: any) {
      try {
         const { data } = await adminInstance.get(`/airport/all-airports`, { params })
         if (data.success) {
            setAirportList(data.airports)
            setTotalItems(data?.count || 0)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   async function deleteAirport(id: number) {
      try {
         const { data } = await adminInstance.delete(`/airport/delete-airport/${id}`)
         if (data.success) {
            getAirportList({
               page: currentPage,
               limit: itemsPerPage,
               search: debouncedValue,
               orderColumn: sort.column,
               order: sort.sortOrder
            })
         }
      } catch (error) {
         console.log('Error', error)
      }
   }

   const columns = [
      {
         title: 'Airport Name',
         dataIndex: 'airportName',
         sortable: true,
         className: 'w-[20%] min-w-[300px]'
      },
      {
         title: 'iata Code',
         dataIndex: 'iataCode',
         sortable: true,
         className: 'w-[25%] min-w-[300px]'
      },
      {
         title: 'City',
         className: 'w-[25%] min-w-[300px]',
         render: (record: any) => record.city.cityName,
      },
      {
         title: 'Options',
         className: 'w-[100px]',
         render: (record: any) => (
            <div className='flex items-center justify-between gap-4'>
               {
                  Ability('airport', 'update', auth) &&
                  <button onClick={() => { setSelectedAirport(record); setFormOpen(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
               }
               <div className="flex items-center gap-4">
                  <button onClick={() => console.log('record', record)} className=''><IoEyeOutline size={20} /></button>
                  {
                     Ability('airport', 'delete', auth) &&
                     <button className='' onClick={() => deleteAirport(record.id)}><RiDeleteBinLine size={17} /></button>
                  }
               </div>
            </div>
         ),
      },
   ];

   return (
      <div className='bg-white rounded p-4'>
         <div className="flex items-center justify-between gap-5 mb-5">
            <div className="w-full flex items-center border-b-2 border-slate-200">
               <IoIosSearch size={25} />
               <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' onChange={event => setValue(event.target.value)} />
            </div>
            {
               Ability('airport', 'create', auth) &&
               <button onClick={() => setFormOpen(prev => !prev)} className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4'>Add new Airport</button>
            }
         </div>
         <PerfectScrollbar className='pb-3'>
            <AirportTable columns={columns} data={airportList} sort={(sort: any) => setSort(sort)} />
         </PerfectScrollbar>
         <div className="flex items-center justify-between mt-4">
            {
               totalItems !== 0 && <div className="flex items-center gap-4">
                  <select onChange={(e: any) => setItemsPerPage(e.target.value)} className='h-7 text-base border border-slate-400 focus:outline-none rounded px-1'>
                     <option value={25}>25</option>
                     <option value={50}>50</option>
                     <option value={100}>100</option>
                  </select>
                  <p className="text-sm text-gray-600">
                     Showing {itemsPerPage * (currentPage - 1) + 1} - {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems} results
                  </p>
               </div>
            }
            <Pagination totalItems={totalItems} perPage={itemsPerPage} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
         </div>
         <ManageAirport isOpen={formOpen} toggle={() => setFormOpen(prev => !prev)} selectedAirport={selectedAirport} />
      </div>
   )
}

export default AirportList