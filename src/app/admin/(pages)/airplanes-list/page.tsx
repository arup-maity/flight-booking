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
import { Ability } from '@/authentication/AccessControl'
import { AuthSession } from '@/authentication/AuthSession'
import { MdClose } from 'react-icons/md'


const AirplanesList = () => {
   // auth
   const auth = AuthSession()
   //
   const [formOpen, setFormOpen] = useState(false)
   const [airplanesList, setAirplanesList] = useState([])
   const [selectedAirplane, setSelectedAirplane] = useState({})
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
   }, [currentPage, itemsPerPage, debouncedValue, sort])

   async function getAirplanesList(params: any) {
      try {
         const { data } = await adminInstance.get(`/airplane/all-airplanes`, { params })
         if (data.success) {
            setAirplanesList(data.airplanes)
            setTotalItems(data?.count)
         }
      } catch (error) {
         console.log('Error', error)
      } finally {
         setLoading(false)
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
   // delete multiple cities
   async function multipleDelete(rows: number[]) {
      try {
         const { data } = await adminInstance.post(`/airplane/delete-airplanes/multiple`, { rows })
         if (data?.success) {
            toast('Delete successfully')
            getAirplanesList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   function handleSearch(data: string) {
      setValue(data)
      setSearchValue(data)
      data === '' ? setClearSearch(false) : setClearSearch(true)
   }
   function handleClearSearch() {
      setValue('')
      setSearchValue('')
      setClearSearch(false)
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
            <div className="mb-5">
               <div className="flex flex-wrap md:flex-nowrap items-center justify-between -m-2">
                  <div className="w-full md:w-full p-2">
                     <div className="w-full flex items-center border-b-2 border-slate-200">
                        <IoIosSearch size={25} />
                        <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' onChange={event => handleSearch(event.target.value)} value={searchValue} />
                        {
                           clearSearch ? <div className='cursor-pointer' onClick={handleClearSearch}><MdClose color='#9a9b9c' /></div> : ''
                        }
                     </div>
                  </div>
                  <div className="w-full md:w-auto flex justify-end gap-2 p-2">
                     {
                        Ability('delete', 'airplane', auth) &&
                        deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4' onClick={() => { multipleDelete(deleteRows) }}>Delete Airplane</button>
                     }
                     {
                        Ability('create', 'city', auth) &&
                        <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setFormOpen(prev => !prev); setSelectedAirplane({}) }}>Add new Airplane</button>
                     }
                  </div>
               </div>
            </div>
            <PerfectScrollbar className='pb-3'>
               <Table columns={columns} data={airplanesList} sort={(sort: any) => setSort(sort)} loading={loading} deleteRows={(data) => setDeleteRows(data)} />
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