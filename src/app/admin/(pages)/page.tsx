'use client'
import { AuthSession } from '@/authentication/AuthSession'
import React from 'react'

const Admin = () => {
   const auth = AuthSession()
   console.log('Auth session', auth)
   return (
      <div>Admin</div>
   )
}

export default Admin