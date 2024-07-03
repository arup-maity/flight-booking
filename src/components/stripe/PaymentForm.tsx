'use client'
import React, { useState } from "react";
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

   const handleSubmit = async (e: any) => {
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
      <form onSubmit={handleSubmit}>
         <div className="">
            <PaymentElement />
            <div className="flex justify-end my-4">
               <button
                  className="text-base bg-[#8DD3BB]  rounded py-1 px-4"
                  disabled={isLoading || !stripe || !elements}
               >
                  {isLoading ? "Loading..." : "Pay now"}
               </button>
            </div>
            {message && <div className="text-sm text-red-500">{message}</div>}
         </div>
      </form>
   )
}

export default PaymentForm