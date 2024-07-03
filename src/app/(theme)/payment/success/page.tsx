'use client'
import { axiosInstance } from '@/config/axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Suspense } from 'react'
const PaymentSuccess = () => {
   const query = useSearchParams()
   const payment_intent = query.get('payment_intent') || ''
   const payment_intent_client_secret = query.get('payment_intent_client_secret') || ''
   const redirect_status = query.get('redirect_status') || ''
   //
   const [paymentDetails, setPaymentDetails] = useState<any>({})

   useLayoutEffect(() => {
      getPayment(payment_intent)
   }, [payment_intent])

   useEffect(() => {
      if (paymentDetails.metadata?.bookingId) {
         updatePaymentStatus(paymentDetails.metadata?.bookingId)
      }
   }, [paymentDetails])


   async function getPayment(payment_intent: string) {
      try {
         const res = await axiosInstance.get(`/checkout/success/${payment_intent}`)
         if (res.data.intent?.status === 'succeeded') {
            setPaymentDetails(res.data.intent)
         }
         console.log('success', res)
      } catch (error) {
         console.log(error)
      }
   }
   async function updatePaymentStatus(id: string | number) {
      try {
         const res = await axiosInstance.put(`/checkout/update-payment-status/${id}`)
         console.log(res)
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className="theme-container">
         <Suspense>
            <div className='w-full min-h-96 flex items-center justify-center'>PaymentSuccess</div>
         </Suspense>
      </div>
   )
}

export default PaymentSuccess

// http://localhost:3001/payment/success?payment_intent=pi_3PVTPSSERFuCCBsc0zKolkXU&payment_intent_client_secret=pi_3PVTPSSERFuCCBsc0zKolkXU_secret_xQ8SfZkjgPyATwEsFnqShw95v&redirect_status=succeeded