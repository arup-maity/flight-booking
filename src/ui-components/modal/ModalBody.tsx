import React from 'react'
import { cn } from '../utils';


const ModalBody = ({ children, className }) => {
   return (
      <div className={cn(`w-[800px] max-w-full relative flex flex-col bg-white dark:bg-gray-800 rounded-md p-3 m-2`, className)}>{children}</div>
   )
}

export default ModalBody