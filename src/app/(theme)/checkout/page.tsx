'use client'
import React, { useLayoutEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '@/components/stripe/PaymentForm';
import { axiosInstance } from '@/config/axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);
const Checkout = () => {
   const [clientSecret, setClientSecret] = useState('')
   const options = { clientSecret };

   useLayoutEffect(() => {
      getClientSecret()
   }, [])

   async function getClientSecret() {
      try {
         const res = await axiosInstance.post(`/checkout/client-secret`)
         console.log('client secret ==>', res)
         if (res.data.success) {
            setClientSecret(res.data.clientSecret)
         }
      } catch (error) {
         console.log(error)
      }
   }

   if (clientSecret === '' || clientSecret === null || clientSecret === undefined) {
      return <></>
   }
   return (
      <Elements stripe={stripePromise} options={options}>
         <PaymentForm />
      </Elements>
   )
}

export default Checkout
