'use client'
import ManageAirplane from '@/components/admin/airplane/ManageAirplane'
import BreadCrumbs from '@/components/common/BreadCrumbs'
import { adminInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoIosSearch } from "react-icons/io";
import { toast } from 'sonner'
import { handleApiError } from '@/utils'
import Table from '@/components/common/table'
import Pagination from '@/components/common/Pagination'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDebounceValue } from 'usehooks-ts'


const AirplanesList = () => {
   const [formOpen, setFormOpen] = useState(false)
   const [selectedAirplane, setSelectedAirplane] = useState({})
   const [airplanesList, setAirplanesList] = useState([])
   // pagination
   const [totalItems, setTotalItems] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemsPerPage] = useState(5)
   // filter
   const [clearSearch, setClearSearch] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [debouncedValue, setValue] = useDebounceValue('', 1000)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   // delete rows
   const [deleteRows, setDeleteRows] = useState<number[]>([])
   // 
   const [loading, setLoading] = useState(true)

   useLayoutEffect(() => {
      getAirplanesList({
         page: currentPage,
         limit: itemsPerPage,
         search: debouncedValue,
         ...sort
      })
   }, [formOpen])

   async function getAirplanesList(params: any) {
      try {
         const { data } = await adminInstance.get(`/airplane/all-airplanes`, params)
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
            getAirplanesList({
               page: currentPage,
               limit: itemsPerPage,
               search: debouncedValue,
               ...sort
            })
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
            <PerfectScrollbar className='pb-3'>
               <Table columns={columns} data={airplanesList} sort={(e: any) => null} />
            </PerfectScrollbar>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
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
               <div className="max-md:w-full max-md:flex max-md:justify-center">
                  <Pagination totalItems={totalItems} perPage={itemsPerPage} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
               </div>
            </div>
         </div>
         <ManageAirplane isOpen={formOpen} toggle={() => setFormOpen(prev => !prev)} selectedAirplane={selectedAirplane} />
      </div>
   )
}

export default AirplanesList