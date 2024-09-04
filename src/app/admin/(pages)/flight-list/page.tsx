'use client'
import ManageFlight from '@/components/admin/flight/ManageFlight'
import Pagination from '@/components/common/Pagination'
import Table from '@/components/common/table'
import { adminInstance } from '@/config/axios'
import dayjs from 'dayjs'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'sonner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Ability } from '@/authentication/AccessControl'
import { useDebounceValue } from 'usehooks-ts'
import { MdClose } from 'react-icons/md'
import BreadCrumbs from '@/components/common/BreadCrumbs'
import { sessionContext } from '@/authentication/auth'

const FlightsList = () => {
   // auth
   const { user } = useContext(sessionContext)

   //
   const [formOpen, setFormOpen] = useState(false)
   const [selectedFlight, setSelectedFlight] = useState({})
   const [flightsList, setFlightsList] = useState([])
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
      getFlightsList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
   }, [currentPage, itemsPerPage, debouncedValue, sort])

   async function getFlightsList(params: any) {
      try {
         const { data } = await adminInstance.get(`/flight/all-flights`, { params })
         // console.log(data)
         if (data.success) {
            setFlightsList(data?.flights)
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
         const { data } = await adminInstance.delete(`/flight/delete-flight/${id}`)
         if (data.success) {
            getFlightsList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
            toast.success('Flight deleted successfully')
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
   async function multipleDelete(rows: number[]) {
      try {
         const { data } = await adminInstance.post(`/flight/delete-flight/multiple`, { rows })
         if (data?.success) {
            toast('Delete successfully')
            getFlightsList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
         }
      } catch (error) {
         console.log('Error', error)
      }
   }

   const columns = [
      {
         index: 'flightNumber',
         title: 'Flight Number',
         dataIndex: 'flightNumber',
         sortable: true,
         className: 'w-[20%] min-w-[200px]'
      },
      {
         title: 'Departure Airport && DateTime',
         sortable: true,
         // className: 'w-[25%] min-w-[300px]',
         render: (record: any) => (
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
         render: (record: any) => (
            <ul>
               <li>{record.arrivalAirport.iataCode}</li>
               <li>{dayjs(record?.arrivalTime).format('DD/MM/YYYY')}</li>
            </ul>
         )
      },
      {
         title: 'Options',
         className: 'w-[200px]',
         render: (record: any) => (
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
      <>
         <BreadCrumbs title='Flight List' data={[{ title: 'Flight List' }]} />
         <div className='bg-white rounded p-4'>
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
                        Ability('delete', 'flight', user) &&
                        deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4' onClick={() => { multipleDelete(deleteRows) }}>Delete Flights</button>
                     }
                     {
                        Ability('create', 'flight', user) &&
                        <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setFormOpen(prev => !prev); setSelectedFlight({}) }}>Add new Flight</button>
                     }
                  </div>
               </div>
            </div>
            <PerfectScrollbar className='pb-3'>
               <Table columns={columns} data={flightsList} sort={(sort: any) => setSort(sort)} loading={loading} deleteRows={(data) => setDeleteRows(data)} />
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
            <ManageFlight isOpen={formOpen} toggle={() => setFormOpen(prev => !prev)} selectedFlight={selectedFlight} />
         </div>
      </>
   )
}

export default FlightsList