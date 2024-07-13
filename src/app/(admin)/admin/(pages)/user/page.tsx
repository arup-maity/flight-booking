'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { adminInstance } from '@/config/axios'
import UserTable from '@/components/admin/user/UserTable';
import AddUser from '@/components/admin/user/AddUser';
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import EditUser from '@/components/admin/user/EditUser'
import { Ability } from '@/authentication/AccessControl'
import { AuthSession } from '@/authentication/AuthSession'
import Pagination from '@/components/common/Pagination'
import Image from 'next/image'
import BreadCrumbs from '@/components/common/BreadCrumbs'
import { MdClose } from "react-icons/md";


const UserList = () => {
   const auth = AuthSession()
   //
   const [openCreateForm, setOpenCreateForm] = useState(false)
   const [openUpdateForm, setOpenUpdateForm] = useState(false)
   const [selectedUser, setSelectedUser] = useState({})
   const [usersList, setUsersList] = useState([])
   // pagination
   const [totalItems, setTotalItems] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemsPerPage] = useState(5)
   // filter
   const [searchValue, setSearchValue] = useState('')
   const [clearSearch, setClearSearch] = useState(false)
   const [debouncedValue, setValue] = useDebounceValue('', 1000)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   const [filter, setFilter] = useState({
      role: 'all',
   })
   const [loading, setLoading] = useState(true)
   const [deleteRows, setDeleteRows] = useState<number[]>([])

   useLayoutEffect(() => {
      getUsers({ ...filter, ...sort, search: debouncedValue, page: currentPage, limit: itemsPerPage })
   }, [filter, sort, debouncedValue, currentPage, itemsPerPage])

   function handleCreateFormToggle() {
      getUsers({ ...filter, ...sort, search: debouncedValue, page: currentPage, limit: itemsPerPage })
      setOpenCreateForm(prev => !prev)
   }
   function handleUpdateFormToggle() {
      setOpenUpdateForm(prev => !prev)
      setSelectedUser({})
      getUsers({ ...filter, ...sort, search: debouncedValue, page: currentPage, limit: itemsPerPage })
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
   function handleRoleFilter(role: string) {
      setFilter({ ...filter, role })
   }
   // get users
   async function getUsers(params: any) {
      try {
         const { data } = await adminInstance.get(`/user/all-users`, { params })
         if (data.success) {
            setUsersList(data?.users)
            setTotalItems(data?.count)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   // delete user
   async function deleteUser(id: number) {
      try {
         const { data } = await adminInstance.delete(`/user/delete-user/${id}`)
         if (data.success) {
            getUsers({ ...filter, ...sort, search: debouncedValue, page: currentPage, limit: itemsPerPage })
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   // assign users table
   const columns = [
      {
         index: '',
         title: 'User',
         dataIndex: '',
         className: 'min-w-[60px] w-[60px]',
         render: (record: any) => {
            return (
               <div key={record.id} className='text-base font-montserrat font-medium'>
                  <Image src={'/images/user-placeholder.jpg'} width={40} height={40} alt='' className='w-10 h-10 rounded-full' />
               </div>
            )
         }
      },
      {
         index: 'firstName',
         title: 'Name',
         dataIndex: '',
         sortable: true,
         className: 'w-[20%] min-w-[300px]',
         render: (record: any) => {
            return (
               <div key={record.id} className='text-base font-montserrat font-medium'>{record?.firstName + ' ' + record?.lastName}</div>
            )
         }
      },
      {
         index: 'email',
         title: 'Email',
         dataIndex: 'email',
         sortable: true,
         className: 'w-[30%] min-w-[300px]'
      },
      {
         index: 'role',
         title: 'Role',
         dataIndex: '',
         sortable: true,
         className: 'w-auto min-w-[300px]',
         render: (record: any) => (
            <div key={record.id} className='text-sm font-montserrat font-medium capitalize'>{record?.role}</div>
         )
      },
      {
         title: 'Options',
         className: 'w-[200px]',
         render: (record: any) => (
            <div className='flex items-center justify-center gap-5'>
               <button onClick={() => { }} className=''><IoEyeOutline size={20} /></button>
               <button onClick={() => { setSelectedUser(record); setOpenUpdateForm(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
               <button className='' onClick={() => deleteUser(record?.id)}><RiDeleteBinLine size={17} /></button>
               {/* {
                  Ability('update', 'user', auth) &&
                  <button onClick={() => { setSelectedUser(record); setOpenUpdateForm(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
               }
               <div className="flex items-center gap-4">
                  <button onClick={() => { }} className=''><IoEyeOutline size={20} /></button>
                  {
                     Ability('delete', 'user', auth) &&
                     <button className='' onClick={() => deleteUser(record?.id)}><RiDeleteBinLine size={17} /></button>
                  }
               </div> */}
            </div>
         ),
      },
   ];

   return (
      <>
         <BreadCrumbs title='User List' data={[{ title: 'User List' }]} />
         <div className='w-full bg-white rounded p-4'>
            <div className="mb-2">
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
                        deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4' onClick={() => { setOpenCreateForm(prev => !prev); setSelectedUser({}) }}>Delete Users</button>
                     }
                     <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setOpenCreateForm(prev => !prev); setSelectedUser({}) }}>Add new user</button>
                     {/* {
                     Ability('create', 'user', auth) &&
                     <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setOpenCreateForm(prev => !prev); setSelectedUser({}) }}>Add new user</button>
                  } */}
                  </div>
               </div>
            </div>
            <div className="">
               <div className="mb-5">
                  <ul className='flex flex-wrap items-center divide-x-2 divide-solid divide-slate-300 gap-2 *:ps-2 -mx-2'>
                     <li role='button' className={`text-sm ${filter?.role === 'all' ? 'text-black' : 'text-blue-500'}`} onClick={() => handleRoleFilter('all')}>All (1)</li>
                     <li role='button' className={`text-sm ${filter?.role === 'administrator' ? 'text-black' : 'text-blue-500'}`} onClick={() => handleRoleFilter('administrator')}>Administrator (1)</li>
                     <li role='button' className={`text-sm ${filter?.role === 'admin' ? 'text-black' : 'text-blue-500'}`} onClick={() => handleRoleFilter('admin')}>Admin (1)</li>
                     <li role='button' className={`text-sm ${filter?.role === 'customerSupport' ? 'text-black' : 'text-blue-500'}`} onClick={() => handleRoleFilter('customerSupport')}>Customer Support (1)</li>
                     <li role='button' className={`text-sm ${filter?.role === 'technicalSupport' ? 'text-black' : 'text-blue-500'}`} onClick={() => handleRoleFilter('technicalSupport')}>Technical Support (1)</li>
                     <li role='button' className={`text-sm ${filter?.role === 'salesAgent' ? 'text-black' : 'text-blue-500'}`} onClick={() => handleRoleFilter('salesAgent')}>Sales Agent (1)</li>
                  </ul>
               </div>
               <div className="overflow-hidden">
                  <PerfectScrollbar className='pb-3'>
                     <UserTable columns={columns} data={usersList} sort={(sort: any) => setSort(sort)} loading={loading} deleteRows={(data) => setDeleteRows(data)} />
                  </PerfectScrollbar>
               </div>
               <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
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
         </div>
         <AddUser isOpen={openCreateForm} toggle={handleCreateFormToggle} />
         <EditUser isOpen={openUpdateForm} toggle={handleUpdateFormToggle} selectedUser={selectedUser} />
      </>
   )
}

export default UserList