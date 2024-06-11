import React from 'react'
import { cn } from '../utils';
interface PropsType {
   children: React.ReactNode;
   className?: string;
}
const ModalFooter:React.FC<PropsType> = ({ children, className }) => {
   return (
      <div className={cn(`flex shrink-0 flex-wrap items-center justify-end p-3`)}>
         {children}
      </div>
   )
}

export default ModalFooter