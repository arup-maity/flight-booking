'use client'
import React, { useEffect, useState } from "react";
import {
   PaymentElement,
   useStripe,
   useElements,
} from "@stripe/react-stripe-js";

const PAYMENT_SUCESS_URL = "http://localhost:3001/payment/success";
// ?payment_intent=pi_3PPNI8SERFuCCBsc0oT8bnXA&payment_intent_client_secret=pi_3PPNI8SERFuCCBsc0oT8bnXA_secret_tOaOU4sZbKbKxgjBUH71oPTtG&redirect_status=succeeded

const PaymentForm = () => {
   const stripe = useStripe();
   const elements = useElements();

   const [message, setMessage] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e:any) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setIsLoading(true);
      setMessage("Payment in Progress");

      const resp = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: PAYMENT_SUCESS_URL,
         },
      });

      if (resp.error) console.log(resp.error);
      if (resp.error) setMessage("Some Error Occurred !!");
      setIsLoading(false);
   };

   return (
      <div className="container mx-auto">
         <form onSubmit={handleSubmit}>
            <div className="card w-100 bg-base-100 bg-gray-200 shadow-2xl rounded-lg">
               <div className="card-body p-6">
                  <h1 className="card-title font-bold text-2xl mb-4 justify-center">
                     Complete your payment here!
                  </h1>
                  <PaymentElement />
                  <div className="card-actions justify-center">
                     <button
                        className="btn btn-primary rounded-xl text-white px-4 py-2 mt-6"
                        disabled={isLoading || !stripe || !elements}
                     >
                        {isLoading ? "Loading..." : "Pay now"}
                     </button>
                  </div>
                  {message && <div>{message}</div>}
               </div>
            </div>
         </form>
      </div>
   )
}

export default PaymentForm