import React from 'react'
import { cn } from '../utils';

interface Props {
   className?: string
}
const Spinner: React.FC<Props> = ({ className }) => {
   return (
      <div
         className={cn(`inline-block text-white h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`, className)}
         role="status">
         {/* <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
         ></span> */}
      </div>
   )
}

export default Spinner