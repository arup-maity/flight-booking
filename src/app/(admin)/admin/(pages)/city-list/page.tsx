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
import BreadCrumbs from '@/components/common/BreadCrumbs'
import { toast } from 'sonner'
import { handleApiError } from '@/utils'
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";

const CityList = () => {
   // auth
   const auth = AuthSession()
   // sate
   const [formOpen, setFormOpen] = useState(false)
   const [showDetails, setShowDetails] = useState(false)
   const [selectedCity, setSelectedCity] = useState({})
   const [cityList, setCityList] = useState(cityLists)
   const [totalItems, setTotalItems] = useState(100)
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemsPerPage] = useState(5)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   const [searchValue, setSearchValue] = useState('')
   const [debouncedValue, setValue] = useDebounceValue('', 1000)
   const [clearSearch, setClearSearch] = useState(false)
   const [loading, setLoading] = useState(true)

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
      setSelectedCity({})
   }
   // get city list
   async function getCityList(params: any) {
      try {
         const { data } = await adminInstance.get(`/city/all-cities`, {
            params
         })
         if (data.success) {
            // setCityList(data.cities)
            // setTotalItems(data.count)
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
            getCityList({
               page: currentPage,
               limit: itemsPerPage,
               search: debouncedValue,
               orderColumn: sort.column,
               order: sort.sortOrder
            })
            toast.success('Delete city successfully')
         }
      } catch (error) {
         toast.error(handleApiError(error))
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
         title: 'City Name',
         dataIndex: 'cityName',
         sortable: true,
         className: 'w-[20%] min-w-[250px]'
      },
      {
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
               {
                  Ability('update', 'city', auth) &&
                  <button onClick={() => { setSelectedCity(record); setFormOpen(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
               }
               <div className="flex items-center gap-4">
                  <button onClick={() => { setSelectedCity(record); setShowDetails(prev => !prev) }} className=''><MdOutlineModeEditOutline size={20} /></button>
                  <button className='' onClick={() => deleteCity(record?.id)}><RiDeleteBinLine size={17} /></button>
                  {
                     Ability('detele', 'city', auth) && <button className='' onClick={() => deleteCity(record?.id)}><RiDeleteBinLine size={17} /></button>
                  }
               </div>
            </div>
         ),
      },
   ];

   return (
      <div className=''>
         <BreadCrumbs title='City List' data={[{ title: 'City List' }]} />
         <div className="bg-white min-h-[70dvh] rounded p-4">
            <div className="mb-5">
               <div className="flex flex-wrap items-center -m-2">
                  <div className="w-full md:w-9/12 lg:w-10/12 p-2">
                     <div className="relative w-full flex items-center border-b-2 border-slate-200">
                        <IoIosSearch size={25} />
                        <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' onChange={event => handleSearch(event.target.value)} value={searchValue} />
                        {
                           clearSearch ? <div className='cursor-pointer' onClick={handleClearSearch}><MdClose color='#9a9b9c' /></div> : ''
                        }
                     </div>
                  </div>
                  <div className="w-full md:w-3/12 lg:w-2/12 flex justify-end p-2">
                     <button onClick={() => setFormOpen(prev => !prev)} className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4'>Add new city</button>
                     {/* {
                        Ability('create', 'city', auth) &&
                        <button onClick={() => setFormOpen(prev => !prev)} className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4'>Add new city</button>
                     } */}
                  </div>
               </div>
            </div>
            <PerfectScrollbar className='pb-3'>
               <CityTable columns={columns} data={cityList} sort={(sort: any) => setSort(sort)} loading={loading} />
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


const cityLists = [
   {
      "id": 10,
      "cityName": "Mumbai",
      "countryName": "India",
      "countryCode": "IN",
      "createdAt": "2024-06-30T11:00:59.827Z",
      "updatedAt": "2024-06-30T11:00:59.827Z",
      "airports": [
         {
            "id": 8,
            "airportName": "Chhatrapati Shivaji Maharaj International Airport",
            "iataCode": "BOM",
            "address": null,
            "cityId": 10,
            "createdAt": "2024-06-30T12:17:30.970Z",
            "updatedAt": "2024-06-30T12:17:30.970Z"
         }
      ]
   },
   {
      "id": 11,
      "cityName": "Sapporo",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.841Z",
      "updatedAt": "2024-06-30T11:00:59.841Z",
      "airports": []
   },
   {
      "id": 12,
      "cityName": "Hiroshima",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.842Z",
      "updatedAt": "2024-06-30T11:00:59.842Z",
      "airports": []
   },
   {
      "id": 14,
      "cityName": "Tokyo",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.839Z",
      "updatedAt": "2024-06-30T11:00:59.839Z",
      "airports": [
         {
            "id": 4,
            "airportName": "Narita International Airport",
            "iataCode": "NRT",
            "address": null,
            "cityId": 14,
            "createdAt": "2024-06-30T12:16:48.641Z",
            "updatedAt": "2024-06-30T12:16:48.641Z"
         }
      ]
   },
   {
      "id": 15,
      "cityName": "Osaka",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.840Z",
      "updatedAt": "2024-06-30T11:00:59.840Z",
      "airports": []
   },
   {
      "id": 16,
      "cityName": "Sendai",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.842Z",
      "updatedAt": "2024-06-30T11:00:59.842Z",
      "airports": []
   },
   {
      "id": 17,
      "cityName": "Fukuoka",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.840Z",
      "updatedAt": "2024-06-30T11:00:59.840Z",
      "airports": []
   },
   {
      "id": 18,
      "cityName": "Chennai",
      "countryName": "India",
      "countryCode": "IN",
      "createdAt": "2024-06-30T11:00:59.828Z",
      "updatedAt": "2024-06-30T11:00:59.828Z",
      "airports": [
         {
            "id": 7,
            "airportName": "Chennai International Airport",
            "iataCode": "MAA",
            "address": null,
            "cityId": 18,
            "createdAt": "2024-06-30T12:17:30.970Z",
            "updatedAt": "2024-06-30T12:17:30.970Z"
         }
      ]
   },
   {
      "id": 21,
      "cityName": "Kagoshima",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.839Z",
      "updatedAt": "2024-06-30T11:00:59.839Z",
      "airports": []
   },
   {
      "id": 22,
      "cityName": "Nagoya",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-06-30T11:00:59.840Z",
      "updatedAt": "2024-06-30T11:00:59.840Z",
      "airports": []
   },
   {
      "id": 25,
      "cityName": "Goa",
      "countryName": "India",
      "countryCode": "IN",
      "createdAt": "2024-07-12T10:42:06.230Z",
      "updatedAt": "2024-07-12T10:42:06.230Z",
      "airports": []
   },
   {
      "id": 26,
      "cityName": "Okinawa",
      "countryName": "Japan",
      "countryCode": "JP",
      "createdAt": "2024-07-12T10:42:06.230Z",
      "updatedAt": "2024-07-12T10:42:06.230Z",
      "airports": []
   },
   {
      "id": 30,
      "cityName": "Hyderabad",
      "countryName": "India",
      "countryCode": "IN",
      "createdAt": "2024-07-12T10:42:49.485Z",
      "updatedAt": "2024-07-12T10:42:49.485Z",
      "airports": []
   },
   {
      "id": 32,
      "cityName": "Kochi",
      "countryName": "India",
      "countryCode": "IN",
      "createdAt": "2024-07-12T10:42:49.485Z",
      "updatedAt": "2024-07-12T10:42:49.485Z",
      "airports": []
   },
   {
      "id": 35,
      "cityName": "Delhi",
      "countryName": "India",
      "countryCode": "IN",
      "createdAt": "2024-07-12T10:42:49.485Z",
      "updatedAt": "2024-07-12T10:42:49.485Z",
      "airports": []
   }
]