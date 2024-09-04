'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { toast } from 'sonner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { adminInstance } from '@/config/axios'
import ManageCity from '@/components/admin/city/ManageCity'
import CityDetails from '@/components/admin/city/CityDetails'
import Pagination from '@/components/common/Pagination'
import { Ability } from '@/authentication/AccessControl'
import BreadCrumbs from '@/components/common/BreadCrumbs'
import Table from '@/components/common/table'
import { handleApiError } from '@/utils'
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";

const CityList = () => {
   // auth
   const auth = {}
   // sate
   const [formOpen, setFormOpen] = useState(false)
   const [showDetails, setShowDetails] = useState(false)
   const [cityList, setCityList] = useState([])
   const [selectedCity, setSelectedCity] = useState({})
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
      getCityList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
   }, [currentPage, itemsPerPage, debouncedValue, sort])
   //
   function handleToggle() {
      getCityList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
      setFormOpen(prev => !prev)
      setSelectedCity({})
   }
   // get city list
   async function getCityList(params: any) {
      try {
         const { data } = await adminInstance.get(`/city/all-cities`, { params })
         if (data.success) {
            setCityList(data.cities)
            setTotalItems(data.count)
         }
      } catch (error) {
         console.log('Error', error)
      } finally {
         setLoading(false)
      }
   }
   // delete city
   async function deleteCity(id: number) {
      try {
         const { data } = await adminInstance.delete(`/city/delete-city/${id}`)
         if (data.success) {
            getCityList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
            toast.success('Delete city successfully')
         }
      } catch (error) {
         toast.error(handleApiError(error))
      }
   }
   // delete multiple cities
   async function multipleDelete(rows: number[]) {
      try {
         const { data } = await adminInstance.post(`/city/delete-cities/multiple`, { rows })
         if (data?.success) {
            toast('Delete successfully')
            getCityList({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort })
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
         index: 'cityName',
         title: 'City Name',
         dataIndex: 'cityName',
         sortable: true,
         className: 'w-[20%] min-w-[250px]'
      },
      {
         index: 'countryName',
         title: 'Country Name',
         dataIndex: '',
         sortable: true,
         className: 'w-[20%] min-w-[250px]',
         render: (record: any) => (
            <div key={record.id}>{record?.countryName + ' (' + record?.countryCode + ')'}</div>
         )
      },
      {
         title: 'Airport Name',
         dataIndex: '',
         className: 'w-auto min-w-[300px]',
         render: (record: any) => record?.airports.map((airport: any) => (
            <div key={airport.id}>{airport.airportName + '  (' + airport.iataCode + ')'}</div>
         ))
      },
      {
         title: 'Options',
         className: 'min-w-[150px] w-[200px]',
         dataIndex: '',
         render: (record: any) => (
            <div className='flex items-center justify-center gap-4'>
               <button >
                  <IoEyeOutline size={20} />
               </button>
               {
                  Ability('update', 'city', auth) &&
                  <button onClick={() => { setSelectedCity(record); setFormOpen(prev => !prev) }} >
                     <MdOutlineModeEditOutline size={20} />
                  </button>
               }
               {
                  Ability('detele', 'city', auth) &&
                  <button className='' onClick={() => deleteCity(record?.id)}>
                     <RiDeleteBinLine size={17} />
                  </button>
               }
            </div>
         ),
      },
   ];

   return (
      <div className=''>
         <BreadCrumbs title='City List' data={[{ title: 'City List' }]} />
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
                        Ability('delete', 'city', auth) &&
                        deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4' onClick={() => { multipleDelete(deleteRows) }}>Delete Users</button>
                     }
                     {
                        Ability('create', 'city', auth) &&
                        <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setFormOpen(prev => !prev); setSelectedCity({}) }}>Add new City</button>
                     }
                  </div>
               </div>
            </div>
            <PerfectScrollbar className='pb-3'>
               <Table columns={columns} data={cityList} sort={(sort: any) => setSort(sort)} loading={loading} deleteRows={(data) => setDeleteRows(data)} />
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
         <ManageCity isOpen={formOpen} toggle={handleToggle} selectedCity={selectedCity} />
         <CityDetails isOpen={showDetails} toggle={() => setShowDetails(prev => !prev)} selectedCity={selectedCity} />
      </div>
   )
}

export default CityList
