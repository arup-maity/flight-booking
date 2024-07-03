// import React from 'react';
// import { useCustomCheckout } from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//    const checkout = useCustomCheckout();
//    console.log(checkout);
//    return (
//       <pre>
//          {JSON.stringify(checkout.lineItems, null, 2)}
//       </pre>
//    )
// };

// export default CheckoutForm;

import React from 'react';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CustomCheckoutProvider, useCustomCheckout } from '@stripe/react-stripe-js';
// import { CustomCheckoutProvider, useCustomCheckout } from '@stripe/stripe-js-v3';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

function CheckoutForm() {
   const checkout: any = useCustomCheckout();

   const handleSubmit = async (event: any) => {
      event.preventDefault();
      // Use checkout.confirmPayment() to complete the payment
      const result = await checkout.confirmPayment({
         payment_method: {
            card: event.target.elements.card.getElement().value,
         },
      });

      if (result.error) {
         // Handle payment errors
         console.error(result.error.message);
      } else {
         // Handle successful payment
         console.log('Payment successful!');
      }
   };

   return (
      <Elements stripe={stripePromise}>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="cardNumber">Card Number</label>
               <CardNumberElement id="cardNumber" />
            </div>
            <div>
               <label htmlFor="cardExpiry">Card Expiry</label>
               <CardExpiryElement id="cardExpiry" />
            </div>
            <div>
               <label htmlFor="cardCvc">Card CVC</label>
               <CardCvcElement id="cardCvc" />
            </div>
            <button type="submit">Pay</button>
         </form>
      </Elements>
   );
}

export default CheckoutForm;
