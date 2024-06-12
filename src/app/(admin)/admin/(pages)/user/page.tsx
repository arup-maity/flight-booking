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

const UserList = () => {
   const auth = AuthSession()
   //
   const [openCreateForm, setOpenCreateForm] = useState(false)
   const [openUpdateForm, setOpenUpdateForm] = useState(false)
   const [selectedUser, setSelectedUser] = useState({})
   const [usersList, setUsersList] = useState([])
   const [debouncedValue, setValue] = useDebounceValue('', 1000)

   useLayoutEffect(() => {
      getUsers()
   }, [])

   function handleCreateFormToggle() {
      getUsers()
      setOpenCreateForm(prev => !prev)
   }
   function handleUpdateFormToggle() {
      setOpenUpdateForm(prev => !prev)
      setSelectedUser({})
      getUsers()
   }
   // get users
   async function getUsers() {
      try {
         const { data } = await adminInstance.get(`/user/all-users`)
         if (data.success) {
            setUsersList(data?.adminUsers)
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
            getUsers()
         }
      } catch (error) {
         console.log('Error', error)
      }
   }
   // assign users table
   const columns = [
      {
         title: 'Name',
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
            <div className='flex items-center justify-between gap-5'>
               {
                  Ability('update', 'user', auth) &&
                  <button onClick={() => { setSelectedUser(record); setOpenUpdateForm(prev => !prev) }} className='text-sm border rounded py-0.5 px-2' >Edit</button>
               }
               <div className="flex items-center gap-4">
                  <button onClick={() => { }} className=''><IoEyeOutline size={20} /></button>
                  {
                     Ability('delete', 'user', auth) &&
                     <button className='' onClick={() => deleteUser(record?.id)}><RiDeleteBinLine size={17} /></button>
                  }
               </div>
            </div>
         ),
      },
   ];

   return (
      <>
         <div className='w-full bg-white rounded p-4'>
            <div className="mb-4">
               <div className="text-xl font-medium">User List</div>
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
                     Ability('create', 'user', auth) &&
                     <button className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4' onClick={() => { setOpenCreateForm(prev => !prev); setSelectedUser({}) }}>Add new user</button>
                  }
               </div>
            </div>
            <div className="">
               <PerfectScrollbar className='pb-3'>
                  <UserTable columns={columns} data={usersList} />
               </PerfectScrollbar>
            </div>
         </div>
         <AddUser isOpen={openCreateForm} toggle={handleCreateFormToggle} />
         <EditUser isOpen={openUpdateForm} toggle={handleUpdateFormToggle} selectedUser={selectedUser} />
      </>
   )
}

export default UserList