'use client'
import { axiosInstance } from '@/config/axios'
import { useSearchParams } from 'next/navigation'
import React, { useLayoutEffect } from 'react'

const PaymentSuccess = () => {
   const query = useSearchParams()
   const payment_intent = query.get('payment_intent') || ''
   useLayoutEffect(() => {
      getPayment(payment_intent)
   }, [payment_intent])

   async function getPayment(payment_intent: string) {
      const res = await axiosInstance.get(`/checkout/success/${payment_intent}`)
      console.log('success', res)
   }

   return (
      <div>PaymentSuccess</div>
   )
}

export default PaymentSuccess