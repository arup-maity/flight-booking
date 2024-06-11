'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { adminInstance } from '@/config/axios'
import { IoIosSearch } from "react-icons/io";
import PerfectScrollbar from 'react-perfect-scrollbar'
import UserTable from '@/components/admin/user/UserTable';
import { RiDeleteBinLine } from 'react-icons/ri'
import AddUser from '@/components/admin/user/AddUser';

const UserList = () => {
   const [openForm, setOpenForm] = useState(false)
   const [selectedUser, setSelectedUser] = useState({})
   const [usersList, setUsersList] = useState([])
   const [debouncedValue, setValue] = useDebounceValue('', 1000)

   useLayoutEffect(() => {
      getUsers()
   }, [])

   async function getUsers() {
      try {
         const { data } = await adminInstance.get(`/user/all-users`)
         console.log('users', data)
         if (data.success) {
            setUsersList(data?.adminUsers)
         }
      } catch (error) {
         console.log('Error', error)
      }
   }

   function handleToggle() {
      getUsers()
      setOpenForm(prev => !prev)
   }

   async function deleteUser(id: number) {
      try {
         const { data } = await adminInstance.delete(`/user/delete-user/${id}`)
         if (data.success) {
            getUsers()
         }
      } catch (error) {
         console.log('Error', error)
      }
   }

   const columns = [
      {
         title: 'User Name',
         dataIndex: 'firstName',
         sortable: true,
         className: 'w-[20%] min-w-[300px]'
      },
      {
         title: 'Email',
         dataIndex: 'email',
         sortable: true,
         className: 'w-[25%] min-w-[300px]'
      },
      {
         title: 'Role',
         dataIndex: 'role',
         className: 'w-auto min-w-[300px]'
      },
      {
         title: 'Options',
         className: 'w-[200px]',
         render: (record: any) => (
            <div className='flex items-center justify-between gap-4'>
               {/* <button onClick={() => { setSelectedUser(record); setOpenForm(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button> */}
               <div className="flex items-center gap-4">
                  {/* <button onClick={() => { setSelectedCity(record); setShowDetails(prev => !prev) }} className=''><IoEyeOutline size={20} /></button> */}
                  <button className='' onClick={() => deleteUser(record?.id)}><RiDeleteBinLine size={17} /></button>
               </div>
            </div>
         ),
      },
   ];

   return (
      <>
         <div className='w-full bg-white rounded p-4'>
            <div className="flex items-center justify-between gap-5 mb-5">
               <div className="w-full flex items-center border-b-2 border-slate-200">
                  <IoIosSearch size={25} />
                  <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' onChange={event => setValue(event.target.value)} />
               </div>
               <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setOpenForm(prev => !prev); setSelectedUser({}) }}>Add new user</button>
            </div>

            <div className="overflow-hidden">
               <PerfectScrollbar className='pb-3'>
                  <UserTable columns={columns} data={usersList} />
               </PerfectScrollbar>
            </div>
         </div>
         <AddUser isOpen={openForm} toggle={handleToggle} />
      </>
   )
}

export default UserList