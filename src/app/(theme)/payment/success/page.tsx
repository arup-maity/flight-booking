'use client'
import { axiosInstance } from '@/config/axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useState } from 'react'
const PaymentSuccess = () => {
   const query = useSearchParams()
   const router = useRouter()
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
         console.log('Payment ==>', res)
         if (res.data.intent?.status === 'succeeded') {
            setPaymentDetails(res.data.intent)
         }
      } catch (error) {
         console.log(error)
      }
   }
   async function updatePaymentStatus(id: string | number) {
      try {
         const { data } = await axiosInstance.put(`/checkout/update-payment-status/${id}`)
         console.log('update payment status', data)
         if (data.success) {
            router.push(`/order/${data?.booking?.id}`)
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className="theme-container">
         <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
         </div>
      </div>
   )
}

export default PaymentSuccess

// http://localhost:3001/payment/success?payment_intent=pi_3PVTPSSERFuCCBsc0zKolkXU&payment_intent_client_secret=pi_3PVTPSSERFuCCBsc0zKolkXU_secret_xQ8SfZkjgPyATwEsFnqShw95v&redirect_status=succeeded