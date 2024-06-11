import React from 'react'
import { cn } from '../utils';
interface PropsType {
   children: React.ReactNode;
   className?: string;
}
const DropdownItem: React.FC<PropsType> = ({ children, className }) => {
   return (
      <li className={cn(`block w-full text-base bg-transparent whitespace-nowrap py-1 px-3`, className)}>
         {children}
      </li>
   )
}

export default DropdownItem