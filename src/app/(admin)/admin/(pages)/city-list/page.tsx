'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { adminInstance } from '@/config/axios'
import CityTable from '@/components/admin/city/CityTable'
import ManageCity from '@/components/admin/city/ManageCity'
import CityDetails from '@/components/admin/city/CityDetails'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoEyeOutline } from 'react-icons/io5'
import { IoIosSearch } from "react-icons/io";
import Pagination from '@/components/common/Pagination'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AuthSession } from '@/authentication/AuthSession'
import { Ability } from '@/authentication/AccessControl'

const CityList = () => {
   // auth
   const auth = AuthSession()
   // sate
   const [formOpen, setFormOpen] = useState(false)
   const [showDetails, setShowDetails] = useState(false)
   const [selectedCity, setSelectedCity] = useState({})
   const [cityList, setCityList] = useState([])
   const [totalItems, setTotalItems] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemsPerPage] = useState(25)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   const [debouncedValue, setValue] = useDebounceValue('', 1000)

   useLayoutEffect(() => {
      getCityList({
         page: currentPage,
         limit: itemsPerPage,
         search: debouncedValue,
         orderColumn: sort.column,
         order: sort.sortOrder
      })
   }, [currentPage, itemsPerPage, debouncedValue, sort])
   //
   function handleToggle() {
      getCityList({
         page: currentPage,
         limit: itemsPerPage,
         search: debouncedValue,
         orderColumn: sort.column,
         order: sort.sortOrder
      })
      setFormOpen(prev => !prev)
   }
   // get city list
   async function getCityList(params: any) {
      try {
         const { data } = await adminInstance.get(`/city/all-cities`, {
            params
         })
         if (data.success) {
            setCityList(data.cities)
            setTotalItems(data.count)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   // delete city
   async function deleteCity(id: number) {
      try {
         const { data } = await adminInstance.delete(`/city/delete-city/${id}`)
         if (data.success) {
            getCityList({
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
         title: 'City Name',
         dataIndex: 'cityName',
         sortable: true,
         className: 'w-[20%] min-w-[300px]'
      },
      {
         title: 'Country Name',
         dataIndex: 'countryName',
         sortable: true,
         className: 'w-[25%] min-w-[300px]'
      },
      {
         title: 'Country Code',
         dataIndex: 'countryCode',
         className: 'w-auto min-w-[300px]'
      },
      {
         title: 'Options',
         className: 'w-[200px]',
         dataIndex: '',
         render: (record: any) => (
            <div className='flex items-center justify-between gap-4'>
               {
                  Ability('update', 'city', auth) &&
                  <button onClick={() => { setSelectedCity(record); setFormOpen(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
               }
               <div className="flex items-center gap-4">
                  <button onClick={() => { setSelectedCity(record); setShowDetails(prev => !prev) }} className=''><IoEyeOutline size={20} /></button>
                  {
                     Ability('detele', 'city', auth) && <button className='' onClick={() => deleteCity(record?.id)}><RiDeleteBinLine size={17} /></button>
                  }
               </div>
            </div>
         ),
      },
   ];

   return (
      <div className='bg-white rounded p-4'>
         <div className="mb-4">
            <div className="text-xl font-medium">City List</div>
         </div>
         <div className="flex items-center justify-between gap-5 mb-5">
            <div className="w-10/12">
               <div className="w-full flex items-center border-b-2 border-slate-200">
                  <IoIosSearch size={25} />
                  <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' onChange={event => setValue(event.target.value)} />
               </div>
            </div>
            <div className="w-2/12">
               {
                  Ability('create', 'city', auth) &&
                  <button onClick={() => setFormOpen(prev => !prev)} className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4'>Add new city</button>
               }
            </div>
         </div>
         <PerfectScrollbar className='pb-3'>
            <CityTable columns={columns} data={cityList} sort={(sort: any) => setSort(sort)} />
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
         <ManageCity isOpen={formOpen} toggle={handleToggle} selectedCity={selectedCity} />
         <CityDetails isOpen={showDetails} toggle={() => setShowDetails(prev => !prev)} selectedCity={selectedCity} />
      </div>
   )
}

export default CityList
