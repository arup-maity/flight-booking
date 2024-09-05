'use client'
import React, { useContext, useLayoutEffect, useState } from 'react'
import BreadCrumbs from '@/components/common/BreadCrumbs'
import Pagination from '@/components/common/Pagination'
import Table from '@/components/common/table'
import { adminInstance } from '@/config/axios'
import { IoIosSearch } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { useDebounceValue } from 'usehooks-ts'
import { Ability } from '@/authentication/AccessControl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { sessionContext } from '@/authentication/auth'

const BookingList = () => {
   // auth
   const { user } = useContext(sessionContext)
   //
   const [bookingList, setBookingList] = useState([])
   // pagination
   const [totalItems, setTotalItems] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemsPerPage] = useState(25)
   // filter
   const [clearSearch, setClearSearch] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [debouncedValue, setValue] = useDebounceValue('', 1000)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   const [status, setStatus] = useState('all')
   // delete rows
   const [deleteRows, setDeleteRows] = useState<number[]>([])
   // 
   const [loading, setLoading] = useState(true)

   useLayoutEffect(() => {
      getCount()
   }, [])
   useLayoutEffect(() => {
      getBookingList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
   }, [currentPage, itemsPerPage, debouncedValue, sort])
   // get city list
   async function getBookingList(params: any) {
      try {
         const { data } = await adminInstance.get(`/bookings/all-bookings`, { params })
         console.log('data ==>', data)
         if (data.success) {
            setBookingList(data?.bookings)
            setTotalItems(data.count)
         }
      } catch (error) {
         console.log('Error', error)
      } finally {
         setLoading(false)
      }
   }
   // get status count
   async function getCount() {
      try {
         const { data } = await adminInstance.get(`/bookings/status-count`)
         console.log('count=====>', data)
      } catch (error) {
         console.log(error)
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
         index: 'id',
         title: 'Id',
         dataIndex: 'id',
         sortable: true,
         className: 'w-[20%] min-w-[250px]'
      },
      {
         index: '',
         title: 'Flight',
         dataIndex: '',
         className: 'w-[20%] min-w-[250px]',
         render: (record: any) => (
            <div key={record.id}>{record?.flight?.flightNumber}</div>
         )
      },
      {
         index: 'amount',
         title: 'Amount',
         dataIndex: 'totalCost',
         className: 'w-[20%] min-w-[250px]'
      },
      {
         index: 'status',
         title: 'Status',
         dataIndex: 'status',
         sortable: true,
         className: 'w-[20%] min-w-[250px]'
      },
   ];

   return (
      <div className=''>
         <BreadCrumbs title='Booking List' data={[{ title: 'Booking List' }]} />
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
                     {/* {
                        Ability('delete', 'city', auth) &&
                        deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4' onClick={() => { multipleDelete(deleteRows) }}>Delete Users</button>
                     }
                     {
                        Ability('create', 'city', auth) &&
                        <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setFormOpen(prev => !prev); setSelectedCity({}) }}>Add new City</button>
                     } */}
                  </div>
               </div>
            </div>
            {/* <div className="mb-4">
               <ul className='flex flex-wrap items-center divide-x-2 divide-solid divide-slate-300 gap-2 *:ps-2 -mx-2'>
                  <li role='button' className={`text - sm ${status === 'all' ? 'text-black' : 'text-blue-500'}`} onClick={() => setStatus('all')}>All (1)</li>
                  <li role='button' className={`text - sm ${status === 'administrator' ? 'text-black' : 'text-blue-500'} `} onClick={() => setStatus('administrator')}>Administrator (1)</li>
                  <li role='button' className={`text - sm ${status === 'admin' ? 'text-black' : 'text-blue-500'} `} onClick={() => setStatus('admin')}>Admin (1)</li>
                  <li role='button' className={`text - sm ${status === 'customerSupport' ? 'text-black' : 'text-blue-500'} `} onClick={() => setStatus('customerSupport')}>Customer Support (1)</li>
                  <li role='button' className={`text - sm ${status === 'technicalSupport' ? 'text-black' : 'text-blue-500'} `} onClick={() => setStatus('technicalSupport')}>Technical Support (1)</li>
                  <li role='button' className={`text - sm ${status === 'salesAgent' ? 'text-black' : 'text-blue-500'} `} onClick={() => setStatus('salesAgent')}>Sales Agent (1)</li>
               </ul>
            </div> */}
            <PerfectScrollbar className='pb-3'>
               <Table columns={columns} data={bookingList} sort={(sort: any) => setSort(sort)} loading={loading} deleteRows={(data) => setDeleteRows(data)} />
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
         {/* <ManageCity isOpen={formOpen} toggle={handleToggle} selectedCity={selectedCity} /> */}
         {/* <CityDetails isOpen={showDetails} toggle={() => setShowDetails(prev => !prev)} selectedCity={selectedCity} /> */}
      </div>
   )
}

export default BookingList