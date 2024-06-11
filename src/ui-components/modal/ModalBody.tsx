import React from 'react'
import { cn } from '../utils';

interface PropsType {
   children: React.ReactNode;
   className?: string;
}

const ModalBody: React.FC<PropsType> = ({ children, className }) => {
   return (
      <div className={cn(`w-[800px] max-w-full relative flex flex-col bg-white dark:bg-gray-800 rounded-md p-3 m-2`, className)}>{children}</div>
   )
}

export default ModalBody